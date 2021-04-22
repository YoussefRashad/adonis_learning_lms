import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom';
import Course from 'App/Models/Course';
import Lesson from 'App/Models/Lesson';
import ServiceClass from "App/Service/CRUD_Models";
export default class LessonsController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }
    getClassroomLessons = async({ params }: HttpContextContract)=>{
        const { classroomId } = params
        const lessons = await Lesson.query().where('classroom_id', classroomId).preload('classroom')
        return lessons;
    }

    getClassroomLesson = async({ response, params }: HttpContextContract)=>{
        const { id } = params;
        const lesson = this.Service.getModel(Lesson, "id", id);
        await lesson.preload("classroom");
        return response.send(lesson)
    }

    addClassroomLesson = async({ request, params }: HttpContextContract)=>{
        const { classroomId } = params;
        const { description } = request.input("description");
        const classroom = this.Service.getModel(Classroom, "id", classroomId);
        const lesson = this.Service.createModel(Lesson, {description})
        await classroom.related("lessons").save(lesson)
        await lesson.preload("classroom");
        return lesson;
    }

    editClassroomLesson = async({ request, response, params }: HttpContextContract)=>{
        const { id } = params
        const lesson = this.Service.getModel(Lesson, "id", id);
        this.Service.updateModel(Classroom, "id", id, { ...request.requestBody });
        await lesson.preload('classroom')
        return response.send("updated");
    }

    deleteClassroomLesson = async({ request }: HttpContextContract)=>{
        const { id, classroomId } = request.params();
        await Lesson.query().where("classroom_id", classroomId).where("id", id).delete();
        return;
    }

    /*
        Courses
    */
    getCourseLessons = async({ params }: HttpContextContract)=>{
        const { courseId } = params
        const lessons = await Lesson.query().where('course_id', courseId).preload('course')
        return lessons;
    }

    getCourseLesson = async({ response, params }: HttpContextContract)=>{
        const lesson = this.Service.getModel(Lesson, "id", id);
        await lesson.preload("course");
        return lesson
    }

    addCourseLesson = async({ request, response, params }: HttpContextContract)=>{
        const { courseId } = params;
        const { description } = request.input("description");
        const course = this.Service.getModel(Course, "id", courseId);
        const lesson = this.Service.createModel(Lesson, {description})
        await course.related("lessons").save(lesson);
        await lesson.preload("course");
        return lesson;
    }

    editCourseLesson = async({ request, response, params }: HttpContextContract)=>{
        const { id } = params
        const lesson = this.Service.getModel(Lesson, "id", id);
        this.Service.updateModel(Course, "id", id, { ...request.requestBody });
        await lesson.preload("course");
        return response.send("updated");
    }

    deleteCourseLesson = async({ request, response }: HttpContextContract)=>{
        const { id, courseId } = request.params();
        await Lesson.query().where("course_id", courseId).where("id", id).delete();
        return "deleted";
    }
}
