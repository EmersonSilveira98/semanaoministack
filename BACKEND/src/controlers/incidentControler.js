const connection = require('../database/connections')

module.exports={
    async index(req, resp){
        // const {page= 1}= req.query
        const incidents= await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        // .linit(5)
        // .offset((page-1)*5)
        .select([
        'incidents.*','ongs.name', 
        'ongs.email', 'ongs.whatsapp',
        'ongs.city','ongs.uf'])

        return resp.json(incidents)
    },

        

    async create(req, resp){
        const {title, description, value}= req.body
        const ong_id= req.headers.authorization

        const [id]= await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return resp.json({id})
    },
        async delete(req, resp){
            const {id}= req.params
            const ong_id= req.headers.authorization

            const incident= await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

            if(incident.ong_id !== ong_id){
                return resp.status(401).json({error:'operação não altorizada'})
            }

            await connection('incidents').where('id', id).delete()
            return resp.status(204).send()
        }
   


}