# TIL

TIL이라고 표현하기는 그렇지만, 컨텍스트 개념을 공부하고 이해하면서 아직 이해가 안되는 부분이 있어서 글로 기록 해두려고 한다. 지금 당장은 뇌정지가 와서 아무 생각이 들지 않는다.....

outer의 스코프체이닝 과정을 직접 코드로 작성해보았는데 이 두 코드의 값이 다르게 나온다. 직감적으로는 다르게 나오는게 맞게 느껴지지만, 이론상 outer는 해당 식별자의 값이 없을때에는 이전의 실행 컨텍스트의 렉시컬 환경을 참조하여서 식별자의 값을 가져온다. console.trace를 제일 마지막에 호출되는 함수에 찍어보면 두 코드 모두 스택에 쌓이는 순서가 전역 >

```js
let food = "밥";
let state = "배고픔";

function 중국집() {
  let food = "짜장면";
  let state = "배부름";
  고기집();
  function 고기집() {
    let food = "삼겹살";
    let state = "다시배고픔";
    분식집();
    function 분식집() {
      let food = "떡볶이";
      console.log(food);
      console.log(state);
      console.trace();
    }
  }
}

중국집();
```

```js
let food = "밥";
let state = "배고픔";

function a() {
  let food = "짜장면";
  let state = "배부름";
  b();
}

function b() {
  let food = "삼겹살";
  let state = "다시배고픔";
  c();
}

function c() {
  let food = "떡볶이";
  console.log(food);
  console.log(state);
  console.trace();
}

a();
```
