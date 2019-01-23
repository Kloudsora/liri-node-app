console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


exports.omdb = {
  key: process.env.OMDBKEY
}











// Client ID 84302b8ef7d14f82bd90e84e745a8e35
// Client Secret d656876ab2e14ec5a60d4ce65a6c71dc 


//Make it so liri.js can take in one of the following commands:

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says