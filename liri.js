// Access all of the key twitter keys
var keysVar = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var client = new Twitter(keysVar);
var movieName = "http://www.omdbapi.com/?t=" + process.argv.slice(3).join(" ") + "&y=&plot=short&tomatoes=true&r=json"
var query = process.argv.slice(3).join(" ")

// Twitter code:
function tweetsList() {
    client.get('statuses/user_timeline', { screen_name: "JimGaffigan", count: 5 }, function(error, tweets, response) {
        console.log("\n");
        console.log("--------------------Search Results--------------------")

        for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text + '\n' + "Created on: " + tweets[i].created_at + '\n');
        }

        console.log("------------------------------------------------------");
        console.log("\n");
    });
};

// Spotify code:
function spotifySearch() {
    if (process.argv[2] && process.argv[3]) {
        spotify.search({ type: 'track', query }, function(err, data) {
            //log any errors
            if (err) {
                console.log('Error occurred: ' + err);
                return;
                //run search results
            } else if (!err) {
                console.log("\n");
                console.log("--------------------Search Results--------------------");
                console.log("Artists: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
                console.log("Album name: " + data.tracks.items[0].album.name + "\n");
                console.log("--------------------Search Results--------------------");
                console.log("\n");
            }
        });

    } else if (process.argv[2]) {

        spotify.lookup({ type: 'album', id: '37UgOnkBN4ZfY1nBoSCL9L' }, function(err, data) {
            //log any errors
            if (err) {
                console.log('Error occurred: ' + err);
                return;
                //run search results
            } else if (!err) {
                console.log("\n");
                console.log("--------------------Search Results--------------------");
                console.log("Artists: " + data.artists[0].name);
                console.log("Song: " + data.tracks.items[3].name);
                console.log("Preview: " + data.tracks.items[3].preview_url);
                console.log("Album name: " + data.name);
                console.log("------------------------------------------------------");
                console.log("\n");
            }
        });
    };
}

//OMDB code:
function movieSearch() {
    if (process.argv[2] && process.argv[3]) {
        request(movieName, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("\n");
                console.log("--------------------Search Results--------------------");
                console.log("Movie Title: " + JSON.parse(body)["Title"]);
                console.log("Release Year: " + JSON.parse(body)["Year"]);
                console.log("Cast: " + JSON.parse(body)["Actors"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("IMDb Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log("Rotten Tomatoes Link: " + JSON.parse(body)["tomatoURL"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("------------------------------------------------------");
                console.log("\n");
            };
        });
    } else if (process.argv[2]) {
        console.log("\n");
        console.log("--------------------Search Results--------------------");
        console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/' + "\n" +
            'It\'s on Netflix!');
        console.log("------------------------------------------------------");
        console.log("\n");
    };
};


if (process.argv[2] === "my-tweets") {
    tweetsList();
} else if (process.argv[2] === "spotify-this-song") {
    spotifySearch();
} else if (process.argv[2] === "movie-this") {
    movieSearch();
};
