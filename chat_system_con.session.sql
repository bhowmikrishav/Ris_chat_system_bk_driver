CREATE TABLE IF NOT EXISTS messages(
   _id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   sender_id VARCHAR(32) NOT NULL,
   reciver_id VARCHAR(32) NOT NULL,
   send_at INT UNSIGNED NOT NULL,
   recived_at INT UNSIGNED,
   data LONGBLOB,
   PRIMARY KEY (_id)
);

INSERT INTO messages SET 
sender_id='lol',
reciver_id='lol',
send_at=345678,
data='hawa hawai';

SELECT * FROM messages;