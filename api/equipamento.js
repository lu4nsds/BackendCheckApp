module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) =>{
        const equipamento = {...req.body}
        if(req.params.id) equipamento.id = req.params.id
        
        try{
            existsOrError(equipamento.name,'Nome do equipamento não informado' )
            existsOrError(equipamento.tipos_equipId,'Tipo não informado' )
            existsOrError(equipamento.modelo,'Modelo do equipamento não informado' )
            existsOrError(equipamento.fabricante,'Fabricante do equipamento não informado' )
            existsOrError(equipamento.sn,'Nº Série do equipamento não informado' )
            existsOrError(equipamento.hospitalId,'Hospital do equipamento não informado' )
        
        }catch(msg){
            res.status(400).send(msg)
        }

        if(equipamento.id){
            app.db('equipamentos')
                .update(equipamento)
                .where({id: equipamento.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('equipamentos')
                .insert(equipamento)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }


    const remove = async (req,res) => {
        try{
            const rowsDeleted = await app.db('equipamentos')
                .where ({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Equipamento não foi encontrado')    
            res.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req,res) => {
        app.db('equipamentos')
            .then (equipamentos => res.json(equipamentos))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req,res) => {
        app.db('equipamentos')
            .where({id: req.params.id})
            .first()
            .then(equipamento => res.json(equipamento))
            .catch(err => res.status(500).send(err))
            
    }

    const getByManutAbertaId = async (req, res) => {
        let abertas = await app.db('manutencoes')
            .where({
                hospitalId: req.params.id,
            })
            .whereNot({
                situacao: 'Concluída',
            })
            .then(aberta => aberta.equipamentoId)
            .catch(err => res.status(500).send(err))


        console.log(equips)

    }
    
    const getByHospital = async (req,res) => {
        const equipamentos = await app.db('equipamentos')
            .where({hospitalId: req.params.id})
            .then(equipamentos => res.json(equipamentos))
            .catch(err => res.status(500).send(err))

    }
    //lh:8080/equipamentos/1/checklist
    const getChecklist = async(req, res)=>{
        const equipamento = await app.db('equipamentos')
            .where({id: req.params.id})
            .first()

        const checklist = await app.db('checklists')
            .where({tipos_equipId: equipamento.tipos_equipId})
            .first()

        const itens = await app.db('checklist_itens')
            .where({checklistId: checklist.id})
            .then(itens => res.json(itens))
            .catch(err=>res.status(500).send(err))
    }
    return {save, remove, get, getById, getByHospital, getChecklist, getByManutAbertaId}
}