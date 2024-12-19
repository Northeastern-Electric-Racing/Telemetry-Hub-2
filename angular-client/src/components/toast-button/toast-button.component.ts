import { Component, Input, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'toast-button',
  templateUrl: './toast-button.component.html',
  styleUrls: ['./toast-button.component.css']
})
export class ToastButtonComponent implements OnInit {
  private messageService = inject(MessageService);
  @Input() label!: string;
  @Input() onClick!: () => void;
  @Input() additionalStyles?: string;
  style!: string;

  ngOnInit(): void {
    this.style = 'width: 140px; height: 45px; ';

    if (this.additionalStyles) {
      this.style += this.additionalStyles;
    }
  }

  handleClick() {
    this.onClick();
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Your new run has started successfully.'
      });
    });
  }
}
