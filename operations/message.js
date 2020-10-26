const mysql = require('mysql')
const mysql_config = require('../../configs/mysql_config.json')
const net_fm_request = require('./net_fm_request')

class MessageObject{
    constructor(message_buffer = null){
        const this_class = this
        try {
            this_class.time = Date.now()
            this_class.lines = []
            if(message_buffer){
                const {header, body} = net_fm_request.antonym(message_buffer)
                this_class.time = header.send_at_ms

                var start_point = 0;

                for(const l in header.buffer_map){
                    const end_point = start_point + header.buffer_map[l];
                    this_class.lines.push(
                        message_buffer.subarray( start_point, end_point)
                    )
                    start_point += end_point
                }
            }
        } catch (e) {
            throw e
        }
    }
    add_line(header, data = ''){
        this.lines.push(
            net_fm_request.capsule( header, data)
        )
    }
    get_line(index){
        return net_fm_request.antonym(this.lines[index])
    }
    get_message_buffer(){
        const buffer_map = this.lines.map((obj)=>{return Number(obj.length)})
        return net_fm_request.capsule( 
            {send_at_ms:this.time, buffer_map:buffer_map},
            Buffer.concat(this.lines)
        )
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
lines.add_line({type:'text'}, "Hellow")
lines.add_line({type:'text'}, "Hello Havi")

console.log(lines.get_message_buffer())

const best_ = new MessageObject(lines.get_message_buffer())

console.log(best_.lines[0].length, best_.lines[1].length);
//console.log(best_.get_line(0));