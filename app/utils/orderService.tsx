import { CartItem } from "../types/cartitem";


export const createOrderPayload = (cart: CartItem[]) => {
    const sessionId = Math.random().toString(36).substring(7);
    const currentDate = new Date().toISOString();
    
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
      <orders xmlns:sql="urn:schemas-microsoft-com:mapping-schema" 
              xsi:noNamespaceSchemaLocation="xml_IN_tellimused.xsd" 
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
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