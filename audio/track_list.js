angular.module('AudioTrackr').factory('songFactory', function () {
    return [{
        name: 'Woods',
        band: 'Nature',
        link: 'https://www.freesound.org/people/Arctura/packs/2539/',
        tracks: [{
            name: 'Crickets',
            url: 'audio/crickets.mp3',
            origin: 'https://www.freesound.org/data/previews/39/39829_28216-hq.mp3'
        },{
            name: 'Fast River',
            url: 'audio/fast-river.mp3',
            origin: 'https://www.freesound.org/data/previews/39/39831_28216-hq.mp3'
        },{
            name: 'Thunder Storm',
            url: 'audio/thunder-storm.mp3',
            origin: 'https://www.freesound.org/data/previews/2/2523_1112-hq.mp3'
        }]
    }];
});
