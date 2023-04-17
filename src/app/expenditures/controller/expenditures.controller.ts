import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateExpenditureDto } from '../dto/create-expenditure.dto';
import { DateDto } from '../dto/date.dto';
import { ExpendituresMapper } from '../mapper/expenditures.mapper';
import { ExpendituresService } from '../service/expenditures.service';
import { UpdateExpenditureDto } from '../dto/update-expenditure.dto';
import { EmailService } from 'src/app/email/service/email.service';

@Controller('api/expenditures')
@UseGuards(JwtAuthGuard)
@ApiTags('Despesas')
@ApiBearerAuth('JWT-auth')
export class ExpendituresController {
  constructor(
    private readonly expenditureService: ExpendituresService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly expendituresMapper: ExpendituresMapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todas as despesas a partir do usuário responsável',
  })
  async getExpenditure(@Req() user: any) {
    const currentUser = await this.authService.getUserByReq(user);
    return await this.expenditureService.findAll(currentUser.sub);
  }

  @Get('/date')
  @ApiOperation({
    summary: 'Lista todas as despesas a partir de uma data fornecida',
  })
  async getExpenditureByDate(@Req() user: any, @Body() body: DateDto) {
    const currentUser = await this.authService.getUserByReq(user);
    body.userId = currentUser.sub;
    return await this.expenditureService.findByDate(body);
  }

  @Post()
  @ApiOperation({ summary: 'Rota para criação de nova despesa' })
  async createExpenditure(
    @Req() user: any,
    @Body() body: CreateExpenditureDto,
  ) {
    const currentUser = await this.authService.getUserByReq(user);
    body.userId = currentUser.sub;
    const entity = await this.expendituresMapper.mapFrom(body);
    return await this.expenditureService.store(entity).then((expenditure) => {
      this.emailService.enviarEmail(expenditure);
      return expenditure;
    });
  }

  @Put('/update')
  @ApiOperation({ summary: 'Rota para atualização de uma despesa' })
  async updateExpenditure(
    @Req() user: any,
    @Body() body: UpdateExpenditureDto,
  ) {
    const currentUser = await this.authService.getUserByReq(user);
    body.userId = currentUser.sub;
    return await this.expenditureService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rota para exclusão de uma despesa' })
  async deleteExpenditure(
    @Req() user: any,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const currentUser = await this.authService.getUserByReq(user);
    return await this.expenditureService.destroy(currentUser.sub, id);
  }
}
