module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation
    const get = (req, res) =>{
        app.db('manutencoes')
            .then(manutencoes => res.json(manutencoes))
            .catch(err => res.status(500).send(err))
    }
    const save = (req, res) =>{
        const manutencao = {...req.body}
        //localhost:8080/manutencoes/1
        
        if(manutencao.tipo == 1){
            //MANUTENCAO CORRETIVA

            try{
                existsOrError(manutencao.data,'Data da manutencao corretiva não informada' )
                existsOrError(manutencao.solucao,'Solucao da manutencao corretiva não informada' )
                existsOrError(manutencao.situacao,'Situação da manutencao corretiva não informada' )
                existsOrError(manutencao.problema,'Problema da manutencao corretiva não informado' )
                existsOrError(manutencao.equipamentoId,'Equipamento da manutencao corretiva não informado' )
                existsOrError(manutencao.userId,'Usuário da manutencao corretiva não informado' )
                existsOrError(manutencao.tipo,'Tipo da manutenção corretiva não informado' )
            } catch (msg) {
                return res.status(400).send(msg)
            }
            
            if (req.params.id) {
                app.db('manutencoes')
                    .update(manutencao)
                    .where({ id: req.params.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                app.db('manutencoes')
                    .insert(manutencao)
                    .returning('id')
                    .then(id => {
                        res.json(id)
                    })
                    .catch(err => res.status(500).send(err))
            }


        }else{

            //MANUTENCAO PREVENTIVA
            try {
                existsOrError(manutencao.data,'Data da manutencao preventiva não informada' )
                existsOrError(manutencao.situacao,'Situação da manutencao preventiva não informada' )
                notExistsOrError(manutencao.solucao,'Não existe solução em manutenção preventiva' )
                notExistsOrError(manutencao.problema,'Não existe problema em manutenção preventiva' )
                existsOrError(manutencao.equipamentoId,'Equipamento da manutencao preventiva não informado' )
                existsOrError(manutencao.userId,'Usuário da manutencao preventiva não informado' )
                existsOrError(manutencao.checklistId, 'checklist da manutencao preventiva não informado')
            } catch (msg) {
               return res.status(400).send(msg)
            }
            if (req.params.id) {
                app.db('manutencoes')
                    .update(manutencao)
                    .where({ id: req.params.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                app.db('manutencoes')
                    .insert(manutencao)
                    .returning('id')
                    .then(id => {
                        res.json(id)
                    })
                    .catch(err => res.status(500).send(err))
            }
        }
    }

    const getById = (req, res) => {
        app.db('manutencoes')
            .where({ id: req.params.id })
            .first()
            .then(manutencoes => res.json(manutencoes))
            .catch(err => res.status(500).send(err))

    }

    const getByEquipId = (req, res) => {
        app.db('manutencoes')
            .where({ equipamentoId: req.params.id })
            .then(manutencoes => res.json(manutencoes))
            .catch(err => res.status(500).send(err))

    }


    const remove = async(req,res) => {
        try{
            existsOrError(req.params.id, 'Código da Manutenção não informada')

            await app.db('tarefas')
                .where({manutencaoId: req.params.id})
                .del()

            await app.db('itens_status')
                .where({manutencaoId: req.params.id})
                .del()

            const rowsDeleted = await app.db('manutencoes')
                .where({id: req.params.id})
                .del()
            existsOrError(rowsDeleted, 'Manutenção não foi encontrada.') 
            
            res.status(204).send()
            
        }catch(msg){
            res.status(400).send(msg)
        }
    }


    
    return {save,get, getById, getByEquipId , remove}
}