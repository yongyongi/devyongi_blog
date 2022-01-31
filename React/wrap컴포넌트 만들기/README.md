# warp 컴포넌트 만들기

리액트에서는 컴포넌트 단위로 코드를 분리할 수 있는데 자유도가 높기 때문에 기준이 정해져있지 않고 사람마다 나누는 범위가 다르다. 기본적으로 재사용 가능하거나 부분적인 단위로 컴포넌트를 다루는데 이번에 강의에서 wrap컴포넌트를 사용하는 법을 알게 되었다.

감싸는 용도로 컴포넌트를 만들겠다는 생각은 해보지 않았는데 역시 뭐든지 응용이 중요한 것 같다.

본론에 들어가보자.

```js
import React from "react";
import "./Expenses.css";

const Item = (props) => {
  return (
    <div className="item">
      <div>Contents</div>
    </div>
  );
};

export default Item;
```

```js
import React from "react";
import "./ExpenseItem.css";

const Container = (props) => {
  return (
    <div className="container">
      <div>Contents</div>
    </div>
  );
};

export default Container;
```

위와 같이 Container 컴포넌트와 item 컴포넌트가 있다고 치자.

두 컴포넌트 모두 카드형 모양으로 만들고 싶을 때 어떻게 해야할까? 당연히 각자의 css파일에 카드형에 맞는 css작업을 해야한다. 이럴 경우 각 파일에 중복되는 코드가 생기게 된다.

이 중복을 wrap 컴포넌트를 만들면서 해결할 수 있다.

```js
import React from "react";
import "./Card.css";

const Card = (props) => {
  const classes = `card ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
```

카드형이기 때문에 wrap 컴포넌트의 이름을 Card로 하였다. Card컴포넌트는 다른 컴포넌트의 감싸는 역할만 할거기 때문에 props.children을 사용하여서 원래의 내용은 그대로 가져온다.

class의 값을 `card ${props.className}` 이렇게 준 이유는 card라는 클래스 값에는 공통된 css코드를 적용 시켜주고, props.className은 같은 카드형이지만, 다르게 스타일링 할 부분을 가져와서 적용해주게 된다.

이제 이 Card컴포넌트를 import하여서 감싸주면 적용이 된다~!

```js
import React from "react";
import Card from "./Card";
import "./Expenses.css";

const Item = (props) => {
  return (
    <Card className="item">
      <div>Contents</div>
    </Card>
  );
};

export default Item;
```

```js
import React from "react";
import Card from "./Card";
import "./ExpenseItem.css";

const Container = (props) => {
  return (
    <Card className="container">
      <div>Contents</div>
    </Card>
  );
};

export default Container;
```
