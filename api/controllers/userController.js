import User from '../models/userModels.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

//Afficher le user
export const display = (req, res) => {
    res.json({
      message: 'API is working!',
    });
};

// Mise à jour le user
export const updateUser = async (req, res, next) => {
  //sécurité vérif user
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
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
    res.json({
        message: 'API is working on deleteUser!',
      });
}  