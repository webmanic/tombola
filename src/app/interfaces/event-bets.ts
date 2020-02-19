import { Events } from './events';
import { EventTickets } from './event-tickets';

export interface EventBets extends Events{
    tickets: Array<EventTickets>
}
