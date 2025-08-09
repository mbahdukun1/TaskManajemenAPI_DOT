import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IntegrationsService {
  async getPublicTodos(userId: number) {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`, {
      params: { userId }
    });
    return res.data;
  }
}
