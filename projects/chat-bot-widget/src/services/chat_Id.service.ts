import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private selectedChatIdSource = new BehaviorSubject<string | null>(null);
  selectedChatId$ = this.selectedChatIdSource.asObservable();

  setSelectedChatId(chatId: string) {
    this.selectedChatIdSource.next(chatId);
  }
}
