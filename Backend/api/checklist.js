module.exports = app =>{
const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const checklist = {...req.body}
        if (req.params.id) checklist.id = req.params.id
    
        try{
            existsOrError(checklist.equipamentoId,'Equipamento não informado') 
            existsOrError(checklist.manutencaoId,'M. Preventiva não informada') 
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


    return {save, get, getByItens}
}