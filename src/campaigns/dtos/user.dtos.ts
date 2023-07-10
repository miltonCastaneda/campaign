import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmail, Validate, IsAlpha } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly userName: string;

  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly identification: string;

  @IsString()
  @IsNotEmpty()
  @Validate((x) => {
    ["CC", "NIT"]
  }, {
    message: `You can send just the value "CC" or "NIT"`
  })
  @ApiProperty()
  readonly identificationType: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  readonly status: boolean;

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
