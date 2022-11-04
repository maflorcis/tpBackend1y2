import {Router} from "express";
import { check } from "express-validator";
import {borrarTarea, crearTareas, editarTarea, listarTareas, obtenerTarea } from "../controllers/tareas.controllers";

const router = Router();

router
  .route("/tareas")
.get(listarTareas)

.post(
    [
      check("nombreTarea")
        .notEmpty()
        .withMessage("La tarea es un dato obligatorio")
        .isLength({ min: 2, max: 180 })
        .withMessage(
          "El nombre de la tarea debe tener entre 2 y 180 caracteres"
        )],
    crearTareas
  );

router
  .route("/tareas/:id")
  .get(obtenerTarea)
  .put(editarTarea)
  .delete(borrarTarea);


export default router;