import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson';
import Video from "App/Models/Video"

export default class VideosController {
    getVideos = async({ response, params }: HttpContextContract)=>{
        const { lessonId } = params;
        try {
            const videos = await Video.query().where("lesson_id", lessonId).preload('lesson');
            return videos;
        } catch (error) {
            return response.status(500).send({ error: error.message })
        }
    }

    getVideo = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        try {
            const video = await Video.query().where("lesson_id", lessonId).where('id', id).preload('lesson');
            if(!video){
                return response.status(404).send('not found')
            }
            return video
        } catch (error) {
            return response.status(500).send({error: error.message});
        }
    }

    addVideo = async({ request, response, params }: HttpContextContract)=>{
        const { link, duration } = request.requestBody;
        const { lessonId } = params
        try {
            const lesson = await Lesson.find(lessonId)
            if(!lesson){
                return response.status(404).send("not found");
            }
            const video = new Video()
            video.link = link
            video.duration = duration

            await lesson.related("videos").save(video);
            await video.preload('lesson')
            return video
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    editVideo = async({ request, response, params }: HttpContextContract)=>{
        const updates = Object.keys(request.requestBody)
        const allowedUpdates = ["link", "duration"];
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation){
            return response.status(404).send("invalid operation")
        }
        const { id } = params

        try {
            const video = await Video.find(id)
            if (!video) {
                return response.status(404).send("not found");
            }
            updates.forEach((update) => video[update] = request.requestBody[update])
            await video.save()
            await video.preload('lesson')
            return video
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }

    deleteVideo = async({ response, params }: HttpContextContract)=>{
        const { id, lessonId } = params;
        try {
            await Video.query().where('lesson_id', lessonId).where('id', id).delete()
            return 'deleted';
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}
