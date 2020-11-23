// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// export default function PlaceOrderScreen(props) {
//   const cart = useSelector((state) => state.cart);

//   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   cart.itemsPrice = toPrice(
//     cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
//   );
//   cart.totalPrice = cart.itemsPrice;
//   const placeOrderHandler = () => {
//     // TODO: dispatch place order action
//   };
//   return (
//     <div>
//       <div className="row top">
//         <div className="col-2">
//           <ul>
//             <li>
//               <div className="card card-body">
//                 <h2>Order Items</h2>
//                 <ul>
//                   {cart.cartItems.map((item) => (
//                     <li key={item.product}>
//                       <div className="row">
//                         <div>
//                           <h1>{item.data.itemName}</h1>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2>Order Summary</h2>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Items</div>
//                   <div>${cart.itemsPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <li>
//                     <div className="row">
//                       <div>
//                         <strong> Order Total</strong>
//                       </div>
//                       <div>
//                         <strong>${cart.totalPrice.toFixed(2)}</strong>
//                       </div>
//                     </div>
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       onClick={placeOrderHandler}
//                       className="primary block"
//                       disabled={cart.cartItems.length === 0}
//                     >
//                       Place Order
//                     </button>
//                   </li>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
