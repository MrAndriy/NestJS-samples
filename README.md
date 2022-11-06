# API with NestJS #5. Serializing the response with interceptors

how we can modify the response that we send back to our users. While the most straightforward way to do so is to serialize the response with ClassSerializerInterceptor, we can also create our own interceptor. We’ve also looked into how we can bypass the issue of using the @Res() decorator.
