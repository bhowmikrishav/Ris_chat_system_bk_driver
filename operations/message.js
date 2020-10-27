const {MessageObject, Messanger} = require('./messanger')

class SendMessage extends Messanger{
    static send_message(sender_id, reciver_id, message_object){
        return new Promise((resolve, reject)=>{
            try {
                SendMessage.create_conn()
                .then(conn => {
                    console.log(conn.state);
                    conn.query(
                        `INSERT INTO ${Messanger.MESSAGE_TABLE} SET ?`,
                        {
                            sender_id   : `${sender_id}`,
                            reciver_id  : `${reciver_id}`,
                            sent_at     : (Date.now()/1000), 
                            data        : message_object.get_message_buffer()
                        },
                        (err, result)=>{
                            try{
                                conn.end()
                                if(err){
                                    reject(err); return
                                }
                                resolve({_id:result.insertId})
                            }catch(e){reject(e)}
                        }
                    )
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

class GetMessage extends Messanger{
    static get_messages_bothway_time_after(reciver_id, time_after_in_sec){
        return new Promise((resolve, reject)=>{
            GetMessage.create_conn()
            .then((conn)=>{
                conn.query(`
                    SELECT * FROM ${GetMessage.MESSAGE_TABLE}
                    WHERE sender_id = ?
                    OR   reciver_id = ?
                    AND   sent_at   > ?
                    ORDER BY _id DESC;
                `, [reciver_id, reciver_id, time_after_in_sec], (err, result)=>{
                        try{
                            conn.end()
                            if(err){
                                reject(err); return
                            }
                            resolve(result)
                        }catch(e){reject(e)}
                    }
                )
            })
            .catch((e)=>{
                reject(e)
            })
        })
    }
    static get_messages_bothway_pleanty(reciver_id, pleanty_means){
        return new Promise((resolve, reject)=>{
            GetMessage.create_conn()
            .then((conn)=>{
                conn.query(`
                    SELECT * FROM ${GetMessage.MESSAGE_TABLE}
                    WHERE sender_id = ?
                    OR   reciver_id = ?
                    ORDER BY _id DESC LIMIT ?;
                `, [reciver_id, reciver_id, pleanty_means], (err, result)=>{
                        try{
                            conn.end()
                            if(err){
                                reject(err); return
                            }
                            resolve(result)
                        }catch(e){reject(e)}
                    }
                )
            })
            .catch((e)=>{
                reject(e)
            })
        })
    }
}

module.exports = {GetMessage, SendMessage, MessageObject}

//unit tests
/*
const lines = new MessageObject()
lines.add_line({type:'text'}, "Hellow")
lines.add_line({type:'text'}, "Hello Havi")

console.log(lines.get_message_buffer())

const best_ = new MessageObject(lines.get_message_buffer())

console.log(best_.lines[0].length, best_.lines[1].length);*/