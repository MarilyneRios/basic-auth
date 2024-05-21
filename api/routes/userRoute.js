import express from 'express';
import {
    display,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', display);
router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


export default router;