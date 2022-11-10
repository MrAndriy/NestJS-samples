import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import CreateSubscriberDto from './dto/create-email-subscription.dto'

@Controller('email-subscriptions')
export class EmailSubscriptionsController {
  constructor(@Inject('SUBSCRIBERS_SERVICE') private subscribersService: ClientProxy) {}

  @Get()
  async getSubscribers() {
    return this.subscribersService.send(
      {
        cmd: 'get-all-subscribers'
      },
      ''
    )
  }

  @Post()
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    return this.subscribersService.send(
      {
        cmd: 'add-subscriber'
      },
      subscriber
    )
  }
}
