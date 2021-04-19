/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.get("/", "StudentsController.getStudents");
  Route.get("/:id", "StudentsController.getStudent");
  Route.post("/", "StudentsController.addStudent");
  Route.patch("/:id", "StudentsController.editStudent");
  Route.delete("/:id", "StudentsController.deleteStudent");
}).prefix('/api/user/students');


Route.group(() => {
  Route.get("/", "TeachersController.getTeachers");
  Route.get("/:id", "TeachersController.getTeacher");
  Route.post("/", "TeachersController.addTeacher");
  Route.patch("/:id", "TeachersController.editTeacher");
  Route.delete("/:id", "TeachersController.deleteTeacher");
}).prefix("/api/user/teacher");

Route.group(() => {
  Route.get("/", "ClassroomsController.getClassrooms");
  Route.get("/:id", "ClassroomsController.getClassroom");
  Route.post("/", "ClassroomsController.addClassroom");
  Route.patch("/:id", "ClassroomsController.editClassroom");
  Route.delete("/:id", "ClassroomsController.deleteClassroom");
}).prefix("/api/user/teacher/:teacherId/classrooms");

Route.group(() => {
  Route.get("/", "TeachersController.getTeachers");
  Route.get("/:id", "TeachersController.getTeacher");
  Route.post("/", "TeachersController.addTeacher");
  Route.patch("/:id", "TeachersController.editTeacher");
  Route.delete("/:id", "TeachersController.deleteTeacher");
}).prefix("/api/user/teacher/:teacherId/courses");

Route.group(() => {
  Route.get("/", "LessonsController.getClassroomLessons");
  Route.get("/:id", "LessonsController.getClassroomLesson");
  Route.post("/", "LessonsController.addClassroomLesson");
  Route.patch("/:id", "LessonsController.editClassroomLesson");
  Route.delete("/:id", "LessonsController.deleteClassroomLesson");
}).prefix("/api/user/teacher/:classroomId/lessons");

Route.group(() => {
  Route.get("/", "LessonsController.getCourseLessons");
  Route.get("/:id", "LessonsController.getCourseLesson");
  Route.post("/", "LessonsController.addCourseLesson");
  Route.patch("/:id", "LessonsController.editCourseLesson");
  Route.delete("/:id", "LessonsController.deleteCourseLesson");
}).prefix("/api/user/teacher/:courseId/lessons");



// // to check on the connection of the DB
// import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

// Route.get("/health", async ({ response }) => {
//   const report = await HealthCheck.getReport();

//   return report.healthy ? response.ok(report) : response.badRequest(report);
// });

Route.any("*", async ({ response }: HttpContextContract) => {
  return response.status(404).send("the url not found");
});
