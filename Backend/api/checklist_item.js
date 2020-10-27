module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const checklist_item = {...req.body}
        if (req.params.id) checklist_item.id = req.params.id
    
        try{
            existsOrError(checklist_item.procedimento,'Procedimento não informado') 
            existsOrError(checklist_item.checado,'check não informado') 
            existsOrError(checklist_item.checklistId,'checklistID não informado') 
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(checklist_item.id){
            app.db('checklist_itens')
                .update(checklist_item)
                .where({id: checklist_item.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('checklist_itens')
                .insert(checklist_item)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const get = (req, res)=>{
        app.db('checklist_itens')
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req,res) => {
        try{
            const rowsDeleted = await app.db('checklist_itens')
                .where ({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Item não foi encontrado')    
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }
    }
    

    return {save, get, remove}
}