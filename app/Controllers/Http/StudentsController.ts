import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';

export default class StudentsController {
    getStudents = async ({ response }: HttpContextContract)=>{
        try {
            const students = await Student.all()
            return response.send(students)
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    getStudent = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        try {
            const student = await Student.find(id)
            if(!student){
                return response.status(404).send('not found')
            }
            return response.send(student)
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addStudent = async ({ request, response }: HttpContextContract)=>{
        const {
            email,
            password,
            username,
            ssn,
            edu_type,
            address,
        } = request.requestBody

        try {
            const user = new User()
            user.email = email
            user.password = password
            user.username = username
            await user.save()
            
            const student = new Student()
            student.ssn = ssn
            student.edu_type = edu_type
            student.address = address;
            await student.related('user').associate(user)
            
            return response.send(student)
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
    
    editStudent = async ({ request, response }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ['email', 'password', 'username', 'ssn', 'edu_type', 'address']
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
            const student = await Student.findBy('userId', id)
            if (!student) {
                return response.status(404).send("id is wrong");
            }

            let { ssn, edu_type, address, ...userObj } = request.requestBody
            await User.query().where("id", id).update(userObj);
            await Student.query().where("userId", id).update({ ssn, edu_type, address })
            
            return response.send("updated");
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
    
    deleteStudent = async ({ request, response }: HttpContextContract)=>{
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
