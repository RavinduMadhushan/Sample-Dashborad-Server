var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { json } = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

app.post("/api/getall", function (req, res) {
  let max = req.body.max;
  let last = req.body.last;
  let response = "";
  http.get(
    `http://ivivaanywhere.ivivacloud.com/api/Asset/Asset/All?apikey=SC:demo:64a9aa122143a5db&max=${max}&last=${last}`,
    (chunk) => {
      chunk.on("data", (d) => {
        response += d;
      });
      chunk.on("end", () => {
        res.send(JSON.parse(response));
      });
    }
  );
});
