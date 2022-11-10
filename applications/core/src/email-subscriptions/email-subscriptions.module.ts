import { Module } from '@nestjs/common'
import { EmailSubscriptionsController } from './email-subscriptions.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

@Module({
  imports: [ConfigModule],
  controllers: [EmailSubscriptionsController],
  providers: [
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER')
        const password = configService.get('RABBITMQ_PASSWORD')
        const host = configService.get('RABBITMQ_HOST')
        const queueName = configService.get('RABBITMQ_QUEUE_NAME')

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: false
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ]
})
export class EmailSubscriptionsModule {}