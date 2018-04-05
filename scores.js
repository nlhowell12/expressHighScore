const jsonBody = require("body/json");
const express = require("express");
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];
const http = require('http');
const hostname = '';
const port = 3000;
const server = express();
var body;

function compareScores(a, b) {
  return b.score - a.score;
};

server.get(!"/scores", (req, res) => {
  res.statusCode = 404;
}),
server.get("/scores", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/javascript');
  body = scores;
  res.end(JSON.stringify(scores));
}),
server.post("/scores", (req, res) => {
  res.statusCode = 201;
  jsonBody(req, res, (err, body) => {
    scores.push(body);
    var byScore = scores.slice(0)
    byScore.sort(compareScores);
    scores = byScore.slice(0, 3);
    res.end();
  })
}),

// });
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});