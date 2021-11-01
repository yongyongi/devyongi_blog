# 미들웨어란?

- 요청과 응답 사이에 위치한 함수이다. (밑에와 같이 생긴 함수)

```js
app.use();
app.get("/", (req, res, next) => {});
```

- 개발에 도움을 주는 미들웨어로 cookie-parser, body-parser, cors, morgan 등이 있다. 별도로 설치를 하여 사용하였지만, 요즘은 대부분 미들웨어가 express에 내장되어 있다. [미들웨어](http://expressjs.com/en/resources/middleware.html)
- 위에서 아래로 순서대로 실행된다.
- 요청(req), 응답(res)을 조작할 수 있다.
- next를 사용하여 다음 미들웨어로 넘어갈 수 있다.

## 에러처리 미들웨어

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

에러처리 미들웨어는 반드시 err, req, res, next 4개의 인자를 넣어주어야한다. 다른 미들웨어에서 next(err)로 에러를 넘겨주면 에러처리 미들웨어로 전달이 되고, 에러를 처리해준다.

## next

미들웨어에서는 인자로 next를 추가하여 next함수를 호출할 수 있다. next를 호출하면 다음 미들웨어로 넘어가게 된다.

- next() : 기본적안 호출로 다음 미들웨어로 넘어간다.
- next(err) : 에러처리 미들웨어로 넘어간다. next안의 err 내용은 에러처리 미들웨어의 err인자로 들어간다.
- next("route") : 다음 미들웨어로 넘어가지 않고, 다음 라우터로 넘어간다. if문으로 분기처리할 때, 종종 쓰인다고 한다. 아래와 같이 테스트 할 수 있다.

```js
app.get(
  "/",
  (req, res, next) => {
    console.log("미들웨어1");
    next("route");
  },
  (req, res, next) => {
    console.log("미들웨어2");
    next();
  }
);

app.get("/", (req, res, next) => {
  console.log("다른 라우터");
  next();
});

// 미들웨어1
// 다른 라우터
```

## 미들웨어 간 데이터 전달

```js
app.use(
  (req, res, next) => {
    req.data = "data";
    res.data = "data2";
    next();
  },
  (req, res, next) => {
    console.log(req.data, res.data); // data data2
    next();
  }
);
```

req나 res 객체에 임의의 키값을 부여하고 데이터를 넣어주면 다른 미들웨어에서 데이터를 사용할 수 있다. 주의할 점은 req.cookies, req.body와 같은 미들웨어와 겹치지 않도록 해야한다.

## 미들웨어 확장

미들웨어 안에서 또 미들웨어를 사용하고 싶을 때 사용하는 방식이다. 안쪽 미들웨어에 (req,res,next)만 붙여주면 된다. 아래와 같이 사용할 수 있다.

```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
```

## 참고

Node교과서 - 제로초
