import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCashPointDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly campaignId: number;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly valueMoneyAdded: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly currentPoints: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly currentCashback: number;
}

export class UpdateCashPointDto extends PartialType(CreateCashPointDto) {}
