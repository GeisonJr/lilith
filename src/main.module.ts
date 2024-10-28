import { AppModule } from '@/application/app.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [AppModule],
  controllers: [],
  providers: [],
})
export class MainModule { }
