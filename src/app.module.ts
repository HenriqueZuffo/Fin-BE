import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [WalletModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
