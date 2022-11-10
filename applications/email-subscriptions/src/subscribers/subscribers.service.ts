import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum'

import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { Subscriber } from './subscriber.entity'

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    try {
      const newSubscriber = await this.subscribersRepository.create(subscriber)
      await this.subscribersRepository.save(newSubscriber)
      return newSubscriber
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllSubscribers() {
    return this.subscribersRepository.find()
  }
}
