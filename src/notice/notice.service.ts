import { Injectable } from '@nestjs/common'
import { Notice } from 'src/entity/Notice'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, DeepPartial, Repository, UpdateResult } from 'typeorm'
import { paginate } from 'nestjs-typeorm-paginate'
import { NoticesAdminTableServiceDTO, NoticesGetServiceDto, NOTICE_DEFAULT_SORT } from './notice.dto'
import { snakeCase } from 'typeorm/util/StringUtils'
import { Order } from 'src/constants/entity'

@Injectable()
export class NoticeService {
  constructor (
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async getRecent (): Promise<Array<Partial<Notice>> | undefined> {
    const paginateRawResult = await this.paginatePublic({ limit: 3, page: 1, search: '', searchType: '' })
    return paginateRawResult.items
  }

  async paginatePublic (noticesGetServiceDto: NoticesGetServiceDto) {
    const { page, limit, route, searchType, search } = noticesGetServiceDto

    const queryBuilder = this.noticeRepository
      .createQueryBuilder('n')
      .select([
        'n.id',
        'n.title',
        'n.noticeType',
        'n.createDate',
      ])
      .where('n.isPublic=1')

    if (Boolean(search) && Boolean(searchType)) {
      if (searchType === 'titleAndContent') {
        queryBuilder.where(
          new Brackets((qb) => {
            qb.where('title Like :search OR content Like :search', {
              search: `%${search ?? ''}%`,
            })
          }),
        )
      } else {
        queryBuilder.andWhere(`n.${searchType} Like '%${search}%'`)
      }
    }
    queryBuilder.orderBy('create_date', 'DESC')

    const pagingResult = await paginate(queryBuilder, {
      page,
      limit,
      route,
    })

    return {
      ...pagingResult,
      searchType,
      search,
    }
  }

  async getPublicOne (id: number): Promise<Notice> {
    return await this.noticeRepository
      .createQueryBuilder('n')
      .select()
      .where('n.isPublic=1')
      .andWhere('n.id = :id', { id })
      .getOneOrFail()
  }

  async increaseViewCount (id: number): Promise<UpdateResult> {
    return await this.noticeRepository
      .createQueryBuilder()
      .update()
      .set({
        viewCount: () => 'view_count + 1',
      })
      .where('id = :id', { id })
      .execute()
  }

  async view (id: number) {
    await this.increaseViewCount(id)
    return await this.getPublicOne(id)
  }

  async getAdminTable (noticesAdminTableServiceDTO: NoticesAdminTableServiceDTO) {
    const queryBuilder = this.noticeRepository
      .createQueryBuilder('n')
      .select()

    if (noticesAdminTableServiceDTO.search !== '' && noticesAdminTableServiceDTO.searchType !== '') {
      const columnName = snakeCase(noticesAdminTableServiceDTO.searchType)

      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(`${columnName} Like :search`, {
            search: `%${noticesAdminTableServiceDTO.search ?? ''}%`,
          })
        }),
      )
    }

    const sort = noticesAdminTableServiceDTO.sort !== ''
      ? snakeCase(noticesAdminTableServiceDTO.sort)
      : NOTICE_DEFAULT_SORT
    const order = noticesAdminTableServiceDTO.order ?? Order.DESC

    queryBuilder.orderBy(sort, order)

    const { page, limit, route } = noticesAdminTableServiceDTO
    const pagingResult = await paginate(queryBuilder, {
      page,
      limit,
      route,
    })

    return {
      ...pagingResult,
      searchType: noticesAdminTableServiceDTO.searchType,
      search: noticesAdminTableServiceDTO.search,
    }
  }

  async getOne (id: number) {
    return await this.noticeRepository
      .createQueryBuilder('n')
      .select()
      .where('n.id = :id', { id })
      .getOneOrFail()
  }

  private async updateOne (notice: DeepPartial<Notice> & { id: Notice['id'] }) {
    return await this.noticeRepository.save(notice)
  }

  async createOne (notice: DeepPartial<Notice>) {
    return await this.noticeRepository.save(notice)
  }

  async softDelete (id: number) {
    return await this.noticeRepository.softDelete(id)
  }
}
