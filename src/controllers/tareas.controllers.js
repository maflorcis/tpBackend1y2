import Tarea from "../models/tarea"
import { validationResult } from "express-validator";

export const listarTareas = async (req, res)=>{try {
    
    const listaTareas = await Tarea.find()
//buscar las tareas
 res.status(200).json(listaTareas)
 }catch (error){
     console.log(error)
     res.status(404).json({
         mensaje:'Error al intentar buscar una tarea'
     })
 }
}

export const crearTareas = async(req, res) => {
    try {
      //manejar los errores de express-validator
      const errores = validationResult(req);
      //errores.isEmpty() retorna true cuando no hay errores, retorna false cuando hay errores
      // pregunto si hay errores
      if(!errores.isEmpty()){
        return res.status(400).json({
          errores: errores.array()
        })
      }
  
      //extraer del body los datos
      console.log(req.body);
      //agregar la validacion correspondiente
      const tareaNuevo = new Tarea(req.body);
      //guardar ese producto en la BD
      await tareaNuevo.save();
      //responder al usuario que todo salio bien
      res.status(201).json({
          mensaje: 'La tarea fue correctamente creado'
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
          mensaje: 'Error al intentar agregar una tarea'
      })
    }
  };


  export const obtenerTarea = async(req, res) =>{
    try{
        //obtener el parámetro
        console.log(req.params.id)
        //buscar el documento que coincide con el parámetro
        const tareaBuscado = await Tarea.findById(req.params.id)
        res.status(200).json(tareaBuscado)
        //responder con la tarea encontrada

    }catch(error){
        console.log(error)
        res.status(404).json({
            mensaje:'Error no se pudo encontrar el producto solicitado'
        })
    }

}

export const editarTarea = async (req, res)=>{
    try{
      //buscar la tarea por el id, luego modificar los datos con el body
      await Tarea.findByIdAndUpdate(req.params.id,req.body);
      //responder al frontend
      res.status(200).json({
        mensaje: 'La tarea fue editada correctamente'
      })
    }catch(error){
      console.log(error)
      res.status(404).json({
        mensaje: 'Error la tarea solicitada no pudo ser modificada'
      })
    }
  }

  export const borrarTarea = async (req, res)=>{
    try{
    //buscar una tarea por el id y borrar
    await Tarea.findByIdAndDelete(req.params.id)
    //responder al frontend si pude eliminar la tarea
    res.status(200).json({
      mensaje: 'La tarea fue correctamente eliminada'
    })
    }catch(error){
      console.log(error)
      res.status(404).json({
        mensaje: 'Error en la tarea solicitada no pudo ser eliminada'
      })
    }
  }