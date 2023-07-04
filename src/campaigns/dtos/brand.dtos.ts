import { IsString,  IsNotEmpty, IsBoolean    } from 'class-validator';
import { PartialType, ApiProperty} from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly country: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly status: boolean;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
