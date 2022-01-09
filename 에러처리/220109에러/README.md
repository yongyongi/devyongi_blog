# 오늘의 에러

이미지를 첨부하고 싶지만, 개발중인 서비스라 문제가 된 부분을 직접 만들어서 추후에 이미지를 첨부해야겠다.

react-dnd를 사용하여서 폴더 기능을 만들고 있는 중인데 드래그 범위가 이상하다....

관련없는 코드를 다 생략하고, 밑에와 같이 useDrag hook을 사용하여 drag를 ref속성 값으로 전달을 해주면 해당 부분이 드래그가 되야한다.

```js
const [,drag] = useDrag(() => {
    ...
})

return (
    <Container ref={drag}>
        ...
    </Container>
)
```

하지만, 드래그 된 범위가 해당 태그가 아니라 화면의 1/4범위를 잡아서 엄청 광범위하게 드래그가 되었다. 노가다를 해봐야겠다는 생각이 들어 drag값을 하위 태그에 한번씩 다 넣어 보았고, ReactTooltip에서 발생하는 에러인 것을 찾아냈다.

해당 Container태그 안에서 ReactTooltip을 사용하고 있었는데 이 태그를 삭제하니 지정한 범위대로 드래그가 잘 되는것을 확인했다.

- 해결방법

정확히는 모르겠지만, ReactTooltip을 Container태그안에 작성하는것이 아니라 따로 분리를 해야하지 않을까라는 생각을 하였다.

ReactTooltip은 id값을 같게 한 태그에 대해서 tooltip이 뜨게 되어있기 때문에 굳이 Container안에 작성하지 않아도 된다. 그래서 따로 분리를 해주었더니 드래그 범위 에러가 해결이 되었다. 코드 구조는 아래와 같은 구조로 바꾸었다.

### 변경 전 구조

```js
import ReactTooltip from 'react-tooltip';

const [,drag] = useDrag(() => {
    ...
})

return (
    <Container ref={drag}>
        ...
        <ReactTooltip />
        <ReactTooltip />
    </Container>
)
```

### 변경 후 구조

```js
import ReactTooltip from 'react-tooltip';

const [,drag] = useDrag(() => {
    ...
})

return (
    <>
    <Container ref={drag}>
        ...
    </Container>
    <ReactTooltip />
    <ReactTooltip />
    </>
)
```
