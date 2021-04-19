import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom';
import Course from 'App/Models/Course';
import Lesson from 'App/Models/Lesson';

export default class LessonsController {
    getClassroomLessons = async({ response, params }: HttpContextContract)=>{
        const { classroomId } = params
        try {
            const lessons = await Lesson.query().where('classroom_id', classroomId).preload('classroom')
            return lessons;
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getClassroomLesson = async({ response, params }: HttpContextContract)=>{
        const { id } = params;
        try {
            const lesson = await Lesson.find(id)
            if(!lesson){
                return response.status(404).send("not found")
            }
            await lesson.preload('classroom')
            return lesson
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addClassroomLesson = async({ request, response, params }: HttpContextContract)=>{
        const { classroomId } = params;
        const { description } = request.requestBody
        try {
            const classroom = await Classroom.find(classroomId)
            if(!classroom){
                return response.status(404).send("the classroom is wrong")
            }
            const lesson = new Lesson()
            lesson.description = description;
            await classroom.related("lessons").save(lesson)
            await lesson.preload("classroom");
            return lesson

        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editClassroomLesson = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["description"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const lesson = await Lesson.find(id)
            if(!lesson){
                return response.status(404).send('not found')
            }
            updates.forEach((update) => (lesson[update] = request.requestBody[update]));
            await lesson.save()
            await lesson.preload('classroom')
            return lesson
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteClassroomLesson = async({ request, response }: HttpContextContract)=>{
        const { id, classroomId } = request.params();
        try {
            await Lesson.query().where("classroom_id", classroomId).where("id", id).delete();
            return;
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    /*
        Courses
    */
    getCourseLessons = async({ response, params }: HttpContextContract)=>{
        try {
            const { courseId } = params
        try {
            const lessons = await Lesson.query().where('course_id', courseId).preload('course')
            return lessons;
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getCourseLesson = async({ response, params }: HttpContextContract)=>{
        const { id } = params;
        try {
            const lesson = await Lesson.find(id)
            if(!lesson){
                return response.status(404).send("not found")
            }
            await lesson.preload('course')
            return lesson
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addCourseLesson = async({ request, response, params }: HttpContextContract)=>{
        const { courseId } = params;
        const { description } = request.requestBody
        try {
            const course = await Course.find(courseId);
            if(!course){
                return response.status(404).send("the course id is wrong")
            }
            const lesson = new Lesson()
            lesson.description = description;
            await course.related("lessons").save(lesson);
            await lesson.preload("course");
            return lesson

        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editCourseLesson = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["description"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const lesson = await Lesson.find(id)
            if(!lesson){
                return response.status(404).send('not found')
            }
            updates.forEach((update) => (lesson[update] = request.requestBody[update]));
            await lesson.save()
            await lesson.preload('course')
            return lesson
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteCourseLesson = async({ request, response }: HttpContextContract)=>{
        const { id, courseId } = request.params();
        try {
            await Lesson.query().where("course_id", courseId).where("id", id).delete();
            return "deleted";
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
