import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import utils from 'fs-utils'
import uniqBy from '../../source/helpers/uniqBy'

const paths = {
  default_tracks: path.join(__dirname, '../../data/default_tracks.json'),
  current_tracks: path.join(__dirname, '../../config/tracks.json')
}
const defaults = utils.exists(paths.default_tracks) ? require(paths.default_tracks) : []
const currents = utils.exists(paths.current_tracks) ? require(paths.current_tracks) : []
let tracks = uniqBy([...defaults, ...currents], 'name')

export const getTracks = () => tracks

export default express()
  .use(bodyParser.json()) // Parses application/json
  .get('/', (request, response) => {
    response.status(200).send(tracks);
  })
  .post('/', (request, response) => {
    tracks = request.body.map(el => {
      if (!el || (!el.origin && !el.url)) return undefined;

      return {
        name:   el.name || 'Unnamed Track',
        origin: el.origin || el.url,
        tags:   el.tags
      };
    }).filter(Boolean);

    response.status(200).send(tracks);
    utils.writeJSON(paths.current_tracks, tracks);
    console.log(`Writing ${tracks.length} to disk.`);
  })
;
