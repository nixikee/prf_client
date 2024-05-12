import { Event } from "./Event";

export interface TicketSales {
    event: Event;
    place_count: number;
    sold_general_ticket: number;
    sold_VIP_ticket: number;
    sold_priority_ticket: number;
    sold_student_ticket: number;
    sold_child_ticket: number;
    sold_retired_ticket: number;
}