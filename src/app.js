const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');
const path = require('path');
const app = express();

console.log(__dirname);
console.log(__filename);

//----for static path
// const path1 = path.join(__dirname,'../public');
// app.use(express.static(path1));



app.set("view engine", 'hbs');
const viewpath = path.join(__dirname,'../template/views');
app.set('views', viewpath);



//------------partials templates
const partialpath = path.join(__dirname,"../template/partials");
hbs.registerPartials(partialpath);


app.get("",(req,res)=>{
    res.render("index",{
        title : "Home Page"
    });
}
)

app.get("/about",(req,res)=>{
    res.render("about",{
        title : 'About page'
    });
}
)

app.get("/about/*",(req,res)=>{
    res.render("error",{
        title : 'Error in the page'
    });
}
)

app.get("/Weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :"Please provide the address"})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error : error})
        }

        forecast(latitude,longitude,(error,forcastdata)=>{
            if(error)
            {
                return res.send("There is still something wrong in the data");
            }
            res.send({
                forcast : forcastdata,
                location,
                address : req.query.address 
            })
        })
    })
    // console.log(req.query);
    //     res.send({
    //         City: 'Mumbai',
    //         Culture: 'Colorful'
    //     })

    }
)

// app.get("*",(req,res)=>{
//     res.render("error",{
//         title : 'Error in the page ! last warning understood'
//     });
// }
// )


// app.get("",(req,res) =>{
// res.send("hey wats up doing great!");
// });

app.listen(3000,()=>{
    console.log("server is up")
})
