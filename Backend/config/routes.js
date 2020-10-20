module.exports = app =>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById) 

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

    app.route('/hospitais/:id/equipamentos')
        .get(app.api.equipamento.getByHospital)
}