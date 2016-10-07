// Access all of the key twitter keys
var keysVar = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');


var client = new Twitter(keysVar);

if (process.argv[2] === "my-tweets") {

    client.get('statuses/user_timeline', { screen_name: "JimGaffigan", count: 5 }, function(error, tweets, response) {

        for (var i = 0; i < 5; i++) {
            console.log(tweets[i].text + '\n' + "Created on: " + tweets[i].created_at + '\n');
        }
    });
};


if (query = process.argv.slice(2).join(" ")) {
	console.log(query);
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

} else if (query = " ") {

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
