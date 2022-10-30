# WEB_who_is_sick
![logo](/web/wis/src/data/logo.png)

# 목차

1. [프로잭트 소개](#프로잭트-소개)
2. [기능 설명](#기능-설명)
3. [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#컴퓨터-구성--필수-조건-안내-prerequisites)
4. [기술 스택](#기술-스택-technique-used)
5. [설치 안내](#설치-안내-installation-process)
6. [프로젝트 사용법](#프로젝트-사용법-getting-started)
7. [팀 정보](#팀-정보-team-information)
8. [저작권 및 사용권 정보](#저작권-및-사용권-정보-copyleft--end-user-license)

# who_is_sick
아픈 사람? - 소규모 환자 추적-관리 웹 애플리케이션

# 프로잭트 소개
인원이 많지 않은 소초급의 부대에서는 증상이 심하지 않은 부상들이 관리되기 어렵습니다. 
[아픈 사람?]은 이러한 환자들의 진료신청을 받아 의무대/외진 상태 점검, 병력 조회등을 효율적으로 관리하게 만들어주는 웹 애플리케이션입니다. 

# 기능 설명
   
 - 기능은 총 4가지 탭으로 구성되어 있습니다.
<img src = "https://user-images.githubusercontent.com/101463561/198821954-a7f4b1fa-dd26-4e5c-8498-005b036c88b1.png">

## 기본인터페이스
-----------------
 |로그인 : JsonWepToken 방식으로 로그인을 구현하였습니다.|회원가입 : 간부/병사를 구분하여 회원가입합니다.|
 |-----------------------------------|-----------------------|
|<img src = "https://user-images.githubusercontent.com/101463561/198821356-0256f44e-3831-47d4-900c-59263f0bc49e.png">|<img src = "https://user-images.githubusercontent.com/101463561/198821313-1fc23703-7731-4be2-93a8-4271bf371574.png" >|

## 진료 희망자
---------------
 - 현재 몇명의 환자가 있는지, 환자명, 환자에게 입력받은 증세, 아픈부위 등을 볼 수 있게 해줍니다.
 ![image](https://user-images.githubusercontent.com/101463561/198835823-5e37ad02-ad1d-40e5-a7c6-ecdaf169953c.png)

## 진료 신청서 
----------------------------
증세,아픈 부위, 자가문진표등을 입력받아 입력받은 데이터를 추후 간부 계정으로 진료 희망자를 조회하였을 때 보여줍니다.
|<img src = "https://user-images.githubusercontent.com/101463561/198821972-8a1ce5e2-caf0-44c6-aead-12dd153e3cab.png" >|<img src = "https://user-images.githubusercontent.com/101463561/198822083-ad07aa8a-bbc2-4c36-9aea-e05370b1294e.png" >|
|---|---|
 
## 환자조치내역
----------------------------
 
 - 환자조치내역: 승인/미승인을 받은 날짜, 환자가 어떤 조치를 받았는지에 대한 정보를 띄워줍니다.

|![image](https://user-images.githubusercontent.com/101463561/198835874-4fcfe4d4-e921-4877-82cf-60f62fc95338.png)|
|---------------------------------------------------------------------------|
|![image](https://user-images.githubusercontent.com/101463561/198836194-8d70ac9e-3649-4e5e-b7f7-c83e164a765d.png)|


## 추적 관리
----------------------------
 - 추적 관리 : 진료 후 처방을 받았는지, 진료조차 받지 못했는지, 비슷한 증세를 겪고 있는 장병들이 많은지 등을 파악할 수 있습니다.


|진료 신청 후 대기중(2)|진료 신청 수렴(1)|진료 신청 반려(0)|
|----------|---------|-------|
|**진료 결과 입력 대기중(3)**|**진료 반려(4)**|**진료완료(5)**|

![image](https://user-images.githubusercontent.com/101463561/198836285-37ecf4a5-31da-46f8-9318-3d02737ebed4.png)
 
# 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용

  <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png" height = 10, width = 10>   권장: Google Chrome V77 이상 


# 기술 스택 (Technique Used) 
## Back-end(Server,DataBase)

 |[NodeJs 16.18.0](https://nodejs.org/ko/)|[Express 4.18.2](https://expressjs.com/ko/)|[MongoDB 6.0](https://www.mongodb.com/)|
 |:-------------------:|:--------------------:|:-------------------:|
 [<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png" width = 100%>](https://nodejs.org/ko/)|[<img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = 100%>](https://expressjs.com/ko/)|[<img src ="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" width = 50%>](https://www.mongodb.com/)
 |서버 구현 | 서버 구현 |NoSQL Database|


## Front-end

 |[React Js 18.2.0](https://ko.reactjs.org/)|[Figma](https://www.figma.com/)|[Meterial UI 4.11.5](https://mui.com/)|
 |:-------------------:|:--:|:------------------:|
 [<img src = "https://reactjs.org/logo-og.png" width = 100%>](https://ko.reactjs.org/)|[<img src = "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" width = 30%>](https://www.figma.com/)|[<img src ="https://mui.com/static/logo.png" width = 100%>](https://mui.com/)
 |CRA(Create-React-App)사용|UI/UX 퍼블리싱|UI/UX 프레임워크|

# 설치 안내 (Installation Process)
```bash
$ git clone https://github.com/osamhack2022-v2/WEB_WHOisSICK_Multi.git

backend
$ npm install argon2 concurrently config cookie-parser cors dotenv express jsonwebtoken mongoose nodemon
$ npm run start

frontend
$ npx create-react-app
$ npm install react styled-components web-vitals
$ npm run start
```
front) web->wis->에서 npmstart   
<img src = "https://user-images.githubusercontent.com/55342653/198836996-e636394b-642b-4a71-a397-f48ee5ccfa37.png" width = 50%>   
back) web->backend->에서 npmstart   
<img src = "https://user-images.githubusercontent.com/55342653/198837019-02c59fb3-71ac-4cba-86db-fda72d9b5fcc.png" width = 50%>   

# 프로젝트 사용법 (Getting Started)
   1. 회원가입->로그인
   2. [진료희망자][진료신청][조치내역][추적관리]
   3. 각 탭에서 원하는 정보 확인,혹은 동작실행

# 팀 정보 (Team Information)
## 절대멀티
|이름|Email|Github Id|파트|
|--------|----------------|--------------------|----|
|서한유(팀장) |hu8232@naver.com|hu5768|프론트엔드/UI,UX디자인|
|정회륜 |asss6868@naver.com|superjeong|프론트엔드/UI,UX디자인|
|남  혁 |skagur10@naver.com|skagur10|백엔드|
|국동희 |luz0415@naver.com|luz0415|파견으로 인한 하차|
# 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
