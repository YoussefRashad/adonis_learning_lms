import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson';
import Video from "App/Models/Video"
import ServiceClass from "App/Service/CRUD_Models";

export default class VideosController {
    Service;
    constructor(){
        this.Service = new ServiceClass()
    }
    getVideos = async({ response, params }: HttpContextContract)=>{
        const { lessonId } = params;
        const videos = await Video.query().where("lesson_id", lessonId).preload('lesson');
        return videos;
    }

    getVideo = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        const video = await Video.query().where("lesson_id", lessonId).where('id', id).preload('lesson');
        if(!video){
            return response.status(404).send('not found')
        }
        return video
    }

    addVideo = async({ request, params }: HttpContextContract)=>{
        const { link, duration } = request.requestBody;
        const { lessonId } = params
        const lesson = this.Service.getModel(Lesson, "id", lessonId);
        const video = this.Service.createModel(Video, { link, duration });
        await lesson.related("videos").save(video);
        await video.preload("lesson");
        return video;
    }

    editVideo = async({ request, params }: HttpContextContract)=>{
        const { id } = params
        const video = this.Service.getModel(Video, "id", id);
        this.Service.updateModel(Video, "id", id, { ...request.requestBody });
        await video.preload("lesson");
        return video;
    }

    deleteVideo = async({ params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        const user = this.Service.getModel(Video, "lesson_id", lessonId);
        await this.Service.deleteModel(Video, "id", id);
        return "deleted";
    }
}
