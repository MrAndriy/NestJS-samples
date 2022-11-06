import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  HttpStatus,
  HttpCode,
  Header
} from '@nestjs/common'
import PostsService from './posts.service'
import CreatePostDto from './dto/createPost.dto'
import UpdatePostDto from './dto/updatePost.dto'
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard'
import FindOneParams from '../utils/findOneParams'
import RequestWithUser from '../authentication/requestWithUser.interface'
import { Request, Response } from 'express'

@Controller('posts')
// @UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts()
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id))
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user)
  }

  // @Post()
  // async createPost(@Req() req: Request, @Res() res: Response) {
  //   // console.log(req.body)
  //   res.setHeader('Etag', 'W/1')
  //   return res.send('ok')
  // }

  @Patch(':id')
  async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post)
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams, @Res() res: Response) {
    const deletedResp = await this.postsService.deletePost(Number(id))
    res.setHeader('Etag', `W/${deletedResp.affected}`)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
