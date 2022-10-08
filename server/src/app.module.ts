import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';

@Module({
  imports: [GameModule, GameService],
})
export class AppModule {}