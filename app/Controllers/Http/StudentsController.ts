import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import User from 'App/Models/User';
import ServiceClass from 'App/Service/CRUD_Models'
export default class StudentsController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }
    getStudents = async ({ response, request }: HttpContextContract)=>{
        const { page, limit } = request.get();
        const students = await Student.query().paginate(page, limit)            
        return response.send(students)
    }

    getStudent = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const student = this.Service.getModel(Student, 'id', id)
        return response.send(student)
    }

    addStudent = async ({ request, response }: HttpContextContract)=>{
        const {email, password, username, ssn, edu_type, address} = request.requestBody
        const user = this.Service.createModel(User, {email, password, username})
        await user.save()
        
        const student = this.Service.createModel(Student, { ssn, edu_type, address });
        await student.related('user').associate(user)
        
        return response.send(student)
    }
    
    editStudent = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params();
        const user = this.Service.getModel(User, "id", id);
        const student = this.Service.getModel(Student, "userId", id);

        let { ssn, edu_type, address, ...userObj } = request.requestBody
        this.Service.updateModel(User, "id", id, userObj);
        this.Service.updateModel(Student, "userId", id, { ssn, edu_type, address });
        
        return response.send("updated");
    }
    
    deleteStudent = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const user = this.Service.getModel(User, 'id', id)
        await this.Service.deleteModel(User, "id", id);
        return response.send("deleted");
    }
}
