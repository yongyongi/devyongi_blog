# socket.io

[웹 소켓](https://devyongi.tistory.com/12)을 사용하여 채팅방에 적합한 구조로 만든 패키지이다.
채팅방 구조가 아닌 경우에는 불필요할 수도 있다.

## 프론트에서 socket.io 셋팅

이벤트 리스너를 자유롭게 만들 수 있다, 서버로 데이터를 보낼 때에도 이벤트 이름과 함께 데이터를 보낸다.

```js
const socket = io.connect("http://localhost:8005", {
  // ws가 아닌 http로 작성한다, 소켓을 지원하는 브라우저인지 처음에 확인하기위해서 설정한다. 맨 처음에는 폴링으로 요청을 하고, 소켓을 지원하는 브라우저일 경우, 웹소켓으로 송수신한다.

  // 처음부터 웹소켓으로 통신하고 싶다고 하면, 밑에 코드와 같이 transports: ["websocket"]을 설정해준다.
  path: "/socket.io", // 이 부분과 서버 코드 1번의 path값과 같아야한다.
  transports: ["websocket"],
});
socket.on("news", (data) => {
  console.log(data);
  socket.emit("reply", "Hello server");
});
```

## 서버에서 socket.io 셋팅

`npm i socket.io`

```jsx
// socket.io
const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" }); //socketio와 express서버 연결

  io.on("connection", (socket) => {
    // 소켓과 서버가 연결이 되면 실행
    const req = socket.request; // websocket과 달리 socket안에 requset객체가 있다.
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip, socket.id, req.ip); // socket.id로 특정사람을 선택할 수 있다.
    socket.on("disconnect", () => {
      // 연결 종료 시 (브라우저를 닫는 행위)
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on("error", (error) => {
      // 에러 처리 핸들링
      console.log(error);
    });
    socket.on("reply", (data) => {
      //클라이언트의 reply 이벤트로 보낸 메시지를 받는다.
      console.log(data);
    });
    socket.interval = setInterval(() => {
      // 3초마다 클라이언트로 news 이벤트로 메시지를 보낸다.
      socket.emit("news", "Hello client");
    }, 3000);
  });
};
```

socket.io에서는 프론트와 서버에서 서로 메시지를 보낼 때, 이벤트 이름을 설정할 수 있다. 그래서 발생한 이벤트에 대한 응답을 받을 수 있다.

클라이언트에서는 io객체를 제공받기위해 index.html파일에
`<srcipt src="/socket.io/socket.io.js"></srcipt>`를 넣어주어야한다. (만약, react를 사용한다면 socket.io-client 패키지를 따로 설치하여 처리하는 것으로 알고 있다.)

`socket.emit("이벤트 명","데이터")` : 이벤트명과 데이터를 서버나 클라이언트로 json형식으로 보낸다.
`socket.on("이벤트 명", "데이터")` : 이벤트명과 데이터를 서버나 클라이언트로 json형식으로 받는다.
`socket.id` : 브라우저 웹소켓에 대한 고유 id이다. (특정사람에 대한 처리를 할 수 있다.)

데이터와 이벤트 명을 함께 보내면서 이벤트 명에 맞는 처리를 따로 할 수 있고, socket.id를 사용하여 특정 사람에 대한 처리를 할 수 있는 부분에서 확실히 채팅에 특화된 패키지라고 느껴졌다. 직접 채팅을 구현해보면서 좀 더 확실히 알 수 있을 것 같다.

> <span style="color:green">현재 개발공부중이며, 해당 글에 틀린 내용이 있을 수 있습니다. 부족한 부분에 대해서 피드백을 주시면 수정하겠습니다.</span>

## 참고

Node교과서 - 제로초
