const express = require("express")
const https = require("https")
const app = express()
const bodyParser = require("body-parser")
const request = require("request")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res){
    const FirstName = req.body.fname
    const LastName = req.body.lname
    const Email = req.body.email
    const data = {
      members:[
        {
          email_address : Email,
          status : "subscribed",
          merge_fields :{
            FNAME : FirstName ,
            LNAME : LastName
          }
        }
      ]
    }
    const JSONData = JSON.stringify(data)

    const url = 'https://us7.api.mailchimp.com/3.0/lists/1279ab428f'
    const options = {
      method : "POST",
      auth:"Dhruvil:8b846e61de57f252a23774967a6ef46f-us7"
    }

    const request = https.request(url,options,function(response){

      if ( response.statusCode === 200 ){
          res.sendFile(__dirname+"/success.html")
      }
      else {
          res.sendFile(__dirname+"/failure.html")
      }
      response.on("data" , function(data){
        console.log(JSON.parse(data))
      })
    })
    request.write(JSONData)
    request.end()

});

app.post("/failure" , function(req,res){
  res.redirect("/")
})

app.listen( process.env.PORT || 3000 , function() {
  console.log("Server is running");
});
