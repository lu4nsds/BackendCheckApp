module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const item_status = {...req.body}
        if (req.params.id) item_status.id = req.params.id
    
        try{
            existsOrError(item_status.procedimento,'Procedimento não informado') 
            existsOrError(item_status.manutencaoId,'manutencaoId não informado') 
        } catch (msg){
            console.log('Entrou no 400')
            return res.status(400).send(msg)
        }

        if(item_status.id){
            app.db('itens_status')
                .update(item_status)
                .where({id: item_status.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('itens_status')
                .insert(item_status)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const get = (req, res)=>{
        app.db('itens_status')
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req,res) => {
        try{
            const rowsDeleted = await app.db('itens_status')
                .where ({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Item não foi encontrado')    
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }
    }
    const getByManutencaoId = async (req, res) => {
        const itens = await app.db('itens_status')
            .where({ manutencaoId: req.params.id })
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))

    }
    const getById = async (req, res) => {
        const itens = await app.db('itens_status')
            .where({ id: req.params.id })
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))

    }

    return {save, get, getByManutencaoId, getById, remove}
} 