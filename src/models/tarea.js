import mongoose, {Schema} from "mongoose";

const tareaSchema = new Schema({
    nombreTarea:{
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 150,
    }
})
//aquí realizamos el modelo

const Tarea = mongoose.model('tarea', tareaSchema);

export default Tarea;