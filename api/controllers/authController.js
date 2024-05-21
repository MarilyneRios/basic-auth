import User from '../models/userModels.js';

export const signup = async (req, res, next) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}


export const signin = async (req, res, next) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}

export const signout = (req, res) => {
    console.log(req.body);
    res.json({ message: 'Inscription réussie', data: req.body });
}