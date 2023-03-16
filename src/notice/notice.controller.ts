import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  Delete,
} from '@nestjs/common/decorators'
import { AuthGuard } from '@nestjs/passport'
import {
} from 'src/utility/FileValidator'
import { NoticeService } from './notice.service'
import {
  NoticesAdminTableControllerDTO,
  NoticesGetControllerDto,
} from './notice.dto'
import { TypedQuery } from '@nestia/core'
import { DefaultCommonPaginatedControllerDto } from 'src/utility/dto'

@Controller('notice')
export class NoticeController {
  constructor (
    private readonly noticeService: NoticeService,
  ) {}

  @Get('notices/recent')
  async recent () {
    return await this.noticeService.getRecent()
  }

  @Get('notices/admin-table')
  async index (
    @Query()
    noticesAdminTableControllerDTO: NoticesAdminTableControllerDTO,
  ) {
    const { limit } = noticesAdminTableControllerDTO

    return await this.noticeService.getAdminTable({
      ...noticesAdminTableControllerDTO,
      limit: limit > 100 ? 100 : limit,
      route: (process.env.SELF_URL ?? '/') + 'notice/notices/admin-table',
    })
  }

  @Get('notices')
  async notices (
    // @TypedQuery() noticesControllerDTO: NoticesGetControllerDto,
    @Query() noticesControllerDTO: NoticesGetControllerDto,
  ) {
    const {
      sort,
      order,
      limit: defaultLimit,
      ...defaultParams
    } = new DefaultCommonPaginatedControllerDto()
    const { limit = defaultLimit } = noticesControllerDTO

    return await this.noticeService.paginatePublic({
      ...defaultParams,
      ...noticesControllerDTO,
      limit: limit > 100 ? 100 : limit,
      route: (process.env.SELF_URL ?? '/') + 'notice/notices',
    })
  }

  @Get(':id')
  async view (@Param('id', ParseIntPipe) id: number) {
    return await this.noticeService.view(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteNotice (@Param('id') id: number) {
    void this.noticeService.softDelete(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/:id')
  async adminView (@Param('id', ParseIntPipe) id: number) {
    return await this.noticeService.getOne(id)
  }
}
