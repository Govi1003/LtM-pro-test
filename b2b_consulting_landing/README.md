# B2B 컨설팅 자문 랜딩페이지

## 파일 구성

- `prd.md`: 수정 완료된 랜딩페이지 기획서
- `design-options.md`: 디자인 시안 3가지와 최종 선택안
- `index.html`: 랜딩페이지 HTML
- `styles.css`: 스타일시트
- `script.js`: 인터랙션 스크립트
- `preview.png`: 브라우저 렌더링 확인용 스크린샷

## 실행 방법

1. 폴더에서 `index.html` 파일을 찾습니다.
2. 파일을 더블클릭해서 브라우저로 엽니다.
3. 모바일 화면 확인은 브라우저 개발자도구(F12)에서 기기 모드를 켜서 확인합니다.

## 상담 수신 이메일

`script.js` 파일의 `CONTACT_EMAIL` 값은 실제 상담 수신 이메일로 설정되어 있습니다.

```js
const CONTACT_EMAIL = 'yhjeon1003@gmail.com';
```

정적 페이지이므로 현재 상담 폼은 메일 앱을 여는 방식입니다. 실제 운영에서는 Formspree, Google Forms, Make/Zapier, 자체 백엔드 등으로 연결하면 됩니다.
