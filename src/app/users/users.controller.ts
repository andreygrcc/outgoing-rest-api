import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas os usuários cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: IndexUserSwagger,
    isArray: true,
  })
  async index() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista o usuário pelo id fornecido' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado pelo parâmetro',
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneOrFail({ where: { user_id: id } });
  }

  @Post()
  @ApiOperation({ summary: 'Rota para criação de novos usuários' })
  @ApiResponse({ status: 200, description: 'Usuário criado com sucesso' })
  async store(@Body() body: CreateUserDto) {
    return await this.usersService.store(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Rota para atualização de usuários' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado pelo parâmetro',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Rota para exclusão de usuário pelo id fornecido' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado pelo parâmetro',
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.destroy(id);
  }
}
