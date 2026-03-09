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
    console.log('displayNoteFeed');
    const USER_ID = "izu_munakata"; // noteユーザーID
    const RSS_URL = "https://note.com/" + USER_ID + "/rss";

    // CORSプロキシ（優先順）
    const PROXIES = [
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest=",
      "https://thingproxy.freeboard.io/fetch/"
    ];

    // プロキシリストを消して、作成したGASのURLを入れる
    const GAS_URL = "https://script.google.com/macros/s/AKfycbzYM0qL9g78-uLqicqYSy6pIi8SwaTxRzWbl4v3_k66pi9Bwo87LnXZ1tOO9bb1KOUE/exec";

    function fetchWithFallback(url) {
      // 自分のGASだけを叩くようにシンプル化
      return fetch(GAS_URL)
      .then(function(res) {
        if (!res.ok) throw new Error("Fetch failed");
        return res.text();
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

  /** * 施設マップイラスト */

  function animateFacilityMap() {
    const facilityMap = document.getElementById('facilityMap');
    if (!facilityMap) return;

    const facilityImg = Array.from(facilityMap.querySelectorAll('.img_item'));
    const mapButton = Array.from(facilityMap.querySelectorAll('button'));

    const facilityPop = document.getElementById('facilityPop');
    const facilityClose = document.getElementById('facilityClose');
    const facilityBg = document.getElementById('facilityBg');
    const facilityContent = document.getElementById('facilityContent');

    let mapState = 0;

    // モーダルを開く関数
    function openFacilityModal(index) {
      if (facilityPop && facilityContent) {
        // 1. コンテンツを空にする
        facilityContent.innerHTML = '';

        // 2. ボタンの属性からターゲットとなるID（またはコンテンツ）を取得
        // jQuery: .attr('content') -> Vanilla: .getAttribute('content')
        const targetSelector = mapButton[index].getAttribute('content');
        const targetElement = document.querySelector(targetSelector);

        console.log('targetSelector:' + targetSelector);
        console.log('targetElement:' + targetElement);
        console.log('innerHTML:' + targetElement.innerHTML);

        // 3. ターゲット要素が存在すれば、その中身をコピーして追加
        if (targetElement) {
          facilityContent.innerHTML = targetElement.innerHTML;
        }

        facilityPop.classList.add('open');
      }
    }

    // モーダルを閉じる関数
    function closeFacilityModal() {
      if (facilityPop) {
        facilityPop.classList.remove('open');
      }
    }

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

      console.log('mapState:' + mapState);
      console.log('index:' + index);

      // 同じボタンを再度クリック（またはホバー）した時の判定
      if (mapState === index) {
        if (facilityPop) {
          openFacilityModal(index);
        }
      } else {
        mapState = index;
      }

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
        button.addEventListener('click', () => {
          changeMapImg(index);
        });

        button.addEventListener('mouseover', () => {
          changeMapImg(index);
        });

        button.addEventListener('mouseout', () => {
          changeMapImg(0);
        });
      });

      if (facilityClose) {
        facilityClose.addEventListener('click', closeFacilityModal);
      }
      if (facilityBg) {
        facilityBg.addEventListener('click', closeFacilityModal);
      }
    }

    init();
  }

  // 実行
  if (document.getElementById('facilityMap')) {
    animateFacilityMap();
  }


  // 営業カレンダー

  function setBusinessCalendar() {

    let eventContent = [];
    const popObj = document.getElementById('eventPop');
    const popBg = popObj.querySelector('#popBg');
    const closeButton = popObj.querySelector('#closeButton');
    const eveName = popObj.querySelector('#eveName');
    const eveDate = popObj.querySelector('#eveDate');
    const eveTime = popObj.querySelector('#eveTime');
    const eveDesc = popObj.querySelector('#eveDesc');

    // ポップアップを表示する関数
    function eventDetailPop(name, start, end, desc) {
      eveName.innerHTML = name;

      // 日付フォーマットの整形 (YYYY年MM月DD日)
      if (start) {
        eveDate.innerHTML = `${start.slice(0, 4)}年${start.slice(5, 7)}月${start.slice(8, 10)}日`;
      }

      // 説明文の表示
      eveDesc.innerHTML = (desc !== undefined && desc !== null) ? desc : '';

      // 時間の整形
      const startTime = start ? start.slice(11, 16) : null;
      const endTime = end ? end.slice(11, 16) : null;

      if (startTime && startTime.length > 3) {
        eveTime.innerHTML = `${startTime}~${endTime}`;
      } else {
        eveTime.innerHTML = '終日';
      }

      // クラス付与（アニメーション用）
      setTimeout(() => {
        popObj.classList.add('open');
      }, 100);
    }

    // カレンダー内の特定のタイトルにクラスを付与する関数
    function factoryCalendarEdit() {
      const titles = document.querySelectorAll('.fc-event-container .fc-title, .fc-event-title'); // v6対応
      titles.forEach((titleEl, index) => {
        eventContent[index] = titleEl.textContent;
        const text = eventContent[index];

        if (text === '休業日' || text === '定休日') {
          titleEl.classList.add('close');
        } else if (['土曜日営業未定', '営業未定', '短縮営業日', '時間短縮営業'].includes(text)) {
          titleEl.classList.add('short');
        }
      });
    }

    // 初期化関数
    function init() {
      const calendarEl = document.getElementById('calendar');
      const loadingEl = document.getElementById('loading');

      // FullCalendar v6+ (Standard Bundle) の書き方
      // ※FullCalendarのJSファイルが読み込まれている前提です
      if (typeof FullCalendar !== 'undefined') {
        const calendar = new FullCalendar.Calendar(calendarEl, {
          locale: 'ja',
          headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
          },
          displayEventTime: false,
          googleCalendarApiKey: 'AIzaSyCou0PcnugmOWjYpghfw_p8pUJkmlXjVjc',
          firstDay: 1,
          events: 'meriyasukun.member@gmail.com',

          eventClick: function(info) {
            const event = info.event;
            // FullCalendar v6では event.startStr などで取得
            eventDetailPop(
              event.title,
              event.startStr,
              event.endStr,
              event.extendedProps.description
            );
            info.jsEvent.preventDefault(); // リンク遷移を防ぐ
          },

          loading: function(bool) {
            loadingEl.style.display = bool ? 'block' : 'none';
            if (!bool) {
              setTimeout(factoryCalendarEdit, 1200);
            }
          }
        });

        calendar.render();
      }

      // 初回実行
      setTimeout(factoryCalendarEdit, 1200);

      // ポップアップを閉じるイベント
      [popBg, closeButton].forEach(el => {
        if (el) {
          el.addEventListener('click', () => {
            popObj.classList.remove('open');
          });
        }
      });
    }

    init();

  }

  if (document.getElementById('brewery')) {
    setBusinessCalendar();
  }



});
