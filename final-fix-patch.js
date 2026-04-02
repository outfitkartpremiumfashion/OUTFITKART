'use strict';
/* ================================================================
   OutfitKart — FINAL FIX PATCH v2.0
   1. PDP Back → exact page jahan se khula (home/category/subcat/electronics)
   2. Banner replacement — Gold hata ke Electronics + Refer&Earn + fresh banners
   3. Subcat images fix — Hoodies, Joggers, Formal Pant, Kurtis, Lehengas + all dupes
   4. Electronics back → Home
   5. Premium Store Header
   6. Electronics page (OutfitKart Electronics)
   7. Categories page → Bags, Jewellery, Electronics sidebar
   8. Home "View All Categories" → categories page
   ================================================================ */

(function _okFinalFix() {

/* ================================================================
   CSS
================================================================ */
(function(){
  if (document.getElementById('ok-ffp2-css')) return;
  const s = document.createElement('style');
  s.id = 'ok-ffp2-css';
  s.textContent = `
    /* ── PREMIUM HEADER ── */
    #app-header, header.fixed, header.sticky {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%) !important;
      border-bottom: 1.5px solid rgba(99,102,241,0.35) !important;
      box-shadow: 0 2px 20px rgba(99,102,241,0.18) !important;
    }

    /* ── ELECTRONICS PAGE ── */
    #view-electronics {
      position: fixed; inset: 0; z-index: 60;
      background: #0f172a;
      display: flex; flex-direction: column; overflow: hidden;
    }
    #view-electronics.hidden { display: none !important; }
    #ok-elec-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
      border-bottom: 2px solid #3b82f6;
      padding: 0 16px; height: 60px;
      display: flex; align-items: center; gap: 12px;
      flex-shrink: 0;
      box-shadow: 0 4px 20px rgba(59,130,246,0.3);
    }
    #ok-elec-header h2 {
      font-size: 1.05rem; font-weight: 900; margin: 0; flex: 1;
      background: linear-gradient(135deg, #60a5fa, #93c5fd, #60a5fa);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .ok-elec-back {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(59,130,246,0.2); border: 1px solid #3b82f6;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #60a5fa; font-size: 14px; flex-shrink: 0;
    }
    #ok-elec-body { display: flex; flex: 1; overflow: hidden; }
    #ok-elec-sidebar {
      width: 88px; flex-shrink: 0; background: #0d1b2e;
      overflow-y: auto; -webkit-overflow-scrolling: touch;
      scrollbar-width: none; border-right: 1px solid #1e3a5f;
    }
    #ok-elec-sidebar::-webkit-scrollbar { display: none; }
    .ok-elec-si {
      display: flex; flex-direction: column; align-items: center;
      padding: 11px 4px; cursor: pointer;
      border-left: 3px solid transparent;
      text-align: center; gap: 4px; transition: all 0.2s;
    }
    .ok-elec-si.active { background: rgba(59,130,246,0.15); border-left-color: #3b82f6; }
    .ok-elec-icon {
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; background: #1e3a5f;
      border: 2px solid #1e3a5f; transition: all 0.2s;
    }
    .ok-elec-si.active .ok-elec-icon { background: rgba(59,130,246,0.25); border-color: #3b82f6; }
    .ok-elec-si span { font-size: 8.5px; font-weight: 800; color: #94a3b8; line-height: 1.2; word-break: break-word; }
    .ok-elec-si.active span { color: #60a5fa; }
    #ok-elec-right { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; background: #111827; padding: 10px; }
    .ok-elec-glbl { font-size: 10px; font-weight: 800; color: #60a5fa; background: rgba(59,130,246,0.1); border-radius: 8px; padding: 6px 10px; margin: 8px 0 6px; border-left: 3px solid #3b82f6; }
    .ok-elec-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; margin-bottom: 10px; }
    .ok-elec-card { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; padding: 7px 3px; border-radius: 10px; text-align: center; background: #1e293b; border: 1px solid #1e3a5f; transition: all 0.2s; }
    .ok-elec-card:active { background: rgba(59,130,246,0.2); border-color: #3b82f6; }
    .ok-elec-card img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid #1e3a5f; }
    .ok-elec-card span { font-size: 9px; font-weight: 700; color: #cbd5e1; line-height: 1.2; }
    .ok-elec-vaBtn { display: flex; align-items: center; justify-content: space-between; background: rgba(59,130,246,0.15); border: 1.5px solid #3b82f6; border-radius: 12px; padding: 11px 14px; cursor: pointer; margin-bottom: 10px; color: #60a5fa; font-size: 12px; font-weight: 800; }

    /* ── PDP SMART BACK HEADER ── */
    #ok-pdp-smart-header {
      position: sticky; top: 64px; z-index: 30;
      background: white; border-bottom: 1px solid #f3f4f6;
      padding: 10px 16px; display: flex; align-items: center; gap: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    #ok-pdp-back-btn {
      width: 36px; height: 36px; border-radius: 50%; background: #f3f4f6;
      border: none; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    #ok-pdp-breadcrumb {
      font-size: 12px; font-weight: 700; color: #6b7280;
      flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    }

    /* ── CATEGORIES EXTRA SIDEBAR ── */
    .ok-si-extra { display: flex; flex-direction: column; align-items: center; padding: 12px 6px; cursor: pointer; border-left: 3px solid transparent; text-align: center; gap: 5px; }
    .ok-si-extra.active { background: white; border-left-color: #e11d48; }
    .ok-si-extra .ok-si-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; background: #f3f4f6; border: 2px solid #e5e7eb; }
    .ok-si-extra.active .ok-si-icon { border-color: #e11d48; background: #fff1f2; }
    .ok-si-extra span { font-size: 9.5px; font-weight: 800; color: #111827; line-height: 1.2; word-break: break-word; }
    .ok-si-extra.active span { color: #e11d48; }
  `;
  document.head.appendChild(s);
})();

/* ================================================================
   PART 1 — PREMIUM HEADER
================================================================ */
function _patchHeader() {
  const tryPatch = () => {
    ['#app-header', 'header.fixed', 'header.sticky', '#ok-header', '.ok-header'].forEach(sel => {
      document.querySelectorAll(sel).forEach(h => {
        if (h.getAttribute('data-prem')) return;
        h.setAttribute('data-prem', '1');
        h.style.setProperty('background', 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)', 'important');
        h.style.setProperty('border-bottom', '1.5px solid rgba(99,102,241,0.35)', 'important');
        h.style.setProperty('box-shadow', '0 2px 20px rgba(99,102,241,0.18)', 'important');
        // Logo gradient
        const logo = h.querySelector('[id*="logo"], .logo-text, [class*="logo"], img[alt*="OutfitKart"]');
        if (logo && logo.tagName !== 'IMG') {
          logo.style.background = 'linear-gradient(135deg, #a78bfa, #818cf8, #c084fc)';
          logo.style.webkitBackgroundClip = 'text';
          logo.style.webkitTextFillColor = 'transparent';
          logo.style.backgroundClip = 'text';
        }
      });
    });
  };
  tryPatch();
  setTimeout(tryPatch, 800);
  setTimeout(tryPatch, 2000);
}

/* ================================================================
   PART 2 — BANNER REPLACEMENT
================================================================ */
const NEW_BANNERS = [
  {
    id:'b1',
    bg:'linear-gradient(135deg,#020617 0%,#0f2a4a 55%,#020617 100%)',
    badge:'⚡ NEW LAUNCH',
    badgeColor:'#3b82f6',
    title:'OutfitKart Electronics',
    sub:'Earbuds, Smartwatches, Gaming & More',
    cta:'Explore Now',
    ctaBg:'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    action:"window._openElectronics&&window._openElectronics()",
    icons:['🎧','📱','⌚','🎮'],
  },
  {
    id:'b2',
    bg:'linear-gradient(135deg,#0a0010 0%,#1e0a33 55%,#0a0010 100%)',
    badge:'🔥 TRENDING',
    badgeColor:'#e11d48',
    title:"Men's Style Drop",
    sub:'T-Shirts, Oversized, Hoodies & Combos',
    cta:'Shop Men',
    ctaBg:'linear-gradient(135deg,#e11d48,#be123c)',
    action:"openSubcatProducts('Men','T-Shirts')",
    imgRight:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=280&h=180&fit=crop&q=80',
  },
  {
    id:'b3',
    bg:'linear-gradient(135deg,#00100a 0%,#052e16 55%,#00100a 100%)',
    badge:'💚 REFER & EARN',
    badgeColor:'#16a34a',
    title:'₹50+ Per Referral!',
    sub:'Dost ko refer karo — 5% commission wallet mein',
    cta:'Start Earning',
    ctaBg:'linear-gradient(135deg,#16a34a,#15803d)',
    action:"navigate('profile','referrals')",
    icons:['💸','🤝','💰','🎁'],
  },
  {
    id:'b4',
    bg:'linear-gradient(135deg,#100500 0%,#431407 55%,#100500 100%)',
    badge:'👗 NEW ARRIVALS',
    badgeColor:'#f97316',
    title:"Women's Collection",
    sub:'Sarees, Kurtis, Lehengas & Dresses',
    cta:'Shop Women',
    ctaBg:'linear-gradient(135deg,#ea580c,#c2410c)',
    action:"openCategoryPage('Women')",
    imgRight:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=280&h=180&fit=crop&q=80',
  },
];

function _buildBannerVisual(b) {
  if (b.imgRight) {
    return `<div style="position:absolute;right:0;top:0;bottom:0;width:42%;background:url('${b.imgRight}') center/cover no-repeat;mask-image:linear-gradient(to left,rgba(0,0,0,0.6),transparent);-webkit-mask-image:linear-gradient(to left,rgba(0,0,0,0.6),transparent);"></div>`;
  }
  if (b.icons) {
    const grid = b.icons.map(ic => `<div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">${ic}</div>`).join('');
    return `<div style="position:absolute;right:14px;top:50%;transform:translateY(-50%);display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">${grid}</div>`;
  }
  return '';
}

function _replaceBanners() {
  const carousel = document.getElementById('banner-carousel');
  if (!carousel || carousel.getAttribute('data-newbanners2')) return;
  carousel.setAttribute('data-newbanners2', '1');

  carousel.innerHTML = NEW_BANNERS.map((b, i) => `
    <div class="banner-slide" style="
      position:absolute;inset:0;
      background:${b.bg};
      opacity:${i===0?1:0};
      z-index:${i===0?1:0};
      transition:opacity 0.55s ease;
      border-radius:1rem;
      overflow:hidden;
      display:flex;
      align-items:center;
      padding:18px 16px;
    ">
      ${_buildBannerVisual(b)}
      <div style="flex:1;position:relative;z-index:2;max-width:60%;">
        <div style="display:inline-flex;align-items:center;background:${b.badgeColor}28;border:1px solid ${b.badgeColor}55;border-radius:99px;padding:3px 9px;margin-bottom:8px;">
          <span style="font-size:9px;font-weight:900;color:${b.badgeColor};letter-spacing:0.04em;">${b.badge}</span>
        </div>
        <h3 style="font-size:1.05rem;font-weight:900;color:white;margin:0 0 4px;line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,0.6);">${b.title}</h3>
        <p style="font-size:10px;color:rgba(255,255,255,0.6);margin:0 0 12px;line-height:1.4;">${b.sub}</p>
        <button onclick="${b.action}" style="background:${b.ctaBg};color:white;border:none;padding:8px 18px;border-radius:99px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.35);">${b.cta} →</button>
      </div>
    </div>`).join('');

  let _cur = 0; const _tot = NEW_BANNERS.length;
  clearInterval(window._bannerInterval);

  function _apply(idx) {
    carousel.querySelectorAll('.banner-slide').forEach((s, i) => {
      s.style.opacity = i === idx ? '1' : '0';
      s.style.zIndex = i === idx ? '1' : '0';
    });
    document.querySelectorAll('.banner-dot').forEach((d, i) => {
      if (!d) return;
      d.style.width = i === idx ? '1.5rem' : '0.5rem';
      d.style.opacity = i === idx ? '1' : '0.4';
    });
    _cur = idx; window._bannerCurrent = idx;
  }

  window._bannerInterval = setInterval(() => _apply((_cur + 1) % _tot), 3800);
  carousel.addEventListener('touchstart', e => { window._bannerTouchX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - (window._bannerTouchX || 0);
    if (Math.abs(dx) > 45) _apply(dx < 0 ? (_cur + 1) % _tot : (_cur - 1 + _tot) % _tot);
  }, { passive: true });
  _apply(0);
}

/* ================================================================
   PART 3 — SUBCAT IMAGES FIX
================================================================ */
const FIXED_IMAGES = {
  // Men Topwear
  'Hoodies':             'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=220&fit=crop&q=80',
  'Denim Jacket':        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=220&fit=crop&q=80',
  'Oversized Tees':      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=220&fit=crop&q=80',
  'Oversized Shirts':    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=200&h=220&fit=crop&q=80',
  'Casual Shirts':       'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=220&fit=crop&q=80',
  'Formal Shirts':       'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  'T-Shirts':            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=220&fit=crop&q=80',
  // Men Bottomwear
  'Joggers':             'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&h=220&fit=crop&q=80',
  'Formal Pant':         'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=220&fit=crop&q=80',
  'Trousers':            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=220&fit=crop&q=80',
  'Cotton Trousers':     'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=220&fit=crop&q=80',
  'Cargo Pants':         'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=200&h=220&fit=crop&q=80',
  'Baggy Jeans':         'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=220&fit=crop&q=80',
  'Slim Fit Jeans':      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=220&fit=crop&q=80',
  'Straight Fit Jeans':  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=220&fit=crop&q=80',
  // Men Footwear
  'Sneakers':            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=220&fit=crop&q=80',
  'Formal Shoes':        'https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=200&h=220&fit=crop&q=80',
  'Sports Shoes':        'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200&h=220&fit=crop&q=80',
  'Sandals':             'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&h=220&fit=crop&q=80',
  'Slippers':            'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=200&h=220&fit=crop&q=80',
  // Women Ethnic
  'Kurtis':              'https://images.unsplash.com/photo-1610189352649-ff58ea8ffe71?w=200&h=220&fit=crop&q=80',
  'Lehengas':            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=220&fit=crop&q=80',
  'Sarees':              'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80',
  // Women Western
  'Palazzo':             'https://images.unsplash.com/photo-1594938374182-a57f7f80b9d9?w=200&h=220&fit=crop&q=80',
  'Tops & Tunics':       'https://images.unsplash.com/photo-1564257577049-b26d2ee15f21?w=200&h=220&fit=crop&q=80',
  'Tops':                'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=200&h=220&fit=crop&q=80',
  'Dresses':             'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=220&fit=crop&q=80',
  'Skirts':              'https://images.unsplash.com/photo-1583496661160-fb5886a773ec?w=200&h=220&fit=crop&q=80',
  // Women Bottomwear
  'Skinny Fit Jeans':    'https://images.unsplash.com/photo-1548902229-a4cb9f3a3bdc?w=200&h=220&fit=crop&q=80',
  'Cargo Jeans':         'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  // Women Footwear
  'Heels':               'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=220&fit=crop&q=80',
  'Flats':               'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=220&fit=crop&q=80',
  'Wedges':              'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200&h=220&fit=crop&q=80',
  // Combos
  'Casual Combo':        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=220&fit=crop&q=80',
  'Party Wear Combo':    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=220&fit=crop&q=80',
  'Gym Combo':           'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=220&fit=crop&q=80',
  'Streetwear Combo':    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=220&fit=crop&q=80',
  'Office Combo':        'https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=200&h=220&fit=crop&q=80',
  'Casual Outfit Combo': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=200&h=220&fit=crop&q=80',
  'Party Combo':         'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=220&fit=crop&q=80',
  'Ethnic Combo':        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=220&fit=crop&q=80',
  'Western Combo':       'https://images.unsplash.com/photo-1564257577049-b26d2ee15f21?w=200&h=220&fit=crop&q=80',
  'College Wear Combo':  'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=200&h=220&fit=crop&q=80',
  'Couple Combo':        'https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=200&h=220&fit=crop&q=80',
  'Best Friend Combo':   'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=220&fit=crop&q=80',
  'Matching Outfit Combo':'https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?w=200&h=220&fit=crop&q=80',
  // Perfumes
  "Women's Perfume":     'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=220&fit=crop&q=80',
  "Men's Perfume":       'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&h=220&fit=crop&q=80',
  'Unisex Perfume':      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=220&fit=crop&q=80',
  'Luxury Perfume':      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=220&fit=crop&q=80',
  'Budget Perfume':      'https://images.unsplash.com/photo-1547887538-047f28cce9b4?w=200&h=220&fit=crop&q=80',
  'Body Mist':           'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=220&fit=crop&q=80',
  'Attar / Ittar':       'https://images.unsplash.com/photo-1594913862946-f6da68f9bdde?w=200&h=220&fit=crop&q=80',
  'Deodorant Spray':     'https://images.unsplash.com/photo-1582903942568-e67dc6bab25d?w=200&h=220&fit=crop&q=80',
  'Gift Set':            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=220&fit=crop&q=80',
};

function _fixSubcatImages() {
  document.querySelectorAll('#ok-crp .ok-sc, #view-categories .ok-sc').forEach(card => {
    const span = card.querySelector('span');
    const img = card.querySelector('img');
    if (!span || !img) return;
    const name = span.textContent.trim();
    if (FIXED_IMAGES[name]) {
      img.src = FIXED_IMAGES[name];
      img.onerror = function() {
        this.src = 'https://placehold.co/66x74/f3f4f6/9ca3af?text=' + encodeURIComponent(name[0] || '?');
      };
    }
  });
}

/* ================================================================
   PART 4 — PDP SMART BACK BUTTON
================================================================ */
function _patchPDPBack() {
  if (window._pdpBackPatched2) return;
  if (!window.navigate || !window._navigateCore) return;
  window._pdpBackPatched2 = true;

  const origNavigate = window.navigate;

  window.navigate = function(view, cat) {
    if (view === 'product') {
      window._pdpReturnState = {
        view: window.currentView || 'home',
        cat: window.currentCategoryFilter || null,
        sub: window.currentSubFilter || null,
      };
    }
    if (view !== 'electronics') {
      const elPage = document.getElementById('view-electronics');
      if (elPage && !elPage.classList.contains('hidden')) elPage.classList.add('hidden');
    }
    return origNavigate(view, cat);
  };

  window._pdpGoBack = function() {
    const st = window._pdpReturnState;
    window._pdpReturnState = null;

    if (!st || !st.view || st.view === 'home') {
      window.navigate('home'); return;
    }
    if (st.view === 'electronics') {
      window._openElectronics && window._openElectronics(); return;
    }
    if (st.view === 'categories') {
      window._openCategories && window._openCategories(); return;
    }
    if (st.view === 'shop') {
      window.currentCategoryFilter = st.cat;
      window.currentSubFilter = st.sub || null;
      document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
      window.currentView = 'shop';
      const shopView = document.getElementById('view-shop');
      if (shopView) shopView.classList.remove('hidden');
      const titleEl = document.getElementById('shop-title');
      if (titleEl) {
        titleEl.textContent = st.sub
          ? (typeof getSubDisplayName === 'function' ? getSubDisplayName(st.sub) : st.sub)
          : (st.cat ? `${st.cat} Collection` : 'Shop All Products');
      }
      const filtersEl = document.getElementById('subcategory-filters');
      if (filtersEl) filtersEl.innerHTML = '';
      if (typeof renderShopProducts === 'function') renderShopProducts();
      if (typeof renderShopSubcategories === 'function') renderShopSubcategories();
      if (typeof updateBottomNav === 'function') updateBottomNav();
      if (typeof _initShopScrollHide === 'function') _initShopScrollHide();
      window.scrollTo(0, 0);
      try { history.pushState({ view: 'shop', cat: st.cat }, ''); } catch(e) {}
      return;
    }
    window.navigate(st.view || 'home');
  };

  // Patch _navigateCore to inject back button on product view
  const origNavCore = window._navigateCore;
  window._navigateCore = function(view, cat) {
    const result = origNavCore(view, cat);
    if (view === 'product') setTimeout(_injectPDPBackBtn, 130);
    return result;
  };
}

function _injectPDPBackBtn() {
  const productView = document.getElementById('view-product');
  if (!productView) return;
  const old = document.getElementById('ok-pdp-smart-header');
  if (old) old.remove();

  const st = window._pdpReturnState;
  let crumbText = '← Back';
  if (st) {
    if (st.view === 'home') crumbText = '🏠 Home';
    else if (st.view === 'electronics') crumbText = '⚡ Electronics';
    else if (st.view === 'categories') crumbText = '🗂️ Categories';
    else if (st.sub) {
      const dispSub = (typeof getSubDisplayName === 'function') ? getSubDisplayName(st.sub) : st.sub;
      crumbText = `${st.cat} › ${dispSub}`;
    } else if (st.cat) crumbText = `${st.cat} Collection`;
  }

  const header = document.createElement('div');
  header.id = 'ok-pdp-smart-header';
  header.innerHTML = `
    <button id="ok-pdp-back-btn" onclick="window._pdpGoBack&&window._pdpGoBack()" aria-label="Back">
      <i class="fas fa-arrow-left" style="color:#374151;font-size:13px;"></i>
    </button>
    <span id="ok-pdp-breadcrumb">${crumbText}</span>`;
  productView.insertBefore(header, productView.firstChild);
}

/* ================================================================
   PART 5 — ELECTRONICS PAGE
================================================================ */
const ELEC_GROUPS = [
  {label:'📱 Mobile',icon:'📱',subs:[
    {n:'Phone Cases',img:'https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop&q=80'},
    {n:'Charging Cables',img:'https://images.unsplash.com/photo-1583863788434-e62bd2bde8f4?w=200&h=200&fit=crop&q=80'},
    {n:'Power Banks',img:'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop&q=80'},
    {n:'Selfie Sticks',img:'https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=200&h=200&fit=crop&q=80'},
    {n:'Screen Protectors',img:'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&h=200&fit=crop&q=80'},
    {n:'Mobile Holders',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop&q=80'},
    {n:'USB Hubs',img:'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'🎧 Audio',icon:'🎧',subs:[
    {n:'Earbuds',img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop&q=80'},
    {n:'Wireless Headphones',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&q=80'},
    {n:'Wired Headphones',img:'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop&q=80'},
    {n:'Bluetooth Speakers',img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop&q=80'},
    {n:'Neckbands',img:'https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'🎮 Gaming',icon:'🎮',subs:[
    {n:'Gaming Controllers',img:'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=200&fit=crop&q=80'},
    {n:'Gaming Headsets',img:'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&q=80'},
    {n:'Gaming Mouse',img:'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop&q=80'},
    {n:'Gaming Keyboards',img:'https://images.unsplash.com/photo-1601445638532-3a6628b7b78c?w=200&h=200&fit=crop&q=80'},
    {n:'Gaming Chairs',img:'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'⚡ Smart',icon:'⚡',subs:[
    {n:'Smartwatches',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&q=80'},
    {n:'Smart Bands',img:'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop&q=80'},
    {n:'Smart Glasses',img:'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop&q=80'},
    {n:'Mini Projectors',img:'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200&h=200&fit=crop&q=80'},
    {n:'Smart Plugs',img:'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'💻 Computer',icon:'💻',subs:[
    {n:'Laptop Stands',img:'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=200&fit=crop&q=80'},
    {n:'Keyboard & Mouse Combos',img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop&q=80'},
    {n:'Webcams',img:'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=200&h=200&fit=crop&q=80'},
    {n:'USB Drives',img:'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=200&h=200&fit=crop&q=80'},
    {n:'Mouse Pads',img:'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'🏠 Home',icon:'🏠',subs:[
    {n:'LED Strip Lights',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80'},
    {n:'Table Fans',img:'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=200&h=200&fit=crop&q=80'},
    {n:'Desk Lamps',img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop&q=80'},
    {n:'Digital Clocks',img:'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=200&h=200&fit=crop&q=80'},
    {n:'Air Purifiers',img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop&q=80'},
  ]},
  {label:'🎬 Creator',icon:'🎬',subs:[
    {n:'Ring Lights',img:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&q=80'},
    {n:'Tripods',img:'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=200&h=200&fit=crop&q=80'},
    {n:'Green Screens',img:'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200&h=200&fit=crop&q=80'},
    {n:'Lavalier Mics',img:'https://images.unsplash.com/photo-1590602846989-55f4b27c9090?w=200&h=200&fit=crop&q=80'},
    {n:'Camera Lens Kits',img:'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=200&h=200&fit=crop&q=80'},
  ]},
];

let _elecActiveGroup = 0;

function _buildElecPage() {
  if (document.getElementById('view-electronics')) return;
  const page = document.createElement('div');
  page.id = 'view-electronics'; page.className = 'hidden';
  page.innerHTML = `
    <div id="ok-elec-header">
      <button class="ok-elec-back" onclick="window._closeElectronics()" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h2>⚡ OutfitKart Electronics</h2>
    </div>
    <div id="ok-elec-body">
      <div id="ok-elec-sidebar">
        ${ELEC_GROUPS.map((g, i) => `
          <div class="ok-elec-si ${i===0?'active':''}" onclick="window._elecGroupSel(${i})">
            <div class="ok-elec-icon">${g.icon}</div>
            <span>${g.label.replace(/^[^\s]+\s/,'')}</span>
          </div>`).join('')}
      </div>
      <div id="ok-elec-right"></div>
    </div>`;
  (document.getElementById('app-content') || document.querySelector('main') || document.body).appendChild(page);
  _renderElecRight(0);
}

window._elecGroupSel = function(i) {
  _elecActiveGroup = i;
  document.querySelectorAll('.ok-elec-si').forEach((el, j) => el.classList.toggle('active', j === i));
  _renderElecRight(i);
};

function _renderElecRight(i) {
  const right = document.getElementById('ok-elec-right'); if (!right) return;
  const grp = ELEC_GROUPS[i]; if (!grp) return;
  const cards = grp.subs.map(sub => `
    <div class="ok-elec-card" onclick="openSubcatProducts('Electronics','${sub.n.replace(/'/g,"\\'")}');window._closeElectronics()">
      <img src="${sub.img}" alt="${sub.n}" loading="lazy" onerror="this.src='https://placehold.co/64x64/1e293b/60a5fa?text=⚡'">
      <span>${sub.n}</span>
    </div>`).join('');
  right.innerHTML = `
    <div class="ok-elec-vaBtn" onclick="openCategoryPage('Electronics');window._closeElectronics()">
      <span><i class="fas fa-bolt" style="margin-right:6px;"></i>View All Electronics</span>
      <i class="fas fa-chevron-right"></i>
    </div>
    <div class="ok-elec-glbl">${grp.label}</div>
    <div class="ok-elec-grid">${cards}</div>`;
  right.scrollTop = 0;
}

window._openElectronics = function() {
  if (!document.getElementById('view-electronics')) _buildElecPage();
  document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
  const catPage = document.getElementById('view-categories');
  if (catPage) catPage.classList.add('hidden');
  document.getElementById('view-electronics').classList.remove('hidden');
  window.currentView = 'electronics';
  window.scrollTo(0, 0);
  if (typeof updateBottomNav === 'function') updateBottomNav();
};

// Electronics back → Home
window._closeElectronics = function() {
  const el = document.getElementById('view-electronics');
  if (el && !el.classList.contains('hidden')) {
    el.classList.add('hidden');
    if (typeof window.navigate === 'function') window.navigate('home');
  } else if (el) {
    el.classList.add('hidden');
  }
};

/* ================================================================
   PART 6 — EXTRA CATEGORIES SIDEBAR (Bags, Jewellery, Electronics)
================================================================ */
const EXTRA_CATS = [
  {key:'Bags',label:'Bags',icon:'🎒',groups:[
    {label:"🎒 Men's Bags",subs:[
      {n:'Casual Backpacks',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80'},
      {n:'Laptop Backpacks',img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=220&fit=crop&q=80'},
      {n:'Anti-Theft Bags', img:'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=220&fit=crop&q=80'},
    ]},
    {label:"👜 Women's Bags",subs:[
      {n:'Stylish Backpacks',img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80'},
      {n:'Tote Bags',        img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=220&fit=crop&q=80'},
      {n:'Handbags',         img:'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=200&h=220&fit=crop&q=80'},
      {n:'Clutches',         img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=220&fit=crop&q=80'},
      {n:'Sling Bags',       img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80'},
    ]},
    {label:"🧳 Travel & Gym",subs:[
      {n:'Travel Bags',img:'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=200&h=220&fit=crop&q=80'},
      {n:'Gym Bags',   img:'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=200&h=220&fit=crop&q=80'},
      {n:'Duffle Bags',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80'},
      {n:'Waist Bags', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80'},
    ]},
  ]},
  {key:'Jewellery',label:'Jewellery',icon:'💍',groups:[
    {label:"💍 Women's Jewelry",subs:[
      {n:'Necklaces',          img:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80'},
      {n:'Earrings',           img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80'},
      {n:'Rings',              img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=220&fit=crop&q=80'},
      {n:'Bracelets & Bangles',img:'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=200&h=220&fit=crop&q=80'},
      {n:'Anklets',            img:'https://images.unsplash.com/photo-1624517452488-04f55dc6e4e8?w=200&h=220&fit=crop&q=80'},
      {n:'Jewelry Sets',       img:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80'},
    ]},
    {label:"⚡ Men's Jewelry",subs:[
      {n:'Chains',       img:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=220&fit=crop&q=80'},
      {n:'Men Bracelets',img:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=220&fit=crop&q=80'},
      {n:'Men Rings',    img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=220&fit=crop&q=80'},
      {n:'Pendants',     img:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80'},
    ]},
    {label:"🪔 Traditional",subs:[
      {n:'Kundan',        img:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80'},
      {n:'Temple Jewelry',img:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80'},
      {n:'Bridal Sets',   img:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80'},
    ]},
    {label:"✨ Modern Fashion",subs:[
      {n:'Minimal Jewelry',   img:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80'},
      {n:'Layered Necklaces', img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80'},
      {n:'Statement Pieces',  img:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80'},
      {n:'Nose Pins',         img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80'},
      {n:'Hair Jewelry',      img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=220&fit=crop&q=80'},
    ]},
  ]},
  {key:'Electronics',label:'Electronics',icon:'⚡',isElectronics:true,groups:[]},
];

function _patchCatsSidebar() {
  const sidebar = document.getElementById('ok-csb'); if (!sidebar) return;
  if (sidebar.getAttribute('data-extrapatched2')) return;
  sidebar.setAttribute('data-extrapatched2', '1');

  EXTRA_CATS.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'ok-si-extra';
    item.innerHTML = `<div class="ok-si-icon">${cat.icon}</div><span>${cat.label}</span>`;
    item.onclick = function() {
      if (cat.isElectronics) { window._openElectronics(); return; }
      document.querySelectorAll('.ok-si, .ok-si-extra').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      _renderExtraCatRight(cat);
    };
    sidebar.appendChild(item);
  });
}

function _renderExtraCatRight(cat) {
  const right = document.getElementById('ok-crp'); if (!right) return;
  let html = `<div class="ok-vabtn" onclick="openCategoryPage('${cat.key}');window._closeCategories()"><span><i class="fas fa-th-large" style="margin-right:6px;"></i>View All ${cat.label}</span><i class="fas fa-chevron-right"></i></div>`;
  cat.groups.forEach(grp => {
    const cards = grp.subs.map(sub =>
      `<div class="ok-sc" onclick="openSubcatProducts('${cat.key}','${sub.n.replace(/'/g,"\\'")}');window._closeCategories()"><img src="${sub.img}" alt="${sub.n}" loading="lazy" onerror="this.src='https://placehold.co/66x74/f3f4f6/9ca3af?text=${encodeURIComponent(sub.n[0])}'"><span>${sub.n}</span></div>`
    ).join('');
    html += `<div class="ok-glbl">${grp.label}</div><div class="ok-scg">${cards}</div>`;
  });
  right.innerHTML = html; right.scrollTop = 0;
}

/* ================================================================
   PART 7 — HOME BUTTONS FIX
================================================================ */
function _patchHomeButtons() {
  const _fix = () => {
    document.querySelectorAll('.ok-viewall-btn').forEach(btn => {
      if (btn.getAttribute('data-cp2')) return;
      btn.setAttribute('data-cp2', '1');
      btn.onclick = e => { e.stopPropagation(); window._openCategories && window._openCategories(); };
      btn.textContent = 'View All Categories →';
    });
  };
  _fix();
  new MutationObserver(_fix).observe(document.body, { childList: true, subtree: true });
  setTimeout(_fix, 1000); setTimeout(_fix, 2500);

  window._openCategoriesTo = function(catName) {
    if (!catName) { window._openCategories && window._openCategories(); return; }
    if (catName.toLowerCase() === 'electronics') { window._openElectronics(); return; }
    window._openCategories && window._openCategories();
    setTimeout(() => {
      const items = document.querySelectorAll('#ok-csb .ok-si[data-ci]');
      items.forEach(item => {
        const sp = (item.querySelector('span')?.textContent || '').toLowerCase().trim();
        const cl = catName.toLowerCase().trim();
        if (sp === cl || cl.startsWith(sp.substring(0, 4)) || sp.startsWith(cl.substring(0, 4))) {
          const ci = parseInt(item.getAttribute('data-ci'));
          if (!isNaN(ci) && typeof window._okCatSel === 'function') window._okCatSel(ci);
        }
      });
    }, 200);
  };
}

/* ================================================================
   BOOT
================================================================ */
function _init() {
  _buildElecPage();
  _patchHeader();
  _patchHomeButtons();

  const wNav = setInterval(() => {
    if (typeof window.navigate === 'function' && typeof window._navigateCore === 'function') {
      clearInterval(wNav); _patchPDPBack();
    }
  }, 200);

  const wBanner = setInterval(() => {
    if (document.getElementById('banner-carousel')) { clearInterval(wBanner); _replaceBanners(); }
  }, 300);

  const wCat = setInterval(() => {
    if (document.getElementById('ok-csb')) { clearInterval(wCat); setTimeout(_patchCatsSidebar, 100); }
  }, 300);

  // Fix images whenever category tab changes
  const origSel = window._okCatSel;
  if (origSel && !window._okCatSelPatched2) {
    window._okCatSelPatched2 = true;
    window._okCatSel = function(i) { origSel(i); setTimeout(_fixSubcatImages, 80); };
  }
  // Also fix on categories panel open
  new MutationObserver(() => {
    const pg = document.getElementById('view-categories');
    if (pg && !pg.classList.contains('hidden')) {
      setTimeout(_fixSubcatImages, 100);
      const sb = document.getElementById('ok-csb');
      if (sb && !sb.getAttribute('data-extrapatched2')) _patchCatsSidebar();
    }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

  console.log('%c⚡ OutfitKart FinalFix v2.0 ✅', 'background:#0f172a;color:#60a5fa;font-weight:900;font-size:12px;padding:4px 12px;border-radius:6px;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 750));
} else {
  setTimeout(_init, 750);
}

Object.assign(window, {
  _openElectronics: window._openElectronics,
  _closeElectronics: window._closeElectronics,
  _elecGroupSel: window._elecGroupSel,
  _pdpGoBack: window._pdpGoBack,
  _openCategoriesTo: window._openCategoriesTo,
});

})();
