const connection = require('../database/connections')

module.exports={
    async index(req, resp){
        const ong_id= req.headers.authorization

        const incidentes= await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')
        return resp.json(incidentes)
    }
}