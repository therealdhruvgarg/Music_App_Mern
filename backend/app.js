import express from 'express';
import userRoutes from './routes/user-routes.js'
import cors from 'cors';
const app = express();

app.use(cors()); //middleware
app.use(express.json());
app.use('/',userRoutes);
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