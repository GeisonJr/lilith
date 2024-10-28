import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-Version'
  })

  // Swagger documentation
  const config = new DocumentBuilder()
    // Info
    .setTitle('API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    // Server
    .addServer('http://localhost:3000', 'Development')
    // ...
    // Tags
    .addTag('Tag 1', 'Description 1')
    // ...
    // Build
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/json',
  })

  // Use global pipes
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
