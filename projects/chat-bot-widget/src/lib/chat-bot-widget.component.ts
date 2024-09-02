import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SwalAlertsService } from '../services/swal-alerts.service';
import { CommunicationService } from '../services/communication.service';
import { ChatsMessagesService } from '../services/chatsMessages.service';
import { CommonModule } from '@angular/common';
import { ChatConversationComponent } from '../components/chat-conversation/chat-conversation.component';
import {
  CdkDragEnd,
  DragDropModule,
  CdkDragMove,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-chatBotWidget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatConversationComponent,
    DragDropModule,
  ],
  template: `
    <div class="fixed z-50" [ngStyle]="chatPosition">
      <!-- Chat Bubble -->
      <div
        *ngIf="!isWidgetVisible"
        class="example-box cursor-pointer bg-accent rounded-full p-2 sm:p-3 lg:p-4 shadow-lg flex items-center justify-center"
        (click)="toggleChat()"
        cdkDrag
        cdkDragBoundary="body"
        (cdkDragMoved)="onDragMoved($event)"
        (cdkDragEnded)="onDragEnded($event)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 textPrimary"
          viewBox="0 0 50 50"
        >
          <path
            d="M 25 4.5 C 15.204 4.5 5.9439688 11.985969 3.9179688 21.542969 C 3.9119687 21.571969
      3.9200156 21.599906 3.9160156 21.628906 C 1.5620156 23.233906 -0.04296875 26.383 -0.04296875
      30 C -0.04296875 35.238 3.3210312 39.5 7.4570312 39.5 C 7.7850313 39.5 8.0913438 39.339313
      8.2773438 39.070312 C 8.4643437 38.800312 8.5065781 38.456438 8.3925781 38.148438 C 8.3775781
      38.110438 6.9550781 34.244 6.9550781 29.5 C 6.9550781 24.506 8.3091719 22.022187 8.3261719
      21.992188 C 8.5011719 21.683187 8.4983125 21.305047 8.3203125 20.998047 C 8.1433125 20.689047
      7.8130313 20.5 7.4570312 20.5 C 7.0350313 20.5 6.62275 20.554625 6.21875 20.640625 C 8.58675
      12.613625 16.57 6.5 25 6.5 C 32.992 6.5 40.688641 12.044172 43.431641 19.576172 C
      43.133641 19.530172 42.831438 19.5 42.523438 19.5 C 42.169438 19.5 41.841109 19.689094
      41.662109 19.996094 C 41.482109 20.302094 41.481297 20.683187 41.654297 20.992188 C 41.668297
      21.016188 43.023437 23.5 43.023438 28.5 C 43.023438 32.44 42.045078 35.767641 41.705078 36.806641
      C 40.558078 37.740641 38.815344 39.034297 36.777344 40.154297 C 36.016344 39.305297 34.839391
      38.873437 33.650391 39.148438 L 31.867188 39.558594 C 31.024188 39.751594 30.308609 40.262094
      29.849609 40.996094 C 29.391609 41.728094 29.245453 42.5965 29.439453 43.4375 C 29.783453 44.9335
      31.11975 45.949219 32.59375 45.949219 C 32.83275 45.949219 33.074359 45.923187 33.318359 45.867188
      L 35.103516 45.455078 C 35.945516 45.262078 36.661141 44.752531 37.119141 44.019531 C 37.503141
      43.406531 37.653984 42.698234 37.583984 41.990234 C 39.728984 40.828234 41.570453 39.481469
      42.814453 38.480469 C 46.814453 38.285469 50.023438 34.114 50.023438 29 C 50.023438 25.237
      48.284437 21.989172 45.773438 20.451172 C 45.769438 20.376172 45.777859 20.301563 45.755859
      20.226562 C 43.152859 11.113563 34.423 4.5 25 4.5 z M 12 19 C 11.447 19 11 19.447 11 20 L 11
      32 C 11 32.553 11.447 33 12 33 L 28.044922 33 C 27.540922 34.057 26.743578 35.482375 26.142578
      36.484375 C 25.941578 36.819375 25.954828 37.2405 26.173828 37.5625 C 26.360828 37.8395 26.673
      38 27 38 C 27.055 38 27.109063 37.995328 27.164062 37.986328 C 33.351062 36.955328 38.412 32.95125
      38.625 32.78125 C 38.862 32.59125 39 32.304 39 32 L 39 20 C 39 19.447 38.553 19 38 19 L 12 19 z M
      13 21 L 37 21 L 37 31.501953 C 35.952 32.266953 32.821953 34.393672 29.001953 35.513672 C
      29.643953 34.334672 30.328469 32.955266 30.480469 32.197266 C 30.539469 31.903266 30.462438
      31.598187 30.273438 31.367188 C 30.082438 31.135188 29.8 31 29.5 31 L 13 31 L 13 21 z M
      44.121094 21.822266 C 46.378094 22.758266 48.023437 25.622 48.023438 29 C 48.023438 32.456
      46.299891 35.373281 43.962891 36.238281 C 44.420891 34.565281 45.023438 31.747 45.023438 28.5
      C 45.023438 25.445 44.556094 23.226266 44.121094 21.822266 z M 5.859375 22.822266 C 5.423375
      24.225266 4.9570313 26.445 4.9570312 29.5 C 4.9570312 32.747 5.5595781 35.565281 6.0175781
      37.238281 C 3.6805781 36.373281 1.9570312 33.456 1.9570312 30 C 1.9570312 26.622 3.602375 23.758266
      5.859375 22.822266 z M 18.5 23 C 17.098 23 16 24.317 16 26 C 16 27.683 17.098 29 18.5 29 C 19.902
      29 21 27.683 21 26 C 21 24.317 19.902 23 18.5 23 z M 31.5 23 C 30.098 23 29 24.317 29 26 C 29
      27.683 30.098 29 31.5 29 C 32.902 29 34 27.683 34 26 C 34 24.317 32.902 23 31.5 23 z M 18.5 25 C
      18.677 25 19 25.38 19 26 C 19 26.62 18.677 27 18.5 27 C 18.323 27 18 26.62 18 26 C 18 25.38 18.323
      25 18.5 25 z M 31.5 25 C 31.677 25 32 25.38 32 26 C 32 26.62 31.677 27 31.5 27 C 31.323 27 31 26.62
      31 26 C 31 25.38 31.323 25 31.5 25 z M 34.376953 41.064453 C 34.605953 41.064453 34.83225 41.128906
      35.03125 41.253906 C 35.31025 41.428906 35.504125 41.702391 35.578125 42.025391 C 35.652125 42.348391
      35.598828 42.678984 35.423828 42.958984 C 35.248828 43.237984 34.976297 43.433812 34.654297 43.507812
      L 34.652344 43.507812 L 32.869141 43.917969 C 32.208141 44.071969 31.540672 43.654234 31.388672 42.990234
      C 31.314672 42.668234 31.369922 42.337641 31.544922 42.056641 C 31.719922 41.777641 31.992453 41.581813
      32.314453 41.507812 L 34.097656 41.097656 C 34.190656 41.076656 34.284953 41.064453 34.376953 41.064453 z"
          ></path>
        </svg>
      </div>

      <!-- Chat Box -->
      <div
        *ngIf="isChatOpen"
        class="fixed bg-primary rounded-lg shadow-lg w-full max-w-[90%] h-[80vh] sm:h-[70vh] lg:h-[600px] lg:w-[400px] flex flex-col overflow-hidden"
        [ngStyle]="chatBoxStyle"
        style="max-height: calc(100vh - 2rem);"
      >
        <div
          class="bg-secondary text-textPrimary p-4 flex justify-between items-center rounded-t-lg"
        >
          <span class="text-lg font-bold">Asistencia en línea</span>
          <button (click)="closedWidget()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-4 flex-1 overflow-y-auto">
          <!-- Componente de conversación -->
          <app-chat-conversation
            [messages]="messages"
            [isSendMessage]="isUserSendingMessage"
          ></app-chat-conversation>
        </div>

        <div class="p-3 border-t border-secondary flex items-center">
          <form [formGroup]="formChat" class="flex-grow flex">
            <input
              formControlName="request"
              type="text"
              class="flex-grow p-3 bg-inputMessage border border-secondary rounded-l-md text-textPrimary"
              placeholder="Escribe algo..."
            />
            <button
              type="submit"
              class="bg-btnSendMessage text-textPrimary p-3 rounded-r-md flex justify-center items-center"
            >
              <svg
                class="w-6 h-6 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: `
  `,
})
export class ChatBotWidgetComponent implements OnInit {
  isChatOpen = false;
  isWidgetVisible = false;
  isDragging = false;
  messages: any[] = [];
  isUserSendingMessage = false;
  selectedChatId: string | null = null;
  dragTimeout: any;

  formChat!: FormGroup;
  chatInputs = {
    request: new FormControl('', [Validators.required]),
  };
  position= { x: 0, y: 0, bottom: 0, right: 0};
  chatPosition = { bottom: '16px', right: '16px', top: 'auto', left: 'auto' };
  chatBoxStyle: {
    bottom: string;
    right?: string;
    left?: string;
    top?: string;
  } = { bottom: '16px', right: '16px' };



  ngOnInit(): void {
    this.formChat = new FormGroup({
      ...this.chatInputs,
    });
  }



  toggleChat() {
    // Verificar si el widget esta visible y no se está arrastrando
    if (!this.isWidgetVisible && !this.isDragging) {
    console.log(this.isWidgetVisible, this.isDragging)

      // No Mostrar el widget y abrir el chat
      this.isWidgetVisible = true;
      this.isChatOpen = true;
    }
  }
  closedWidget(){
    // Mostrar el widget y cerrar el chat
    this.isWidgetVisible = false;
    this.isChatOpen = false;

    // Restaurar la posición del chat al valor almacenado
    this.chatPosition = {
      bottom: `${this.position.bottom}px`, // Posición inferior
      right: `${this.position.right}px`,   // Posición derecha
      top: 'auto',                         // No usar la posición superior
      left: 'auto'                         // No usar la posición izquierda
    };

  }

  onDragMoved(event: CdkDragMove): void {
    this.isDragging = true;
  }

  onDragEnded(event: CdkDragEnd): void {
    const element = event.source.getRootElement();
    const rect = element.getBoundingClientRect();

    // Guardar la nueva posición del widget después de soltarlo
    this.position = {
      x: rect.left,                               // Posición en el eje X
      y: rect.top,                                // Posición en el eje Y
      bottom: window.innerHeight - rect.bottom,   // Distancia desde el fondo de la ventana
      right: window.innerWidth - rect.right       // Distancia desde la derecha de la ventana
    };

    // Actualizar el estilo de la caja del chat con la nueva posición
    this.chatBoxStyle = {
      bottom: '16px',                        // Fija la distancia desde la parte inferior a 16px
      right: `${this.position.right}px`,     // Actualiza la distancia desde la parte derecha
      top: 'auto',                           // No usar la posición superior
      left: 'auto'                           // No usar la posición izquierda
    };

    // Finalizar el arrastre
    setTimeout(() => {
      this.isDragging = false;
    }, 0);
  }


  // sendMessage() {
  //   if (this.selectedChatId && this.formChat.valid) {
  //     const message = this.formChat.get('request')?.value;
  //     this.formChat.reset();
  //     this.isUserSendingMessage = true;

  //     this.communicationService
  //       .sendMessage({
  //         language: 'español',
  //         request: message,
  //         email: localStorage.getItem('userEmail') ?? '',
  //         session: this.selectedChatId,
  //       })
  //       .subscribe({
  //         next: (response: any) => {
  //           this.chatsMessages.updateWhenSendMessage(message, response);
  //           this.updateHistorial();
  //           this.isUserSendingMessage = false;
  //         },
  //         error: (err) => {
  //           if (err.status === 429) {
  //             console.error(err.error.detail);
  //             // this.swalAlertsService.messageWhitTimerError(err.error.detail);
  //           }
  //           this.isUserSendingMessage = false;
  //         },
  //       });
  //   } else if (this.formChat.valid) {
  //     const message = this.formChat.get('request')?.value;
  //     this.formChat.reset();
  //     this.isUserSendingMessage = true;

  //     this.communicationService
  //       .sendMessage({
  //         language: 'español',
  //         request: message,
  //         email: localStorage.getItem('userEmail') ?? '',
  //         session: '',
  //       })
  //       .subscribe({
  //         next: (response: any) => {
  //           this.chatsMessages.updateWhenSendMessage(message, response);
  //           this.updateHistorial();
  //           this.isUserSendingMessage = false;
  //         },
  //         error: (err) => {
  //           if (err.status === 429) {
  //             console.error(err.error.detail);
  //             // this.swalAlertsService.messageWhitTimerError(err.error.detail);
  //           }
  //           this.isUserSendingMessage = false;
  //         },
  //       });
  //   }
  // }

  // updateHistorial() {
  //   this.chatsMessages.getMessages().subscribe((messages) => {
  //     this.messages = messages;
  //   });
  // }

  onSubmit() {
    // this.sendMessage();
  }

}
