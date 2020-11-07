module.exports = app =>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove) 

    app.route('/login')
        .post(app.api.user.checkUser)

    app.route('/hospitais')
        .get(app.api.hospital.get)
        .post(app.api.hospital.save)
    app.route('/hospitais/:id')
        .get(app.api.hospital.getById)
        .put(app.api.hospital.save)
        .delete(app.api.hospital.remove)
    
    app.route('/equipamentos')
        .get(app.api.equipamento.get)
        .post(app.api.equipamento.save)
    app.route('/equipamentos/:id')
        .get(app.api.equipamento.getById)
        .put(app.api.equipamento.save)
        .delete(app.api.equipamento.remove)

    app.route('/tipo_equip')
        .get(app.api.tipo_equip.get)
        .post(app.api.tipo_equip.save)
    app.route('/tipo_equip/:id')
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

    app.route('/checklist')
        .get(app.api.checklist.get)
        .post(app.api.checklist.save)
    app.route('/checklist/:id')
        .get(app.api.checklist.getByItens)
        .put(app.api.checklist.save)
        .delete(app.api.checklist.remove)

    app.route('/equipamentos/:id/checklist')
        .get(app.api.equipamento.getChecklist)
    
    app.route('/checklist_itens')
        .get(app.api.checklist_item.get)
        .post(app.api.checklist_item.save)
    app.route('/checklist_itens/:id')
        .put(app.api.checklist_item.save)
        .delete(app.api.checklist_item.remove)
    
    app.route('/hospitais/:id/equipamentos')
        .get(app.api.equipamento.getByHospital)

    
}