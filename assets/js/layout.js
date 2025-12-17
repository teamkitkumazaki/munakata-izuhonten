document.addEventListener('DOMContentLoaded', () => {

  const scrollArea = document.querySelector('article');
  const sections = document.querySelectorAll('article section');
  let currentIndex = 0;
  let startY = 0;
  let endY = 0;
  let isAnimating = false;
  const backButton = document.getElementById('scrollTop');
  const outerWrapper = document.getElementById('outerWrapper');
  var initialHeight = window.innerHeight;

  function stopTouchMove(e) {
    e.preventDefault();
  }

  scrollToSection(0);

  // ------------------------------
  // 「TOPへ戻る」ボタンのクリック処理（fade風演出付き）
  // ------------------------------
  backButton.addEventListener('click', () => {
    const body = document.body;

    // フェードアウト
    body.style.transition = 'opacity 0.2s';
    body.style.opacity = '0';

    setTimeout(() => {
      scrollToSection(0);

      // フェードイン
      setTimeout(() => {
        body.style.transition = 'opacity 4s';
        body.style.opacity = '1';
      }, 200);
    }, 200);
  });


// ======= デバイス判定 =======
function detectMobile() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 900 // ← 幅でも判定してOK
  );
}

const isMobile = detectMobile();

// ======= 共通：スムーズスクロール関数 =======
function scrollToSection(index) {
  console.log('currentIndex:' + currentIndex);
  isAnimating = true;
  const start = window.scrollY;
  const section = document.querySelectorAll('section')
  let end;
  let duration;
  if (index === 0) {
    end = 0;
    duration = 1000;
  }else if(index === 1){
    end = window.innerHeight * 2.5;
    duration = 1500;
  } else {
    end = section[index].offsetTop + window.innerHeight / 1;
    duration = 2000;
  }
  console.log('end:' + end);
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // イージング（加速→減速）
    window.scrollTo(0, start + (end - start) * ease);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating = false;
    }
  }

  currentIndex = index;
  console.log('currentIndex:' + currentIndex);

  requestAnimationFrame(animate);
}

function scrollToSectionPc(index) {
  isAnimating = true;
  const start = window.scrollY;
  const section = document.querySelectorAll('section');
  let end;
  let duration;
  if (index === 0) {
    end = 0;
    duration = 1100;
  }else if(index === 1){
    end = window.innerHeight * 2;
    duration = 1100;
  } else {
    end = section[index].offsetTop + window.innerHeight;
    duration = 2000;
  }
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // イージング（加速→減速）
    window.scrollTo(0, start + (end - start) * ease);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating = false;
    }
  }

  currentIndex = index;
  console.log('currentIndex:' + currentIndex);

  requestAnimationFrame(animate);
}

if (isMobile) {

  let lastDirection = null;  // 前回のスワイプ方向（"up" or "down"）
  let directionLocked = false; // スクロール完了待ちフラグ

  // ======= 📱 スマホ：タッチスワイプ制御 =======
  outerWrapper.addEventListener('touchmove', stopTouchMove, { passive: false });

  outerWrapper.addEventListener('touchstart', e => {
    e.preventDefault();
    startY = e.touches[0].clientY;
  }, { passive: false });

  outerWrapper.addEventListener('touchend', e => {
    e.preventDefault();
    endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (Math.abs(deltaY) > 60) { // ← スワイプ閾値(px)
      if (deltaY < 0 && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (deltaY > 0 && currentIndex > 0) {
        currentIndex--;
      }
      scrollToSection(currentIndex);
    }
  }, { passive: false });

} else {
  let wheelTimeout;

  window.addEventListener('wheel', (e) => {
  if (isAnimating) return; // スクロール中は無視

  const delta = e.deltaY;
  const threshold = 1; // ← ホイール感度
  console.log('deltaY:' + delta);

  // スクロール開始時（最初の動き）で即発火
  if (Math.abs(delta) > threshold) {
    if (delta > 0 && currentIndex < sections.length - 1) {
      currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
      currentIndex--;
    }

    scrollToSectionPc(currentIndex);
  }
}, { passive: false });
}






  // ===============================
  // Loading Animation
  // ===============================
  function loadingAnimation() {
    console.log('loading');
    const duration = 1000;
    const duration2 = 2500;
    const loadingLogo = document.getElementById('loadingLogo');
    const loading = document.getElementById('loading');
    const article = document.querySelector('article');
    const body = document.body;

    loadingLogo.classList.add('load');
    loadingDelete();

    function loadingDelete() {
      console.log('loadingDelete');
      deleteState = 1;
      setTimeout(() => {
        loadingLogo.classList.remove('load');
        setTimeout(() => {
          loading.classList.add('loaded');
          article.classList.remove('loading');
          setTimeout(() => {
            body.classList.remove('bind');
          }, duration);
        }, duration);
      }, duration2);
    }
  }

  loadingAnimation();


  // ===============================
  // Scroll + Window Size Handler
  // ===============================
  function scrollAnimationSet(target) {
    const position = document.documentElement;
    let sectionTop = [];
    let indicatorButton = [];
    let ticking = false; // rAF制御
    let body = document.querySelector('body');
    let article = document.querySelector('article');


    // 初期レイアウト計測
    function calculateLayout() {

      // func-width-setter
      const widthSetters = target.querySelectorAll('.func-width-setter');
      widthSetters.forEach(el => {
        const targetWidth = el.offsetWidth;
        const parent = el.closest('div');
        if (parent) {
          parent.style.width = targetWidth + 'px';
        }
      });

      body.style.setProperty('--wHeight', window.innerHeight);
      body.style.setProperty('--wHeightPx', window.innerHeight + 'px');
      body.style.setProperty('--difference', window.innerHeight - initialHeight + 'px');
      /*body.style.setProperty('--aHeight', article.offsetHeight);*/
    }

    // スクロール時に実行
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }

    function updateScrollState() {
      const scrollY = window.scrollY;
      position.style.setProperty('--scrollPx', scrollY + 'px');
      position.style.setProperty('--scroll', scrollY);

      ticking = false;
    }

    function init() {
      window.scrollTo(0, 0);
      position.style.setProperty('--scrollPx', 0 + 'px');
      position.style.setProperty('--scroll', 0);
      body.style.setProperty('--wHeightFixed', window.innerHeight);
      body.style.setProperty('--wHeightFixedPx', window.innerHeight + 'px');

      if(window.innerHeight - initialHeight > 0){
        body.style.setProperty('--difference', window.innerHeight - initialHeight + 'px');
      }

      const sections = target.querySelectorAll('section');
      sectionTop = [];
      sections.forEach((section, index) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        sectionTop[index] = top;
        body.style.setProperty(`--topPx${index}`, `${Math.floor(top)}px`);
        body.style.setProperty(`--top${index}`, Math.floor(top));
      });

      calculateLayout();
      updateScrollState();
      body.style.setProperty('--wHeight', window.innerHeight);
      body.style.setProperty('--wHeightPx', window.innerHeight + 'px');
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      window.addEventListener('resize', calculateLayout);
    }

    init();
  }

  scrollAnimationSet(document.querySelector('article'));
});
