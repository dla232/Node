## 버전

- - -

node : v14.18.0 ( https://nodejs.org/ko/download/releases/ 접속 후 version 14 검색하여 설치 )
npm : 6.14.15 ( npm i -g npm@6.14.15 or npm i -g npm@6 )

- - -


## 세팅설명

- - - 

1. 해당폴더를 복사하여 개인 프로젝트에 붙여넣기
2. 터미널에 "npm i" or "npm install" 로 모듈 설치 (설치 오류 시 위에 node및 npm 버전을 맞춰주세요)
3. webpack.config.js 를 열어 아래 변수작성 ( 해당 설명 주석처리 )

    + const pageTitle
    + const sPath
    + const lwiPath
    + const projcetYear
    + const projcetDate
    + const projectName
    + const _hash

4. npm run start 로 dev서버 실행 후 작업
5. npm run build 명령어로 상위 dist폴더에 작업물 추출

- - - 

** meta이미지 존재하지 않는 프로젝트일때 index.html파일에서 꼭 삭제할 것 **