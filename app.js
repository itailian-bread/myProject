const express = require("express");

const app = express();
const ejs = require("ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render("home")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
