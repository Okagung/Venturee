import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { KeranjangModule } from './keranjang/keranjang.module';
import { TransaksiModule } from './transaksi/transaksi.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule, KeranjangModule, TransaksiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}