import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator'
import { Order } from 'src/constants/entity'

export interface ICommonPaginatedControllerDto {
  readonly page: number
  readonly limit: number
  readonly search: string
  readonly searchType: string
  readonly sort: string
  readonly order: Order
}

export class DefaultCommonPaginatedControllerDto implements ICommonPaginatedControllerDto {
  page = 1
  limit = 10
  search = ''
  searchType = ''
  sort = ''
  order = Order.DESC
}

export class CommonPaginatedControllerDto implements ICommonPaginatedControllerDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly page: number = 1

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number = 10

  @IsOptional()
  @IsString()
  readonly search: string = ''

  @IsOptional()
  @IsString()
  readonly searchType: string = ''

  @IsOptional()
  @IsString()
  readonly sort: string = ''

  @IsOptional()
  @IsEnum(Order)
  readonly order: Order = Order.DESC
}
