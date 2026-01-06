# C언어 방학특강 - 강의자료 웹페이지

C언어 방학특강을 위한 강의자료 웹페이지입니다. 20개의 챕터로 구성되어 있으며, 왼쪽 사이드바에서 챕터를 선택하면 오른쪽에 해당 내용이 표시됩니다.

## 📁 파일 구조

```
00_웹페이지/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 기능
├── README.md           # 이 파일
└── images/             # 강의자료 이미지 폴더
    ├── chapter01_01.png
    ├── chapter01_02.png
    ├── chapter02_01.png
    └── ...
```

## 🖼️ 이미지 파일 추가 방법

1. **images 폴더 생성**: 프로젝트 루트에 `images` 폴더를 만드세요.

2. **이미지 파일명 규칙**: 
   - 형식: `chapterXX_YY.png` (또는 .jpg, .jpeg)
   - XX: 챕터 번호 (01-20)
   - YY: 슬라이드 번호 (01, 02, 03...)
   - 예시: `chapter01_01.png`, `chapter01_02.png`, `chapter02_01.png`

3. **HTML에 이미지 추가**:
   각 챕터의 `<div class="chapter-content">` 섹션에 이미지를 추가하세요:

   ```html
   <div class="chapter-content" id="chapter-1">
       <div class="image-container">
           <img src="images/chapter01_01.png" alt="C언어 소개 - 슬라이드 1" class="content-image">
       </div>
       <div class="image-container">
           <img src="images/chapter01_02.png" alt="C언어 소개 - 슬라이드 2" class="content-image">
       </div>
       <!-- 필요한 만큼 추가 -->
   </div>
   ```

## ✨ 주요 기능

### 1. 챕터 네비게이션
- **사이드바 클릭**: 왼쪽 사이드바에서 챕터를 클릭하여 이동
- **이전/다음 버튼**: 헤더의 버튼으로 순차적 이동
- **키보드 단축키**:
  - `←` 또는 `P`: 이전 챕터
  - `→` 또는 `N`: 다음 챕터
  - `1-9`: 해당 번호 챕터로 직접 이동
  - `Home`: 첫 번째 챕터
  - `End`: 마지막 챕터

### 2. 이미지 확대
- 이미지를 클릭하면 전체 화면으로 확대됩니다
- 확대된 이미지를 다시 클릭하면 닫힙니다

### 3. 진행상황 저장 (선택사항)
- 마지막으로 본 챕터가 자동으로 저장됩니다
- `script.js`의 마지막 부분 주석을 해제하면 활성화됩니다

## 🎨 챕터 목록

1. C언어 소개
2. 개발환경 설정
3. 변수와 자료형
4. 연산자
5. 조건문 (if, switch)
6. 반복문 (for, while)
7. 배열
8. 함수
9. 포인터 기초
10. 포인터 심화
11. 문자열
12. 구조체
13. 파일 입출력
14. 동적 메모리 할당
15. 전처리기
16. 비트 연산
17. 자료구조 기초
18. 알고리즘 기초
19. 프로젝트 실습
20. 종합 정리

## 🚀 GitHub Pages 배포 방법

### 방법 1: GitHub 웹사이트에서 직접 업로드

1. GitHub에서 새 저장소 생성
2. 파일들을 저장소에 업로드
3. Settings → Pages → Source를 "main" 브랜치로 설정
4. 배포된 URL 확인

### 방법 2: Git 명령어 사용

```bash
# 저장소 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: C언어 방학특강 웹페이지"

# 원격 저장소 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/username/repository-name.git

# 푸시
git branch -M main
git push -u origin main
```

그 후 GitHub 저장소의 Settings → Pages에서 배포 설정을 하세요.

## 📱 반응형 디자인

- **데스크톱**: 사이드바와 콘텐츠가 나란히 표시
- **태블릿/모바일**: 사이드바가 상단에 표시되고 콘텐츠가 하단에 표시

## 🎯 커스터마이징

### 색상 변경
`styles.css`의 `:root` 섹션에서 CSS 변수를 수정하세요:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #0f172a;
    /* 기타 색상 변수들... */
}
```

### 챕터 제목 변경
`index.html`과 `script.js`의 `chapterTitles` 배열에서 수정하세요.

## 📄 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 💡 팁

- 이미지는 PNG 또는 JPG 형식을 권장합니다
- 이미지 크기는 1920x1080 이하를 권장합니다 (로딩 속도 최적화)
- 각 챕터별로 폴더를 만들어 관리할 수도 있습니다
- 챕터 제목은 자유롭게 수정 가능합니다

---

**제작**: C언어 방학특강 © 2026
