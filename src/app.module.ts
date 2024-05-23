import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SubmitModule } from './submit/submit.module';
import { VerifyModule } from './verify/verify.module';
import { BoardModule } from './board/board.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    SubmitModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    SubmitModule,
    VerifyModule,
    BoardModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
