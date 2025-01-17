import { OrderRow } from "./orderrow";

export interface Order {
    session_id: string;
    number: string;
    customercode: string;
    customername: string;
    date: string;
    paymentterm: string;
    rows: OrderRow[];
  }