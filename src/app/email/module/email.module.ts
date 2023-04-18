import { Module } from '@nestjs/common';
import { EmailService } from '../service/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        secure: false,
        port: process.env.MAILER_PORT as unknown as number,
        auth: {
          user: process.env.MAILER_INCOMING_USER,
          pass: process.env.MAILER_INCOMING_PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.MAILER_DEFAULT_FROM,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
