import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SubmitModule } from './submit/submit.module';
import { VerifyModule } from './verify/verify.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
