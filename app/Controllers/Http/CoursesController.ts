import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import Teacher from 'App/Models/Teacher';

export default class CoursesController {
    getCourses = async({ response }: HttpContextContract)=>{
        try {
            const courses = await Course.all()
            return courses
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getCourse = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const course = await Course.find(id);
            if(!course){
                return response.status(404).send('not found')
            }
            return response.send(course);
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addCourse = async({ request, response, params }: HttpContextContract)=>{
        const { name, title, needAdmission, level } = request.requestBody;
        const { teacherId } = params
        try {
            const teacher = await Teacher.findBy("user_id", teacherId);
            if(!teacher){
                return response.status(404).send("teacher not found")
            }

            const course = new Course();
            course.name = name;
            course.title = title;
            course.level = level;
            course.teacherId = teacherId
            console.log({ name, title, level });
            
            await course.save()
            
            return response.send(course);
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editCourse = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["name", "title", "needAdmission", "level"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const course = await Course.find(id);
            if(!course){
                return response.status(404).send("id is wrong");
            }
            updates.forEach((update)=> course[update] = request.requestBody[update])
            await course.save()
            return response.send(course);
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteCourse = async({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const course = await Course.find(id);
            if(!course){
                return response.status(404).send("id is wrong");
            }
            await course?.delete();
            return response.send("deleted");
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
