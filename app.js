const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const url = "https://us19.api.mailchimp.com/3.0/lists/56175122bf";
const options = {
  method:"POST",
  auth:"khashaba:f802516776f7a05d259bf8b14c39d6c8-us19"
}
const jasonData = JSON.stringify(data);

const request = https.request(url, options, function(response){

if(response.statusCode===200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}


  response.on("data",function(data){
    console.log(JSON.parse(jasonData));
  });
});
request.write(jasonData);
request.end();
});







app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
