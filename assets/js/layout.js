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
  // アンカーリンクを全て再読み込みに変更
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const hash = this.getAttribute('href');
      console.log('hash:' + hash);
      const baseUrl = location.href.split('#')[0];

      location.href = baseUrl + hash;
    });
  });

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

  if (document.getElementById('index')) {
    loadingAnimation();
  };


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


  // ===============================
  // トップページ インスタグラム埋め込み表示
  // ===============================

  function displayInstagramFeed() {
    const accessToken = 'IGAAVZCjIy21r9BZAGFHaThmYVVkblpDdHVHcWlQX0tCWXk1VEdQc3VYLVZAOXzE3ZATRINVk0ZAVphVU1JQWpXelRmdGF5ZAzZA5OU5XVjYzcl81aFRvbUh6TmotNXQxTDV2elR3aDY2VDVGeEV2ejNqS0NXSzNhVlk0bXIwQlE1cFhOYwZDZD'; // ←ここにアクセストークンを入れる
    const apiUrl = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=' + accessToken;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const feed = document.getElementById('insta-feed');
        const posts = data.data.slice(0, 20); // 最新15件
        console.table(posts);
        posts.forEach(post => {
          if (post.media_url.indexOf('jpg') != -1) {
            const postHTML = `<div class="insta-post"><a href="${post.permalink}" target="_blank" rel="noopener"><img src="${post.media_url}" alt="${post.caption}"></a></div>`;
            feed.insertAdjacentHTML('beforeend', postHTML);
          }
        });
      })
      .catch(err => {
        console.error('Instagramフィードの取得に失敗しました:', err);
      });
  }

  if (document.getElementById('insta-feed')) {
    displayInstagramFeed();
  }

  // ===============================
  // トップページ noteの埋め込み表示
  // ===============================
  function displayNoteFeed() {
    const USER_ID = "izu_munakata"; // noteユーザーID
    const RSS_URL = "https://note.com/" + USER_ID + "/rss";

    // CORSプロキシ（優先順）
    const PROXIES = [
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest=",
      "https://thingproxy.freeboard.io/fetch/"
    ];

    /**
     * プロキシを順番に試す fetch
     */
    function fetchWithFallback(url, proxies) {
      if (!proxies.length) {
        return Promise.reject(new Error("All proxies failed"));
      }

      const proxy = proxies[0];

      return fetch(proxy + encodeURIComponent(url))
        .then(function(res) {
          if (!res.ok) throw new Error("Fetch failed");
          return res.text();
        })
        .catch(function() {
          // 次のプロキシで再試行
          return fetchWithFallback(url, proxies.slice(1));
        });
    }

    /**
     * RSSを取得して描画
     */
    fetchWithFallback(RSS_URL, PROXIES)
      .then(function(xmlString) {
        const xml = new DOMParser().parseFromString(xmlString, "text/xml");
        const items = Array.from(xml.querySelectorAll("item")).slice(0, 4);

        let html = "";

        items.forEach(function(item) {
          const titleEl = item.querySelector("title");
          const linkEl = item.querySelector("link");
          const dateEl = item.querySelector("pubDate");

          const title = titleEl ? titleEl.textContent : "";
          const link = linkEl ? linkEl.textContent : "";
          const pubDate = dateEl ? dateEl.textContent : "";

          // note特有：<media:thumbnail> はテキストノード
          const thumbNode = item.getElementsByTagName("media:thumbnail")[0];
          const thumbnail = thumbNode ? thumbNode.textContent.trim() : "";

          html += `
          <div class="journal_item">
            <a href="${link}" target="_blank" rel="noopener">
              ${thumbnail ? `
                <span class="img_wrap">
                <img src="${thumbnail}" alt="${title}">
                </span>
              ` : ``}
              <span class="ttl_wrap">
              <span class="date">${new Date(pubDate).toLocaleDateString()}</span>
              <span class="ttl">${title}</span>
            </span>
          </a>
          </div>
        `;
        });

        const container = document.getElementById("noteFeed");
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch(function(err) {
        console.error("note RSS error:", err);
      });
  }

  if (document.getElementById('noteFeed')) {
    displayNoteFeed();
  }





  // ===============================
  // アンカーリンク
  // ===============================
  function indexAnker(target) {
    const ankerButtons = target.querySelectorAll('.func-anker-link');
    const scrollTargets = [];

    // スクロール処理
    function windowMove(index) {
      const targetSelector = scrollTargets[index];
      const scrollToElement = document.querySelector(targetSelector);
      if (scrollToElement) {
        const top = scrollToElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    }

    // 初期化処理
    function init() {
      ankerButtons.forEach((btn, index) => {
        const jumpSelector = btn.getAttribute('jump');
        scrollTargets[index] = jumpSelector;

        btn.addEventListener('click', function(e) {
          e.preventDefault(); // 必要であれば
          windowMove(index);
        });
      });
    }

    init();
  }

  // 'product' 要素が存在する場合に発火
  if (document.getElementById('product')) {
    const article = document.querySelector('article');
    if (article) {
      indexAnker(article);
    }
  }

  /**
   * 施設マップイラスト
   */
  function animateFacilityMap() {
    const facilityMap = document.getElementById('facilityMap');
    if (!facilityMap) return;

    const facilityImg = Array.from(facilityMap.querySelectorAll('.img_item'));
    const mapButton = Array.from(facilityMap.querySelectorAll('button'));

    /**
     * 表示切り替え
     */
    function changeMapImg(index) {
      facilityImg.forEach(img => {
        img.classList.remove('active_img');
      });

      mapButton.forEach(btn => {
        btn.classList.remove('active_button');
      });

      if (facilityImg[index]) {
        facilityImg[index].classList.add('active_img');
      }
      if (mapButton[index]) {
        mapButton[index].classList.add('active_button');
      }
    }

    /**
     * 初期化
     */
    function init() {
      mapButton.forEach((button, index) => {
        console.log(index);

        button.addEventListener('click', function() {
          changeMapImg(index);
        });

        button.addEventListener('mouseover', function() {
          changeMapImg(index);
        });

        button.addEventListener('mouseout', function() {
          changeMapImg(0);
        });
      });
    }

    init();
  }

  // DOMに #facilityMap があれば実行
  if (document.getElementById('facilityMap')) {
    animateFacilityMap();
  }


});
