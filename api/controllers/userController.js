import User from '../models/userModels.js';

//Afficher le user
export const display = (req, res) => {
    res.json({
      message: 'API is working!',
    });
};

// Mise à jour le user
export const updateUser = async (req, res, next) => {
    res.json({
        message: 'API is working on updateUser!',
      });
}  

// Supprimer le user
export const deleteUser = async (req, res, next) => {
    res.json({
        message: 'API is working on deleteUser!',
      });
}  