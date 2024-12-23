# 한국 춘란 산채품 직거래 장터, 옥동

## 📖 개요
한국 춘란 산채품 직거래 장터, 옥동은 사용자가 산채품을 직거래로 거래할 수 있도록 돕는 웹 플랫폼입니다. 다양한 기기에서 최적화된 사용자 경험을 제공하며, 검색엔진 최적화를 통해 더 많은 사용자에게 서비스를 노출합니다.

## 🚀 배포 사이트
[옥동 바로가기](https://www.hyoungje.kr)

<br/>

## 🛠 기술 스택

### 프론트엔드
- **Javascript**, **Typescript**
- **React.js**, **Next.js**
- **TailwindCSS**, **MUI**

### 상태 관리 및 데이터 처리
- **React-query**
- **Zustand**

### 백엔드
- **Nest.js**
- **PostgreSQL**

### 배포 및 인프라
- **Github**, **AWS EC2**, **AWS ECR**
- **Docker**, **nginx**

<br/>

## 🌟 주요 기능 (Features)

### 1. RESTful API
- 안정적이고 확장 가능한 API 설계로 데이터 통신 최적화.

### 2. 배포 환경
- **AWS**와 **Docker**를 활용하여 프론트엔드, 백엔드 서버 및 데이터베이스 배포.
- 서비스의 확장성과 관리 효율성을 높임.

### 3. 게시판 기능
- **필터링** 및 **페이지네이션**을 제공하여 사용자가 원하는 게시물을 빠르게 찾을 수 있도록 지원.

### 4. 반응형 UI
- **TailwindCSS**를 활용하여 다양한 기기(데스크탑, 태블릿, 모바일)에서 일관된 사용자 경험 제공.

### 5. SEO 최적화
- **sitemap.xml**
  - Next.js의 sitemap.ts 파일 변환 라우트 핸들러로 동적 sitemap.xml 생성.
  - 검색 봇 크롤링을 최적화하여 검색 결과 노출 향상.
- **robots.txt**  
  - Next.js의 robots.ts 파일 변환 라우트 핸들러로 동적 robots.txt 생성.
  - 검색 봇 크롤링 허용 범위 설정.
- **검색 포털 사이트 등록**
  - Naver, Google, Daum에 sitemap.xml 및 robots.txt를 기반으로 검색 노출 신청 완료.  
  - 현재 주요 검색 포털 사이트에서 키워드 검색 시 확인 가능.

### 6. 메타데이터 관리
- **layout.tsx**를 활용하여 페이지별 메타데이터(title, description, open graph)를 설정.  
- **contents detail 페이지**  
  - 서버 데이터를 활용해 동적 메타데이터 구성으로 사용자 접근성 향상.

### 7. 분석 및 모니터링
- **Naver Search Advisor**, **Google Analytics**를 통합하여 사용자 유입 경로, 디바이스 등의 인사이트를 확보.

<br/>

## 🖥 배포 및 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/Dorabang/next-hyoungje-app.git
cd next-hyoungje-app
```

### 2. 로컬 실행
```bash
npm run dev
```
개발 서버: http://localhost:3000

<br/>
