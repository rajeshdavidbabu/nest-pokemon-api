import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    PokemonModule,
    // Basic throttling/rate-limiting setup.
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: Number(process.env.THROTTLE_TTL),
        limit: Number(process.env.THROTTLE_LIMIT),
      }),
    }),
    // Basic inmemory caching based on the request-urls.
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: Number(process.env.CACHE_TTL),
        max: Number(process.env.CACHE_MAX_ITEMS),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
