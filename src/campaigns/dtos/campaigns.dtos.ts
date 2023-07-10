import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsAlpha,
  IsOptional,
  Min,
  IsBoolean,
  
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class CreateCampaignDto {
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty({ description: `campaign's name` })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `Branch's Id where is the campaign` })
  readonly branchId: number;

  @IsBoolean()
  @ApiProperty({ description: `The campaign is active or not` })
  @IsOptional()
  readonly status: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Value will be asign to the LEAL coin (cashBack)` })
  readonly valueCoin: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Value will be asign to the LEAL point at local coins, example: $1000 Pesos colombians are 1 Leal point ` })
  readonly valuePoint: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Mininum value of points that must have a client to redeem in that commerce` })
  readonly valueMinRedeemP: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Value of every coin(cashBack) in local coins($Peso Colombiano) to redeem` })
  readonly valueToRedeemC: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Value of every Point in local coins($Peso Colombiano) to redeem ` })
  readonly valueToRedeemP: number;

  @IsNumber()
  @ApiProperty({ description: `Aditional pecentaje value to increse the points and chasback with every buy that is greater than "minToAditionalPercentage"` })
  @IsOptional()
  readonly aditionalPercentage: number;


  @IsNumber()
  @ApiProperty({ description: `Minimum value at local coins to permit put aditional percentaje to the clients ` })
  @IsOptional()
  readonly minToAditionalPercentage: number;


  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;


  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @IsOptional()
  readonly finishingDate: Date;
}

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) { }

export class FiltercampaignsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
