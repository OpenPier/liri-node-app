//-------------------VARIABLES----------------------------------------------------
require("dotenv").config();
//Loading modules
//importing dependencies

//Twitter NPM package
var Twitter = require('twitter');

//spotify-api-NPM package
var Spotify = require('node-spotify-api');

//IMporting API keys
var keys = require("./keys.js");

//IMporting request npm package
var request = require('request');

//IMporting the FS package for read/writing
var fs = require('fs');

//Initate spotify API client using their id and password
var spotify = new Spotify(keys.spotifyKeys);


//=============FUNCTIONS====================================================

var tweetsArray = [];
var inputCommand = process.argv[2];
var query = process.argv[3];
var defaultMovie = "The Shape of Water";
var defaultSong = "2am";


var spotifyKeys = keys.spotifyKeys;
var twitterKeys = keys.twitterKeys;
var tmdbKey = keys.tmdbKey;

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});



//-----------------------FUNCTIONS-----------------------------------------------
//Variable to get name of artist
var getArtistNames = function(artist) {
	return artist.name;
};

//variable function for Spotify
var getMeSpotify = function(songName) {
	if (songName === undefined) {
		songName = "2am";
	}

	spotify.search(
		{
			type: "track",
			query: songName
		},
		function(err) {
			if (err) {
				console.log("error occured: " + err);
				return;
			}

			//varible function for identifying songs
			var songs = data.tracks.items;

			for (var i = 0; i < songs.length; i++) {
				console.log(i);
				console.log("artist(s): " + songs [i].artists.map(getArtistNames));
				console.log("song name: " + songs[i].name);
				console.log("preview song: " + songs[i].preview_url);
				console.log("album: " + songs[i].album.name);
				console.log("-------------------------");
			}
		}
	);
};


//Functions representing a Twitter Search
var getMyTweets = function() {
	var client = new Twitter(keys.twitter);

	// Arguments are Passed by Value. The parameters, in a function call, are the function's arguments. 
	//JavaScript arguments are passed by value: The function only gets to know the values, not the argument's locations. 
	//If a function changes an argument's value, it does not change the parameter's original value.
	var params = {
		screen_name: "tyler"
	};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		//logic
		if (!error) {
			for (var i = 0; i < tweets.length; i ++) {
				console.log(tweets[i].created_at);
				console.log('');
				console.log(tweets[i].text);
			}
		}
	});
};

//function variables for find movies
var getMeMovie = function(movieName) {
	if (movieName === undefined) {
		movieName = "The Shape of Water";
	}

	var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
	request(urlHit, function(error, response, body){
		if(!error && response.statusCode === 200) {
			var jsonData = JSON.parse(body);

			//console log important information
			console.log("Title: " + jsonData.Title);
			console.log("Year: " +  jsonData.Year);
			console.log("Rated: " + jsonData.Rated);
			console.log("IMDB Rating: " + jsonData.imdbRating);
			console.log("Plot: " + jsonData.Plot);
			console.log("Actors: " + jsonData.Actors);
			console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
		}
	});
};

//Functions for running a command based on text file
var doWhatItSays = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log(data);

		var dataArr = data.split(",");

		if (dataArr.length === 2) {
			pick(dataArr[0], dataArr[1]);
		}
		else if (dataArr.length === 1) {
			pick(dataArr[0]);
		}
	});
};

//Function for determining which command is executed
//switch(option) {
	//case "do-what-it-says":
	//code in here
	//break;
	
	//}
	
	var pick = inputCommand; 
	switch (pick) {
		case "my-tweets":
			getMyTweets();
			break;

		case "spotify-this-song":
			getMeSpotify(query);
			break;

		case "movie-this":
			getMeMovie (query);
			break;

		case "do-what-it-says":
			doWhatItSays();
			break;

			default:
				console.log("LIRI doesn't know that");

	};


//Function that take the command line aruguments and executes them correctly

// var runThis = function(argOne, argTwo) {
// 	pick(argOne, argTwo);
// };

// //================================Main Process==========================

// runThis(process.argv[2], process.argv[3]);
