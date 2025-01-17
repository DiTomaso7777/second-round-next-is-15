import { CartItem } from "../types/cartitem";

const formatDate = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0').substring(0, 2);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${milliseconds}`;
};

export const createOrderPayload = (cart: CartItem[]) => {
  const sessionId = Math.random().toString(36).substring(7);
  const currentDate = formatDate(new Date());
  
  const rows = cart.map((item, index) => `
    <row 
      item="${item.code}"
      description="${item.name}"
      price="${item.salesprice}"
      quantity="${item.quantity}"
      rn="${index + 1}"
    />`
  ).join('');

  return `<?xml version="1.0" encoding="utf-8"?>
    <orders>
      <order 
        session_id="${sessionId}"
        number="${Date.now()}"
        customercode="1008"
        customername="Customer Name"
        date="${currentDate}"
        paymentterm="NET30">
        <rows>${rows}</rows>
      </order>
    </orders>`;
};