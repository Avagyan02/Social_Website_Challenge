import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from 'src/utils/entities/friends.entity';
import { Users } from 'src/utils/entities/users.entity';
import { AuthMiddleware } from 'src/utils/middlewares/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([Friends, Users])
    ],
    controllers: [FriendsController],
    providers: [FriendsService],
})
export class FriendsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('friends');
    }
  }
