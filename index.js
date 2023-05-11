import express from 'express';
import {
    Server
} from "socket.io";

import cors from 'cors';

const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Client': `http://localhost:${PORT}/client`,
    })

})
const io = new Server(httpServer, {
    path: '/real-time'
})

expressApp.use('/client', express.static('public-client'))
expressApp.use(express.json())
expressApp.use(cors({origin: "*"}));
expressApp.use(express.urlencoded({extended: true}));


io.on('connection', (socket) => {
    console.log('Connected!', socket.id)
    //

})

const leads = [];
const startTime = new Date();

expressApp.post('/form-submit', (req, res) =>{
    const userForm = req.body;
    
    const metadata = {
        location: 'Unicentro',
        date: Date(),
        duration: `${getSubmissionDuration(startTime)} seconds`,
        timeSubmitted: getUserTimeOfSubmission()
    }

    const userData = {...userForm, metadata: metadata}
    leads.push(userData);

    console.log(leads);
    res.send('Form submitted succesfully!');
    res.end();
})

const getSubmissionDuration = (startTime) =>{
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    return duration;
}

const getUserTimeOfSubmission = () =>{
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}




