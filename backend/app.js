import express from 'express';
import userRoutes from './routes/user-routes.js'
const app = express();
app.use('/',userRoutes)
    app.use((request,response,next)=>{
        response.json({message:'INVALID URL'})
    })
const server = app.listen(1234,(err)=>{
    if(err){
        console.log('Server Crash',err);

    }else{
        console.log('Server up and running',server.address().port );
    }
})