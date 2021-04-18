import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Teacher from './../../Models/Teacher';

export default class TeachersController {
    getTeachers = async ({ response }: HttpContextContract)=>{
        try {
            const teachers = await Teacher.all()
            return response.send(teachers)
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    getTeacher = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const teacher = await Teacher.find(id)
            if(!teacher){
                return response.status(404).send('not found')
            }
            return response.send(teacher)
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addTeacher = async ({ request, response }: HttpContextContract)=>{
        const {
            email,
            password,
            username,
            university,
            grad_year
        } = request.requestBody

        try {
            const user = new User()
            user.email = email
            user.password = password
            user.username = username
            await user.save()
            
            const teacher = new Teacher()
            teacher.university = university
            teacher.grad_year = grad_year
            await teacher.related('user').associate(user)
            
            return response.send(teacher)
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
    
    editTeacher = async ({ request, response }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ['email', 'password', 'username', 'university', 'grad_year']
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = request.params();

        try {
            const user = await User.find(id)
            if(!user){
                return response.status(404).send("id is wrong");
            }
            const teacher = await Teacher.findBy('userId', id)
            if (!teacher) {
                return response.status(404).send("id is wrong");
            }

            let { university, grad_year, ...userObj } = request.requestBody
            await User.query().where("id", id).update(userObj);
            await Teacher.query().where("userId", id).update({ university, grad_year })
            
            return response.send("updated");
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
    
    deleteTeacher = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const user = await User.find(id)
            if(!user){
                return response.status(404).send("id is wrong");
            }
            await user?.delete()
            return response.send("deleted");
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
