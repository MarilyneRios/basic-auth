import User from '../models/userModels.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

//Afficher le user
export const display = (req, res) => {
    res.json({
      message: 'API is working!',
    });
};

// Mise à jour du user
export const updateUser = async (req, res, next) => {
  // Sécurité : vérification user
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    //  Stocker les champs que nous souhaitons mettre à jour dans l'objet updatedFields
    const updatedFields = {};
    // Vérifie la mise à jours des champs 
    if (req.body.username) {
      updatedFields.username = req.body.username;
    }
    if (req.body.email) {
      updatedFields.email = req.body.email;
    }
    if (req.body.password) {
      updatedFields.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.profilePicture) {
      updatedFields.profilePicture = req.body.profilePicture;
    }

    // Met à jour l’utilisateur dans la base de données en utilisant l’ID
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
} 

// Supprimer le user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}  