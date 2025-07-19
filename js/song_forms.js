

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupPageTopButton(300);
  attachFooterDangos();
  attachformsPoyo();

  // thanksページから戻る場合はフォーム出現演出をカットする
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === 'thanks') {
    const container = document.getElementById('formbox-Container');
    if (container) container.classList.add('aos-animate');
    const formTitle = document.querySelector('.form-title');
    if (formTitle) formTitle.classList.add('zoom-in');
    const formsPoyo = document.querySelector('.forms-poyo');
    if (formsPoyo) formsPoyo.classList.add('slide-in');
  }

  function checkFormDeadline() {
    const deadline = new Date('2025-11-30T23:59:59+09:00');  // 募集期限の設定:'2025-11-30T23:59:59+09:00'
    if (Date.now() > deadline.getTime()) {
      const container = document.getElementById('formbox-Container');
      if (!container) return;
      const scrolldown = document.querySelector('.scrolldown');
      if (scrolldown) scrolldown.classList.add('disabled');

      const form = container.querySelector('form');
      if (form) form.remove();
      const formsbox = container.querySelector('.formsbox');
      if (formsbox) {
        formsbox.classList.add('closed');
        const msg = document.createElement('p');
        msg.className = 'form-closed-message';
        msg.innerHTML =
          '<strong>【募集期間終了のお知らせ】</strong><br>たくさんのご回答ありがとうございました！<br>結果発表をお待ち下さい！';
        formsbox.appendChild(msg);
      }
    }
  }

  checkFormDeadline();
});


var submitted = false; // フォームのiframe転送で使用

function createParticles() {
  const container = document.getElementById('floating-particles');
  if (!container) return;
  const symbols = ['eig-note1', 'bsk-ball', 'soccer-ball', 'shoes', 'g-clef', 'hand', 'piano', 'eig-note2', 'p-ina-g', 'p-ina-b'];
  const total = 25;
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let i = 0; i < total; i++) {
    const particle = document.createElement('div');
    const type = symbols[Math.floor(Math.random() * symbols.length)];
    particle.classList.add('particle', type);

    const col = i % cols;
    const row = Math.floor(i / cols);
    particle.style.left = (col * cellW + Math.random() * (cellW - 5)) + 'vw';
    particle.style.bottom = (row * cellH + Math.random() * (cellH - 5)) + 'vh';

    const baseRotate = Math.random() * 360;
    particle.style.setProperty('--rotate-base', `${baseRotate}deg`);
    particle.style.transform = `translate(0, 0) rotate(${baseRotate}deg)`;

    const duration = 15 + Math.random() * 10;
    const offset = Math.random() * duration;
    particle.style.animation = `fadeInParticle 1.2s ease-out forwards, floatParticle ${duration}s linear infinite`;
    particle.style.animationDelay = `0s, -${offset}s`;

    container.appendChild(particle);
  }
}

if (document.readyState !== 'loading') {
  createParticles();
} else {
  document.addEventListener('DOMContentLoaded', createParticles);
}

function attachFooterDangos() {
  const dangos = document.querySelector('.footer-dangos');
  if (!dangos) return;

  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const images = dangos.querySelectorAll('img');
  let loaded = 0;

  const startAnim = () => {
    loaded++;
    if (loaded === images.length) {
      dangos.classList.add('animate');
    }
  };

  images.forEach(img => {
    if (img.complete) {
      startAnim();
    } else {
      img.addEventListener('load', startAnim);
    }
  });

  const insert = () => {
    if (placeholder.firstElementChild) {
      placeholder.style.position = 'relative';
      placeholder.appendChild(dangos);
    } else {
      setTimeout(insert, 100);
    }
  };
  insert();
}

function attachformsPoyo() {
  const dangos = document.querySelector('.forms-poyo');
  if (!dangos) return;

  const images = dangos.querySelectorAll('img');
  let loaded = 0;

  const startAnim = () => {
    loaded++;
    if (loaded === images.length) {
      dangos.classList.add('animate');
    }
  };

  images.forEach(img => {
    if (img.complete) {
      startAnim();
    } else {
      img.addEventListener('load', startAnim);
    }
  });
}

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  const header = document.getElementById('page-title');
  const formsAttention = document.getElementById('forms-information');
  const contents = document.querySelectorAll(
    '.scrolldown, #formbox-Container, #scr-banner, .footer-dangos'
  );
  const infoImg = document.querySelector('.f-info-white-box .forms-info-img');
  const infoText = document.querySelector('.forms-info-text');
  const charaIbuki = document.querySelector('.f-info-white-box .info-chara.left');
  const charaSindo = document.querySelector('.f-info-white-box .info-chara.right');

  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  };

  const showHeader = () => {
    if (header) header.classList.add('aos-animate');
  };

  const showFormsAttention = () => {
    if (formsAttention) formsAttention.classList.add('zoom-in');
  };

  const showContents = () => {
    contents.forEach((el, i) => {
      setTimeout(() => el.classList.add('aos-animate'), i * 200);
    });
  };

  const showinfoImg = () => {
    if (infoImg) infoImg.classList.add('pop');
  };
  const showCharaIbuki = () => {
    if (charaIbuki) charaIbuki.classList.add('poyon');
  };

  const showCharaSindo = () => {
    if (charaSindo) charaSindo.classList.add('poyon');
  };




  const showinfoText = () => {
    if (infoText) infoText.classList.add('zoom-in');
  };

  hideLoader();
  setTimeout(() => {
    showHeader();
    // ヘッダーが表示された後フォームタイトルを表示する
    setTimeout(() => {
      showFormsAttention();
      // infoボックスズームイン → テキストのみスライド出現
      setTimeout(() => {
        showinfoText();
        // →その後クルヒをポップアップ表示する
        setTimeout(() => {
          showinfoImg();

          // ポップアップ表示後、文字を順次表示
          setTimeout(() => {
            showCharaIbuki();
            setTimeout(() => {
              showCharaSindo();
              setTimeout(showContents, 400);
            }, 200);
          }, 800);    // 出現タイミング
        }, 200);
      }, 200);
    }, 500);
    // フォーム、infoを除くすべての要素にデフォルトのオブザーバーを適用
    // ドットぽよんのみ手動制御
    setupAosAnimations('[data-aos-f]:not(#formbox-Container):not(#forms-information):not(.forms-poyo)');
    //　フォーム部分の出現遅延制御
    setupAosAnimations('#formbox-Container', {
      threshold: 1.0,
      rootMargin: '0px 0px -20% 0px'
    });

    // フォームボックス表示→フォームタイトルズームイン→ドット宗拓ぽよん表示
    const formsbox = document.querySelector('.formsbox');
    const formTitle = document.querySelector('.form-title');
    const formsPoyo = document.querySelector('.forms-poyo');
    if (formsbox && formTitle) {
      const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // フォームボックスズームイン→フォームタイトル表示
            setTimeout(() => {
              formTitle.classList.add('zoom-in');
              // 宗拓・タイトル出現タイミング
              if (formsPoyo) {
                setTimeout(() => formsPoyo.classList.add('slide-in'), 100);
              }
            }, 100);
            titleObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      titleObserver.observe(formsbox);
    }
  }, 400);
});