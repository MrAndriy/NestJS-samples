import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { CategoriesModule } from './categories/categories.module'
import * as Joi from '@hapi/joi'
import { SearchModule } from './search/search.module'

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        ELASTICSEARCH_NODE: Joi.string(),
        ELASTICSEARCH_USERNAME: Joi.string(),
        ELASTICSEARCH_PASSWORD: Joi.string()
      })
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    CategoriesModule,
    SearchModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
