// Access all of the key twitter keys
var keysVar = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var client = new Twitter(keysVar);

if (process.argv[2] === "my-tweets") {
    client.get('statuses/user_timeline', { screen_name: "JimGaffigan", count: 5 }, function(error, tweets, response) {
        // console.log(tweets);
        for (var i = 0; i < 5; i++) {
            console.log(tweets[i].text + '\n' + "Created on: " + tweets[i].created_at + '\n');
        }
    });
};


query = process.argv[2]

spotify.search({ type: 'track', query}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

for (var i=0; i<1; i++){
	for(var j=0; j<2; j++){
	console.log("\n");
    console.log("Artists: " + data.tracks.items[i].artists[j].name);
    console.log("Song: " + data.tracks.items[i].name);
    console.log("Preview: " + data.tracks.items[i].preview_url);
    console.log("Album name: " + data.tracks.items[i].album.name + "\n");
}
}
});
