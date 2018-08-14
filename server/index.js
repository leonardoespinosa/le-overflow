import http from 'http';
import Debug from 'debug';
import app from './app'

const PORT = 3000;
const debug = new Debug('le-overflow:root');

app.listen(PORT, () => {
    console.log(`Sever running at port ${PORT}`);
});