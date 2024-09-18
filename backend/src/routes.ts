import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import {CreateNutritionController} from './controllers/createNutritionController'


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions ) {
   fastify.get('/teste', (request: FastifyRequest, reply: FastifyReply)=> {
    let responseText = "```json\n{\n  \"nome\": \"Cleison\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 36,\n  \"altura\": 1.75,\n  \"peso\": 68,\n  \"objetivo\": \"Ganho de massa muscular\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"08:00\",\n      \"nome\": \"Café da manhã\",\n      \"alimentos\": [\n        \"2 fatias de pão integral\",\n        \"2 ovos mexidos com queijo cottage\",\n        \"1 banana\",\n        \"1 copo de leite desnatado\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manhã\",\n        \"alimentos\": [\n        \"1 iogurte grego com granola\",\n        \"1 maçã\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"150g de frango grelhado\",\n        \"1 xícara de arroz integral\",\n        \"1 xícara de feijão\",\n        \"Salada verde com tomate, cebola e azeite de oliva\"\n      ]\n    },\n    {\n      \"horario\": \"15:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"1 scoop de whey protein\",\n        \"1 fatia de pão integral com peito de peru\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de carne vermelha magra\",\n        \"1 xícara de batata doce\",\n        \"1 xícara de brócolis\"\n      ]\n    },\n    {\n      \"horario\": \"21:00\",\n      \"nome\": \"Lanche da noite\",\n      \"alimentos\": [\n        \"1 pote de iogurte grego com 1 colher de sopa de mel\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey protein\",\n    \"Creatina\",\n    \"BCAA\"\n  ]\n}\n```"   
    
    try {
        // extrair json
        let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
        let jsonObject = JSON.parse(jsonString)

        return reply.send({data: jsonObject})

    }catch(err){
        console.log(err)
    }
       
    //console.log('Rota chamada!')
        reply.send({ok: true})
   }) 


fastify.get('/create', async (request: FastifyRequest, reply: FastifyReply)=> {
    return new CreateNutritionController().handle(request, reply)
})


fastify.post('/create', async (request: FastifyRequest, reply: FastifyReply)=> {
    return new CreateNutritionController().handle(request, reply)
})

}