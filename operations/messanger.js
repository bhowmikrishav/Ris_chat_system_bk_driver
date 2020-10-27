const mysql = require('mysql')
const mysql_config = require('../../configs/mysql_config.json')
const net_fm_request = require('./net_fm_request')

class MessageObject{
    constructor(message_buffer = null){
        const this_class = this
        try {
            this_class.time = Date.now()
            this_class.lines = []
            if(Buffer.isBuffer(message_buffer)){
                const {header, body} = net_fm_request.antonym(message_buffer)
                this_class.time = header.send_at_ms
                var start_point = 0;
                for(const l in header.buffer_map){
                    const end_point = start_point + header.buffer_map[l];
                    this_class.lines.push(
                        body.subarray( start_point, end_point)
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
    get_all_lines(){
        return this.lines.map(line => {
            return net_fm_request.antonym(line)
        })
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
                conn.connect((err)=>{
                    if(err) reject(err)
                    else resolve()
                })
            }catch(e){
                reject(e)
            }
        })
        return conn
    }
}
Messanger.MESSAGE_TABLE = "messages"

module.exports = {MessageObject, Messanger}