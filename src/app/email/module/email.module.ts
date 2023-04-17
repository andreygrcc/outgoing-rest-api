import { Module } from '@nestjs/common';
import { EmailService } from '../service/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST, //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: process.env.MAILER_PORT as unknown as number, // porta
        auth: {
          //dados do usuário e senha
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        // configurações que podem ser padrões
        from: '"',
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
