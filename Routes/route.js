import express from 'express';

const router = express.Router();
import { authenticateToken } from '../Middleware/auth.js';
import { login } from '../Controllers/Login.js';
import { register } from '../Controllers/RegisterUser.js';
import { addMenu, allMenu, removeMenu, updateMenu } from '../Controllers/Menu.js';
import { addOrder, allOrders } from '../Controllers/Order.js';


// Routes
router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/addMenu", authenticateToken , addMenu);
router.get("/api/allMenu", authenticateToken , allMenu);
router.delete("/api/removeMenu/:id", authenticateToken ,removeMenu);
router.put("/api/updateMenu/:id", authenticateToken ,updateMenu);

router.post("/api/addOrder", authenticateToken ,addOrder);
router.get("/api/allOrders", authenticateToken ,allOrders);

router.get("/", (req, res) => {
  res.send("<h2>Welcome to the Backend food Management System.</h2>");
});


export default router;
