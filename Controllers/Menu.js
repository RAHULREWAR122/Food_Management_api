import { Menu } from "../Schema/Menu.js";

export const allMenu = async (req, res) => {
    //  const token = req.headers.authorization?.split(' ')[1];
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error });
  }
};

export const addMenu = async (req, res) => {
  const { name, category, price, availability } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const menuItem = await Menu.create({ name, category, price, availability });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item", error });
  }
};


export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error });
  }
};

export const removeMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error });
  }
};

