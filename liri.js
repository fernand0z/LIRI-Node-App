//Require dotenv package to set environment variables
require("dotenv").config();
//Require file system package
var fs = require("fs")
var request = require("request");
//Require keys.js file
const appKeys = require("./keys.js");
//Required packages for twitter, spotify
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
//Variable command, defined as 3rd element from command line
var command = process.argv[2];
//Local variable to hold 4th element from command line
var title = process.argv[3];
//A package just for fun!
var colors = require('colors');

//Variable to hold keys for Spotify
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

//Variable to hold keys for Twitter
var twitterClient = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var tweetsFunction = function() {
    var user = "FernZac";
        var params = { screen_name: 'FernZac' };
        twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
            // if (!error) {
            //Describe tweets being returned
            console.log(user + "'s recent tweets, in order from newest to oldest...");
            //If posted tweets is less than twenty, set var limit to no. of tweets
            if (tweets.length < 20) {
                var limit = tweets.length;
            }
            //If more than 20 tweets have been posted, set the limit to 20
            else {
                var limit = 20;
            }
            //for loop to console.log the tweet text and the date it was created/posted
            for (i = 0; i < limit; i++) {
                console.log("===============================================================================".rainbow.bold);
                console.log("Tweet " + (i + 1) + ": " + tweets[i].text.blue.bold);
                console.log("  Posted ".bold.green + tweets[i].created_at.bold.green);
            }
            console.log("===============================================================================".rainbow.bold);
        }
        );
}

var spotifyFunction = function (){

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
})
var song = "";
var nodeArgs = process.argv;
if (process.argv[3] == undefined) {
    //Assign 'The Sign' by Ace of Base as default if undefined parameter in command line
    song = "The Sign Ace of Base";
}
else {
    //Local variable to hold song title
    var songTitle = "";
    //For-loop to assemble song title input from command line
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songTitle = songTitle + " " + nodeArgs[i];
            song = songTitle;
        }
        else {
            songTitle += nodeArgs[i];
            song = songTitle;
        }
    }
}

spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    else {
        result1 = data.tracks.items[0];
        //Loop to retrieve and return all artists
        console.log("////////////////////////////////////////////////////////////////////////////".america.bold);
        //Handler for undefined scenarios
        if (result1 == undefined) {
            console.log("Sorry, no results found.".bold.red);
        }
        else {
            //Display song title
            console.log("Song Title: ".bold.red + result1.name.cyan);
            console.log("   Album: ".bold.red + result1.album.name.cyan);
            for (i = 0; i < result1.artists.length; i++) {
                console.log("   Artist(s): ".bold.red + result1.artists[i].name.cyan);
            }
        //Display preview link URL
        console.log("   Preview Link: ".bold.red + result1.external_urls.spotify.cyan);
        //Display album title
        console.log("////////////////////////////////////////////////////////////////////////////".america.bold);
        }
    }
})
}

var movieFunction = function() {
    var nodeArgs = process.argv;
    var movieName = "Mr+Nobody";
    var movieNames = "";
    //Loop for all words in the movie title from command line
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieNames + "+" + nodeArgs[i];
            movieName = movieNames;
        }
        else {
            movieNames += nodeArgs[i];
            movieName = movieNames;
        }
    }

    //Query OMDB API
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            request(queryURL, function (error, response, body) {
        //If the request is successful
        if (!error && response.statusCode == 200) {
            //Parse the body of the site
            var result = JSON.parse(body);
            //Return specified data values
            console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////".rainbow.bold);
            console.log("\n\Movie Title: ".blue.bold + result.Title.underline.white);
            console.log("Release Year: ".cyan.bold + result.Year.blue);
            console.log("IMDB Rating: ".green.bold + result.imdbRating.white);
            console.log("Rotten Tomatoes Rating: ".green.bold + result.Ratings[1].Value.white);
            console.log("Production Country: ".magenta.bold + result.Country.white);
            console.log("Language: ".yellow.bold + result.Language.white);
            console.log("Plot: ".red.bold + result.Plot.trap.red);
            console.log("Plot [easy to read]:".red.bold + result.Plot.red);
            console.log("Actors: ".blue.bold + result.Actors.white);
            console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////".rainbow.bold);
        }
    })
}

