module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'Quiz', {
            pregunta: {
                type: DataTypes.STRING
            },
            respuesta: {
                type: DataTypes.STRING
            }
        }
    );
}
