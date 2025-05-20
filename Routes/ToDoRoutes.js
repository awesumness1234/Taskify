import express from 'express';
import { createToDo, getAllToDo, deleteToDo, updateToDo } from '../controller/toDoController.js';
import authenticateToken from '../middleware/authJwt.js';

const router = express.Router();

router.post('/create-to-do', authenticateToken, createToDo);
router.get('/get-all-to-do/:userId', authenticateToken, getAllToDo);
router.delete('/delete-to-do/:id', authenticateToken, deleteToDo);
router.patch('/update-to-do/:id', authenticateToken, updateToDo);

export default router;
