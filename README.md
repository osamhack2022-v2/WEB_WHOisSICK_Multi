# WEB_who_is_sick

## who_is_sick
아픈 사람? - 소규모 환자 추적-관리 웹 애플리케이션

## 프로잭트 소개
인원이 많지 않은 소초급의 부대에서는 증상이 심하지 않은 부상들이 관리되기 어렵습니다. 
[아픈 사람?]은 이러한 환자들의 진료신청을 받아 의무대/외진 상태 점검, 병력 조회등을 효율적으로 관리하게 만들어주는 웹 애플리케이션입니다. 

## 기능 설명
 -진료 희망자 : 관리자를 위한 메뉴로, 관리자 계정으로만 들어갈 수 있으며 그 외 사용자는 희망자가 현재 몇명 있는지 정도만 파악 가능합니다. 관리자 계정으로 접속 시에는 현재 몇명의 환자가 있는지, 환자명, 환자에게 입력받은 증세, 아픈부위, 자가문진표 등을 볼 수 있게 해줍니다.
 -진료 신청서 : 증세,아픈 부위, 자가문진표등을 입력받아 입력받은 데이터를 추후 간부 계정으로 진료 희망자를 조회하였을 때 보여줍니다.
 -환자조치내역: 현재 환자가 어떤 조치를 받았는지 입력받아 업데이트한 상태를 띄워줍니다.
 -추적 관리 : 진료 후 처방을 받았는지, 진료조차 받지 못했는지, 비슷한 증세를 겪고 있는 장병들이 많은지 등을 파악할 수 있습니다.
 
## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Server(back-end)
 -  nodejs, php, java 등 서버 언어 버전 
 - express, laravel, sptring boot 등 사용한 프레임워크 
 - DB 등 사용한 다른 프로그램 
 
### Front-end
 -  react.js, vue.js 등 사용한 front-end 프레임워크 
 -  UI framework
 - 기타 사용한 라이브러리

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
- 남  혁 (skagur10@naver.com), Github Id: skagur10
- 국동희 (luz0415@naver.com), Github Id: luz0415
- 서한유 (추가예정), Github Id: hu5678
- 정회륜 (추가예정), Github Id: superjeong

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)
