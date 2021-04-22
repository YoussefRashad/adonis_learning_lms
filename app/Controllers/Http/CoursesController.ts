import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import Teacher from 'App/Models/Teacher';
import ServiceClass from "App/Service/CRUD_Models";
export default class CoursesController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }
    getCourses = async({ response }: HttpContextContract)=>{
        const courses = await Course.all()
        return courses
    }

    getCourse = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const course = this.Service.getModel(Course, "id", id);
        return response.send(course);
    }

    addCourse = async({ request, response, params }: HttpContextContract)=>{
        const { name, title, level } = request.requestBody;
        const { teacherId } = params
        const lesson = this.Service.getModel(Teacher, "user_id", teacherId);
        const course = this.Service.createModel(Course, { name, title, level, teacherId });
        await course.save();
        return course;
    }

    editCourse = async({ request, response, params }: HttpContextContract)=>{
        const { id } = params
        const course = this.Service.getModel(Course, "id", id);
        this.Service.updateModel(Course, "id", id, { ...request.requestBody });
        await course.save();
        return course;
    }

    deleteCourse = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const user = this.Service.getModel(Course, "id", id);
        await this.Service.deleteModel(Course, "id", id);
        return response.send("deleted");
    }
}
