# 이미지 폴더

이 폴더에 강의자료 이미지를 추가하세요.

## 파일명 규칙

- **형식**: `chapterXX_YY.png` (또는 .jpg, .jpeg)
- **XX**: 챕터 번호 (01-20)
- **YY**: 슬라이드 번호 (01, 02, 03...)

## 예시

```
images/
├── chapter01_01.png  # 챕터 1, 슬라이드 1
├── chapter01_02.png  # 챕터 1, 슬라이드 2
├── chapter01_03.png  # 챕터 1, 슬라이드 3
├── chapter02_01.png  # 챕터 2, 슬라이드 1
├── chapter02_02.png  # 챕터 2, 슬라이드 2
└── ...
```

## 이미지 추가 후

이미지를 추가한 후 `index.html` 파일에서 해당 챕터의 섹션에 이미지 태그를 추가하세요.

```html
<div class="image-container">
    <img src="images/chapter01_01.png" alt="C언어 소개 - 슬라이드 1" class="content-image">
</div>
```
