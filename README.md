# WEB_who_is_sick
![logo](/web/wis/src/data/logo.png)

## 목차

1. [프로잭트 소개](#프로잭트-소개)
2. [기능 설명](#기능-설명)
3. [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#컴퓨터-구성--필수-조건-안내-prerequisites)
4. [기술 스택](#기술-스택-technique-used)
5. [설치 안내](#설치-안내-installation-process)
6. [프로젝트 사용법](#프로젝트-사용법-getting-started)
7. [팀 정보](#팀-정보-team-information)
8. [저작권 및 사용권 정보](#저작권-및-사용권-정보-copyleft--end-user-license)

## who_is_sick
아픈 사람? - 소규모 환자 추적-관리 웹 애플리케이션

## 프로잭트 소개
인원이 많지 않은 소초급의 부대에서는 증상이 심하지 않은 부상들이 관리되기 어렵습니다. 
[아픈 사람?]은 이러한 환자들의 진료신청을 받아 의무대/외진 상태 점검, 병력 조회등을 효율적으로 관리하게 만들어주는 웹 애플리케이션입니다. 

## 기능 설명
   
 - 기능은 총 4가지 탭으로 구성되어 있습니다.
<img src = "https://user-images.githubusercontent.com/101463561/198821954-a7f4b1fa-dd26-4e5c-8498-005b036c88b1.png" height = 40>

### 기본인터페이스
-----------------
 |로그인 : JsonWepToken 방식으로 로그인을 구현하였습니다.|회원가입 : 간부/병사를 구분하여 회원가입합니다.|
 |-----------------------------------|-----------------------|
|<img src = "https://user-images.githubusercontent.com/101463561/198821356-0256f44e-3831-47d4-900c-59263f0bc49e.png" height = 300>|<img src = "https://user-images.githubusercontent.com/101463561/198821313-1fc23703-7731-4be2-93a8-4271bf371574.png" height = 300>|

### 진료 희망자
---------------
 - 현재 몇명의 환자가 있는지, 환자명, 환자에게 입력받은 증세, 아픈부위 등을 볼 수 있게 해줍니다.
 ![image](https://user-images.githubusercontent.com/101463561/198833995-21bd2760-bd87-4b96-a5dc-e3aa8820055a.png)


### 진료 신청서 
----------------------------
증세,아픈 부위, 자가문진표등을 입력받아 입력받은 데이터를 추후 간부 계정으로 진료 희망자를 조회하였을 때 보여줍니다.
|<img src = "https://user-images.githubusercontent.com/101463561/198821972-8a1ce5e2-caf0-44c6-aead-12dd153e3cab.png" height = 600>|<img src = "https://user-images.githubusercontent.com/101463561/198822083-ad07aa8a-bbc2-4c36-9aea-e05370b1294e.png" height = 600>|
|---|---|
 
 ### 환자조치내역
----------------------------
 
 - 환자조치내역: 현재 환자가 어떤 조치를 받았는지 입력받아 업데이트한 상태를 띄워줍니다.
 
 ### 추적 관리
----------------------------
 - 추적 관리 : 진료 후 처방을 받았는지, 진료조차 받지 못했는지, 비슷한 증세를 겪고 있는 장병들이 많은지 등을 파악할 수 있습니다.
 
## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Back-end(Server,DataBase)

 |[NodeJs 16.18.0](https://nodejs.org/ko/)|[Express 4.18.2](https://expressjs.com/ko/)|[MongoDB 6.0](https://www.mongodb.com/)|
 |:-------------------:|:--------------------:|:-------------------:|
 [<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png" height = 100>](https://nodejs.org/ko/)|[<img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" height = 100>](https://expressjs.com/ko/)|[<img src ="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" height = 100>](https://www.mongodb.com/)
 |서버 구현 | 서버 구현 |NoSQL Database|


### Front-end

 |[React Js 18.2.0](https://ko.reactjs.org/)|[Figma](https://www.figma.com/)|[Meterial UI 4.11.5](https://mui.com/)|
 |:-------------------:|:--:|:------------------:|
 [<img src = "https://reactjs.org/logo-og.png" height = 200>](https://ko.reactjs.org/)|[<img src = "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" height = 200>](https://www.figma.com/)|[<img src ="https://mui.com/static/logo.png" height = 200>](https://mui.com/)
 |CRA(Create-React-App)사용|UI/UX 퍼블리싱|UI/UX 프레임워크|

## 설치 안내 (Installation Process)
```bash
$ git clone git주소
$ yarn or npm install
$ yarn start or npm run start
```

## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**

잘 모를 경우
구글 검색 - 마크다운 문법
[https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017](https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017)

 편한 마크다운 에디터를 찾아서 사용
 샘플 에디터 [https://stackedit.io/app#](https://stackedit.io/app#)
 
## 팀 정보 (Team Information)
### 절대멀티
|이름|Email|Github Id|파트|
|--------|----------------|--------------------|----|
|서한유(팀장) |hu8232@naver.com|hu5768|프론트엔드/UI,UX디자인|
|정회륜 |asss6868@naver.com|superjeong|프론트엔드/UI,UX디자인|
|남  혁 |skagur10@naver.com|skagur10|백엔드|
|국동희 |luz0415@naver.com|luz0415|파견으로 인한 하차|
## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)
