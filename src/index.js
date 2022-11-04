import express from "express";
import morgan from "morgan";
import path from 'path';
import cors from 'cors';
import tareasRouter from "./routes/tareas.routes"
import './database'




const app = express();
app.set('port',process.env.PORT || 4002) ;
app.listen (app.get('port'),()=>{
    console.log('Estoy en el puerto' + app.get ('port'));})


    //middlewares: funciones que se ejecutan antes de las rutas
app.use(morgan('dev'));
//permitir peticiones remotas
app.use(cors());

//middlewares para interpretar los objetos json que llegan en las peticiones
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//cargar un archivo estático
app.use(express.static(path.join(__dirname, '../public')));
console.log(path.join(__dirname, '../public'))


console.log('hola flor')

app.use('/apilista', tareasRouter)

