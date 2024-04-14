# web-component
## Web Component?
### 재사용할 수 있는 custom elements를 만들 수 있는 기술.
1. Custom elements
  - 사용자 정의 요소와 그 동작을 정의할 수 있는 JavaScript API.
2. Shadow DOM
  - Element에 캡슐화된 DOM 트리를 생성하기 위한 JavaScript API.
3. HTML template element
  - 마크업을 작성하고 재사용하기 위한 \<template\>과 \<slot\>요소.



### 사용
1. 사용자 정의 Element를 만듭니다. JavaScript class 문법을 사용합니다.
2. CustomElementRegistry.define() 메서드로 사용자 정의 Element를 등록합니다.
3. 필요한 경우
    - Shadow DOM을 연결합니다. (Element.attachShadow() 메서드 사용.)
    - 사용자 정의 Element를 template 요소를 사용해 만들 수 있습니다.


  
### 특징
1. 재사용과 기능 확장이 쉽습니다.
2. Shadow DOM tree의 요소들은 전역 script나 전역 style에 영향받지 않습니다.(캡슐화)



## 고려해야 할 사항
- IE 지원 불가. (polyfill 필요.)



## 참고자료
MDN Web Components
https://developer.mozilla.org/ko/docs/Web/API/Web_components

[영상] 깃헙 개발자들이 React 안쓰는 이유 : Web Component (코딩애플)
https://youtu.be/RtvSgptpfnY?si=CJv_ogh-DaPt9QQ1

[blog] How we use Web Components at GitHub
https://github.blog/2021-05-04-how-we-use-web-components-at-github/
