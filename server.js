var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.set('view engine','ejs');
app.use('/public',express.static('res'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(session({
    secret:'thisIsAsecretonMyServerForexcahngingsecrets',
    saveUninitialized:false,
    resave:true
}));

app.get('/',(req,res)=>{
    if(req.session.user==null)
	   res.render('index');
    else
        res.render('dashboard',{user:req.session.user});
});

app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    req.session.user = null;
    
    if(username!='demo_login' || password!='demo_password')
        res.end('err');
    else {
        req.session.user = username;
        res.render('dashboard',{
            user:req.session.user
        });
    }
    
});

app.get('/partFormSelect',(req,res)=>{
   if(req.session.user==null)
    res.render('index');
   else
    res.render('partial_form_select'); 
});

app.get('/mqttContinuous',(req,res)=>{
    if(req.session.user==null)
        res.render('index');
    else
        res.render('mqtt_cont');
});

app.get('/canEmu',(req,res)=>{
   if(req.session.user==null)
    res.render('index');
   else
    res.render('can_emulate');
});

app.get('/test',(req,res)=>{
    res.render('dashboard',{user:'test'});
});

app.listen(8080,(err)=>{
    if(err)
        console.log(err);
        
    console.log("Listening at 8080");
});