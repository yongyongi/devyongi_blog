# ++연산자

리액트, node만 사용하다보니 html, css, js의 기초적인 부분이 미흡하여 간단하게 다시 익히기 위해 프로젝트를 따라하면서 배우는 중이다. 여기서 ++ 연산자에 대해서 몰랐던 부분을 알게 되었다.

```js
answerButton.addEventListener(
  "click",
  () => {
    const children = document.querySelectorAll(".answerButton");
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true; // 버튼 비활성화
      children[i].style.display = "none";
    }
    goNext(qnaIdx++);
  },
  false
);
```

우선 문제의 코드는 위와 같다. 코드 내용은 answerButton이라는 버튼태그 변수를 만들어서 addEventListener를 적용하는 코드이다. 어떠한 버튼태그를 클릭하면 모든 버튼태그들이 모두 비활성화되고, 화면에서 보이지 않게 된다. 그리고 다음 질문과 답변을 가지고 오기 위해서 qnaIdx를 1증가시켜 goNext함수를 호출하는 것이다.

나는 항상 for문을 사용할 때도 그렇고, 카운트를 할 일이 있다면 i++, count++이런식으로 사용해왔다. 그래서 당연히 qnaIdx++를 하였지만, 다음 질문과 다음 답변으로 넘어가지 않았다.

++연산자에 대해서 찾아보았더니 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)에 잘 설명이 되어있었다.

결국에는 ++qnaIdx나 qnaIdx++를 하였을때, 똑같이 변수의 값이 1증가 하지만, ++qnaIdx와 qnaIdx++값 자체가 다른 것이었다. 예를 들어보자.

```js
let qnaIdx = 0;
let up = ++qnaIdx;

// qnaIdx 값은 1
// up 값은 1

let qnaIdx = 0;
let up = qnaIdx++;

// qnaIdx 값은 1
// up 값은 0
```

qnaIdx++ 대신에 ++qnaIdx를 넣어주었더니 잘 작동하였다.
