import express from 'express'
import path from 'path'
import request from 'request'
import url from 'url'
import utils from 'fs-utils'

import tracks_api, { getTracks } from './modules/tracks'

let port = 8080;

let app = express();

app.use('/css',     express.static(path.join(__dirname, '../build/css')));
app.use('/js',      express.static(path.join(__dirname, '../build/js')));
app.use('/font',    express.static(path.join(__dirname, '../fontello/font')));
app.use('/images',  express.static(path.join(__dirname, '../images')));

app.use('/api/tracks', tracks_api);

app.get('*', (request, response) => {
  const indexFile = path.join(__dirname, '../source/index.html')
  const initialState = {
    players: [],
    tracks: getTracks()
  }
  const html = utils.readFileSync(indexFile)
                    .replace('#INITIAL_STATE#', JSON.stringify(initialState))

  response.status(200).send(html)
});
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
