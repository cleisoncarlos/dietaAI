import Fastify from "fastify";
//import cors from "@fastify/cors";
import formbody from '@fastify/formbody'
import dotenv from 'dotenv'
import {routes} from './routes'

const app = Fastify({logger: true})
dotenv.config()

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

const start = async ()=> {
    app.register(formbody);
    app.register(routes);

    try {
        await app.listen({port: 3333, host: '0.0.0.0'})
        console.log('Server rodando na porta 333 ')

    } catch(err){
        console.log(err)
    } 

}

start();