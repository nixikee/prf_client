import { User } from "./User";

export interface Event {
    creator: User; // ref user-re
    title: string;
    startdate: Date;
    finishdate: Date;
    location: string;
    place_count: number;
    general_ticket_price: number;
    VIP_ticket_price: number;
    priority_ticket_price: number;
    student_ticket_price: number;
    child_ticket_price: number;
    retired_ticket_price: number;
    image: string;
}