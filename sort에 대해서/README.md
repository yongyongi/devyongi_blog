# sort

프로그래머스 문제중 ["문자열 내 마음대로 정렬하기"](https://programmers.co.kr/learn/courses/30/lessons/12915)를 풀어보면서 sort메서드를 다시 한번 공부할 수 있었다.

단순하게 사용하면 쉽지만, sort안쪽의 compare함수를 이용한 정렬이라면 다소 헷갈리는 부분이 있었다. 그 부분에 대해서 알아보도록 하자!

우선 sort정렬은 [Tim Peters](<https://en.wikipedia.org/wiki/Tim_Peters_(software_engineer)>)에 의하여 만들어진 정렬 방식이다. 좀 더 자세한 내용을 알고 싶다면 [여기](https://d2.naver.com/helloworld/0315536)에서 공부하자.

## sort()

```jsx
let a = [1, 12, 21, 130];
a.sort(); //[1,12,130,21]

let b = ["caa", "abc", "bca", "bac"];
b.sort(); //["abc", "bac", "bca", "caa"]
```

숫자 자체를 비교하는게 아니라 각 숫자의 첫째 자리부터 작은 순서대로 정렬이 된다.

문자열은 사전식으로 정렬되는 것으로 보인다. localeCompare 함수가 완전히 사전식으로 정렬을 해준다는데 무슨 차이가 있는지는 모르겠다... 하지만 분명한 차이는 sort()는 무조건 오름차순이지만, localeCompare함수로는 오름차순, 내림차순 정렬이 가능하다.

## sort((a,b) ⇒ a-b)

```jsx
let a = [1, 12, 21, 130];
//오름차순
a.sort((a, b) => a - b); //[1,12,21,130]
//내림차순
a.sort((a, b) => b - a); //[130,21,12,1]

let b = ["caa", "abc", "bca", "bac"];
//오름차순
b.sort((a, b) => a - b); //["caa", "abc", "bca", "bac"]
//내림차순
b.sort((a, b) => b - a); //["caa", "abc", "bca", "bac"]
```

숫자 자체를 비교하고, a와 b위치에 따라 오름차순 내림차순으로 정렬된다. 쉽게 이해하려면 a가 앞에 있으면 오름차순이고, 뒤에 있으면 내림차순이다.

### 하지만, 이 방법으로는 문자열이 정렬 되지 않았다....

# 문자열을 정렬하는 방법

문자열을 오름차순으로 정렬하려면 sort()만 해줘도 가능하다. 하지만, 오름차순과 내림차순을 적용시키고 싶거나 문자열 중 특정 문자를 기준으로 정렬을 하고 싶다면 sort()만으로는 부족하다.

```jsx
let b = ["caa", "abc", "bca", "bac"];

//오름차순 - 사전식
b.sort((a, b) => a.localeCompare(b)); //["abc", "bac", "bca", "caa"]
//내림차순 - 사전식
b.sort((a, b) => b.localeCompare(a)); //["caa", "bca", "bac", "abc"]

//오름차순
b.sort((a, b) => a.charCodeAt() - b.charCodeAt()); //["abc", "bca", "bac", "caa"]
//내림차순
b.sort((a, b) => b.charCodeAt() - a.charCodeAt()); //["caa", "bca", "bac", "abc"]

//특정문자 기준으로 정렬
b.sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt()); //["abc", "bca", "bac", "caa"]
b.sort((a, b) => a[0].localeCompare(b[0])); //["abc", "bca", "bac", "caa"]
```

위 코드와 같이 charCodeAt과 localeCompare를 이용한 정렬 방법으로 문자열의 오름차순과 내림차순을 구현할 수 있다.
