import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Teacher from 'App/Models/Teacher';
import { getModel, createModel, updateModel, deleteModel } from 'App/Service/CRUD_Models'

export default class TeachersController {
    getTeachers = async ({ response }: HttpContextContract)=>{
        const teachers = await Teacher.all()
        return response.send(teachers)
    }

    getTeacher = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params();
        const teacher = getModel(Teacher, "id", id);
        return response.send(teacher);
    }

    addTeacher = async ({ request, response }: HttpContextContract)=>{
        const {
            email,
            password,
            username,
            university,
            grad_year
        } = request.requestBody
        
        const user = createModel(User, {email, password, username})
        await user.save()
        
        const teacher = createModel(Teacher, { university, grad_year });
        await teacher.related("user").associate(teacher);
        
        return response.send(teacher)
    }
    
    editTeacher = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params();
        const user = getModel(User, "id", id);
        const teacher = getModel(Teacher, "userId", id);

        let { university, grad_year, ...userObj } = request.requestBody;
        updateModel(User, "id", id, userObj);
        updateModel(Teacher, "userId", id, { university, grad_year });
        
        return response.send("updated");
    }
    
    deleteTeacher = async ({ request, response }: HttpContextContract)=>{
        const { id } = request.params()
        const user = getModel(User, 'id', id)
        await deleteModel(User, "id", id);
        return response.send("deleted");
    }
}
