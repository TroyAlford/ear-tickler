import _                  from 'lodash'
import bodyParser         from 'body-parser'
import express            from 'express'
import path               from 'path'
import utils              from 'fs-utils'

let paths = {
    default_tracks: path.join(__dirname, '../../data/default_tracks.json'), 
    current_tracks: path.join(__dirname, '../../config/tracks.json')
  },
  defaults = utils.exists(paths.default_tracks) ? require(paths.default_tracks) : null,
  currents = utils.exists(paths.current_tracks) ? require(paths.current_tracks) : null,
  tracks   = _.uniqBy(_.union(defaults || [], currents || []), 'name')
;

export default express()
  .use(bodyParser.json()) // Parses application/json
  .get('/', (request, response) => {
    response.status(200).send(tracks);
  })
  .post('/', (request, response) => {
    tracks = _.difference(request.body.map(el => {
      if (!el || (!el.origin && !el.url)) return null;
      
      return {
        name:   el.name || 'Unnamed Track',
        origin: el.origin || el.url,
        tags:   el.tags
      };
    }), [null]);

    response.status(200).send(tracks);
    utils.writeJSON(paths.current_tracks, tracks);
    console.log(`Writing ${tracks.length} to disk.`);
  })
;