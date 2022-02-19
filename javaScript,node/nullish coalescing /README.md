# Nullish coalescing operator

자바스크립트를 사용하면서 존재조차 몰랐던 Nullish coalescing operator에 대해서 알아보자.

Nullish coalescing operator는 ?? 를 사용하여 해당하는 값을 가져온다.
?? 왼쪽에 있는 코드의 값이 있다면 그 값을 출력하게 되고, null이나 undefined일 경우 ??의 오른쪽 값이 출력된다.

코드를 보면 쉽게 이해가 된다.

```js
const sendMessage = (text) => {
  const message = text ?? "메시지가 없습니다.";
  return message;
};

console.log(sendMessage("하이")); // "하이"
console.log(sendMessage(undefined)); // "메시지가 없습니다."
console.log(sendMessage(null)); // "메시지가 없습니다."
console.log(sendMessage(0)); // 0
console.log(sendMessage(false)); // false
console.log(sendMessage("")); // ""
```

Nullish coalescing operator와 logical OR operator를 헷갈려 할 수 있다.

logical OR operator는 ||로 해당하는 값을 가져오는데 차이점은 null, undefined일 경우가 아니라 falsy값일 경우 오른쪽 코드 값을 출력해준다.

이 부분도 코드를 보면서 이해해보자.

```js
const sendMessage = (text) => {
  const message = text || "메시지가 없습니다.";
  return message;
};

console.log(sendMessage("하이")); // "하이"
console.log(sendMessage(undefined)); // "메시지가 없습니다."
console.log(sendMessage(null)); // "메시지가 없습니다."
console.log(sendMessage(0)); // "메시지가 없습니다."
console.log(sendMessage(false)); // "메시지가 없습니다."
console.log(sendMessage("")); // "메시지가 없습니다."
```

실제 코드를 작성할 때, 데이터를 3중 객체에서 가져오는 경우가 많기 때문에 밑에와 같이 Nullish coalescing operator와 optional chaining을 같이 사용하여 코드를 작성할 것 같다.

```js
const message = data.message?.text || "메시지가 없습니다.";
```

[https://youtu.be/BUAhpB3FmS4](https://youtu.be/BUAhpB3FmS4)
