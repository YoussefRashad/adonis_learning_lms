import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assessment from 'App/Models/Assessment';
import Lesson from 'App/Models/Lesson';
import Question from "App/Models/Question";

export default class AssessmentsController {
    getAssessments = async({ response, params }: HttpContextContract)=>{
        const { lessonId } = params;
        try {
            const assessments = await Assessment.query().where("lesson_id", lessonId).preload('lesson');
            return assessments;
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getAssessment = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        try {
            const assessment = await Assessment.query().where("lesson_id", lessonId).where('id', id).preload('lesson');
            if(!assessment){
                return response.status(404).send('not found')
            }
            return assessment
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addAssessment = async({ request, response, params }: HttpContextContract)=>{
        const { max_grade, questions=[], answers=[] } = request.requestBody;
        const { lessonId } = params
        try {
            const lesson = await Lesson.find(lessonId)
            if(!lesson){
                return response.status(404).send("not found");
            }
            const assessment = new Assessment()
            assessment.max_grade = max_grade
            
            await lesson.related("assessments").save(assessment);
            const ques = await Question.createMany([questions, answers]);

            await assessment.related("questions").createMany(ques);
            await assessment.preload('lesson')
            return assessment
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editAssessment = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["max_grade"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const assessment = await Assessment.find(id)
            if (!assessment) {
                return response.status(404).send("not found");
            }
            updates.forEach((update) => assessment[update] = request.requestBody[update])
            await assessment.save()
            await assessment.preload('lesson')
            return assessment
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteAssessment = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        try {
            await Assessment.query().where('lesson_id', lessonId).where('id', id).delete()
            return 'deleted';
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
