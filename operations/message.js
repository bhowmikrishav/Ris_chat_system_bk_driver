const mysql = require('mysql')
const mysql_config = require('../../configs/mysql_config.json')
const net_fm_request = require('./net_fm_request')

class MessageObject{
    constructor(){
        this.lines = []
    }
    add_line(header, data = ''){
        this.lines.push(
            net_fm_request.capsule(
                header,
                data
            )
        )
    }
    get_line(index){
        return net_fm_request.antonym(this.lines[index])
    }
    get_message_buffer(){
        return Buffer.concat(this.lines)
    }
}

class Messanger{
    static async create_conn(){
        const conn = mysql.createConnection(mysql_config)
        await new Promise(( resolve, reject) => {
            try{
                conn.connect(resolve)
            }catch(e){
                reject(e)
            }
        })
        return conn
    }
}
Messanger.MESSAGE_TABLE = "messages"

class SendMessage extends Messanger{
    static send_message(sender_id, reciver_id, message_buffer){
        return new Promise((resolve, reject)=>{
            try {
                SendMessage.create_conn()
                .then(conn => {
                    conn.query(
                        `INSERT INTO ${Messanger.MESSAGE_TABLE} SET ?`,
                        {
                            sender_id   :`${sender_id}`,
                            reciver_id  :`${reciver_id}`,
                            send_at     :(Date.now()/1000), 
                            data        :Buffer.from(message_buffer)
                        },
                        (err, result)=>{
                            conn.end()
                            if(err){
                                reject(err); return
                            }
                            resolve({_id:result.insertId})
                        }
                    )
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = {Messanger, SendMessage}

//unit tests
const lines = new MessageObject()
lines.add_line({type:'text'})

console.log(lines.get_message_buffer())
console.log(lines.get_line(0).body.toString())