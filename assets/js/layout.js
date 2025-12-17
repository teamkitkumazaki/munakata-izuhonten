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
    const position = document.documentElement;
    let wHeight = window.innerHeight;
    let preSetWidth = window.innerWidth;
    let scrollCount = 0;

    // jQuery .offset().top の代替関数
    function getOffsetTop(el) {
      const rect = el.getBoundingClientRect();
      return rect.top + window.pageYOffset;
    }

    function setHeightProperty() {
      wHeight = window.innerHeight;

      position.style.setProperty('--wHeight', window.innerHeight);
      position.style.setProperty('--wHeightPx', window.innerHeight + 'px');
      position.style.setProperty('--scroll', window.scrollY);

      requestAnimationFrame(setHeightProperty);

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


});
