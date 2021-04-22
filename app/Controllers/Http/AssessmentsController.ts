import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assessment from 'App/Models/Assessment';
import Lesson from 'App/Models/Lesson';
import Question from "App/Models/Question";
import ServiceClass from "App/Service/CRUD_Models";

export default class AssessmentsController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }
    getAssessments = async({ response, params }: HttpContextContract)=>{
        const { lessonId } = params;
        const assessments = await Assessment.query().where("lesson_id", lessonId).preload('lesson');
        return assessments;
    }

    getAssessment = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        const assessment = await Assessment.query().where("lesson_id", lessonId).where('id', id).preload('lesson');
        if(!assessment){
            return response.status(404).send('not found')
        }
        return assessment
    }

    addAssessment = async({ request, response, params }: HttpContextContract)=>{
        const { max_grade, questions = [], answers = [] } = request.requestBody;
        const { lessonId } = params;

        const lesson = this.Service.getModel(Lesson, "id", lessonId);
        const assessment = this.Service.createModel(Assessment, { max_grade });
        await lesson.related("assessments").save(assessment);
        const ques = await Question.createMany([questions, answers]);

        await assessment.related("questions").createMany(ques);
        await assessment.preload("lesson");
        return assessment
    }

    editAssessment = async({ request, response, params }: HttpContextContract)=>{
        const { id } = params
        const assessment = this.Service.getModel(Assessment, "id", id);
        this.Service.updateModel(Assessment, "id", id, { ...request.requestBody });
        await assessment.preload("lesson");
        return assessment;
    }

    deleteAssessment = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        const user = this.Service.getModel(Assessment, "lesson_id", lessonId);
        await this.Service.deleteModel(Assessment, "id", id);
        return response.send("deleted");
    }
}
