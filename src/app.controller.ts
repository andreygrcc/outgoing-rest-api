import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/auth-guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
@ApiTags('Login')
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: [LoginDto] })
  @ApiOperation({
    summary: 'Rota para gerar um token JWT a partir de um login',
  })
  @ApiResponse({
    status: 201,
    description:
      'Login e senha corretos, foi gerado um token JWT para acesso a API',
  })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
