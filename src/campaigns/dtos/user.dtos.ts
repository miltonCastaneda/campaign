import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly identification: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly identificationType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
