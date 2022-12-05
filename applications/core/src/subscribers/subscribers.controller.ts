import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  OnModuleInit,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard'
import CreateSubscriberDto from './dto/createSubscriber.dto'
import { ClientGrpc } from '@nestjs/microservices'
import SubscribersService from './subscribers.service.interface'

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController implements OnModuleInit {
  private subscribersService: SubscribersService

  constructor(@Inject('SUBSCRIBERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.subscribersService = this.client.getService<SubscribersService>('SubscribersService')
  }

  @Get()
  async getSubscribers() {
    return this.subscribersService.getAllSubscribers({})
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    try {
      return this.subscribersService.addSubscriber(subscriber)
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
