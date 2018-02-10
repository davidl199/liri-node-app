require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var Keys = require("./keys.js");

var spotify = new Spotify(Keys.spotify);
var client = new Twitter(Keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

ProcessCommands();

function ProcessCommands() {
  switch (action) {
    case "my-tweets":
      GetTweets();
      break;

    case "spotify-this-song":
      GetSpotifySong();
      break;

    case "movie-this":
      GetImdbMovie();
      break;

    case "do-what-it-says":
      DoWhatItSays();
      break;
  }
}

function GetTweets() {

  // Get my last 20 tweets
  var params = { q: 'davidl1_99', count: 20 };
  client.get('search/tweets', params, function (error, tweets, response) {
    if (!error) {
      console.log("\n---------------- Tweets ---------------------------\n");

      for (var i = 0; i < tweets.statuses.length; i++) {
        console.log(i + 1 + " - " + tweets.statuses[i].text);
      }
      console.log("---------------------------------------------------");
    }
    else {
      return console.log('A Twitter Error occurred: ' + error);
    }
  });
}

function GetSpotifySong() {

  var songTrack = encodeURI(value)

  if (songTrack === 'undefined') {
    songTrack = 'The Sign Ace of Base';
  }

  //Get Spotify Data
  spotify.search({ type: 'track', query: songTrack, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('A Spotify Error occurred: ' + err);
    }
    console.log("\n----------------- Spotify ----------------------------\n");
    //console.log(data.tracks.items);
    //console.log(data);
    console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Song Preview: " + data.tracks.items[0].preview_url);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("------------------------------------------------------");
  });
}

function GetImdbMovie() {

  var movieName = encodeURI(value);

  if (movieName === 'undefined') {
    movieName = 'Mr. Nobody';
  }

  // request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("\n------------------- IMDB Movie -----------------------------------------------");
      console.log("Title: " + JSON.parse(body).Title)
      console.log("Year the movie came out: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country produced in: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("---------------------------------------------------------------------------------");
    }
    else {
      return console.log('A IMDB Movie Error occurred: ' + error);
    }
  });
}

function DoWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log("A Do what it says Error occured" + error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    action = dataArr[0];
    value = dataArr[1];
    ProcessCommands();

  });
}