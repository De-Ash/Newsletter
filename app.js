// jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));
app.get("/",(req,res)=>{
    console.log("GET request made from browser!");
    res.sendFile(__dirname+"/sign-up.html");
});
app.post("/",(req2,res2)=>{
    console.log("POST request made from browser!");
    const webData=req2.body;
    const firstName=webData.firstName;
    const lastName=webData.lastName;
    const eMail=webData.eMail;
    const userData={
        members:[
            {
                email_address:eMail,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };
    const JSONData=JSON.stringify(userData);
    const URL="https://us18.api.mailchimp.com/3.0/lists/b6ec935b1f";
    const Options={
        method:"POST",
        auth:"De-Ash:380cebf24d8ff1c1bcc3e60b089e652e-us18"
    };
    const properRequest=https.request(URL,Options,(res)=>{
        res.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
        res.on("error",(error)=>{
            console.log(error);
        });
        res.on("end",()=>{
            console.log(res);
            var statusCode=res.statusCode;
            var statusMessage=res.statusMessage;
            console.log("Request ended with Status code: "+statusCode+"\n"+"Status message: "+statusMessage);
            if ((statusCode==200)||(statusMessage==="ok")) {
                res2.sendFile(__dirname+"/success.html");
            } else {
                res2.sendFile(__dirname+"/failure.html");
            }
        });
    });
    properRequest.write(JSONData);
    properRequest.end();
    console.log("Done with request ✔");
});

app.post("/success",(request,response)=>{
    response.redirect("/");
    console.log("Redirecting user to sign-up page");
});

app.post("/failure",(request,response)=>{
    response.redirect("/");
    console.log("Redirecting user to sign-up page from failure page");
});

app.listen((process.env.PORT)||3000,()=>{
    console.log("Ash kun, new server running at port 3000");
});