// Chapter data
const chapterTitles = [
    '개발환경 설정',
    'C언어 소개',
    '변수와 자료형',
    '기본 입출력함수',
    '연산자',
    '조건문',
    '반복문',
    '1차원배열',
    '포인터의 소개',
    '포인터와 배열의 관계',
    '다차원 배열',
    '문자열',
    '사용자함수',
    '포인터심화',
    '메모리동적할당',
    '구조체'
];

let currentChapter = 1;
const totalChapters = 16;

// DOM Elements
const chapterItems = document.querySelectorAll('.chapter-item');
const contentTitle = document.getElementById('content-title');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const chapterContents = document.querySelectorAll('.chapter-content');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeChapterNavigation();
    updateNavigationButtons();

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Initialize chapter navigation
function initializeChapterNavigation() {
    chapterItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const chapterNum = parseInt(item.dataset.chapter);
            navigateToChapter(chapterNum);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentChapter > 1) {
            navigateToChapter(currentChapter - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentChapter < totalChapters) {
            navigateToChapter(currentChapter + 1);
        }
    });
}

// Navigate to specific chapter
function navigateToChapter(chapterNum) {
    if (chapterNum < 1 || chapterNum > totalChapters) return;

    // Update current chapter
    currentChapter = chapterNum;

    // Update sidebar active state
    chapterItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.chapter) === chapterNum) {
            item.classList.add('active');
            // Scroll item into view
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Update content title
    contentTitle.textContent = `Chapter ${String(chapterNum).padStart(2, '0')} - ${chapterTitles[chapterNum - 1]}`;

    // Update content display
    chapterContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === `chapter-${chapterNum}`) {
            content.classList.remove('hidden');
        }
    });

    // Update navigation buttons
    updateNavigationButtons();

    // Scroll content to top
    document.getElementById('content-body').scrollTop = 0;

    // Add smooth transition effect
    const contentBody = document.getElementById('content-body');
    contentBody.style.opacity = '0';
    setTimeout(() => {
        contentBody.style.transition = 'opacity 0.3s ease-in-out';
        contentBody.style.opacity = '1';
    }, 50);
}

// Update navigation button states
function updateNavigationButtons() {
    prevBtn.disabled = currentChapter === 1;
    nextBtn.disabled = currentChapter === totalChapters;
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Left arrow or 'p' for previous
    if ((e.key === 'ArrowLeft' || e.key === 'p') && currentChapter > 1) {
        navigateToChapter(currentChapter - 1);
    }
    // Right arrow or 'n' for next
    else if ((e.key === 'ArrowRight' || e.key === 'n') && currentChapter < totalChapters) {
        navigateToChapter(currentChapter + 1);
    }
    // Number keys 1-9 for direct navigation
    else if (e.key >= '1' && e.key <= '9') {
        const chapterNum = parseInt(e.key);
        if (chapterNum <= totalChapters) {
            navigateToChapter(chapterNum);
        }
    }
    // Home key for first chapter
    else if (e.key === 'Home') {
        navigateToChapter(1);
    }
    // End key for last chapter
    else if (e.key === 'End') {
        navigateToChapter(totalChapters);
    }
}

// Image zoom functionality
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.content-image');

    images.forEach(img => {
        img.addEventListener('click', () => {
            toggleImageZoom(img);
        });
    });
});

function toggleImageZoom(img) {
    // Create overlay if it doesn't exist
    let overlay = document.getElementById('image-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'image-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: zoom-out;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;

        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        });

        document.body.appendChild(overlay);
    }

    // Clone and add image
    const clonedImg = img.cloneNode();
    clonedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    `;

    overlay.innerHTML = '';
    overlay.appendChild(clonedImg);

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
}

// Progress tracking (optional - can be used to save user progress)
function saveProgress() {
    localStorage.setItem('c-course-progress', currentChapter);
}

function loadProgress() {
    const savedChapter = localStorage.getItem('c-course-progress');
    if (savedChapter) {
        navigateToChapter(parseInt(savedChapter));
    }
}

// Auto-save progress when changing chapters
const originalNavigateToChapter = navigateToChapter;
navigateToChapter = function (chapterNum) {
    originalNavigateToChapter(chapterNum);
    saveProgress();
};

// Load saved progress on page load
window.addEventListener('load', () => {
    // Uncomment to enable auto-load of saved progress
    // loadProgress();
});
