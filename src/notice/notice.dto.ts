import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { Notice } from 'src/entity/Notice'
import { CommonPaginatedControllerDto, ICommonPaginatedControllerDto } from 'src/utility/dto'

export interface NoticesGetControllerDto extends Omit<Partial<ICommonPaginatedControllerDto>, 'sort' | 'order'> {
}

export interface NoticesGetServiceDto extends Omit<ICommonPaginatedControllerDto, 'sort' | 'order'> {
  readonly route?: IPaginationOptions['route']
}

export const NOTICE_DEFAULT_SORT = 'id'
export class NoticesAdminTableControllerDTO extends CommonPaginatedControllerDto {
  @IsOptional()
  @IsString()
  readonly sort: string = NOTICE_DEFAULT_SORT

  @IsIn([...Object.keys(new Notice()), ''])
  readonly searchType: keyof Notice | '' = ''
}

export class NoticesAdminTableServiceDTO extends NoticesAdminTableControllerDTO {
  readonly route?: IPaginationOptions['route']
}

export class NoticePatchControllerDto {
  @IsInt()
  @IsPositive()
  readonly id: number

  @IsOptional()
  @IsString()
  readonly title: string

  @IsOptional()
  @IsString()
  readonly noticeType: string

  @IsOptional()
  @IsString()
  readonly content: string

  @IsOptional()
  @IsIn([0, 1])
  readonly isPublic: 0 | 1

  @IsOptional()
  @Type(() => Number)
  readonly persistAttachFileIds: number[] | number
}

export class NoticeCreateControllerDto {
  @IsOptional()
  @IsString()
  readonly title: string

  @IsOptional()
  @IsString()
  readonly noticeType: string

  @IsOptional()
  @IsString()
  readonly content: string

  @IsOptional()
  @IsIn([0, 1])
  readonly isPublic: 0 | 1
}
