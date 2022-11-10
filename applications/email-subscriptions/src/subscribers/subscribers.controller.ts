import { Controller, HttpException, HttpStatus } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { SubscribersService } from './subscribers.service'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @MessagePattern({ cmd: 'add-subscriber' })
  async addSubscriber(@Payload() subscriber: CreateSubscriberDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      const newSubscriber = await this.subscribersService.addSubscriber(subscriber)
      channel.ack(originalMsg)
      return newSubscriber
    } catch (error) {
      channel.nack(originalMsg)
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers()
  }
}
