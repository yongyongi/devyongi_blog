# VSC에서 react사용시 html태그 자동완성

리액트를 사용하면서 매번 `<div></div>` 이렇게 태그를 만들어줘야했다.

태그를 한페이지에만 수십개 쓰는 경우도 있기 때문에 이 과정이 너무 귀찮아서 구글링을 해보니, vsc에서 지원해주는 플러그인으로 html파일에서는 h1, div 이런식으로만 작성해도 태그가 자동완성이 되지만, react에서는 따로 설정을 해줘야했다.

진짜 간단하다.

1. vsc창 왼쪽 하단에 설정 아이콘을 누른 후, setting을 누른다.
2. 오른쪽 상단의 open setting을 누르면 json파일이 띄워진다.
3. 밑에 코드만 추가해주면 셋팅 끝!
   ```json
   "emmet.includeLanguages": {
   "javascript": "javascriptreact"
   }
   ```

이제는 react에서도 div라 치고 엔터를 누르면 태그가 자동으로 만들어진다!
