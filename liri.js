// Access all of the key twitter keys
var keysVar = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
var client = new Twitter(keysVar);
var movieName = "http://www.omdbapi.com/?t=" + process.argv.slice(3).join(" ") + "&y=&plot=short&tomatoes=true&r=json"
var query = process.argv.slice(3).join(" ")
var count = 0;

// Twitter code:
function tweetsList() {
    client.get('statuses/user_timeline', { screen_name: "JimGaffigan", count: 20 }, function(error, tweets, response) {
        console.log("\n--------------------Tweet List------------------------");

        for (var i = 0; i < 20; i++) {
            count++;
            console.log("Tweet " + count + ": " + tweets[i].text + '\n' + "Created on: " + tweets[i].created_at + '\n');
        }

        console.log("------------------------------------------------------\n");
    });
};

// Spotify code:
function spotifySearch() {
    if (query == '') {
        query = "Ace of Base - The Sign";
    };
    spotify.search({ type: 'track', query }, function(err, data) {
        //log any errors
        if (err) {
            console.log('Error occurred: ' + err);
            return;
            //run search results
        } else if (!err) {
            console.log("\n--------------------Search Results--------------------");
            console.log("Artists: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album name: " + data.tracks.items[0].album.name + "\n");
            console.log("--------------------Search Results--------------------\n");
        }
    });
}

//OMDB code:
function movieSearch() {
    if (process.argv[2] && process.argv[3]) {
        request(movieName, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("\n--------------------Search Results--------------------");
                console.log("Movie Title: " + JSON.parse(body)["Title"]);
                console.log("Release Year: " + JSON.parse(body)["Year"]);
                console.log("Cast: " + JSON.parse(body)["Actors"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("IMDb Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log("Rotten Tomatoes Link: " + JSON.parse(body)["tomatoURL"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("------------------------------------------------------\n");
            };
        });
    } else if (process.argv[2]) {
        console.log("\n--------------------Search Results--------------------");
        console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/' + "\n" +
            'It\'s on Netflix!');
        console.log("------------------------------------------------------\n");
    };
};

// fs code:
function fileSystem() {
    fs.readFile("random.txt", "utf8", function(err, data) {

        var output = data.split(',');
        process.argv = output[0];
        query = (output[1]);
        spotifySearch();

    });
};


if (process.argv[2] === "my-tweets") {
    tweetsList();
} else if (process.argv[2] === "spotify-this-song") {
    spotifySearch();
} else if (process.argv[2] === "movie-this") {
    movieSearch();
} else if (process.argv[2] === "do-what-it-says") {
    fileSystem();
}
