> <span style="color:green">현재 개발공부중이며, 해당 글에 틀린 내용이 있을 수 있습니다. 부족한 부분에 대해서 피드백을 주시면 수정하겠습니다.</span>

# app.js 코드 구조

node로 서버를 만들때,

app.js에 작성하는 코드는 대부분 프로젝트에서 비슷한 구조를 가지기 때문에 자주 설치하는 [미들웨어](https://devyongi.tistory.com/4)나 패키지에 대해서 알아 놓으면 좋다.
(여기서 app.js는 서버 구동의 핵심이 되는 파일이다.)

```
npm install express express-session cookie-parser morgan dotenv
```

```js
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
```

### 설치돠는 패키지를 하나하나 알아보자.

- express : 기존의 http로 서버를 구현할 때보다 훨씬 쉽고, 가독성 좋게 만들어주는 대표적인 프레임워크이다. (node서버는 express로 구현한다고 보면된다.)
- express-session : 세션을 관리하기 위한 미들웨어다.
- cookie-parser : 쿠키를 파싱해주는 미들 웨어다.
- morgan : 요청과 응답을 기록하는 라우터다. 옵션으로는 common, tiny, short 등이 있지만, 자주 사용하는 옵션으로는 dev와 combined가 있다. dev는 개발용으로 자주 사용되고, combined는 상세한 로그이므로, 배포시에 자주 사용된다.
- dotenv : .env파일에 저장해두는 전역변수를 사용하기 위해서 설치해야한다.

```js
dotenv.config();
```

.env파일의 전역변수를 사용하기 위해서는 process.env.[변수명]으로 불러와야한다. process.env.[변수명]을 사용하기 위해서는 또, `dotenv.config()`를 작성해주어야한다. 모든 곳에서 사용할 수 있어야 하기 때문에 최대한 상단에 작성해주는 것이 좋다.

```js
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
```

코드를 보면 app.use()안에 미들웨어들이 들어가 있다. app.use는 어떤 요청이 들어왔을 때에도 공통적으로 실행되는 미들웨어로 중복코드를 방지할 수 있다.

설치하거나 express에 내장되어있는 미들웨어는 내부에서 next를 호출하기 때문에 다음 미들웨어로 넘어간다. static의 경우는 위의 코드로 보자면 `app.use(express.static(path.join(__dirname, "public")));` 는 요청 온 파일이 public폴더안에 있을 경우, next를 호출하지 않고 멈춘고, 폴더안에 없을 경우 next를 호출하여 다음 미들웨어로 넘어간다.

이러한 방식이므로 코드의 순서를 바꾸어서 불필요한 작업을 줄일 수 있다.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
```

위와 같이 static코드를 제일 밑에 배치한다면, 정적인 파일을 읽는 요청이 왔을 때, 불필요하게 바디파싱, 쿠키파싱을 해야한다.

```js
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
```

이번에는 static코드를 제일 위에 배치하였다. 이럴 경우는 정적인 파일 요청이 왔을때, 불필요한 작업 없이 바로 파일을 읽고 처리를 완료할 수 있다.

- static : 정적인 파일들을 제공하는 미들웨어, 기존에는 파일이 있을 경우 fs.readFile을 통해 읽어야하지만, static을 사용하면 알아서 해당 폴더에 파일이 있는지 찾아준다. 특징으로는 파일을 찾으면 next를 호출하지 않고 끝내고, 파일이 없으면 next를 호출하여 다음 미들웨어로 넘어간다.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

위에 미들웨어는 body-parser와 같은 것으로 express에 내장되어지면서 위와 같이 사용한다. express.json()은 json데이터를 파싱해서 req.body에 넣어준다. express.urlencoded는 form데이터를 파싱해서 req.body에 넣어준다. form을 submit할 때, 기본적으로 urlencoded이다. [참고](https://velog.io/@yongyongi/form-%ED%83%9C%EA%B7%B8%EC%9D%98-enctype-%EC%86%8D%EC%84%B1)

```js
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
```

위 코드는 쿠키를 파싱해주는 미들웨어와 세션을 관리하는 미들웨어이다. [참고](https://devyongi.tistory.com/2)

```js
// 1번
app.get("/", (req, res) => {
  res.send("hello world");
});
// 2번
app.get("/users", (req, res) => {
  res.send("user info");
});
// 3번
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
// 4번
app.use((err, req, res, next) => {
  res.status(err.status || 500).send("error");
});
```

1,2번 코드는 요청을 분기 처리하고, 3번은 존재하지 않는 경로로 요청할 경우 404에러를 주기 위한 미들웨어이다. 4번 코드는 모든 에러를 처리하는 에러 핸들링 미들웨어이다.

위에 코드는 "/", "/users"에 대한 get요청만 처리할 수 있지만, 만약 "/list" 이런 요청이 들어 왔을 경우에는 해당하는 라우터가 없기 때문에 3번 미들웨어로 들어오게 된다. 그리고 3번 미들웨어는 next(error)를 넘겨주면서 에러 핸들링 미들웨어인 4번 코드로 넘어가고 에러를 처리한다.

[소스코드](https://github.com/yongyongi/devyongi_blog/blob/master/app.js%EC%BD%94%EB%93%9C%20%EA%B5%AC%EC%A1%B0/index.js)

## 참고

Node교과서 - 제로초
