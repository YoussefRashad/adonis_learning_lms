import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceClass {
    public async get() {
        return 50;
    }
    getModel = async (Model, searchBy, key, { response }: HttpContextContract)=>{
        const returnedObject = await Model.findBy(searchBy, key)
        if (!returnedObject) {
            return response.status(404).send(`${searchBy} is wrong`);
        }
        return returnedObject
    }

    createModel = async (Model, modelData)=>{
        const returnedObject = new Model({
            ... modelData
        })
        return returnedObject;
    }
    
    updateModel = async (Model, searchBy, key, data) => {
        await Model.query().where(searchBy, key).update(data);
    }

    deleteModel = async (Model, searchBy, key) => {
        await Model.query().where(searchBy, key).delete();
    }
}