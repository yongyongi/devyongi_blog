# 쿠키와 세션

클라이언트가 서버에 요청을 할때, 서버는 요청을 보낸 사용자가 누구인지를 모른다. IP와 브라우저 정도는 알 수 있지만, PC방의 경우는 한 컴퓨터(하나의 IP)로 여러명의 사용자가 접속할 수 있기 때문에 IP로는 사용자가 누구인지 파악할 수 없다. 그렇기 때문에 로그인 기능이 필요하고, 로그인 기능을 구현하기 위해서 쿠키와 세션이 필요하다.

## 쿠키

- 브라우저에 데이터를 저장하는 수단이고, 서버에서 Set-Cookie에 저장하는 데이터를 쿠키라고 한다.

쿠키는 클라이언트에서 처음 요청하면 서버에서 받은 데이터를 쿠키에 넣고 다시 클라이언트로 보내준다. 브라우저는 쿠키를 저장하고 있다가 클라이언트가 요청을 할 때, 브라우저가 알아서 쿠키를 서버로 보내주기 때문에 쿠키의 정보를 보고 현재 사용자가 누구인지 파악할 수 있다.

### 쿠키옵션

- expires : 만료날짜
- maxAge : 쿠키유지시간(초), expires보다 우선시 된다.
- domain : 쿠키가 전송될 도메인을 정할 수 있다. 기본값은 현재 도메인이다.
- path : 쿠키가 전송될 URL을 정할 수 있다. 기본값은 "/"으로 모든 URL에서 쿠키를 전송할 수 있다.
- secure : true이면, HTTPS일 경우에만 쿠키가 전송된다.
- httpOnly : true이면, 자바스크립트로 쿠키에 접근할 수 없다. 보안을 위해 설정하는 것이 좋다.
- sameSite : none, strict, lax 옵션이 있다. none은 모든 도메인에서 접근 가능하지만, secure를 true로 설정해야한다. 즉, https여야한다. strict는 도메인이 같을때만 접근이 가능하고, lax는 아무것도 설정하지 않았을 때, 브라우저에서 기본으로 설정하는 값이다. 다른 도메인이면 get요청만 접근이 가능하다.

[samesite 참고](https://yangbongsoo.tistory.com/5?category=919814)

## session

쿠키는 개발자도구 Application에 들어가면 쿠키정보가 그대로 노출되어 있고, 조작도 할 수 있기 때문에 암호화를 해줄 필요가 있다.

이럴때 필요한게 session방법이다. 중요한 정보를 브라우저로 보내지 않고, 서버에서 관리하는 방식이다. 그리고 클라이언트에는 세션키만 제공한다

```js
session[uniqueInt] = {
  name,
  expires,
};
```

uniqueInt에는 반드시 고유한 값이 들어가야한다. 겹치는 경우, 로그인시 다른유저로 로그인 되는 대참사가 생길 수 있다.

이렇게 고유의 `session[uniqueInt]`값으로 데이터가 저장되고, 클라이언트에는 uniqueInt(세션키)만 쿠키에 담아서 보내준다. uniqueInt만 보고는 서버에 저장된 데이터를 알 수 없기 때문에 보안이 높아진다. 그리고 요청마다 이 세션키를 서버에 보내주고 서버는 확인 후에 일치하는 데이터를 보내 줄 수 있다.

## 코드

클라이언트가 로그인을 할 때, 데이터와 함께 서버에 요청을 보내면 서버에서 데이터를 쿠키에 저장해서 그 쿠키를 클라이언트로 응답해준다.

서버에서 쿠키를 저장할 때는 밑에와 같이 작성해주면된다. 그리고 필요에 따라 쿠키옵션을 추가해주면 된다. express-session과 cookie-parser를 사용하면 쉽게 설정하고, 쉽게 파싱할 수 있다.

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(cookieParser("secret");
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name:"session-cookie" // 세션 이름 설정, 개발자 도구에서 확인 가능
  })
);

app.get("/", (req,res) => {
    req.session.id = "yongi" // 세션등록
    req.sessionID; // 세션 아이디 확인
    req.session.destroy(); // 세션 모두 제거

    req.cookies // 파싱된 쿠키를 가져온다
    req.signedCookies // 서명된 쿠키를 파싱하여 가져온다.
})
```

express-session을 사용해서 session과 cookie에 대한 옵션을 설정할 수 있다.

### session 옵션

- resave : 요청이 왔을 때, 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
- saveUninitialized : 세션에 저장할 내역이 없더라도 세션을 저장할지 여부

이전에 프로젝트를 진행하면서 req.session.save를 왜 사용하는지 제대로 알지 못하고 단지 session에 확실히 저장하기 위해서 사용했는데, 수동 저장을 할 때 쓰이는 것이고, saveUninitialized의 설정으로 해결 할 수 있기 때문에 req.session.save는 사용할 일이 거의 없다고 한다.

조현영님의 강의를 보면서 쿠키에 대한 기본적인 이해가 되었지만, 아직 애매모호한 부분이 많다. 퍼스트 파티 쿠키, 서드파티 쿠키, CSRF 등 아직 알아야 할 내용이 수두룩하다.
