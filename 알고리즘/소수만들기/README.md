# 프로그래머스 소수 만들기

[프로그래머스 소수만들기](https://programmers.co.kr/learn/courses/30/lessons/12977)

## 문제 설명

숫자가 담긴 배열에서 서로 다른 3개의 숫자의 합이 소수인 경우의 개수를 구하는 문제이다.

ex) [1,2,3,4]이 주어지면, 1+2+4 = 7 의 경우만 소수이기 때문에 1을 리턴해야한다.

우선 3개의 숫자를 조합해서 나올 수 있는 합을 알아야하기 때문에 3중 for문을 사용하였다. 그리고 isPrime이라는 소수판별 함수를 만들어 3개 숫자의 합이 만들어질때, isPrime의 인자로 넣었다. 이렇게 되면 isPrime의 결과로 소수이면 true, 소수가 아니면 false가 나오게 된다. 그래서 true가 나올때마다 result값을 하나씩 증가시켜 마지막에 result를 리턴하였다.

```js
function solution(nums) {
  //1. 3중 for문을 사용하여 nums배열의 3개 숫자의 합들을 구한다.
  //2. 소수판별 함수를 만들어 true이면 result++를 한다.
  //3. result를 리턴한다.

  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        let sum = nums[i] + nums[j] + nums[k];
        if (isPrime(sum)) result++;
      }
    }
  }
  return result;
}

// 소수 판별 함수
function isPrime(num) {
  for (let i = 2; i <= parseInt(Math.sqrt(num), 10); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
```
