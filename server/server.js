import _            from 'lodash'
import express      from 'express'
import fs           from 'fs'
import path         from 'path'
import request      from 'request'  
import url          from 'url'

import tracks_api   from './modules/tracks'

let port = 8080;

let app = express();

app.use('/css',     express.static(path.join(__dirname, '../build/css')));
app.use('/js',      express.static(path.join(__dirname, '../build/js')));
app.use('/font',    express.static(path.join(__dirname, '../fontello/font')));
app.use('/images',  express.static(path.join(__dirname, '../images')));

app.use('/api/tracks', tracks_api);

app.get('*', (req, res) => {
  fs.createReadStream(path.join(__dirname, '../source/index.html'))
    .pipe(res);
});
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});