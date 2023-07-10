import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsPositive, IsPhoneNumber, IsOptional, IsAlpha, IsAlphanumeric } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class CreateBranchDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber(null,
    {
      message: "Put a phone number with country code and its format. Example: +573226253670 in Colombia"
    })
  readonly phone: string;


  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  readonly status: boolean;

}

export class UpdateBranchDto extends PartialType(CreateBranchDto) { }
