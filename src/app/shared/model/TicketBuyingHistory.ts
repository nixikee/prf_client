import { Event } from "./Event";
import { User } from "./User";

export interface TicketBuyingHistory {
    event?: Event;
    user?: User;
    place_count: number;
    purchased_ticket_type: string;
}