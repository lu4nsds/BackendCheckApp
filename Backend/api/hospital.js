module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const hospitais = {...req.body}
        if (req.params.id) hospitais.id = req.params.id
    
        try{
            existsOrError(hospitais.name,'Nome não informado') 
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(hospitais.id){
            app.db('hospitais')
                .update(hospitais)
                .where({id: hospitais.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('hospitais')
                .insert(hospitais)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const remove = async(req,res) => {
        try{
            existsOrError(req.params.id, 'Código do Hospital não informado')

            const equipamentosExist = await app.db('equipamentos')
                .where ({ hospitalId: req.params.id })
            notExistsOrError(equipamentosExist, "hospital possui equipamentos")
            
            const rowsDeleted = await app.db('hospitais')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Hospital não foi encontrado.') 
            
            res.status(204).send()
            
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    
    const get = (req,res) => {
        app.db('hospitais')
            .then (hospitais => res.json(hospitais))
            .catch(err => res.status(500).send(err))
    }
        
    const getById = (req,res) => {
        app.db('hospitais')
            .where({id: req.params.id})
            .first()
            .then(hospital => res.json(hospital))
            .catch(err => res.status(500).send(err))
            
    }

    return {save, remove, get, getById}
}