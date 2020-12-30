import React from 'react';
import { Divider, List } from "@material-ui/core";
import { TextDetail } from '../UIkit';
import OrderedProducts from './OrderedProducts';

const OrderHistoryItem = ({ order }) => {

   const dateTimeToString = (date) => {
      return date.getFullYear() + "-" +
         String(date.getMonth() + 1).padStart(2, "0") + "-" +
         String(date.getDate()).padStart(2, "0") + "-" +
         String(date.getHours()).padStart(2, "0") + ":" +
         String(date.getMinutes()).padStart(2, "0") + ":" +
         String(date.getSeconds()).padStart(2, "0");
   };
   const dateToString = (date) => {
      return date.getFullYear() + "-" +
         String(date.getMonth() + 1).padStart(2, "0") + "-" +
         String(date.getDate()).padStart(2, "0");
   };

   return (
      <div>
         <div className="module-spacer--small"></div>
         <TextDetail lable={"注文ID"} value={order.orderId} />
         <TextDetail lable={"注文日時"} value={dateTimeToString(order.updated_at.toDate())} />
         <TextDetail lable={"発送予定日"} value={dateToString(order.shipping_date.toDate())} />
         <TextDetail lable={"注文金額"} value={order.amount.toLocaleString()} />
         <List>
            {
               order.products > 0 && (
                  order.products.map((product, index) =>
                     <OrderedProducts key={index.toString()} product={product} />
                  )
               )
            }

         </List>
         <div className="module-spacer--extra-extra-small"></div>
         <Divider />
      </div >
   );
}

export default OrderHistoryItem;