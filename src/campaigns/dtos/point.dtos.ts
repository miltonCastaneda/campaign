import { IsNotEmpty, IsBoolean, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class AddPointDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  brandId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  amount: number;


  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  readonly status: boolean;

}

export class UpdatePointDto extends PartialType(AddPointDto) { }
