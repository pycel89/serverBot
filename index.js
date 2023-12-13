require('dotenv').config()
const iconv=require('iconv-lite')
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const { create } = require('domain')
const uuid = require('uuid')
const readerFileToDB = require('./controllers/readerFileToDB')

const PORT = process.env.PORT;
const FILE_ACCESS=process.env.FILE_ACCESS

//const 
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.get('/', (req, res) => {
    //res.status(200).json("123")
    //models.MessagePiv.findAll({where:{messgeText:'%'+'12'+'%'}},{raw:true}).then(tt=>{res.status(200).json(tt[0])})
    //let tmpst=models.MessagePiv.findAll({where:{messgeText:'123'}},{raw:true}).then(tt=>{res.status(200).json(tt[0].id)})
    /*const[result,metadata] =*/
   /* let temp='08.09.2023'
    let temp1='08.09.2023'
    sequelize.query("SELECT * FROM \"messagePivs\"  WHERE \"messgeText\" LIKE \'%"+temp+"%\'",{raw:true}).then(tt=>{
        if(!tt[0][0])
        res.status(200).json("123")
    
    else
    {
    res.status(200).json(tt[0][1])
    console.log(tt[0].length);
    console.log(temp1);*/

    //let temp = uuid.v4()
    //res.status(200).json(temp)
    sequelize.query("SELECT * FROM \"messagePivs\" AS \"messagePiv\"  ORDER BY id DESC LIMIT 4",{raw:true}).then(tt=>{
        tt[0].sort(function(a,b){
            return a.id-b.id;
        })
        res.status(200).json(tt[0]) 
    })

    //}
    //})y
    //tmpst=tmpst.id;
    //res.status(200).json(metadata)
})

const start = async () => {
    try {
        setInterval(readerFileToDB
        ,FILE_ACCESS*1000
        )

        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log("порт для запуска " + PORT))

    }
    catch (e) {
        console.log(e);
    }
}


start()

