import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ExpendituresEntity } from 'src/app/expenditures/entities/expenditures.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmail(data: ExpendituresEntity) {
    await this.mailerService.sendMail({
      to: data.user.email,
      from: 'andreygiovannircc@gmail.com',
      subject: 'Foi criada uma nova despesa!',
      html: `<h2> Foi criada uma nova despesa no seu usuário! </h2>
      <h3>Dados da despesa:</h3>
      <p><b>Data</b>: ${data.expenditureDate} </p>
      <p><b>Valor</b>: R$${data.value}</p>
      <p><b>Descrição</b>: ${data.description}</p>
      <p><b>Usuário responsável</b>: ${data.user.username}</p>
      <p style="font-size: 8px"><b>powered by ExpenditureAPI</b></p>`,
    });
  }
}
