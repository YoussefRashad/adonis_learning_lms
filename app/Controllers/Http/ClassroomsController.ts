import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import Teacher from 'App/Models/Teacher'

export default class ClassroomsController {
    getClassrooms = async({ response }: HttpContextContract)=>{
        try {
            const classrooms = await Classroom.all()
            return classrooms
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getClassroom = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const classroom = await Classroom.find(id)
            if(!classroom){
                return response.status(404).send('not found')
            }
            return response.send(classroom);
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addClassroom = async({ request, response, params }: HttpContextContract)=>{
        const { name, title, needAdmission, level } = request.requestBody;
        const { teacherId } = params
        try {
            const teacher = await Teacher.findBy("user_id", teacherId);
            if(!teacher){
                return response.status(404).send("teacher not found")
            }

            const classroom = new Classroom()
            classroom.name = name;
            classroom.title = title;
            classroom.needAdmission = needAdmission;
            classroom.level = level;
            classroom.teacherId = teacherId
            console.log({ name, title, needAdmission, level });
            
            await classroom.save()
            
            return response.send(classroom);
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editClassroom = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["name", "title", "needAdmission", "level"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const classroom = await Classroom.find(id)
            if(!classroom){
                return response.status(404).send("id is wrong");
            }
            updates.forEach((update)=> classroom[update] = request.requestBody[update])
            await classroom.save()
            return response.send(classroom);
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteClassroom = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const classroom = await Classroom.find(id);
            if(!classroom){
                return response.status(404).send("id is wrong");
            }
            await classroom?.delete();
            return response.send("deleted");
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
