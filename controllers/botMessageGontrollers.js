const { where } = require('sequelize')
const { Op } = require('sequelize')
const models = require('../models/models')
const sequelize = require('../db')
const uuid = require('uuid')

class BotMessageControllers {
    async getMessage(req, res) {
        const { message, token } = req.body
        if(message.length<3)
        {
            res.status(200).json( [{messgeText: "Запрос слишком короткий" }])
            return

        }
        const otherParamDocument = '% ' + message.replace(',', '.') + '%';
        const findAllMassage = await models.MessagePiv.findAll({
            where: {
                messgeText: {
                    [Op.iLike]: otherParamDocument
                }
            }
        })
        models.MessageBot.create({ tokenid: token, isBot: false, messgeText: message })
        if (findAllMassage.length <= 0) {
            models.MessageBot.create({ tokenid: token, isBot: true, messgeText: "Не удалось ни чего найти, попробуйте через 10 минут, так же проверьте какой ID БО привязали к договору" })
            res.status(200).json( [{messgeText: "Не удалось ни чего найти, попробуйте через 10 минут, так же проверьте какой ID БО привязали к договору" }])
        }
        else {
            for (let i = 0; i < findAllMassage.length; ++i) {
                models.MessageBot.create({ tokenid: token, isBot: true, messgeText: findAllMassage[i].messgeText })
            }
            res.status(200).json(findAllMassage)
        }
    }
    async sendAll(req, res) {
        const token = req.params.id
        let message = await models.MessageBot.findAll({ where: { tokenid: token } })
        if (message.length > 20) {
            message = message.slice(message.length - 20)
        }
        message=message.sort((a,b)=>{return a.id-b.id})
        res.status(200).json(message)
    }
    async getToken(req, res) {
        let token = uuid.v4()
        res.status(200).json(token)
    }
}
module.exports = new BotMessageControllers()