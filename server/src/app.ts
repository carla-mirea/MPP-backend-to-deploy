import express from 'express';
import cors from 'cors';
import monitorRouters from './routers/monitorRouters';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', monitorRouters);

module.exports = app;



