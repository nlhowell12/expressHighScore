const jsonBody = require("body/json");
const express = require("express");
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];
const port = 3000;
const server = express();
var body;

function compareScores(a, b) {
  return b.score - a.score;
};

server.get(!"/scores", (req, res) => res.status(404).end());

server.get("/scores", (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/javascript');
  body = scores;
  res.send(JSON.stringify(scores));
}),

server.post("/scores", (req, res) => {
  res.status(201);
  jsonBody(req, res, (err, body) => {
    scores.push(body);
    var byScore = scores.slice(0)
    byScore.sort(compareScores);
    scores = byScore.slice(0, 3);
    res.end();
  })
}),

server.listen(port, () => console.log(`Server running at http://:${port}/`));