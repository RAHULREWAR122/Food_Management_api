import { User } from "../Schema/User.js";
import bcrypt from 'bcrypt'

export const register = async(req , res)=>{
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    if(password.length < 5){
        return res.status(400).json({ message: 'password must be 6 char long' });
    }
    
    const existUser = await User.findOne({username});
    if(existUser){
        return res.status(400).json({ message: 'user already exist, please login' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Error registering user'});
    }
}