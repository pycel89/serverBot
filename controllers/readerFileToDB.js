const sequelize = require('../db')
const models = require('../models/models')
const FILE_INPUT_DATA=process.env.FILE_INPUT_DATA

function readerFileToDB()
{
    sequelize.query("SELECT \"messgeText\" FROM \"messagePivs\" AS \"messagePiv\"  ORDER BY id DESC LIMIT 3",{raw:true}).then(dataInTable=>{
        if(!dataInTable[0][0])
        {                  
            models.MessagePiv.create({messgeText:"я бот для поиска ошибок в документах отправленых из БАРС в АЦК"})
            models.MessagePiv.create({messgeText:"Не удалось ни чего найти, попробуйте через 10 минут, так же проверьте какой ID БО привязали к договору"})
            models.MessagePiv.create({messgeText:"еще одно тестовое сообщение"})
            models.MessagePiv.create({messgeText:"А вот еще еще одно тестовое сообщение"})
            return;
        }
        let fs = require('fs');
        filemessage=FILE_INPUT_DATA;
        //const filemessage='./outAll.log'
        //console.log(filemessage);
        let fileContent=fs.readFileSync(filemessage,'utf8').split(/\r?\n/)              
        let lastIndexLikeMessage=0;
        for(let i=0;i<fileContent.length-3;++i)
        {                  

            if(fileContent[i]=== dataInTable[0][2].messgeText
                &&fileContent[i+1]=== dataInTable[0][1].messgeText
                &&fileContent[i+2]=== dataInTable[0][0].messgeText)
            {
                lastIndexLikeMessage=i+2;
            }
        }
        for(let i=lastIndexLikeMessage+1;i<fileContent.length-1;++i)
        {
            models.MessagePiv.create({messgeText:fileContent[i]});
        }    
    }
    )   
}
module.exports = readerFileToDB