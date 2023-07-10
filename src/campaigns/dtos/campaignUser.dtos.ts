import { IsNotEmpty, IsBoolean, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCampaignUserDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly campaignId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly amount: number;


  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  readonly status: boolean;

}

export class UpdateCampaignUserDto extends PartialType(CreateCampaignUserDto) { }