//Switch statement to handle command line request
switch (command) {
    case "my-tweets":
        tweetsFunction();
    break;

    case "spotify-this-song":
        spotifyFunction();
    break;

    case "movie-this":
        movieFunction();
    break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data){
            if (error) {
                return console.log(error);
            }
            //console.log(data);
            var dataArr = data.split(",");
            //console.log(dataArr);
            //console.log(dataArr[0]);
            var command = dataArr[0];
            switch (command) {
                case "my-tweets":
                    tweetsFunction();
                break;
            
                case "spotify-this-song":
                    
                    var spotify = new Spotify({
                        id: process.env.SPOTIFY_ID,
                        secret: process.env.SPOTIFY_SECRET
                    })
                    var song = "";
                    var nodeArgs = dataArr;
                    if (nodeArgs[1] == undefined) {
                        //Assign 'The Sign' by Ace of Base as default if undefined parameter in command line
                        song = "The Sign Ace of Base";
                    }
                    else {
                        //Local variable to hold song title
                        var songTitle = "";
                        //For-loop to assemble song title input from command line
                        for (var i = 1; i < nodeArgs.length; i++) {
                            if (i > 1 && i < nodeArgs.length) {
                                songTitle = songTitle + " " + nodeArgs[i];
                                song = songTitle;
                            }
                            else {
                                songTitle += nodeArgs[i];
                                song = songTitle;
                            }
                        }
                    } 
                    spotify.search({ type: 'track', query: song }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        else {
                            result1 = data.tracks.items[0];
                            //console.log(song);
                            //Loop to retrieve and return all artists
                            console.log("////////////////////////////////////////////////////////////////////////////".america.bold);
                            //Handler for undefined scenarios
                            if (result1 == undefined) {
                                console.log("Sorry, no results found.".bold.red);
                            }
                            else {
                                //Display song title
                                console.log("Song Title: ".bold.red + result1.name.cyan);
                                console.log("   Album: ".bold.red + result1.album.name.cyan);
                                for (i = 0; i < result1.artists.length; i++) {
                                    console.log("   Artist(s): ".bold.red + result1.artists[i].name.cyan);
                                }
                            //Display preview link URL
                            console.log("   Preview Link: ".bold.red + result1.external_urls.spotify.cyan);
                            //Display album title
                            console.log("////////////////////////////////////////////////////////////////////////////".america.bold);
                            }
                        }
                    })
                    break;
            
                case "movie-this":
                        
                    var nodeArgs = dataArr;
                    var movieName = "Mr+Nobody";
                    var movieNames = "";
                    //Loop for all words in the movie title from command line
                    for (var i = 1; i < nodeArgs.length; i++) {
                        if (i > 1 && i < nodeArgs.length) {
                            movieNames + "+" + nodeArgs[i];
                            movieName = movieNames;
                        }
                        else {
                            movieNames += nodeArgs[i];
                            movieName = movieNames;
                        }
                    }
            
                    //Query OMDB API
                    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                            request(queryURL, function (error, response, body) {
                        //If the request is successful
                        if (!error && response.statusCode == 200) {
                            //Parse the body of the site
                            var result = JSON.parse(body);
                            //Return specified data values
                            console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////".rainbow.bold);
                            console.log("\n\Movie Title: ".blue.bold + result.Title.underline.white);
                            console.log("Release Year: ".cyan.bold + result.Year.blue);
                            console.log("IMDB Rating: ".green.bold + result.imdbRating.white);
                            console.log("Rotten Tomatoes Rating: ".green.bold + result.Ratings[1].Value.white);
                            console.log("Production Country: ".magenta.bold + result.Country.white);
                            console.log("Language: ".yellow.bold + result.Language.white);
                            console.log("Plot: ".red.bold + result.Plot.trap.red);
                            console.log("Plot [easy to read]:".red.bold + result.Plot.red);
                            console.log("Actors: ".blue.bold + result.Actors.white);
                            console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////".rainbow.bold);
                        }
                    })
                    break;
                }
        })
        break;
};