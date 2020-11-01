module.exports = app =>{
const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const checklist = {...req.body}
        if (req.params.id) checklist.id = req.params.id
    
        try{
            existsOrError(checklist.tipo_equipId,'Tipo de equipamento não informado') 
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(checklist.id){
            app.db('checklists')
                .update(checklist)
                .where({id: checklist.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('checklists')
                .insert(checklist)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const get = (req, res)=>{
        app.db('checklists')
            .then(checklists => res.json(checklists))
            .catch(err => res.status(500).send(err))
    }
    const getByItens = async (req, res) => {
        const itens = await app.db('checklist_itens')
            .where({ checklistId: req.params.id })
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))

    }
    const remove = async (req,res) => {
        try{
            const rowsDeleted = await app.db('checklists')
                .where ({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Checklist não foi encontrado')    
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }
    }


    return {save, get, getByItens, remove}
}