# useEffect

react hook중에 하나로 마운트, 언마운트, 업데이트시에 특정 작업을 처리할 수 있다.

- 마운트 : 컴포넌트가 처음 나타났을 때를 의미
- 언마운트 : 컴포넌트가 사라질 때를 의미
- 업데이트 : 특정 값이 바뀔 때를 의미

### useEffect 구조 및 파라미터

```js
useEffect(() => {
  console.log("컴포넌트가 처음 나타났을 때 실행");

  return () => {
    console.log("컴포넌트가 사라질 때 실행");
  };
}, []);
```

useEffect는 위왁 같은 구조를 가지고 있으며, 첫번째 파라미터로는 함수가 들어가고, 두번째 파라미터로는 배열(deps)가 들어간다.

deps는 3가지로 나눌 수 있다.

1. 빈 배열을 넣는 경우

   - 컴포넌트가 처음 나타날 때에만 useEffect에 등록한 함수가 호출된다.
   - 컴포넌트가 사라질 때만 cleanup함수가 호출된다.

2. 배열안에 특정 값을 넣는 경우

   - 컴포넌트가 처음 나타날 때와 특정 값이 바뀔때 함수가 호출이 된다.
   - 컴포넌트가 사라질 때와 특정 값이 바뀌기 직전에도 cleanup함수가 호출된다.

3. 아무 값도 넣지 않는 경우
   - 컴포넌트가 리랜더링 될 때마다 호출된다.

참고로 기본적으로 부모 컴포넌트가 리렌더링이 되면, 자식 컴포넌트도 리렌더링이 된다고 한다. (자식 컴포넌트에 바뀐 내용이 없더라도 리렌더링이 된다.)

### cleanup 함수

cleanup은 말그대로 useEffect에 대한 뒷정리를 해주는 역할을 하며 return을 사용하여 함수를 반환하는 방식으로 사용한다.

### 마운트시에 하는 작업

- API요청
- 라이브러리 사용(D3, Video.js 등)
- setInterval을 통한 반복 작업
- setTimeout을 통한 작업 예약

### 언마운트 시에 하는 작업

- setInterval, setTimeout을 사용하여 등록한 작업들 clear하기(clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

### 규칙

useEffect안에서 사용하는 state나 props가 있다면, 최신 상태를 가르키기 위해서 deps에 넣어주어야한다.

### 참고

[vlpt](https://react.vlpt.us/basic/16-useEffect.html)
