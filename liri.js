require("dotenv").config();
const axios = require("axios")
const moment = require('moment');
var cmd = require('node-cmd');
const fs  = require('fs');

const keys = require("./keys.js");



const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);
 
var argument = "";
let action = process.argv[2]


function getThirdArgument() {

	// Stores all possible arguments in array.
	argumentArray = process.argv;

	// Loops through words in node argument.
	for (var i = 3; i < argumentArray.length; i++) {
		argument += `${argumentArray[i]} `;
    }
	return argument.trim();
}
getThirdArgument();
console.log(argument)

//CONCERT FUNCTION
const concertThis = function () {
    argument = argument.replace(/\s+/g, '').toLowerCase();
    axios.get(url=`https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`)
        .then(function(response) {
            response.data.forEach(element => {
                console.log("----------------------------");
                console.log(`Arena: ${element.venue.name}`);
                console.log(`Location: ${element.venue.city}, ${element.venue.country}`);
                console.log(`Time: ${moment(element.datetime).format("MM/DD/YYYY")} \n`);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
  }


//SPOTIFY FUNCTION
const spotifyThis = function (newSearch) {
    argument = argument.replace(/\s+/g, '').toLowerCase();
    console.log(typeof argument)
    console.log(argument)
        spotify.search({ type: 'track', query: `${argument, newSearch}`, limit: 5 },
         function(err, data) {
            if (err) {
             return console.log('Error occurred: ' + err);
            }
            // console.log(data)
            console.log('-------------------------')
            console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Track: ${data.tracks.items[0].name}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(`Preview URL: ${data.tracks.items[0].preview_url} \n`);
            console.log('-------------------------\n');
    });
        };

//MOVIE FUNCTION
const movieThis = function (){
    axios
      .get(`http://www.omdbapi.com/?apikey=c8862415&t=${argument}&type=movie`)
      .then(response => {
        console.log("\n---------------");
        console.log(`Title: ${response.data.Title}`);
        console.log(`Year: ${response.data.Year}`);
        console.log(`imbd: ${response.data.imbdRating}`);
        console.log(`Rotten Tomato Rating: ${response.data.Ratings[1]}`);
        console.log(`Country: ${response.data.Country}`);
        console.log(`Language: ${response.data.Language}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}\n`);
      }); 
}

// //DO WHAT IT SAYS FUNCTION



switch(action) {
    case "concert-this":
    concertThis();
       break;
    case "spotify-this-song":
    spotifyThis();
        break;
    case "movie-this":
    movieThis();
        break;
    case "do-what-it-says":
    fs.readFile('./random.txt', 'utf8',(error, data) => {
        if(error){
            throw ("oh my gaw", error)
        }
        const newSearch = data.split(',');
        if(newSearch[0] === 'spotify-this-song'){
            spotifyThis(newSearch[1])
        }
        else if(newSearch[0] === 'concert-this'){
            concertThis(newSearch[1])
        }})
    
        break       
    
  }




