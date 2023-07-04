import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { PartialType, ApiProperty,ApiTags } from '@nestjs/swagger';


export class CreateBranchDto {
  @IsString()
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly status: boolean;

}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
