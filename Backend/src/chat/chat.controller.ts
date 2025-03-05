import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('query') query: string) {
    if (!query) {
      throw new BadRequestException("Missing 'query' field");
    }
    const answer = await this.chatService.generateResponse(query);
    return { answer };
  }
}
