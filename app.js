const express = require("express"); // express앱 임포트하기
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

// 서버 포트 & 호스트 정의내려주기
const PORT = 8888;
const HOST = "0.0.0.0"; // localhost와 같음

const app = express(); // 앱 시작
app.set("views", `${__dirname}/dist`); // HTML 파일 연결
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(cors());
app.use(express.static(`${__dirname}/dist`)); // CSS 파일 연결
app.use(bodyParser.urlencoded({ extended: false }));

// 앱을 포트와 호스트와 연결하여 작동 시작하기
app.listen(PORT, HOST);
console.log(`서버가 http://${HOST}:${PORT} 에서 작동하고 있습니다.`);

// //////////////////////////
// // URL 정의는 여기서 부터 ////
// /////////////////////////
app.get("/", (req, res) => {
  res.render("main.html");
});

app.get("/api/blog", (req, res) => {
  fs.readFile("blog.json", "utf8", (err, data) => {
    let jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.post("/api/blog", (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const saveData = { title, subtitle, content };

  let jsonData;
  fs.readFile("blog.json", "utf8", (err, data) => {
    jsonData = JSON.parse(data);
    let id = Object.keys(jsonData).length + 1;
    jsonData[id.toString()] = saveData;
    fs.writeFile("blog.json", JSON.stringify(jsonData), (err, data) => {
      console.log("DONE");
    });
  });
});
