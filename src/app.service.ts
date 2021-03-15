import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Your nest.js service is running ⚙ 🤙🏽';
  }
}
