import express from 'express';
import { getStudentById, studentList,createStudent,updateStudent,deleteStudent } from '../controllers/studentController.js';

// router object
const router = express.Router();

router.get("/student-list",studentList);
router.get("/get-student-by-id/:id",getStudentById);
router.post("/create-student",createStudent);
router.put("/update-student/:id",updateStudent);
router.delete("/delete-student/:id",deleteStudent);

export default router;