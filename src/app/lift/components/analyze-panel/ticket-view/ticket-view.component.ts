import {Component} from '@angular/core';
import {TicketContentModel} from "../../../model/ticket-content.model";

@Component({
  selector: 'app-ticket-view',
  standalone: true,
  imports: [],
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.scss'
})
export class TicketViewComponent {
  ticketContent: TicketContentModel | null = null;
}
