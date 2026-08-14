const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ss0619963:Saurav123@cluster0.ocvtiz8.mongodb.net/Renterr?appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("FULL ERROR:", err);
});