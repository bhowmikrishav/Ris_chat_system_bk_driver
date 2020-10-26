const message = require('./operations/message')

message.SendMessage.send_message('123456', '1233456', Buffer.from("Hi all"))
.then(result => console.log(result))
.then(err => console.error(err))