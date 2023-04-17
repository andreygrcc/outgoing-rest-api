import { IsNotEmpty, MaxLength, IsPositive } from 'class-validator';
import { ExpenditureExists } from 'src/shared/decorators/ExpenditureExists.decorator';
import { UserExists } from 'src/shared/decorators/UserExists.decorator';

export class UpdateExpenditureDto {
  @ExpenditureExists({
    message: 'Essa despesa não existe em nossos dados',
  })
  expenditureId: string;

  @UserExists({
    message: 'Esse usuário não existe em nossos dados',
  })
  userId?: string;

  @IsNotEmpty()
  @MaxLength(160, {
    message:
      'A descrição é muito longa. o tamanho máximo é $constraint1 caracteres, atualmente possui $value',
  })
  description: string;

  @IsPositive()
  @IsNotEmpty()
  value: number;
}
