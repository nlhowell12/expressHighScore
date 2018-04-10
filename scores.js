// Tells the server that you're going to use express
const express = require("express");
// Sets the scores variable to an array of objects
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];
// Sets the port that the .listen method will check
const port = 3000;
// Initializes the server with the express method
const server = express();
// Tells the server to use express to parse into JSON
server.use(express.json());
// Defines the body variable
var body;

// Defines a function to compare objects passed in by the 'score' property
function compareScores(a, b) {
  return b.score - a.score;
};
// If a get request does not equal "/scores" respond with a 404 status code and end the response
server.get(!"/scores", (req, res) => res.status(404).end());
// Defines how to respond to a get request of "/scores"
server.get("/scores", (req, res) => {
  // Sets the response to return a status code of 200
  res.status(200);
  // Sets the content type of the response to javascript
  res.setHeader('Content-Type', 'application/javascript');
  // Sets the body of the reponse to whatever is in scores (useless because you're already sending scores?)
  body = scores;
  // Sends the scores array as part of the response
  res.send(scores);
}),
// Defines how to handle a post request of "/scores"
server.post("/scores", (req, res) => {
  // Sets the response status code to 201
  res.status(201);
  // Pushes the body of the request into the scores array
  scores.push(req.body);
  // Sets the byScore variable to the first index of the scores array
  var byScore = scores.slice(0)
  // Sorts the array by comparing the array to itself
  byScore.sort(compareScores);
  // Sets the scores array to only be the first three sorted indices
  scores = byScore.slice(0, 3);
  // Ends the response
  res.end();
});
// Defines what ports the server will respond to
server.listen(port, () => console.log(`Server running at http://:${port}/`));