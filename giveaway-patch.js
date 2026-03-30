/* ================================================================
   OutfitKart — GIVEAWAY BANNER + YOUTUBE PATCH v1.0
   ================================================================
   INSTRUCTIONS:
   Is file ko mega-patch.js ke BAAD load karo:
   <script src="giveaway-patch.js"></script>
   ================================================================ */

'use strict';

(function _outfitkartGiveawayYT() {

  /* ── 1. CSS Inject ── */
  const style = document.createElement('style');
  style.id = 'ok-giveaway-css';
  style.textContent = `
    /* Giveaway ticker bar */
    #ok-giveaway-bar {
      position: fixed;
      top: 64px;
      left: 0; right: 0;
      z-index: 48;
      background: linear-gradient(90deg, #7c3aed 0%, #e11d48 50%, #f59e0b 100%);
      color: white;
      font-size: 12px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      height: 32px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      letter-spacing: 0.01em;
      animation: okGwSlideDown 0.5s ease both;
    }
    @keyframes okGwSlideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #ok-giveaway-bar .gw-marquee {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
    }
    #ok-giveaway-bar .gw-marquee span {
      display: inline-block;
      animation: okGwMarquee 18s linear infinite;
    }
    @keyframes okGwMarquee {
      0%   { transform: translateX(100vw); }
      100% { transform: translateX(-100%); }
    }
    #ok-giveaway-bar .gw-close {
      margin-left: 8px;
      font-size: 14px;
      opacity: 0.8;
      flex-shrink: 0;
      cursor: pointer;
      padding: 4px;
    }

    /* Giveaway floating popup card */
    #ok-giveaway-popup {
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      z-index: 300;
      width: min(360px, 92vw);
      background: white;
      border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.22), 0 0 0 3px #e11d48;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    #ok-giveaway-popup.ok-gw-open {
      opacity: 1;
      pointer-events: all;
      transform: translateX(-50%) scale(1);
    }
    #ok-giveaway-popup .gw-header {
      background: linear-gradient(135deg, #7c3aed, #e11d48);
      color: white;
      padding: 16px 16px 12px;
      position: relative;
      text-align: center;
    }
    #ok-giveaway-popup .gw-emoji {
      font-size: 36px;
      display: block;
      margin-bottom: 4px;
      animation: okGwBounce 1s ease infinite alternate;
    }
    @keyframes okGwBounce {
      from { transform: scale(1) rotate(-5deg); }
      to   { transform: scale(1.12) rotate(5deg); }
    }
    #ok-giveaway-popup .gw-title {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.02em;
    }
    #ok-giveaway-popup .gw-sub {
      font-size: 11px;
      opacity: 0.85;
      margin-top: 2px;
    }
    #ok-giveaway-popup .gw-close-btn {
      position: absolute;
      top: 8px; right: 10px;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.7;
    }
    #ok-giveaway-popup .gw-body {
      padding: 16px;
    }
    #ok-giveaway-popup .gw-step {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;
    }
    #ok-giveaway-popup .gw-step-num {
      width: 24px; height: 24px;
      border-radius: 50%;
      background: #e11d48;
      color: white;
      font-size: 11px;
      font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #ok-giveaway-popup .gw-step-text {
      font-size: 12px;
      color: #374151;
      line-height: 1.4;
    }
    #ok-giveaway-popup .gw-step-text strong {
      color: #111827;
      font-weight: 800;
    }
    #ok-giveaway-popup .gw-counter {
      background: #fff1f2;
      border: 1.5px solid #fecdd3;
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      margin-bottom: 14px;
    }
    #ok-giveaway-popup .gw-counter-num {
      font-size: 22px;
      font-weight: 900;
      color: #e11d48;
    }
    #ok-giveaway-popup .gw-counter-label {
      font-size: 10px;
      color: #9ca3af;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    #ok-giveaway-popup .gw-btns {
      display: flex;
      gap: 8px;
    }
    #ok-giveaway-popup .gw-btn-ig {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 800;
      color: white;
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 5px;
      background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);
    }
    #ok-giveaway-popup .gw-btn-yt {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 800;
      color: white;
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 5px;
      background: linear-gradient(135deg,#ff0000,#cc0000);
    }

    /* Profile social card */
    #ok-profile-social-card {
      margin: 0 16px 16px;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 40%, #16213e 100%);
      border: 1.5px solid rgba(255,255,255,0.08);
    }
    #ok-profile-social-card .psc-header {
      padding: 14px 16px 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #ok-profile-social-card .psc-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg,#e11d48,#7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      color: white;
      flex-shrink: 0;
    }
    #ok-profile-social-card .psc-title {
      font-size: 13px;
      font-weight: 900;
      color: white;
    }
    #ok-profile-social-card .psc-sub {
      font-size: 10px;
      color: rgba(255,255,255,0.5);
      margin-top: 1px;
    }
    #ok-profile-social-card .psc-gw-box {
      margin: 0 12px;
      background: linear-gradient(90deg, rgba(225,29,72,0.15), rgba(124,58,237,0.15));
      border: 1px solid rgba(225,29,72,0.3);
      border-radius: 10px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    #ok-profile-social-card .psc-gw-emoji { font-size: 22px; flex-shrink:0; }
    #ok-profile-social-card .psc-gw-text {
      font-size: 11px;
      color: rgba(255,255,255,0.85);
      line-height: 1.4;
    }
    #ok-profile-social-card .psc-gw-text strong { color:white; font-weight:800; }
    #ok-profile-social-card .psc-gw-badge {
      margin-left: auto;
      background: #e11d48;
      color: white;
      font-size: 9px;
      font-weight: 800;
      padding: 3px 7px;
      border-radius: 20px;
      white-space: nowrap;
      flex-shrink: 0;
      animation: okGwPulse 1.5s infinite;
    }
    @keyframes okGwPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(225,29,72,0.5); }
      50%      { box-shadow: 0 0 0 5px rgba(225,29,72,0); }
    }
    #ok-profile-social-card .psc-links {
      display: flex;
      gap: 8px;
      padding: 10px 12px 14px;
    }
    #ok-profile-social-card .psc-link {
      flex: 1;
      padding: 9px 6px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 800;
      color: white;
      text-decoration: none;
      display: flex; align-items: center; justify-content: center; gap: 4px;
      transition: opacity 0.2s, transform 0.15s;
    }
    #ok-profile-social-card .psc-link:active { transform: scale(0.96); }
    #ok-profile-social-card .psc-link-ig  { background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045); }
    #ok-profile-social-card .psc-link-yt  { background: linear-gradient(135deg,#ff0000,#cc0000); }
    #ok-profile-social-card .psc-link-tg  { background: linear-gradient(135deg,#0088cc,#00b0f4); }
    #ok-profile-social-card .psc-link-wa  { background: linear-gradient(135deg,#25D366,#128C7E); }
  `;
  document.head.appendChild(style);

  /* ── 2. Constants ── */
  const INSTAGRAM_URL = 'https://www.instagram.com/outfitkart_ecommers?igsh=MWUwNTNzczI4YjZsdw==';
  const YOUTUBE_URL   = 'https://youtube.com/@outfitkart-official?si=SJOr76KDH_H99JDt';
  const GIVEAWAY_TARGET = 150;

  /* ── 3. Ticker Bar ── */
  function _injectGiveawayBar() {
    if (document.getElementById('ok-giveaway-bar')) return;
    if (sessionStorage.getItem('ok_gw_bar_closed')) return;
    const bar = document.createElement('div');
    bar.id = 'ok-giveaway-bar';
    bar.innerHTML = `
      <div class="gw-marquee">
        <span>🎁✨ GIVEAWAY ALERT! Instagram par 150 followers hone par 2 lucky winners ko special prize milega! 🎉 — Follow @outfitkart_ecommers &amp; Subscribe @outfitkart-official on YouTube — 🎁✨ GIVEAWAY ALERT! Instagram par 150 followers hone par 2 lucky winners ko special prize milega!</span>
      </div>
      <span class="gw-close" id="ok-gw-bar-close" title="Close">✕</span>
    `;
    bar.addEventListener('click', (e) => {
      if (e.target.id === 'ok-gw-bar-close') {
        bar.remove();
        sessionStorage.setItem('ok_gw_bar_closed', '1');
        return;
      }
      _openGiveawayPopup();
    });
    document.body.appendChild(bar);
    // Push main content down
    const mainEl = document.querySelector('main') || document.getElementById('app-content');
    if (mainEl) mainEl.style.paddingTop = (parseInt(mainEl.style.paddingTop||0)||64) + 32 + 'px';
  }

  /* ── 4. Giveaway Popup ── */
  function _injectGiveawayPopup() {
    if (document.getElementById('ok-giveaway-popup')) return;
    const pop = document.createElement('div');
    pop.id = 'ok-giveaway-popup';
    pop.innerHTML = `
      <div class="gw-header">
        <span class="gw-emoji">🎁</span>
        <div class="gw-title">Giveaway Time! ✨</div>
        <div class="gw-sub">150 followers → 2 winners ko prize!</div>
        <span class="gw-close-btn" id="ok-gw-pop-close">✕</span>
      </div>
      <div class="gw-body">
        <div class="gw-counter">
          <div class="gw-counter-num" id="ok-gw-counter">150</div>
          <div class="gw-counter-label">Instagram Followers Goal 🎯</div>
        </div>
        <div class="gw-step">
          <div class="gw-step-num">1</div>
          <div class="gw-step-text"><strong>Instagram Follow karo</strong> — @outfitkart_ecommers ko follow karo</div>
        </div>
        <div class="gw-step">
          <div class="gw-step-num">2</div>
          <div class="gw-step-text"><strong>YouTube Subscribe karo</strong> — @outfitkart-official channel subscribe karo</div>
        </div>
        <div class="gw-step">
          <div class="gw-step-num">3</div>
          <div class="gw-step-text"><strong>150 followers hone par</strong> randomly <strong>2 followers choose</strong> karke unhe prize diya jaega 🎉</div>
        </div>
        <div class="gw-btns">
          <button class="gw-btn-ig" onclick="window.open('${INSTAGRAM_URL}','_blank')">
            <i class="fab fa-instagram"></i> Instagram Follow
          </button>
          <button class="gw-btn-yt" onclick="window.open('${YOUTUBE_URL}','_blank')">
            <i class="fab fa-youtube"></i> YouTube Subscribe
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(pop);
    document.getElementById('ok-gw-pop-close').addEventListener('click', _closeGiveawayPopup);
    pop.addEventListener('click', (e) => { if (e.target === pop) _closeGiveawayPopup(); });
  }

  function _openGiveawayPopup() {
    _injectGiveawayPopup();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('ok-giveaway-popup')?.classList.add('ok-gw-open');
      });
    });
  }
  function _closeGiveawayPopup() {
    document.getElementById('ok-giveaway-popup')?.classList.remove('ok-gw-open');
  }
  window.openGiveawayPopup = _openGiveawayPopup;

  /* ── 5. Profile Social Card ── */
  function _injectProfileSocialCard() {
    if (document.getElementById('ok-profile-social-card')) return;
    const profileHome = document.getElementById('profile-home');
    if (!profileHome) return;

    const card = document.createElement('div');
    card.id = 'ok-profile-social-card';
    card.innerHTML = `
      <div class="psc-header">
        <div class="psc-icon"><i class="fas fa-share-alt"></i></div>
        <div>
          <div class="psc-title">Follow & Subscribe 🔔</div>
          <div class="psc-sub">Hamare saath connect raho — offers &amp; giveaway pao!</div>
        </div>
      </div>
      <div class="psc-gw-box" onclick="openGiveawayPopup()">
        <span class="psc-gw-emoji">🎁</span>
        <div class="psc-gw-text">
          <strong>Giveaway Coming Soon!</strong><br>
          150 Instagram followers → 2 winners ko prize!
        </div>
        <span class="psc-gw-badge">LIVE 🎯</span>
      </div>
      <div class="psc-links">
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" class="psc-link psc-link-ig">
          <i class="fab fa-instagram"></i> Instagram
        </a>
        <a href="${YOUTUBE_URL}" target="_blank" rel="noopener" class="psc-link psc-link-yt">
          <i class="fab fa-youtube"></i> YouTube
        </a>
        <a href="https://t.me/outfitkart" target="_blank" rel="noopener" class="psc-link psc-link-tg">
          <i class="fab fa-telegram"></i> Telegram
        </a>
        <a href="https://whatsapp.com/channel/0029VbCiSs06GcGJpToxKd3z" target="_blank" rel="noopener" class="psc-link psc-link-wa">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>
      </div>
    `;

    // Insert at top of profile home (after stats/level cards, before menus)
    const firstMenu = profileHome.querySelector('.bg-white.rounded-2xl');
    if (firstMenu) firstMenu.insertAdjacentElement('beforebegin', card);
    else profileHome.appendChild(card);
  }

  /* ── 6. Patch navigate to inject on profile open ── */
  function _patchNavigateForGiveaway() {
    const origNav = window.navigate;
    if (!origNav || window._okGwNavPatched) return;
    window._okGwNavPatched = true;
    window.navigate = function(view, ...args) {
      origNav(view, ...args);
      if (view === 'profile') {
        setTimeout(_injectProfileSocialCard, 350);
      }
      if (view === 'home') {
        setTimeout(_injectGiveawayBar, 400);
      }
    };
  }

  /* ── 7. Auto-show popup once per session on home ── */
  function _autoShowPopupOnce() {
    if (sessionStorage.getItem('ok_gw_shown')) return;
    sessionStorage.setItem('ok_gw_shown', '1');
    setTimeout(_openGiveawayPopup, 3500);
  }

  /* ── 8. Init ── */
  function _initGiveaway() {
    _injectGiveawayBar();
    _patchNavigateForGiveaway();
    _autoShowPopupOnce();
    // If already on profile page
    const profileHome = document.getElementById('profile-home');
    if (profileHome && !profileHome.classList.contains('hidden')) {
      setTimeout(_injectProfileSocialCard, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(_initGiveaway, 800));
  } else {
    setTimeout(_initGiveaway, 800);
  }

  console.log('%c🎁 OutfitKart Giveaway Patch v1.0 LOADED ✅', 'background:#e11d48;color:white;font-weight:900;font-size:12px;padding:4px 12px;border-radius:6px;');

})();
