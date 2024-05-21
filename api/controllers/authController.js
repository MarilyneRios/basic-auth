import User from '../models/userModels.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password});
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        next(error);
      }
}


export const signin = async (req, res, next) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}

export const signout = (req, res) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}