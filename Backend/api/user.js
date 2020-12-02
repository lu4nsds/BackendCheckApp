const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }  
    const save = async (req, res) =>{
        const user = {...req.body }
        if (req.params.id) user.id = req.params.id
        
        try{
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password,user.confirmPassword,
                'Senhas não conferem'
                )
            const userFromDb = await app.db('users')
                .where({email: user.email}).first()
            if(!user.id){
                notExistsOrError(userFromDb, 'Usuário já cadastrado')
            }        
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword
    
        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('users')
                .insert(user)
                .then( _=> res.status(204).send())
                .catch (err => res.status(500).send(err))
       }
    }
    
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name','email','admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))

    }
    
    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name','email','admin')
            .where({id: req.params.id})
            .first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))

    }
    const remove = async (req,res) => {
        try{
            existsOrError(req.params.id, 'Código do Usuário não informado')
            const manutencaoExist = await app.db('manutencoes')
                .where({ userId: req.params.id })
            notExistsOrError(manutencaoExist, "Usuário possui manutenções")
            
            const rowsDeleted = await app.db('users')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Usuário não foi encontrado.') 
            
            res.status(204).send()
            
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    
    const checkUser = async (req, res) => {
        let user = await app.db('users')
            .where({email: req.body.email})
            .first()
            .then(user => user)
            .catch(err => (err))
        if(user){
            await bcrypt.compare(req.body.password , user.password, (err, result) =>{
                if (result == true) {
                    res.json({
                        result,
                        user
                    })
                }
            })
        } else{
            res.json(false)
        }
        
    }
    
    return{ save, get, getById, remove, checkUser}

}