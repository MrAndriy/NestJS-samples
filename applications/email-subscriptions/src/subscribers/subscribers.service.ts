import { Controller } from '@nestjs/common'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum'

import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { Subscriber } from './subscriber.entity'

@Controller()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>
  ) {}

  @GrpcMethod()
  async addSubscriber(subscriber: CreateSubscriberDto) {
    try {
      const newSubscriber = await this.subscribersRepository.create(subscriber)
      await this.subscribersRepository.save(newSubscriber)
      return newSubscriber
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new RpcException('Email already exists')
      }
    }
  }

  @GrpcMethod()
  async getAllSubscribers() {
    const data = await this.subscribersRepository.find()
    return {
      data
    }
  }
}
