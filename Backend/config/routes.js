module.exports = app =>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove) 
    
    app.route('/users/:id/manutencoes/')
        .get(app.api.manutencao.getByUserId)

    app.route('/users/:id/manutencoes/abertas')
        .get(app.api.manutencao.getAbertaByUserId)

    app.route('/users/:id/manutencoes/concluidas')
        .get(app.api.manutencao.getConcluidaByUserId)    

    app.route('/login')
        .post(app.api.user.checkUser)

    app.route('/hospitais')
        .get(app.api.hospital.get)
        .post(app.api.hospital.save)
    app.route('/hospitais/:id')
        .get(app.api.hospital.getById)
        .put(app.api.hospital.save)
        .delete(app.api.hospital.remove)
    
    app.route('/hospitais/:id/equipamentos')
        .get(app.api.equipamento.getByHospital)    
    
    app.route('/equipamentos')
        .get(app.api.equipamento.get)
        .post(app.api.equipamento.save)
    app.route('/equipamentos/:id')
        .get(app.api.equipamento.getById)
        .put(app.api.equipamento.save)
        .delete(app.api.equipamento.remove)

    app.route('/equipamentos/:id/checklist')
        .get(app.api.equipamento.getChecklist)    
    
    app.route('/equipamentos/:id/manutencoes')
        .get(app.api.manutencao.getByEquipId)       

    app.route('/tipos_equip')
        .get(app.api.tipo_equip.get)
        .post(app.api.tipo_equip.save)
    app.route('/tipos_equip/:id')
        .get(app.api.tipo_equip.getById)
        .put(app.api.tipo_equip.save)
        .delete(app.api.tipo_equip.remove)
    
    app.route('/manutencoes')
        .get(app.api.manutencao.get)
        .post(app.api.manutencao.save)
    app.route('/manutencoes/:id')
        .get(app.api.manutencao.getById)
        .put(app.api.manutencao.save)
        .delete(app.api.manutencao.remove)
    
    app.route('/manutencoes/:id/tarefas')
        .get(app.api.tarefa.getByManutencao)
    
    app.route('/manutencoes/:id/itens_status')
        .get(app.api.item_status.getByManutencaoId)       

    app.route('/tarefas')
        .get(app.api.tarefa.get)
        .post(app.api.tarefa.save)
    app.route('/tarefas/:id')
        .get(app.api.tarefa.getById)
        .put(app.api.tarefa.save)
        .delete(app.api.tarefa.remove)


    app.route('/checklist')
        .get(app.api.checklist.get)
        .post(app.api.checklist.save)
    app.route('/checklist/:id')
        .get(app.api.checklist.getByItens)
        .put(app.api.checklist.save)
        .delete(app.api.checklist.remove)



    app.route('/itens_status')
        .get(app.api.item_status.get)
        .post(app.api.item_status.save)
    app.route('/itens_status/:id')
        .get(app.api.item_status.getById)
        .put(app.api.item_status.save)
        .delete(app.api.item_status.remove)       
 


    app.route('/checklist_itens')
        .get(app.api.checklist_item.get)
        .post(app.api.checklist_item.save)
    app.route('/checklist_itens/:id')
        .put(app.api.checklist_item.save)
        .delete(app.api.checklist_item.remove)
    

    
}