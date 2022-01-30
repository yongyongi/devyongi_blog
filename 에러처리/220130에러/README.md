# 오늘의 에러

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

오늘 발생한 에러는 아니지만 ㅎㅎ 업무를 하면서 위와 같은 에러가 발생했다.

useEffect의 cleanup함수를 사용하여서 메모리 누수를 해결하라고 하는 메세지인 것 같다.

왜 이런 에러가 발생했을까?

cleanup 함수는 컴포넌트가 언마운트 될 때 실행이 된다. 만약 요청을 통해서 데이터를 받아오는 중에 페이지를 이동하게 된다면 데이터 받아오는 것을 멈추는 것이 메모리 효율에 좋다. 그렇기 때문에 AJAX요청을 구독 취소하기 위해서 cleanup함수를 사용하고, 사용하지 않을 경우 위와 같은 에러가 발생한다.

하지만, 나는 아무런 요청도 받아오고 있지 않았는데 클릭 이벤트를 발생시키고 페이지를 이동하니 위와 같은 에러가 발생했다.

이유가 뭘까?

그 이유는 state이다. 아직도 이해가 완전히 되지는 않지만 클릭을 하였을 때 loading state가 true로 바뀌고 그 안에서 setInterval로 localStorage값을 1초마다 있는지 확인을 했다. 만약 값이 있다면 loading state를 false로 바꾸는 작업이었다.

이 loading state가 true값을 가지고 있을 때, 페이지 이동을 하면 위와 같은 에러가 떴었고, cleanup 함수에 loading state에 false값을 넣어서 반환하니 에러가 해결이 되었다.

코드로 간단히 보자면,

```js

...

handleClick = () => {
    const tagData = setInterval(() => {
      const data = JSON.parse(localStorage.getItem('Tags'));

      if (data) {
        clearInterval(tagData);
        setLoading(false);
      }
    }, 1000);

    setLoading(true)
}

useEffect(() => {
    ...
    return () => setLoading(false) // 이렇게 처리해야 에러가 사라짐
},[])

...

```

언마운트 된 후에도 불필요하게 state값이 변경되는 것을 막기 위한 에러인듯 하다!
