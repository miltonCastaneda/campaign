import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
  IsBoolean,
  IsTimeZone
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { defaults } from 'joi';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `campaign's name` })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly branchId: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly status: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly valueCoin: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly valuePoint: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly valueMinRedeemP: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly valueToRedeemC: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly valueToRedeemP: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  readonly aditionalPercentage: number;


  @IsNumber()
  @ApiProperty()
  @IsOptional()
  readonly minToaditionalPercentage: number;
  

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  readonly type: string;



  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;


  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @IsOptional()
  readonly finishingDate: Date;
}

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}

export class FiltercampaignsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
