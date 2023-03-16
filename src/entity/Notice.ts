import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm'

@Entity('notices')
export class Notice {
  @PrimaryGeneratedColumn()
  id = NaN

  @Column({ type: 'varchar', length: 255, default: '' })
  @Index()
  title = ''

  @Column({ type: 'text', default: '' })
  content = ''

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
    nullable: true,
  })
  @Index()
  noticeType: string | null = null

  @Column({ type: 'tinyint', default: 1, width: 1 })
  isPublic: 0 | 1 = 0

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
  })
  viewCount: number | null | undefined = undefined

  // @TODO add create admin user
  // @TODO add update admin user

  @UpdateDateColumn({ nullable: true })
  updateDate: Date | null = null

  @CreateDateColumn({ nullable: true })
  createDate: Date | null = null

  @DeleteDateColumn({ nullable: true, select: false })
  deleteDate: Date | null | undefined = undefined
}
