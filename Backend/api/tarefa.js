module.exports = app =>{
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const tarefa = {...req.body}
        if (req.params.id) tarefa.id = req.params.id
    
        try{
            existsOrError(tarefa.data,'Data não informada') 
            existsOrError(tarefa.horaInicial,'Hora inicial não informada') 
            existsOrError(tarefa.horaFinal,'Hora final não informada') 
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(tarefa.id){
            app.db('tarefas')
                .update(tarefa)
                .where({id: tarefa.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            tarefa.horasTrabalhadas = somarHoras(tarefa.horaInicial, tarefa.horaFinal)

            app.db('tarefas')
                .insert(tarefa)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }
    const remove = async(req,res) => {
        try{
            existsOrError(req.params.id, 'Código da Tarefa não informado')

            const rowsDeleted = await app.db('tarefas')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Tarefa não foi encontrada.') 
            
            res.status(204).send()
            
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    
    const get = (req,res) => {
        app.db('tarefas')
            .then (tarefa => res.json(tarefa))
            .catch(err => res.status(500).send(err))
    }
        
    const getById = (req,res) => {
        app.db('tarefas')
            .where({id: req.params.id})
            .first()
            .then(tarefa => res.json(tarefa))
            .catch(err => res.status(500).send(err))
            
    }
    const getByManutencao = (req,res) => {
        app.db('tarefas')
            .where({manutencaoId: req.params.id})
            .then(tarefa => res.json(tarefa))
            .catch(err => res.status(500).send(err))
            
    }

    const somarHoras = (horaInicial, horaFinal) => {

        let hInicial = Number(horaInicial.split(':')[0])
        let minInicial = Number(horaInicial.split(':')[1])
        let hFinal = Number(horaFinal.split(':')[0])
        let minFinal = Number(horaFinal.split(':')[1])

        let hTrabs = hFinal - hInicial

        let minTrabs = minFinal - minInicial

        if (minTrabs < 0) {
            minTrabs + 60
        }

        let minTrabsDeHora = minTrabs / 60.0

        let horasTrabs = Number(hTrabs) + Number(minTrabsDeHora.toFixed(2))
        return `${horasTrabs}`
    };
    return {save, remove, get, getById, getByManutencao}
}