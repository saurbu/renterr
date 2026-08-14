const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://ac-ozrr88x-shard-00-00.ocvtiz8.mongodb.net:27017,ac-ozrr88x-shard-00-01.ocvtiz8.mongodb.net:27017,ac-ozrr88x-shard-00-02.ocvtiz8.mongodb.net:27017/Renterr?replicaSet=atlas-xxxxx-shard-0&tls=true&authSource=admin"
)
.then(() => console.log("Connected"))
.catch(err => console.log(err));