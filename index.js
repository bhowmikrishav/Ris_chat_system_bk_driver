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
/*.then(result => console.log(result))
.catch(err => console.error(err))

//GetMessage.get_messages_bothway_pleanty('1233456', 5)
GetMessage.get_messages_bothway_post_id('1233456', 3)
.then(result => console.log( 
    result,
    result.map((message_row)=>{
        message_row.data = new MessageObject(message_row.data)
        return message_row
    })[0].data.get_all_lines()
 ))
.catch(err => console.error(err))
*/
module.exports = {GetMessage, SendMessage, MessageObject}