import { IsNotEmpty, IsBoolean, IsOptional, IsPhoneNumber, IsAlphanumeric, IsAlpha    } from 'class-validator';
import { PartialType, ApiProperty} from '@nestjs/swagger';

export class CreateBrandDto {

  @IsNotEmpty()
  @ApiProperty()
  @IsAlphanumeric()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber(null,
  {
    message: "Put a phone number with country code and its format. Example: +573226253670 in Colombia"
  })
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsAlpha()
  readonly country: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  readonly status: boolean;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
