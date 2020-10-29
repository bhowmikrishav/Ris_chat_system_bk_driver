const {GetMessage, SendMessage, MessageObject} = require('./operations/message')

/*
    const message = new MessageObject()
    message.add_line({type:'text'}, "Hello index")
    message.add_line({type:'file', key:'A.B.C', preview_mime_type:false})

    SendMessage.send_message('123456', '1233456', message)
    .then(result => console.log(result))
    .catch(err => console.error(err))
*/

//GetMessage.get_messages_bothway_time_after('1233456', Math.floor(Date.now()/1000) - 200000)
//GetMessage.get_messages_bothway_pleanty('1233456', 5)
//GetMessage.get_messages_bothway_post_id('1233456', 3)
//GetMessage.get_messages_bothway_range_id('1233456', 2, 4 )
//GetMessage.get_messages_bothway_pleanty_of_sender('1233456', '123456', 2)
//GetMessage.get_messages_bothway_post_id_of_sender('1233456', '123456', 3)
//GetMessage.get_messages_bothway_range_id_of_sender('1233456', '123456', 0, 3)
//GetMessage.get_messages_oneway_pleanty_of_sender('1233456', '123456', 3)
//GetMessage.get_messages_oneway_post_id_of_sender('1233456', '123456', 3)
//GetMessage.get_messages_oneway_range_id_of_sender('1233456', '123456', 2, 5)
/*
.then(result => console.log( 
    result.length,
    JSON.stringify({   _id:result[0]._id, sender_id:result[0].sender_id, reciver_id:result[0].reciver_id,
        sent_at:result[0].sent_at,
        body : result.map((message_row)=>{
        message_row.data = new MessageObject(message_row.data)
        return message_row
        })[0].data.get_all_lines()
    })
 ))
.catch(err => console.error(err))
*/

module.exports = {GetMessage, SendMessage, MessageObject}