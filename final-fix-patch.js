'use strict';
/* ================================================================
   OutfitKart — FINAL FIX PATCH v1.0
   Fixes:
   1. PDP back → same category/subcategory page (not all products)
   2. Home "View All Categories" → opens categories page
   3. Home category bubbles → correct category opens in categories page
   4. Electronics → separate "OutfitKart Electronics" branded page
   5. Categories page mein ALL categories + subcategories added (Bags, Jewellery, Electronics)
   ================================================================ */

(function _okFinalFix() {

  /* ────────────────────────────────────────────────────────────────
     PART 1 — CSS for Electronics Page
  ──────────────────────────────────────────────────────────────── */
  (function(){
    if (document.getElementById('ok-ffp-css')) return;
    const s = document.createElement('style');
    s.id = 'ok-ffp-css';
    s.textContent = `
      /* Electronics page */
      #view-electronics {
        position: fixed; inset: 0; z-index: 60;
        background: #0f172a;
        display: flex; flex-direction: column; overflow: hidden;
      }
      #view-electronics.hidden { display: none !important; }
      #ok-elec-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
        border-bottom: 2px solid #3b82f6;
        padding: 0 16px;
        height: 60px;
        display: flex; align-items: center; gap: 12px;
        flex-shrink: 0;
        box-shadow: 0 4px 20px rgba(59,130,246,0.3);
      }
      #ok-elec-header h2 {
        font-size: 1.1rem; font-weight: 900; margin: 0; flex: 1;
        background: linear-gradient(135deg, #60a5fa, #93c5fd, #60a5fa);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      #ok-elec-header .ok-elec-back {
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(59,130,246,0.2); border: 1px solid #3b82f6;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; color: #60a5fa; font-size: 14px;
        flex-shrink: 0;
      }
      #ok-elec-body { display: flex; flex: 1; overflow: hidden; }
      #ok-elec-sidebar {
        width: 88px; flex-shrink: 0;
        background: #0d1b2e;
        overflow-y: auto; -webkit-overflow-scrolling: touch;
        scrollbar-width: none; border-right: 1px solid #1e3a5f;
      }
      #ok-elec-sidebar::-webkit-scrollbar { display: none; }
      .ok-elec-si {
        display: flex; flex-direction: column; align-items: center;
        padding: 11px 4px; cursor: pointer;
        border-left: 3px solid transparent;
        text-align: center; gap: 4px;
        transition: all 0.2s;
      }
      .ok-elec-si.active {
        background: rgba(59,130,246,0.15);
        border-left-color: #3b82f6;
      }
      .ok-elec-si .ok-elec-icon {
        width: 44px; height: 44px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem; background: #1e3a5f;
        border: 2px solid #1e3a5f; transition: all 0.2s;
      }
      .ok-elec-si.active .ok-elec-icon {
        background: rgba(59,130,246,0.25); border-color: #3b82f6;
      }
      .ok-elec-si span {
        font-size: 8.5px; font-weight: 800; color: #94a3b8;
        line-height: 1.2; word-break: break-word;
      }
      .ok-elec-si.active span { color: #60a5fa; }
      #ok-elec-right {
        flex: 1; overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #111827; padding: 10px;
      }
      .ok-elec-glbl {
        font-size: 10px; font-weight: 800; color: #60a5fa;
        background: rgba(59,130,246,0.1); border-radius: 8px;
        padding: 6px 10px; margin: 8px 0 6px;
        border-left: 3px solid #3b82f6;
      }
      .ok-elec-grid {
        display: grid; grid-template-columns: repeat(3,1fr);
        gap: 6px; margin-bottom: 10px;
      }
      .ok-elec-card {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; cursor: pointer; padding: 7px 3px;
        border-radius: 10px; text-align: center;
        background: #1e293b; border: 1px solid #1e3a5f;
        transition: all 0.2s;
      }
      .ok-elec-card:active { background: rgba(59,130,246,0.2); border-color: #3b82f6; }
      .ok-elec-card img {
        width: 64px; height: 64px; object-fit: cover;
        border-radius: 8px; border: 1px solid #1e3a5f;
      }
      .ok-elec-card span {
        font-size: 9px; font-weight: 700; color: #cbd5e1;
        line-height: 1.2;
      }
      .ok-elec-vaBtn {
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(59,130,246,0.15); border: 1.5px solid #3b82f6;
        border-radius: 12px; padding: 11px 14px; cursor: pointer;
        margin-bottom: 10px; color: #60a5fa; font-size: 12px;
        font-weight: 800;
      }
      .ok-elec-vaBtn:active { background: rgba(59,130,246,0.3); }

      /* Categories page extra categories (Bags, Jewellery, Electronics) */
      .ok-elec-cat-chip {
        display: inline-flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, #1e3a5f, #1e40af);
        color: #93c5fd; font-size: 10px; font-weight: 800;
        padding: 4px 10px; border-radius: 99px;
        cursor: pointer; border: 1px solid #3b82f6;
      }
    `;
    document.head.appendChild(s);
  })();

  /* ────────────────────────────────────────────────────────────────
     PART 2 — Electronics Page Data & Builder
  ──────────────────────────────────────────────────────────────── */
  const ELEC_GROUPS = [
    {
      label: '📱 Mobile Accessories', icon: '📱',
      subs: [
        { n: 'Phone Cases',      img: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop&q=80' },
        { n: 'Charging Cables',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80' },
        { n: 'Power Banks',      img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop&q=80' },
        { n: 'Selfie Sticks',    img: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=200&h=200&fit=crop&q=80' },
        { n: 'Screen Protectors',img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop&q=80' },
        { n: 'Mobile Holders',   img: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&h=200&fit=crop&q=80' },
        { n: 'USB Hubs',         img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '🎧 Audio Devices', icon: '🎧',
      subs: [
        { n: 'Earbuds',              img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop&q=80' },
        { n: 'Wireless Headphones',  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&q=80' },
        { n: 'Wired Headphones',     img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop&q=80' },
        { n: 'Bluetooth Speakers',   img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop&q=80' },
        { n: 'Neckbands',            img: 'https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '🎮 Gaming', icon: '🎮',
      subs: [
        { n: 'Gaming Controllers', img: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=200&fit=crop&q=80' },
        { n: 'Gaming Headsets',    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&h=200&fit=crop&q=80' },
        { n: 'Gaming Mouse',       img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop&q=80' },
        { n: 'Gaming Keyboards',   img: 'https://images.unsplash.com/photo-1601445638532-3a6628b7b78c?w=200&h=200&fit=crop&q=80' },
        { n: 'Gaming Chairs',      img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '⚡ Smart Gadgets', icon: '⚡',
      subs: [
        { n: 'Smartwatches',   img: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=200&h=200&fit=crop&q=80' },
        { n: 'Smart Bands',    img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop&q=80' },
        { n: 'Smart Glasses',  img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop&q=80' },
        { n: 'Mini Projectors',img: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200&h=200&fit=crop&q=80' },
        { n: 'Smart Plugs',    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '💻 Computer Accessories', icon: '💻',
      subs: [
        { n: 'Laptop Stands',           img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=200&fit=crop&q=80' },
        { n: 'Keyboard & Mouse Combos', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop&q=80' },
        { n: 'Webcams',                 img: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=200&h=200&fit=crop&q=80' },
        { n: 'USB Drives',              img: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=200&h=200&fit=crop&q=80' },
        { n: 'Mouse Pads',              img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '🏠 Home Electronics', icon: '🏠',
      subs: [
        { n: 'LED Strip Lights', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80' },
        { n: 'Table Fans',       img: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=200&h=200&fit=crop&q=80' },
        { n: 'Desk Lamps',       img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop&q=80' },
        { n: 'Digital Clocks',   img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=200&h=200&fit=crop&q=80' },
        { n: 'Air Purifiers',    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop&q=80' },
      ]
    },
    {
      label: '🎬 Creator Tools', icon: '🎬',
      subs: [
        { n: 'Ring Lights',     img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&q=80' },
        { n: 'Tripods',         img: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=200&h=200&fit=crop&q=80' },
        { n: 'Green Screens',   img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200&h=200&fit=crop&q=80' },
        { n: 'Lavalier Mics',   img: 'https://images.unsplash.com/photo-1590602846989-55f4b27c9090?w=200&h=200&fit=crop&q=80' },
        { n: 'Camera Lens Kits',img: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=200&h=200&fit=crop&q=80' },
      ]
    },
  ];

  let _elecActiveGroup = 0;

  function _buildElecPage() {
    if (document.getElementById('view-electronics')) return;
    const page = document.createElement('div');
    page.id = 'view-electronics'; page.className = 'hidden view-section';

    page.innerHTML = `
      <div id="ok-elec-header">
        <button class="ok-elec-back" onclick="_closeElectronics()" aria-label="Back">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>⚡ OutfitKart Electronics</h2>
        <div style="font-size:10px;color:#475569;font-weight:700;">Gadgets & Tech</div>
      </div>
      <div id="ok-elec-body">
        <div id="ok-elec-sidebar">
          ${ELEC_GROUPS.map((g, i) => `
            <div class="ok-elec-si ${i===0?'active':''}" onclick="_elecGroupSel(${i})" data-eg="${i}">
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
      <div class="ok-elec-card" onclick="openSubcatProducts('Electronics','${sub.n.replace(/'/g,"\\'")}');_closeElectronics()">
        <img src="${sub.img}" alt="${sub.n}" loading="lazy" onerror="this.src='https://placehold.co/64x64/1e293b/60a5fa?text=⚡'">
        <span>${sub.n}</span>
      </div>`).join('');

    right.innerHTML = `
      <div class="ok-elec-vaBtn" onclick="openCategoryPage('Electronics');_closeElectronics()">
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
    document.getElementById('view-electronics').classList.remove('hidden');
    // Close categories panel if open
    if (typeof window._closeCategories === 'function') window._closeCategories();
    window.currentView = 'electronics';
    window.scrollTo(0, 0);
    if (typeof window.updateBottomNav === 'function') window.updateBottomNav();
  };

  window._closeElectronics = function() {
    const el = document.getElementById('view-electronics');
    if (el) el.classList.add('hidden');
  };

  /* ────────────────────────────────────────────────────────────────
     PART 3 — Fix Categories Page to include ALL categories
     (Bags, Jewellery, Electronics chip)
  ──────────────────────────────────────────────────────────────── */
  const EXTRA_CATS_FOR_SIDEBAR = [
    {
      key: 'Bags', label: 'Bags', icon: '🎒',
      photo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop&q=80',
      groups: [
        { label: "🎒 Men's College Bags", subs: [
          { n: 'Casual Backpacks',  img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80' },
          { n: 'Laptop Backpacks',  img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=220&fit=crop&q=80' },
          { n: 'Anti-Theft Bags',   img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "👜 Women's College Bags", subs: [
          { n: 'Stylish Backpacks', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80' },
          { n: 'Tote Bags',         img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=220&fit=crop&q=80' },
          { n: 'Mini Backpacks',    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "👜 Women's Bags", subs: [
          { n: 'Handbags',  img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=220&fit=crop&q=80' },
          { n: 'Clutches',  img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=200&h=220&fit=crop&q=80' },
          { n: 'Sling Bags',img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "🧳 Travel & Gym", subs: [
          { n: 'Travel Bags', img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=200&h=220&fit=crop&q=80' },
          { n: 'Waist Bags',  img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80' },
          { n: 'Gym Bags',    img: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=200&h=220&fit=crop&q=80' },
          { n: 'Duffle Bags', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80' },
        ]},
      ]
    },
    {
      key: 'Jewellery', label: 'Jewellery', icon: '💍',
      photo: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=120&h=120&fit=crop&q=80',
      groups: [
        { label: "💍 Women's Jewelry", subs: [
          { n: 'Necklaces',         img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
          { n: 'Earrings',          img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80' },
          { n: 'Rings',             img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=220&fit=crop&q=80' },
          { n: 'Bracelets & Bangles',img: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=200&h=220&fit=crop&q=80' },
          { n: 'Anklets',           img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
          { n: 'Jewelry Sets',      img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "⚡ Men's Jewelry", subs: [
          { n: 'Chains',        img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=220&fit=crop&q=80' },
          { n: 'Men Bracelets', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=220&fit=crop&q=80' },
          { n: 'Men Rings',     img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=220&fit=crop&q=80' },
          { n: 'Pendants',      img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "🪔 Traditional", subs: [
          { n: 'Kundan',         img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80' },
          { n: 'Temple Jewelry', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
          { n: 'Bridal Sets',    img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80' },
        ]},
        { label: "✨ Modern & Fashion", subs: [
          { n: 'Minimal Jewelry',   img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
          { n: 'Layered Necklaces', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80' },
          { n: 'Statement Pieces',  img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=200&h=220&fit=crop&q=80' },
          { n: 'Nose Pins',         img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80' },
          { n: 'Hair Jewelry',      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=220&fit=crop&q=80' },
        ]},
      ]
    },
    {
      key: 'Electronics', label: '⚡ Electronics', icon: '⚡',
      photo: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=120&h=120&fit=crop&q=80',
      isElectronics: true, // special flag → open electronics page
      groups: []
    },
  ];

  /* Patch categories-nav-patch CATS array after it loads */
  function _patchCatsSidebar() {
    // Wait for view-categories to exist
    const page = document.getElementById('view-categories'); if (!page) return;
    const sidebar = document.getElementById('ok-csb'); if (!sidebar) return;

    // Check if already patched
    if (sidebar.getAttribute('data-extrapatched')) return;
    sidebar.setAttribute('data-extrapatched', '1');

    // Get current count of ok-si items
    const existingItems = sidebar.querySelectorAll('.ok-si').length;

    // Add extra category items to sidebar
    EXTRA_CATS_FOR_SIDEBAR.forEach((cat, offset) => {
      const idx = existingItems + offset;
      const item = document.createElement('div');
      item.className = 'ok-si';
      item.setAttribute('data-ci', idx);
      item.setAttribute('data-extra', cat.key);
      item.innerHTML = `
        <div style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;background:#f3f4f6;border:2px solid #e5e7eb;">${cat.icon}</div>
        <span>${cat.label.replace(/[⚡💍🎒]/g,'').trim()}</span>`;

      item.onclick = function() {
        if (cat.isElectronics) {
          // Open the dedicated electronics page
          window._openElectronics();
          return;
        }
        // Show this extra cat in right panel
        document.querySelectorAll('.ok-si').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        _renderExtraCatRight(cat);
      };
      sidebar.appendChild(item);
    });
  }

  function _renderExtraCatRight(cat) {
    const right = document.getElementById('ok-crp'); if (!right) return;

    let groupsHtml = '';
    cat.groups.forEach(grp => {
      const cards = grp.subs.map(sub => `
        <div class="ok-sc" onclick="openSubcatProducts('${cat.key}','${sub.n.replace(/'/g,"\\'")}');_closeCategories()">
          <img src="${sub.img}" alt="${sub.n}" loading="lazy" onerror="this.src='https://placehold.co/66x74/f3f4f6/9ca3af?text=+'" >
          <span>${sub.n}</span>
        </div>`).join('');
      groupsHtml += `<div class="ok-glbl">${grp.label}</div><div class="ok-scg">${cards}</div>`;
    });

    right.innerHTML = `
      <div class="ok-vabtn" onclick="openCategoryPage('${cat.key}');_closeCategories()">
        <span><i class="fas fa-th-large" style="margin-right:6px;"></i>View All ${cat.label.replace(/[⚡💍🎒]/g,'').trim()}</span>
        <i class="fas fa-chevron-right"></i>
      </div>${groupsHtml}`;
    right.scrollTop = 0;
  }

  /* ────────────────────────────────────────────────────────────────
     PART 4 — Fix PDP Back Button
     Category → Subcat (shop) → PDP → Back should go to SAME subcat
  ──────────────────────────────────────────────────────────────── */
  function _patchPDPBack() {
    if (window._pdpBackPatched) return;
    if (!window.navigate) return;
    window._pdpBackPatched = true;

    const origNav = window.navigate;

    // Patch navigate to track the "previous shop state" before going to product
    window.navigate = function(view, cat) {
      if (view === 'product') {
        // Save full shop context when opening PDP
        window._pdpReturnState = {
          view: window.currentView || 'home',
          cat: window.currentCategoryFilter || null,
          sub: window.currentSubFilter || null,
        };
      }
      return origNav(view, cat);
    };

    // Inject smart back function for PDP
    window._pdpGoBack = function() {
      const state = window._pdpReturnState;
      if (!state) {
        origNav('home');
        return;
      }

      if (state.view === 'shop' && state.cat) {
        // Restore the exact shop page with category + subcategory
        window.currentCategoryFilter = state.cat;
        window.currentSubFilter = state.sub || null;

        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        window.currentView = 'shop';
        const shopView = document.getElementById('view-shop');
        if (shopView) shopView.classList.remove('hidden');

        const titleEl = document.getElementById('shop-title');
        if (titleEl) {
          titleEl.textContent = state.sub
            ? (typeof getSubDisplayName === 'function' ? getSubDisplayName(state.sub) : state.sub)
            : `${state.cat} Collection`;
        }

        if (typeof renderShopProducts === 'function') renderShopProducts();
        if (typeof renderShopSubcategories === 'function') renderShopSubcategories();
        window.scrollTo(0, 0);
        if (typeof updateBottomNav === 'function') updateBottomNav();
        if (typeof _initShopScrollHide === 'function') _initShopScrollHide();

        // Push browser state
        try { history.pushState({ view: 'shop', cat: state.cat }, ''); } catch(e) {}

      } else if (state.view === 'category') {
        if (typeof window.openCategoryPage === 'function') {
          window.openCategoryPage(state.cat || '');
        } else {
          origNav('home');
        }
      } else if (state.view === 'electronics') {
        window._openElectronics();
      } else {
        origNav(state.view || 'home');
      }

      window._pdpReturnState = null;
    };

    // Now patch the PDP view's back button: intercept navigate('product') to inject back button
    // We override _navigateCore to inject the back button after product view renders
    const origNavCore = window._navigateCore || origNav;
    if (window._navigateCore) {
      const _origCore = window._navigateCore;
      window._navigateCore = function(view, cat) {
        const result = _origCore(view, cat);
        if (view === 'product') {
          _injectPDPBackButton();
        }
        return result;
      };
    }
  }

  function _injectPDPBackButton() {
    // Find the product view and inject/update back button at top
    setTimeout(() => {
      const productView = document.getElementById('view-product');
      if (!productView) return;

      // Check if sticky header with back button already exists at top level
      let header = productView.querySelector('#ok-pdp-smart-header');
      if (header) {
        // already injected, just make sure onclick is _pdpGoBack
        return;
      }

      // Create sticky header with back button
      header = document.createElement('div');
      header.id = 'ok-pdp-smart-header';
      header.style.cssText = 'position:sticky;top:64px;z-index:30;background:white;border-bottom:1px solid #f3f4f6;padding:12px 16px;display:flex;align-items:center;gap:12px;';
      header.innerHTML = `
        <button onclick="window._pdpGoBack&&window._pdpGoBack()" style="width:36px;height:36px;border-radius:50%;background:#f3f4f6;border:none;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-arrow-left" style="color:#374151;font-size:13px;"></i>
        </button>
        <span id="ok-pdp-breadcrumb" style="font-size:12px;font-weight:700;color:#6b7280;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"></span>`;

      productView.insertBefore(header, productView.firstChild);

      // Set breadcrumb text
      const state = window._pdpReturnState;
      const crumb = document.getElementById('ok-pdp-breadcrumb');
      if (crumb && state) {
        if (state.sub) {
          crumb.textContent = `${state.cat} › ${typeof getSubDisplayName === 'function' ? getSubDisplayName(state.sub) : state.sub}`;
        } else if (state.cat) {
          crumb.textContent = `${state.cat} Collection`;
        } else {
          crumb.textContent = 'Back';
        }
      }
    }, 100);
  }

  /* ────────────────────────────────────────────────────────────────
     PART 5 — Fix Home "View All Categories" button
     & "Shop By Category" bubbles → open categories page
  ──────────────────────────────────────────────────────────────── */
  function _patchHomeButtons() {
    // Patch "View All Categories" button in "Shop By Category" section
    const _patchViewAll = () => {
      document.querySelectorAll('.ok-viewall-btn').forEach(btn => {
        if (btn.getAttribute('data-catpatched')) return;
        btn.setAttribute('data-catpatched', '1');
        btn.onclick = function(e) {
          e.stopPropagation();
          if (typeof window._openCategories === 'function') {
            window._openCategories();
          }
        };
        btn.textContent = 'View All Categories →';
      });
    };

    // "Shop By Category" card clicks: open categories page at that category
    window._openCategoriesTo = function(catName) {
      if (!catName) { window._openCategories && window._openCategories(); return; }

      // If electronics, open dedicated page
      if (catName.toLowerCase() === 'electronics') {
        window._openElectronics(); return;
      }

      // Open categories panel and switch to the correct tab
      if (typeof window._openCategories === 'function') {
        window._openCategories();
      }

      // Find the index of the category in CATS (from categories-nav-patch)
      setTimeout(() => {
        const items = document.querySelectorAll('#ok-csb .ok-si');
        items.forEach((item, idx) => {
          const spanText = item.querySelector('span')?.textContent?.toLowerCase() || '';
          const catLower = catName.toLowerCase().replace(/[⚡💍🎒]/g,'').trim();
          if (spanText.includes(catLower.substring(0,5)) || catLower.includes(spanText.substring(0,5))) {
            if (typeof window._okCatSel === 'function') {
              window._okCatSel(idx);
            }
          }
        });
      }, 150);
    };

    // Run patcher now and also watch for DOM changes (section loads async)
    _patchViewAll();
    const obs = new MutationObserver(_patchViewAll);
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(_patchViewAll, 1000);
    setTimeout(_patchViewAll, 2000);
  }

  /* ────────────────────────────────────────────────────────────────
     PART 6 — Patch navigate() to handle 'electronics' view
  ──────────────────────────────────────────────────────────────── */
  function _patchNavigateForElec() {
    if (window._elecNavPatched) return;
    if (!window.navigate) return;
    window._elecNavPatched = true;
    const orig = window.navigate;
    window.navigate = function(view, cat) {
      if (view === 'electronics') { window._openElectronics(); return; }
      // Also close electronics page on any other navigation
      if (view !== 'electronics') window._closeElectronics();
      return orig(view, cat);
    };
  }

  /* ────────────────────────────────────────────────────────────────
     PART 7 — Add Electronics to Home Category bubbles
  ──────────────────────────────────────────────────────────────── */
  function _patchHomeCategoryStrip() {
    // The home strip is rendered via _renderHomeSubcatStrip in mega-patch
    // We patch the onclick of Electronics bubble in it
    const _fixElecBubble = () => {
      const homeView = document.getElementById('view-home'); if (!homeView) return;
      // Find all category bubble containers
      homeView.querySelectorAll('[onclick*="Electronics"]').forEach(el => {
        if (el.getAttribute('data-elecpatched')) return;
        el.setAttribute('data-elecpatched', '1');
        const orig = el.getAttribute('onclick');
        el.setAttribute('onclick', "window._openElectronics()");
      });
    };
    _fixElecBubble();
    setTimeout(_fixElecBubble, 1500);
    setTimeout(_fixElecBubble, 3000);
  }

  /* ────────────────────────────────────────────────────────────────
     BOOT
  ──────────────────────────────────────────────────────────────── */
  function _init() {
    _buildElecPage();
    _patchHomeButtons();
    _patchHomeCategoryStrip();

    // Wait for navigate to be ready
    const wNav = setInterval(() => {
      if (typeof window.navigate === 'function') {
        clearInterval(wNav);
        _patchNavigateForElec();
        _patchPDPBack();
      }
    }, 200);

    // Wait for categories page to be built then add extra cats
    const wCat = setInterval(() => {
      if (document.getElementById('view-categories') && document.getElementById('ok-csb')) {
        clearInterval(wCat);
        _patchCatsSidebar();
      }
    }, 300);

    // Also run patcher whenever categories page is opened (it may rebuild)
    const catObs = new MutationObserver(() => {
      const sidebar = document.getElementById('ok-csb');
      if (sidebar && !sidebar.getAttribute('data-extrapatched')) {
        _patchCatsSidebar();
      }
    });
    catObs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    console.log('%c🔧 OutfitKart FinalFix Patch v1.0 ✅', 'background:#0f172a;color:#60a5fa;font-weight:900;font-size:12px;padding:4px 12px;border-radius:6px;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 700));
  } else {
    setTimeout(_init, 700);
  }

  /* Global exports */
  Object.assign(window, {
    _openElectronics: window._openElectronics,
    _closeElectronics: window._closeElectronics,
    _elecGroupSel: window._elecGroupSel,
    _pdpGoBack: window._pdpGoBack,
    _openCategoriesTo: window._openCategoriesTo,
  });

})();
