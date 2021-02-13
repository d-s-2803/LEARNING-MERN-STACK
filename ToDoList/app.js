const express = require("express");
const bodyParser = require("body-parser");

const app = express();
 let items = [];
 let workitems = []
app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get("/" , function(req,res){
  let today = new Date()
  let day = ""
    let options = {
      weekday : "long",
      day : "numeric",
      month : "long"
    };
    day = today.toLocaleDateString("en-US" , options );
  res.render("list" , { dayenter : day , newlistitem : items });
});

app.get("/work" , function(req,res){
  res.render("list" , { dayenter : "Work" , newlistitem : workitems });
});

app.post("/" , function(req,res){
  let item = req.body.newItem;
  if (req.body.list === "Work"){
    workitems.push(item)
    res.redirect("/");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
});

app.post("/work" ,function(req,res){
  let item = req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(3000 , function(){
  console.log("Server is running")
});
