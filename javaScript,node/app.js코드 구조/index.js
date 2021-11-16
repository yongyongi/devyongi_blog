const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config(); // 전역변수 사용하기 위해 설정

const app = express();

app.use(morgan("dev")); // 요청-응답 로그
app.use(express.static(path.join(__dirname, "public"))); // 정적인 파일 제공
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // form데이터를 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 파싱
app.use(
  session({
    // 세션 관리
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 쿠키 옵션
      httpOnly: true,
      secure: false,
    },
  })
);

// 요청에 대해 처리하는 라우터들
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.send("user info");
});

// 존재하지 않는 라우터로 요청을 하였을 때의 에러처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러처리 미들웨어로 넘겨줌
});

// 애러처리 미들웨어 - 모든 에러는 여기서 처리됌
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send("error");
});

// 서버 포트 연결
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
