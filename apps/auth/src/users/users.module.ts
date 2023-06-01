import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { userDocument, userSchema } from './models/user.schema';
import { UserRepo } from './user.repository';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: userDocument.name,
        schema: userSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UsersModule {}
