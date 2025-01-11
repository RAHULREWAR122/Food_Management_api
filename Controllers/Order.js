import { Order } from "../Schema/Order.js";
import {Menu} from "../Schema/Menu.js"

export const addOrder = async (req, res) => {
  const { items , userId , totalAmount , status } = req.body;
  // console.log(req.body)
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }
    
  try {
      const totalAmount = await items.reduce(async (acc, item) => {
      const menuItem = await Menu.findById(item.menuItemId);
      return acc + menuItem.price * item.quantity;
    }, 0);
   console.log(totalAmount)
     
    const order = await Order.create({
      userId: req.user.userId,
      items,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

//   app.post('/order', authenticateToken, async (req, res) => {
//     const { items } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: 'Items are required' });
//     }

//     try {
//       const totalAmount = await items.reduce(async (acc, item) => {
//         const menuItem = await Menu.findById(item.menuItemId);
//         return acc + menuItem.price * item.quantity;
//       }, 0);

//       const order = await Order.create({
//         userId: req.user.userId,
//         items,
//         totalAmount,
//         status: 'Pending',
//       });

//       res.status(201).json(order);
//     } catch (error) {
//       res.status(500).json({ message: 'Error placing order', error });
//     }
//   });

//   // Fetch all orders of a logged-in user
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate(
      "items"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};