const express=require("express");
const app=express();
app.use(express.json())
app.listen(5000,(req,res)=>
{
    console.log("port runs on 5000")
})
app.use(logger);



app.get("/books",(req,res)=>{
    res.send({route:"/books"})
})

app.get("/libraries",checkPermission("librarian"),(req,res)=>{
    res.send({route:"/libriaries",permission:req.permission})
})

app.get("/author",checkPermission("author"),(req,res)=>{
    res.send({route:"/author",permission:req.permission})
})

function logger(req,res,next)
{
    console.log(req.path);
    next()
}

function checkPermission(isit)
{
    return function(req,res,next)
    {
        if(isit=="librarian")
        {
            if(req.path=="/libraries")
            {
                req.permission=true;
                next()
                
            }
        }
       
        if(isit=="author")
        {
            if(req.path=="/author")
            {
                req.permission=true;
                next()
            }
        }



        
        
    }
}