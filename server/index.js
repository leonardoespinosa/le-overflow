import http from 'http';
import Debug from 'debug';
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'

const PORT = 3000;
const debug = new Debug('le-overflow:root');

async function start() {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    
    app.listen(PORT, () => {
        console.log(`Sever running at port ${PORT}`);
    });
}

start()
