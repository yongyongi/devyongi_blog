# 웹소켓

기존의 http방식은 요청 한번에 응답을 한번하고 서버와 연결이 끊는다. 반면에 소켓은 통로를 만들어 놓고, 실시간으로 양방향 데이터를 전송하는 기술이다.

웹소켓 이전에는 폴링이라는 기술을 사용하였다. 폴링은 특정 시간마다 서버에 요청하여 변한게 있는지 확인하고, 데이터를 받아오는 방식이다. 시간에 따라 숏폴링, 롱폴링으로 구분하는데 어째뜬 연결을 끊었다가 다시 연결하는 과정이 비효율적이다. 그래서 나온 것이 웹소켓 방식이다.

웹소켓은 ws프로토콜을 사용한다. 옛날 브라우저 중 지원 안되는 것도 있다.

## 프론트에서 소켓 셋팅

```jsx
const webSocket = new WebSocket("ws://localhost:8005"); // 서버포트와 공유하므로 ws프로토콜뒤에 포트는 서버포트와 같게 한다. (여기가 실행되면 서버코드 1번이 실행된다.)
webSocket.onopen = () => {
  console.log("서버와 웹소켓 연결 성공");
};
webSocket.onmessage = (event) => {
  console.log(event.data); // 3번
  webSocket.send("클라이언트에서 서버로 보내는 데이터"); // send한 데이터는 서버코드 2번에 담긴다.
};
```

## 서버에서 소켓 셋팅

우선 노드에서 웹소켓을 사용하려면 "ws"를 설치해주어야한다.

`npm i ws`

```jsx
// socket.js
const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({ server }); // 서버포트와 연결

  wss.on("connection", (ws, req) => {
    // 1번
    const ip = req.ip;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      console.log(message); // 2번
    });
    ws.on("error", (error) => {
      // 에러 핸들러
      console.error(error);
    });
    ws.on("close", () => {
      // 연결 종료시 (브라우저를 닫는다.)
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval) // 연결이 끊겼을 때, 서버에서 데이터 보내는 것도 멈춘다.
    });

    const ws.setInterval = setInterval(() => {
      if (ws.readyState === ws.OPEN) { // 클라이언트와 서버가 연결이 되어있는지 확인함
        ws.send("서버에서 클라이언트로 보내는 데이터"); // send한 데이터는 클라이언트 3번 코드에 담긴다.
      }
    }, 3000);
  });
};
```

```jsx
// app.js

// 기타 코드 생략

const webSocket = require("./socket");

const server = app.listen(8005, () => {
  console.log("8005번 포트 연결");
});

webSocket(server);
```

서버에서는 app.js에 socket.js파일을 require한 다음 연결된 http포트를 인자로 넣어주면서 http포트와 소켓을 연결한다.

서버에서 먼저 데이터를 보내고, 클라이언트에서 답장을 보내는 코드로 3초마다 실행된다.

웹소켓의 작동 방식에 대해서 알게되었지만, 아직 어떻게 사용하면 좋을지는 감이 잘 오지 않는다. 확실히 실시간 알림 기능을 만들 때 좋을 것 같다. 채팅을 위해 만들어졌다는 socket.io도 다음에 공부를 해봐야겠다.

## 참고

Node교과서 - 제로초
