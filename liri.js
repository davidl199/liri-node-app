require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var Keys = require("./keys.js");

var spotify = new Spotify(Keys.spotify);
var client = new Twitter(Keys.twitter);

//console.log(spotify);
//console.log(client);

//test spotify
/* spotify.search({ type: 'track', query: 'Purple Rain', limit: 2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  //console.log(data);
  console.log(data.tracks.items[0]);
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].preview_url);
  }); */

//Test Twitter
/* var params = {q: 'davidl1_99',count: 20};
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    console.log("test tweets!");
    //console.log(tweets);
    //loop through tweets here
    for(var i = 0; i < tweets.statuses.length; i++){
      console.log(tweets.statuses[i].text);
    }
  }
  else {
    return console.log('A Twitter Error occurred: ' + error);
  }
}); */

// Test Movie API
var movieName = encodeURI(process.argv[2])

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    //console.log("Release Year: " + JSON.parse(body).Year);
    //console.log("Release Year: " + JSON.parse(body).Title)
    console.log(JSON.parse(body));

    /* * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie. */
  }
});