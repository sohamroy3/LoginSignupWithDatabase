var express=require("express"); 
var bodyParser=require("body-parser");
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/loginSignupdb', {useNewUrlParser: true, useUnifiedTopology: true});


var app=express();

app.use(bodyParser.urlencoded({ 
    extended: true
})); 

//app.use(express.static("public"));
const loginSignupSchema = {
    name: {type:String},
    email:{type:String},
    password:{type:String}
  };

const LoginSignUpModel = mongoose.model("LoginSingupCollection",loginSignupSchema);

  
app.get('/',function(req,res){
    
    res.sendFile(__dirname+"/login.html");

});

app.get('/signup',function(req,res){
    
    res.sendFile(__dirname+"/signup.html");

});

app.get('/welcome',function(req,res){
    res.sendFile(__dirname+"/welcome.html");
})

// fs.readFile("viewDetail.json", "utf8", function readFileCallback(
//     err,
//     data
//   ) {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log("DATA", data);
//       obj = JSON.parse(data); //now it an object
//       // console.log(JSON.stringify("sadsadadad----------->>>>", obj[key]));
//       if (obj[key] == undefined) obj[key] = {};
//       if (obj[key][stage] == undefined) obj[key][stage] = 0;
//       obj[key][stage] += 1; //add some data
//       json = JSON.stringify(obj); //convert it back to json

//       res.send({ status: "success", view: obj[key][stage] });
//       fs.writeFile("viewDetail.json", json, "utf8", () => {
//         console.log("Write Done");
//       }); // write it back
//     }
  
app.post("/",function(req,res){
    var name=req.body.name;
    var password=req.body.password;

    LoginSignUpModel.findOne({name:name,password:password},function(err,searchDatas){
        if(err)
        {
            console.log(err);
        }
        if(!searchDatas)
        {
            res.send("Input Correct Username and Password");
            

        }
        else{
            res.redirect('/welcome');
        }
        
    });

});

app.post('/signup', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var password = req.body.password; 

    var newuser=new LoginSignUpModel();
    newuser.name=name;
    newuser.email=email;
    newuser.password=password;

    newuser.save(function(err,savedUser){
        if(err){
            console.log(err);
        }
        console.log("Record inserted Successfully");
    })
   
    // var data = { 
    //     "name": name, 
    //     "email":email, 
    //     "password":password
    // } 
    // db.collection('LoginSingupCollection').insertOne(data,function(err, collection){ 
    //     if (err) throw err; 
    //     console.log("Record inserted Successfully"); 
              
    // }); 
    res.redirect('/');
              
    });
  
  

app.listen(3000,function(req,res){
    console.log("server listening at port 3000");
}) 
  
  
