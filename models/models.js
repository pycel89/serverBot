const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const MessagePiv = sequelize.define('messagePiv', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    messgeText: { type: DataTypes.TEXT }
})
const MessageBot = sequelize.define('messageBot', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tokenid: { type: DataTypes.STRING },
    isBot: { type: DataTypes.BOOLEAN },
    messgeText: { type: DataTypes.TEXT }
})

/*MessagePiv.hasOne(MessageBot)
MessageBot.belongsTo(MessagePiv)*/

module.exports={
    MessagePiv,MessageBot
}