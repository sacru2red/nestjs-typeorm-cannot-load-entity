import { Module } from '@nestjs/common'
import { NoticeController } from './notice.controller'
import { NoticeService } from './notice.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Notice } from 'src/entity/Notice'

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [NoticeService],
  // 이 모듈을 가져가서 외부에서 저장소를 사용하려면
  // exports: [TypeOrmModule],
})
export class NoticeModule {}
