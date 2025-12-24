document.addEventListener('DOMContentLoaded', () => {
  console.log('layout.js');

  // ================================
  // タブレットレイアウトをPCと統一
  // ================================
  const metaDiscre = document.head.children;
  const metaLength = metaDiscre.length;

  if (window.outerWidth > 700 && window.outerWidth < 1250) {
    for (let i = 0; i < metaLength; i++) {
      const proper = metaDiscre[i].getAttribute('name');
      if (proper === 'viewport') {
        const dis = metaDiscre[i];
        dis.setAttribute('content', 'width=1440');
      }
    }
  }

  // ================================
  // トップに戻るボタン + スクロール + ウィンドウサイズ系の対策処理
  function scrollAnimationSet(target) {
    const scButtonWrap = document.querySelector('#scrollTopWrap');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const position = document.documentElement;
    let wHeight = window.innerHeight;
    let preSetWidth = window.innerWidth;
    let scrollCount = 0;

    let footerTop;

    // jQuery .offset().top の代替関数
    function getOffsetTop(el) {
      const rect = el.getBoundingClientRect();
      return rect.top + window.pageYOffset;
    }

    function setHeightProperty() {
      wHeight = window.innerHeight;
      footerTop = footer.getBoundingClientRect().top + window.scrollY;
      position.style.setProperty('--wHeight', window.innerHeight);
      position.style.setProperty('--wHeightPx', window.innerHeight + 'px');
      position.style.setProperty('--scroll', window.scrollY);

      requestAnimationFrame(setHeightProperty);

      if (document.getElementById('index')) {
        if (window.scrollY > window.innerHeight) {
          header.classList.remove('index');
        } else {
          header.classList.add('index');
        }
      }

      if (window.scrollY > footerTop) {
        header.classList.add('index2');
      } else {
        header.classList.remove('index2');
      }

      // jQuery $(".effect").each()
      document.querySelectorAll('.effect').forEach(function(el) {
        const imgPos = getOffsetTop(el);
        const scroll = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scroll > imgPos - windowHeight + windowHeight / 7) {
          el.classList.remove('effect');

          setTimeout(function() {
            el.classList.add('effect2');
          }, 500);
        }
      });
    }

    function setProperties() {
      setHeightProperty();
    }

    function init() {
      function scrollTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      let timer = false;

      setProperties();

      position.style.setProperty('--wHeightFixedPx', window.innerHeight + 'px');
      position.style.setProperty('--wHeightFixed', window.innerHeight + 'px');

      setProperties();
    }

    init();
  }

  // 元コードの scrollAnimationSet($('article')) に対応
  scrollAnimationSet(document.querySelector('article'));


  // ================================
  // ハンバーガーメニュー開閉
  // ================================
  function humMenuToggle() {
    const humButton = document.getElementById('humButton');
    const humMenu = document.getElementById('hummenu');
    const header = document.getElementById('header');
    let menuState = 0;
    let currentScrollY = 0;

    function humMenuShift() {
      const body = document.body;
      if (menuState === 0) {
        currentScrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${currentScrollY}px`;
        body.classList.add('fixed');
        humMenu.classList.add('open');
        header.classList.add('hum_open');
        menuState = 1;
      } else {
        body.classList.remove('fixed');
        body.style.position = '';
        body.style.top = '';
        humMenu.classList.remove('open');
        header.classList.remove('hum_open');
        window.scrollTo(0, currentScrollY);
        menuState = 0;
      }
    }

    function init() {
      if (humButton) {
        humButton.addEventListener('click', humMenuShift);
      }
    }

    init();
  }

  humMenuToggle();

  // ===============================
  // ローディングアニメーション
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
          loadingKvShifter();
          setTimeout(() => {
            body.classList.remove('bind');
          }, duration);
        }, duration);
      }, duration2);
    }
  }

  loadingAnimation();


  // ===============================
  // トップページ MVスライダー
  // ===============================
  function loadingKvShifter() {
    const slider = document.getElementById('loadingImgBox');
    const slides = slider.querySelectorAll('li');
    const sliderLength = slides.length;
    let current = 0;
    let timeId;
    const interval = 3000;

    // スライド状態を変更
    function slideChange(index) {
      // 全ての display_slide を削除
      slider.querySelectorAll('.display_slide').forEach(el => {
        el.classList.remove('display_slide');
      });

      // 対象のスライドにクラスを追加
      const target = slider.querySelector('.slide' + index);
      if (target) {
        target.classList.add('display_slide');
      }

      current = index;
      startAuto(); // 次のスライド切り替え予約
    }

    // スライド自動切り替え
    function changeState() {
      current = (current + 1) % sliderLength;
      slideChange(current);
    }

    function startAuto() {
      clearTimeout(timeId); // 前のタイマーをクリア
      timeId = setTimeout(changeState, interval);
    }

    // 初期化処理
    function init() {
      slides.forEach((li, index) => {
        li.classList.add('slide' + index);
        if (index === 0) {
          li.classList.add('display_slide');
        }
      });
      startAuto();
    }

    init();
  }

  // id="loadingImgBox" がある場合、1秒後に起動
  if (document.getElementById('loadingImgBox')) {
    /* setTimeout(() => {
      loadingKvShifter();
    }, 1000); */
  }


});
