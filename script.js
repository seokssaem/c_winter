// Chapter data
const chapterTitles = [
    'Code',  // Chapter 0
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

let currentChapter = 0;
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
            const chapterData = item.dataset.chapter;
            navigateToChapter(chapterData);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentChapter > 0) {
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
function navigateToChapter(chapterData) {
    let chapterNum, isProblems = false, chapterTitle;

    // Handle sub-chapters (e.g., "13-problems")
    if (typeof chapterData === 'string' && chapterData.includes('-problems')) {
        const parts = chapterData.split('-');
        chapterNum = parseInt(parts[0]);
        isProblems = true;
        chapterTitle = `${chapterTitles[chapterNum]} > 문제`;
    } else {
        chapterNum = typeof chapterData === 'string' ? parseInt(chapterData) : chapterData;
        chapterTitle = chapterTitles[chapterNum];
    }

    if (chapterNum < 0 || chapterNum > totalChapters) return;

    // Update current chapter
    currentChapter = chapterNum;

    // Update sidebar active state
    chapterItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.chapter === chapterData ||
            (typeof chapterData === 'number' && parseInt(item.dataset.chapter) === chapterData)) {
            item.classList.add('active');
            // Scroll item into view
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Update content title
    if (chapterNum === 0) {
        contentTitle.textContent = `${chapterTitle}`;
    } else {
        contentTitle.textContent = `Chapter ${String(chapterNum).padStart(2, '0')} - ${chapterTitle}`;
    }

    // Update content display
    const targetId = isProblems ? `chapter-${chapterNum}-problems` : `chapter-${chapterNum}`;
    chapterContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === targetId) {
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
    prevBtn.disabled = currentChapter === 0;
    nextBtn.disabled = currentChapter === totalChapters;
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Left arrow or 'p' for previous
    if ((e.key === 'ArrowLeft' || e.key === 'p') && currentChapter > 0) {
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
        navigateToChapter(0);
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


// Password mapping for each answer (DISABLED - passwords removed)
// const answerPasswords = {
//     'ch13-p1-answer': 'ch13p1',
//     'ch13-p2-answer': 'ch13p2',
//     'ch13-p3-answer': 'ch13p3',
//     'ch13-p4-answer': 'ch13p4',
//     'ch13-p5-answer': 'ch13p5',
//     'ch13-p6-answer': 'ch13p6',
//     'ch13-p7-answer': 'ch13p7',
//     'ch14-p1-answer': 'ch14p1',
//     'ch14-p2-answer': 'ch14p2',
//     'ch15-p1-answer': 'ch15p1',
//     'ch15-p2-answer': 'ch15p2',
//     'ch16-p1-answer': 'ch16p1',
//     'ch16-p2-answer': 'ch16p2'
// };


// Track which answers have been unlocked (DISABLED - no longer needed)
// const unlockedAnswers = new Set();

// Toggle function for problem content (PASSWORD PROTECTION REMOVED)
function toggleContent(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Simple toggle - no password required
    if (element.classList.contains('show')) {
        element.classList.remove('show');
    } else {
        element.classList.add('show');
    }
}
