module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const tipoEquip = {...req.body}
        if (req.params.id) tipoEquip.id = req.params.id
    
        try{
            existsOrError(tipoEquip.tipo,'Tipo não informado') 
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(tipoEquip.id){
            app.db('tipos_equip')
                .update(tipoEquip)
                .where({id: tipoEquip.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('tipos_equip')
                .insert(tipoEquip)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const remove = async(req,res) => {
        try{
            existsOrError(req.params.id, 'Código do Tipo não informado')

            const equipamentosExist = await app.db('equipamentos')
                .where ({ tipos_equipId: req.params.id })
            notExistsOrError(equipamentosExist, "Tipo de equipamento possui equipamentos")
            
            const rowsDeleted = await app.db('tipos_equip')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Tipo não foi encontrado.') 
            
            res.status(204).send()
            
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    
    const get = (req,res) => {
        app.db('tipos_equip')
            .then (tipo_equip => res.json(tipo_equip))
            .catch(err => res.status(500).send(err))
    }
        
    const getById = (req,res) => {
        app.db('tipos_equip')
            .where({id: req.params.id})
            .first()
            .then(tipoEquip => res.json(tipoEquip))
            .catch(err => res.status(500).send(err))
            
    }

    return {save, remove, get, getById}
}