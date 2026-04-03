/* ================================================================
   OutfitKart — PDP SUPER PATCH
   ================================================================
   FIXES:
   ✅ 1. PDP image — container ke full size cover (aspect-ratio sahi)
   ✅ 2. COD price = selling_price × 1.08 (8% extra, admin price base)
   ✅ 3. Meesho-style trust box: 7 Days Return | COD | Lowest Price
   ✅ 4. Checkout mein bhi UPI = selling_price, COD = selling_price × 1.08
   ================================================================
   index.html mein SABSE LAST <script> ke baad add karo:
     <script src="pdp-super-patch.js"></script>
   ================================================================ */

'use strict';

(function () {

  /* ──────────────────────────────────────────────────────────────
     1. PDP IMAGE CSS — Container ke size ke according fill hoga
     Problem: Fixed height thi, alag-alag screen par ugly lagta tha
     Fix: Container full width, aspect-ratio 3/4 (portrait fashion),
          object-fit: cover so image fills without distortion
  ────────────────────────────────────────────────────────────── */
  function _injectPDPImageCSS() {
    if (document.getElementById('ok-pdp-img-super-css')) return;
    const s = document.createElement('style');
    s.id = 'ok-pdp-img-super-css';
    s.textContent = `

      /* ── PDP main slider — container ke full size ── */
      .pdp-img-slider {
        width: 100% !important;
        border-radius: 14px !important;
        border: none !important;
        overflow: hidden !important;
        background: #f3f4f6 !important;
      }

      .pdp-img-slider img {
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        aspect-ratio: 3 / 4 !important;
        object-fit: cover !important;
        object-position: top center !important;
        display: block !important;
        flex-shrink: 0 !important;
        min-width: 100% !important;
        transition: opacity 0.2s ease !important;
      }

      /* Single image (non-slider) PDP — same fix */
      #pdp-container .rounded-lg.overflow-hidden img,
      #pdp-container .pdp-single-img {
        width: 100% !important;
        aspect-ratio: 3 / 4 !important;
        object-fit: cover !important;
        object-position: top center !important;
        border-radius: 14px !important;
        display: block !important;
      }

      /* Thumb strip — tiny aspect-ratio */
      .pdp-thumb-strip {
        gap: 6px !important;
        padding: 8px 0 !important;
      }
      .pdp-thumb {
        width: 56px !important;
        height: 68px !important;
        object-fit: cover !important;
        object-position: top center !important;
        border-radius: 8px !important;
        border: 2px solid transparent !important;
        flex-shrink: 0 !important;
      }
      .pdp-thumb.active {
        border-color: #e11d48 !important;
        box-shadow: 0 0 0 1px #e11d48 !important;
      }

      /* ── Trust box — Meesho style ── */
      #ok-pdp-trust-box {
        background: #fdf0f5;
        border: 1px solid #f9d0e0;
        border-radius: 14px;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        margin: 12px 0;
      }
      .ok-pdp-trust-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        flex: 1;
        text-align: center;
      }
      .ok-pdp-trust-item + .ok-pdp-trust-item {
        border-left: 1px solid #f9d0e0;
      }
      .ok-pdp-trust-icon {
        font-size: 22px;
        line-height: 1;
      }
      .ok-pdp-trust-label {
        font-size: 10.5px;
        font-weight: 800;
        color: #1a1a2e;
        line-height: 1.2;
      }

      /* ── Payment toggle — updated style ── */
      #ok-pay-toggle {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        padding: 14px;
        margin: 12px 0;
      }
      .opt-lbl {
        font-size: 11px;
        font-weight: 800;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 10px;
      }
      .ok-pay-opts {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .ok-pay-btn {
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        padding: 10px 14px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s;
        font-size: 13px;
        font-weight: 700;
        color: #374151;
      }
      .ok-pay-btn.sel {
        border-color: #e11d48;
        background: #fff1f2;
        color: #e11d48;
      }
      .ok-pay-sub {
        font-size: 11px;
        font-weight: 600;
        color: #6b7280;
      }
      .ok-pay-btn.sel .ok-pay-sub {
        color: #be123c;
      }
      .ok-cod-warning {
        font-size: 10px;
        color: #f59e0b;
        font-weight: 700;
        margin-top: 7px;
        display: none;
        align-items: center;
        gap: 4px;
      }
      .ok-cod-warning.show { display: flex !important; }

      /* ── Rating badge ── */
      #ok-pdp-rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
      }
      #ok-pdp-rating-badge {
        background: #2e7d32;
        color: white;
        font-size: 12px;
        font-weight: 900;
        padding: 3px 8px;
        border-radius: 99px;
        display: flex;
        align-items: center;
        gap: 3px;
      }
      #ok-pdp-rating-count {
        font-size: 12px;
        color: #6b7280;
      }

      /* ── UPI badge on price ── */
      #ok-upi-offer-badge {
        background: #f0f8ff;
        border: 1px solid #c3ddf5;
        border-radius: 8px;
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 700;
        color: #1565c0;
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 6px 0;
      }
      #ok-upi-offer-badge .upi-logo {
        font-size: 16px;
      }
    `;
    document.head.appendChild(s);
    console.log('[PDP-SUPER] ✅ Image CSS injected');
  }


  /* ──────────────────────────────────────────────────────────────
     2. COD PRICING — 8% extra on selling_price (admin set kiya hua)
     Purana patch: fixed ₹19 extra
     Naya: selling_price = UPI, COD = ceil(selling_price * 1.08)
  ────────────────────────────────────────────────────────────── */
  function _calcCODPrice(basePrice) {
    return Math.ceil(basePrice * 1.08);
  }

  // Override _injectCODToggle with new 8% logic
  function _patchCODToggle() {
    window._injectCODToggle = function (product) {
      document.getElementById('ok-pay-toggle')?.remove();

      const base    = product.price || product.selling_price || 0;
      const codP    = _calcCODPrice(base);
      const diff    = codP - base;

      window._pdpBasePrice = base;
      window._pdpPayMode   = 'upi';

      const toggle = document.createElement('div');
      toggle.id = 'ok-pay-toggle';
      toggle.innerHTML = `
        <div class="opt-lbl">💳 Payment Mode</div>
        <div class="ok-pay-opts">
          <div class="ok-pay-btn sel" id="ok-pay-upi" onclick="window._okPay('upi')">
            <span>📱 UPI / Online</span>
            <span class="ok-pay-sub">₹${base.toLocaleString('en-IN')} — Best Price</span>
          </div>
          <div class="ok-pay-btn" id="ok-pay-cod" onclick="window._okPay('cod')">
            <span>💵 Cash on Delivery</span>
            <span class="ok-pay-sub">₹${codP.toLocaleString('en-IN')} (+₹${diff})</span>
          </div>
        </div>
        <div class="ok-cod-warning" id="ok-cod-warn">⚠️ COD pe ₹${diff} extra handling charge (8%)</div>
      `;

      // Price ke neeche insert karo
      const priceEl = document.querySelector(
        '#pdp-container .text-3xl, #pdp-container .text-2xl.font-black, #pdp-container [class*="price"]'
      );
      if (priceEl) {
        const sect =
          priceEl.closest('.px-4,.p-4,.px-3') ||
          priceEl.parentElement?.parentElement ||
          priceEl.parentElement;
        sect?.insertAdjacentElement('afterend', toggle);
      } else {
        // Fallback — pdp-container ke andar append
        const pdpC = document.getElementById('pdp-container');
        if (pdpC) pdpC.appendChild(toggle);
      }

      // Live price toggle
      window._okPay = function (mode) {
        window._pdpPayMode = mode;
        document.getElementById('ok-pay-upi')?.classList.toggle('sel', mode === 'upi');
        document.getElementById('ok-pay-cod')?.classList.toggle('sel', mode === 'cod');
        document.getElementById('ok-cod-warn')?.classList.toggle('show', mode === 'cod');

        const liveP = document.querySelector(
          '#pdp-container .text-3xl, #pdp-container .text-2xl.font-black'
        );
        if (liveP) {
          const newP = mode === 'cod' ? codP : base;
          liveP.textContent = '₹' + newP.toLocaleString('en-IN');
          liveP.style.color = mode === 'cod' ? '#f59e0b' : '#e11d48';
        }

        // UPI badge
        const upiB = document.getElementById('ok-upi-offer-badge');
        if (upiB) upiB.style.display = mode === 'upi' ? 'flex' : 'none';
      };

      console.log('[PDP-SUPER] ✅ COD Toggle: UPI ₹' + base + ' | COD ₹' + codP + ' (+8%)');
    };

    console.log('[PDP-SUPER] ✅ _injectCODToggle patched with 8% COD logic');
  }


  /* ──────────────────────────────────────────────────────────────
     3. TRUST BOX — Meesho style: 7 Days Return | COD | Lowest Price
     PDP mein price section ke baad inject hoga
  ────────────────────────────────────────────────────────────── */
  function _injectPDPTrustBox() {
    document.getElementById('ok-pdp-trust-box')?.remove();

    const box = document.createElement('div');
    box.id = 'ok-pdp-trust-box';
    box.innerHTML = `
      <div class="ok-pdp-trust-item">
        <span class="ok-pdp-trust-icon">↩️</span>
        <span class="ok-pdp-trust-label">7 Days<br>Easy Return</span>
      </div>
      <div class="ok-pdp-trust-item">
        <span class="ok-pdp-trust-icon">💵</span>
        <span class="ok-pdp-trust-label">Cash on<br>Delivery</span>
      </div>
      <div class="ok-pdp-trust-item">
        <span class="ok-pdp-trust-icon">🏷️</span>
        <span class="ok-pdp-trust-label">Lowest<br>Price</span>
      </div>
    `;
    return box;
  }


  /* ──────────────────────────────────────────────────────────────
     4. UPI OFFER BADGE — "UPI Offer applied for you!!" (Meesho style)
  ────────────────────────────────────────────────────────────── */
  function _injectUPIBadge() {
    document.getElementById('ok-upi-offer-badge')?.remove();
    const badge = document.createElement('div');
    badge.id = 'ok-upi-offer-badge';
    badge.innerHTML = `<span class="upi-logo">📱</span> UPI Offer applied for you!!`;
    return badge;
  }


  /* ──────────────────────────────────────────────────────────────
     5. HOOK openProductPage — Trust box + UPI badge inject karo
     Har baar product open hone par fresh inject
  ────────────────────────────────────────────────────────────── */
  function _hookOpenProductPage() {
    if (window._pdpSuperPatched) return;

    const _tryHook = () => {
      if (typeof window.openProductPage !== 'function') return false;
      if (window._pdpSuperPatched) return true;
      window._pdpSuperPatched = true;

      const _origPP = window.openProductPage;
      window.openProductPage = async function (id, isGold) {
        const result = await _origPP(id, isGold);

        setTimeout(() => {
          // Product data dhundho
          const allP = [
            ...(window.products || []),
            ...(window.allProducts || []),
            ...(window.goldProducts || [])
          ];
          const seen = new Set();
          const uniq = allP.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
          const product = uniq.find(p => p.id === id || String(p.id) === String(id));

          // ── COD Toggle (8% logic) ──
          if (product && typeof window._injectCODToggle === 'function') {
            window._injectCODToggle(product);
          }

          // ── Trust Box ──
          const trustBox = _injectPDPTrustBox();
          const payToggle = document.getElementById('ok-pay-toggle');
          if (payToggle) {
            payToggle.insertAdjacentElement('afterend', trustBox);
          } else {
            const priceEl = document.querySelector(
              '#pdp-container .text-3xl, #pdp-container .text-2xl.font-black'
            );
            if (priceEl) {
              const sect = priceEl.closest('.px-4,.p-4,.px-3') || priceEl.parentElement;
              sect?.insertAdjacentElement('afterend', trustBox);
            }
          }

          // ── UPI Badge ──
          const upiB = _injectUPIBadge();
          const priceEl2 = document.querySelector(
            '#pdp-container .text-3xl, #pdp-container .text-2xl.font-black'
          );
          if (priceEl2) {
            priceEl2.insertAdjacentElement('afterend', upiB);
          }

        }, 400);

        return result;
      };

      console.log('[PDP-SUPER] ✅ openProductPage hooked — trust box + UPI badge + 8% COD');
      return true;
    };

    if (!_tryHook()) {
      const iv = setInterval(() => {
        if (_tryHook()) clearInterval(iv);
      }, 200);
    }
  }


  /* ──────────────────────────────────────────────────────────────
     6. CHECKOUT PRICING FIX
     Checkout summary mein jo item price dikhta hai woh bhi
     payment mode ke according UPI ya COD (8%) hona chahiye.
     
     Jab "Place Order" hota hai, tab _pdpPayMode check karke
     correct amount pass karo.
  ────────────────────────────────────────────────────────────── */
  function _patchCheckoutPricing() {
    // Checkout step 3 (payment) mein COD warning
    const checkoutObserver = new MutationObserver(() => {
      const step3 = document.getElementById('checkout-step-3');
      if (!step3 || step3.classList.contains('hidden')) return;
      if (step3.dataset.okPricePatched) return;
      step3.dataset.okPricePatched = '1';

      // Cart total recalculate with mode
      _recalcCheckoutTotal();
    });
    checkoutObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    // Har baar checkout open hone par recalc
    window._okRecalcCheckout = _recalcCheckoutTotal;
  }

  function _recalcCheckoutTotal() {
    const mode = window._pdpPayMode || 'upi';
    // Cart items total
    const cart = window.cart || window.cartItems || [];
    if (!cart.length) return;

    let upiTotal = 0;
    cart.forEach(item => {
      const p = item.price || item.selling_price || 0;
      upiTotal += p * (item.qty || item.quantity || 1);
    });

    const finalTotal = mode === 'cod' ? _calcCODPrice(upiTotal) : upiTotal;

    // Update checkout total display elements
    const totalEls = document.querySelectorAll(
      '#checkout-total, #order-total-amount, .checkout-grand-total, [id*="checkout"][id*="total"]'
    );
    totalEls.forEach(el => {
      if (el && !el.dataset.okManaged) {
        // Only update if it looks like a price
        const text = el.textContent || '';
        if (text.includes('₹') || text.match(/\d+/)) {
          el.textContent = '₹' + finalTotal.toLocaleString('en-IN');
        }
      }
    });

    // Also update window variable that Razorpay uses
    if (window._pdpBasePrice && mode === 'cod') {
      window._checkoutFinalAmount = _calcCODPrice(window._pdpBasePrice);
    } else if (window._pdpBasePrice) {
      window._checkoutFinalAmount = window._pdpBasePrice;
    }
  }


  /* ──────────────────────────────────────────────────────────────
     7. MUTATION OBSERVER — PDP appear hone par trust box check
     (Agar openProductPage hook miss ho gaya toh fallback)
  ────────────────────────────────────────────────────────────── */
  function _watchPDPForTrustBox() {
    const obs = new MutationObserver(() => {
      const pdp = document.getElementById('view-product');
      if (!pdp || pdp.classList.contains('hidden')) return;

      // Agar trust box nahi hai toh inject karo
      if (!document.getElementById('ok-pdp-trust-box')) {
        setTimeout(() => {
          if (document.getElementById('ok-pdp-trust-box')) return; // Already done

          const trustBox = _injectPDPTrustBox();
          const payToggle = document.getElementById('ok-pay-toggle');
          if (payToggle) {
            payToggle.insertAdjacentElement('afterend', trustBox);
          } else {
            const priceEl = document.querySelector('#pdp-container .text-3xl');
            if (priceEl) {
              const sect = priceEl.closest('.px-4,.p-4,.px-3') || priceEl.parentElement;
              sect?.insertAdjacentElement('afterend', trustBox);
            }
          }
        }, 600);
      }
    });
    obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }


  /* ──────────────────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────────────────── */
  function _init() {
    _injectPDPImageCSS();
    _patchCODToggle();
    _hookOpenProductPage();
    _patchCheckoutPricing();
    _watchPDPForTrustBox();

    console.log(
      '%c✅ PDP SUPER PATCH LOADED — Image fix + 8% COD + Trust Box',
      'background:#e11d48;color:white;font-weight:900;font-size:11px;padding:4px 12px;border-radius:6px;'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 200));
  } else {
    setTimeout(_init, 200);
  }

})();
