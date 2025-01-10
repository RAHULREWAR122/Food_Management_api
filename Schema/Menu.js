import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true });
  
export const Menu = mongoose.model('Menu', menuSchema);
  