import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import Teacher from 'App/Models/Teacher'
import ServiceClass from "App/Service/CRUD_Models";

export default class ClassroomsController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }

    getClassrooms = async({ response }: HttpContextContract)=>{
        const classrooms = await Classroom.all()
        return classrooms
    }

    getClassroom = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const classroom = this.Service.getModel(Classroom, "id", id);
        return classroom
    }

    addClassroom = async({ request, response, params }: HttpContextContract)=>{
        const { name, title, needAdmission, level } = request.requestBody;
        const { teacherId } = params
        const teacher = this.Service.getModel(Teacher, "user_id", teacherId);
        const classroom = this.Service.createModel(Classroom, { name, title, needAdmission, level, teacherId })
        await classroom.save()
        return classroom;
    }

    editClassroom = async({ request, response, params }: HttpContextContract)=>{
        const { id } = params
        const user = this.Service.getModel(Classroom, "id", id);
        this.Service.updateModel(Classroom, "id", id, { ...request.requestBody });
        return response.send("updated");
    }

    deleteClassroom = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const classroom = this.Service.getModel(Classroom, "id", id);
        await this.Service.deleteModel(Classroom, "id", id);
        return response.send("deleted");
    }
}
