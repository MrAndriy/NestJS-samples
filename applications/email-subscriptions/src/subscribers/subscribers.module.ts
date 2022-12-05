import { Module } from '@nestjs/common'
import { SubscribersService } from './subscribers.service'
import { Subscriber } from './subscriber.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscribersService],
  exports: []
})
export class SubscribersModule {}
