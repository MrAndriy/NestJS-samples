import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard'
import CreateSubscriberDto from './dto/create-email-subscription.dto'

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
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
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    return this.subscribersService.send(
      {
        cmd: 'add-subscriber'
      },
      subscriber
    )
  }
}