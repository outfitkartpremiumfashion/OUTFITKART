'use strict';
/* ================================================================
   outfitkart-final-patch.js — OutfitKart FINAL PATCH
   ================================================================
   CHANGES:
   1. Footer — sirf brand info + support logos rahega
              policy links REMOVED
   2. Profile Help & Policies — saari policies properly add ki
              (Privacy, Shipping, Refund, T&C, FAQs, About)
   3. Categories — properly kholti hai images ke saath
   4. Bottom nav — profile pages ke neeche nahi chhipti
   5. Images — sab properly load honge, broken fallback fix
   ================================================================ */

(function () {

/* ================================================================
   1. FOOTER FIX
   Footer se sirf policy links hatao
   Brand info + support + copyright remain karo
   ================================================================ */
function _fixFooter() {
  // Home view ke andar koi footer inject hua ho toh hatao
  // Ya fir footer HTML mein policy section ho
  const style = document.createElement('style');
  style.id = 'ok-footer-fix';
  style.textContent = `
    /* Footer policy links hide karo */
    footer .footer-policy-links,
    footer [data-policy],
    footer a[href*="policy"],
    footer a[href*="privacy"],
    footer a[href*="terms"],
    footer a[href*="refund"],
    footer a[href*="shipping"],
    .ok-footer-policy-row { display: none !important; }

    /* Footer sirf brand info dikhao */
    footer { padding-bottom: max(5.5rem, calc(4.5rem + env(safe-area-inset-bottom))) !important; }
  `;
  document.head.appendChild(style);

  // Agar koi dynamically inject hua footer hai toh usse fix karo
  function _cleanFooter() {
    // Remove any injected policy footer sections
    document.querySelectorAll('.ok-footer-policy-row, [id*="footer-policies"]').forEach(el => el.remove());
    
    // home view mein agar koi footer hai usse check karo
    const homeView = document.getElementById('view-home');
    if (!homeView) return;
    
    // Find footer within home or main
    const footers = document.querySelectorAll('footer');
    footers.forEach(footer => {
      // Policy links ko remove karo footer se
      const links = footer.querySelectorAll('a');
      links.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const text = (link.textContent || '').toLowerCase();
        if (
          href.includes('policy') || href.includes('privacy') ||
          href.includes('terms') || href.includes('refund') ||
          href.includes('shipping') || href.includes('return') ||
          text.includes('privacy') || text.includes('policy') ||
          text.includes('terms & conditions') || text.includes('refund') ||
          text.includes('shipping policy') || text.includes('return policy')
        ) {
          // Sirf link hatao, parent ko nahi
          const parent = link.parentElement;
          link.remove();
          // Agar parent empty hai toh usse bhi hatao
          if (parent && parent.children.length === 0 && parent.tagName !== 'FOOTER') {
            parent.remove();
          }
        }
      });

      // Policy headings/sections ko hatao
      footer.querySelectorAll('div, section, ul, li').forEach(el => {
        const text = (el.textContent || '').toLowerCase().trim();
        if (
          (text.includes('privacy policy') || text.includes('terms of service') ||
           text.includes('refund policy') || text.includes('shipping policy') ||
           text.includes('return policy') || text.includes('cookie policy')) &&
          el.children.length === 0 // sirf text nodes
        ) {
          el.remove();
        }
      });
    });
  }

  // Pehle run karo
  setTimeout(_cleanFooter, 500);
  setTimeout(_cleanFooter, 1500);
  setTimeout(_cleanFooter, 3000);

  // Also watch for dynamically added content
  const obs = new MutationObserver(() => {
    setTimeout(_cleanFooter, 100);
  });
  obs.observe(document.body, { childList: true, subtree: true });
}


/* ================================================================
   2. HELP & POLICIES PAGE — Saari policies add karo
   ================================================================ */
function _enhanceHelpPoliciesPage() {
  const helpPage = document.getElementById('profile-page-help');
  if (!helpPage) return;

  const body = helpPage.querySelector('.profile-page-body');
  if (!body) return;

  // Replace entire help page content with comprehensive policies
  const container = body.querySelector('.max-w-lg') || body.firstElementChild;
  if (!container) return;

  container.innerHTML = `
    <!-- About OutfitKart -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 font-bold flex justify-between items-center text-sm text-rose-700"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>🛍️ About OutfitKart</span>
        <i class="fas fa-chevron-down text-rose-400 text-xs transition-transform"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-2 border-t hidden">
        <p>OutfitKart ek premium fashion e-commerce platform hai jo trendy aur affordable clothing, perfumes, accessories aur combos offer karta hai.</p>
        <p><strong>Humare Saath:</strong> Cash on Delivery available hai. Safe delivery guaranteed. Authentic products, best prices.</p>
        <p><strong>Contact:</strong> WhatsApp: +91 8982296773 | Email: outfitkartpremiumfashion@gmail.com</p>
        <p><strong>Follow Us:</strong> Instagram @outfitkart_official | Telegram @outfitkart</p>
      </div>
    </div>

    <!-- FAQs -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>❓ FAQs</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Delivery kitne din mein hogi?</p>
          <p>A: Standard delivery 3–5 working days mein hogi. Remote areas mein 5–7 din lag sakte hain.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: COD (Cash on Delivery) available hai?</p>
          <p>A: Haan! Sabhi orders pe Cash on Delivery available hai. ₹9 COD handling fee lagti hai jo non-refundable hai.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Exchange kaise karein?</p>
          <p>A: Delivered order ke 7 din andar "My Orders" mein jaake Exchange request kar sakte hain. Unused aur original condition mein hona chahiye.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Wallet balance kaise earn karein?</p>
          <p>A: Referral links share karke har referral purchase pe 5% commission wallet mein milta hai.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Referral commission kab milega?</p>
          <p>A: Order ke 30 din baad commission confirm hota hai — delivery + return window complete hone ke baad.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Size guide kahan milega?</p>
          <p>A: Product page pe size chart available hai. Agar confusion ho toh WhatsApp pe help lo.</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="font-bold text-gray-800 mb-1">Q: Promo codes kahan milenge?</p>
          <p>A: Telegram @outfitkart aur WhatsApp Channel pe exclusive promo codes milte hain.</p>
        </div>
      </div>
    </div>

    <!-- Shipping Policy -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>🚚 Shipping Policy</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <div class="flex items-start gap-3 bg-green-50 rounded-lg p-3 border border-green-200">
          <i class="fas fa-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
          <div><strong class="text-gray-800">FREE Delivery</strong><p class="text-xs mt-0.5">Sabhi orders pe free shipping available hai. Koi minimum order nahi.</p></div>
        </div>
        <p><strong>Processing Time:</strong> Order place karne ke baad 24–48 hours mein process hoga.</p>
        <p><strong>Delivery Time:</strong> 3–5 working days (Metro cities). 5–7 working days (Other areas).</p>
        <p><strong>COD Handling:</strong> ₹9 handling fee COD orders pe lagti hai.</p>
        <p><strong>Tracking:</strong> "My Orders" mein jaake real-time tracking check kar sakte hain.</p>
        <p><strong>Packaging:</strong> Sabhi items safely packed karke bheje jaate hain. Damage hone pe turant contact karo.</p>
      </div>
    </div>

    <!-- Return & Refund Policy -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>↩️ Return &amp; Refund Policy</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p class="font-bold text-blue-800 mb-1"><i class="fas fa-info-circle mr-1"></i>7-Day Exchange Policy</p>
          <p class="text-xs text-blue-700">OutfitKart Exchange policy follow karta hai, direct return nahi. Delivery ke 7 din ke andar exchange request kar sakte hain.</p>
        </div>
        <p><strong>Exchange Conditions:</strong></p>
        <ul class="list-disc list-inside space-y-1 text-xs pl-2">
          <li>Item unused aur original condition mein hona chahiye</li>
          <li>Original tags aur packaging intact honi chahiye</li>
          <li>Delivery ke 7 din ke andar request karni hogi</li>
          <li>Wrong size ya defective item ke liye free exchange</li>
        </ul>
        <p><strong>Refund (Cancellation):</strong> Order sirf "Processing" status mein cancel ho sakta hai. UPI/Card se pay kiya ho toh refund 5–7 working days mein milega. COD ₹9 fee non-refundable hai.</p>
        <p><strong>Wallet Refund:</strong> Wallet se pay kiye orders cancel hone pe turant wallet mein refund hota hai.</p>
        <p><strong>Non-Returnable Items:</strong> Innerwear, perfumes (opened), customised items return nahi honge.</p>
      </div>
    </div>

    <!-- Privacy Policy -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>🔒 Privacy Policy</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <p><strong>Data Collection:</strong> Hum sirf wahi data collect karte hain jo aapke orders aur account ke liye zaroori hai — naam, mobile number, delivery address.</p>
        <p><strong>Data Usage:</strong> Aapka data sirf order processing, delivery tracking, aur customer support ke liye use hoga. Kisi third party ko data share nahi kiya jaayega.</p>
        <p><strong>Payment Security:</strong> Payment Razorpay ke secure gateway se hoti hai. OutfitKart aapki card/UPI details store nahi karta.</p>
        <p><strong>Cookies:</strong> Hum basic cookies use karte hain — cart data, preferences, aur session management ke liye.</p>
        <p><strong>Data Deletion:</strong> Account delete karna chahte hain? WhatsApp pe request karo — 7 working days mein data delete kar diya jaayega.</p>
        <p class="text-xs text-gray-400">Last updated: January 2026</p>
      </div>
    </div>

    <!-- Terms & Conditions -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>📋 Terms &amp; Conditions</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <p><strong>General:</strong> OutfitKart use karne se aap in terms se agree karte hain. 18+ users hi account bana sakte hain.</p>
        <p><strong>Orders:</strong> Order place karne ke baad cancel karna sirf "Processing" status mein possible hai. Delivered orders exchange ke liye eligible hain (7 days).</p>
        <p><strong>Referral Program:</strong> Commission 5% per referral. 30 din baad confirm hota hai. Fake referrals pe permanent ban. Ek mobile number se ek account allowed hai.</p>
        <p><strong>Wallet:</strong> Minimum withdrawal ₹120. Processing 24–48 hours. Wallet balance non-transferable hai aur cash mein convert nahi hoga.</p>
        <p><strong>Influencer Program:</strong> Payment sirf approved submissions pe milega. Views verified honge. Fake views pe account ban.</p>
        <p><strong>Prohibited:</strong> Fraudulent orders, fake accounts, system manipulation strictly banned hai.</p>
        <p><strong>Changes:</strong> OutfitKart in-app notification se policy changes inform karega.</p>
        <p class="text-xs text-gray-400">Last updated: January 2026</p>
      </div>
    </div>

    <!-- Contact & Support -->
    <div class="border rounded-xl overflow-hidden mb-3">
      <button class="w-full text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100 font-bold flex justify-between items-center text-sm"
        onclick="this.nextElementSibling.classList.toggle('hidden')">
        <span>📞 Contact &amp; Support</span>
        <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
      </button>
      <div class="p-4 bg-white text-sm text-gray-600 space-y-3 border-t hidden">
        <a href="https://wa.me/918982296773" target="_blank" rel="noopener"
          class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3 active:scale-95 transition-all">
          <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fab fa-whatsapp text-green-500 text-lg"></i>
          </div>
          <div><div class="font-bold text-sm text-gray-800">WhatsApp Support</div><div class="text-xs text-gray-500">+91 8982296773 · 10am–8pm</div></div>
          <i class="fas fa-chevron-right text-gray-300 text-xs ml-auto"></i>
        </a>
        <a href="mailto:outfitkartpremiumfashion@gmail.com" target="_blank" rel="noopener"
          class="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3 active:scale-95 transition-all">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fas fa-envelope text-blue-500 text-lg"></i>
          </div>
          <div><div class="font-bold text-sm text-gray-800">Email Support</div><div class="text-xs text-gray-500">outfitkartpremiumfashion@gmail.com</div></div>
          <i class="fas fa-chevron-right text-gray-300 text-xs ml-auto"></i>
        </a>
        <a href="https://t.me/outfitkart" target="_blank" rel="noopener"
          class="flex items-center gap-3 rounded-xl p-3 active:scale-95 transition-all border"
          style="background:linear-gradient(135deg,#e8f4fd,#dbeafe);border-color:#93c5fd;">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#e0f2fe;">
            <i class="fab fa-telegram text-blue-500 text-lg"></i>
          </div>
          <div><div class="font-bold text-sm text-gray-800">Telegram Channel</div><div class="text-xs text-gray-500">Promo codes + updates</div></div>
          <i class="fas fa-chevron-right text-gray-300 text-xs ml-auto"></i>
        </a>
      </div>
    </div>

    <!-- App Version -->
    <div class="text-center py-4 text-xs text-gray-400 space-y-1">
      <p class="font-bold text-gray-500">OutfitKart v2.0</p>
      <p>Premium Fashion at Best Prices</p>
      <p>© 2026 OutfitKart. All rights reserved.</p>
      <p>Made with ❤️ in India 🇮🇳</p>
    </div>
  `;
}


/* ================================================================
   3. FOOTER — Cleanup + proper copyright-only footer banana
   ================================================================ */
function _injectCleanFooter() {
  // Remove any existing injected footer policy blocks
  document.querySelectorAll('[id^="ok-footer"], .ok-footer-policies').forEach(el => el.remove());

  // Agar main footer DOM mein hai toh usse clean karo
  const footer = document.querySelector('footer');
  if (!footer) return;

  // Footer mein policy links/sections hain toh remove karo
  // Sirf copyright + brand + support info rakho
  const policySelectors = [
    'a[href*="privacy"]', 'a[href*="terms"]', 'a[href*="policy"]',
    'a[href*="refund"]', 'a[href*="shipping"]', 'a[href*="return"]',
  ];
  policySelectors.forEach(sel => {
    footer.querySelectorAll(sel).forEach(el => {
      const parent = el.closest('li') || el.closest('div:not(footer)');
      if (parent && parent !== footer) parent.remove();
      else el.remove();
    });
  });
}


/* ================================================================
   4. BOTTOM NAV FIX — Always visible, profile pages ke upar
   ================================================================ */
function _fixBottomNav() {
  const style = document.createElement('style');
  style.id = 'ok-bottomnav-final-fix';
  style.textContent = `
    /* Bottom nav always visible */
    nav.fixed.bottom-0 {
      z-index: 60 !important;
      display: flex !important;
    }

    /* Profile pages — nav ke upar */
    .profile-page {
      position: fixed !important;
      inset: 0 !important;
      z-index: 65 !important;
      background: #F7F5F2 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }
    .profile-page.hidden {
      display: none !important;
    }
    .profile-page-body {
      flex: 1 !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      padding-bottom: 24px !important;
    }
    .profile-page-header {
      position: sticky !important;
      top: 0 !important;
      z-index: 10 !important;
      flex-shrink: 0 !important;
    }

    /* Admin view — nav hide */
    body.admin-active > nav.fixed.bottom-0 { display: none !important; }

    /* Categories/Cart popup — above nav */
    #view-categories { z-index: 62 !important; }
    #view-cart-page  { z-index: 63 !important; }
    #cart-sidebar    { z-index: 70 !important; }

    /* Body padding bottom — nav ke liye */
    body:not(.admin-active) {
      padding-bottom: max(5rem, calc(4rem + env(safe-area-inset-bottom))) !important;
    }
  `;
  document.head.appendChild(style);

  // openProfilePage aur closeProfilePage patch
  const _patchProfileFns = () => {
    const origOpen = window.openProfilePage;
    if (typeof origOpen === 'function' && !origOpen._patched) {
      window.openProfilePage = function (page, ...args) {
        if (page === 'policies') page = 'help'; // alias
        return origOpen.apply(this, [page, ...args]);
      };
      window.openProfilePage._patched = true;
    }
  };

  setTimeout(_patchProfileFns, 800);
  setTimeout(_patchProfileFns, 2000);
}


/* ================================================================
   5. CATEGORIES FIX — Page properly khulle aur images load hoon
   ================================================================ */
const SUBCAT_IMGS = {
  // Men Topwear
  'T-Shirts':           'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=220&fit=crop&q=80',
  'Casual Shirts':      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=220&fit=crop&q=80',
  'Formal Shirts':      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  'Oversized Tees':     'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=220&fit=crop&q=80',
  'Oversized Shirts':   'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=200&h=220&fit=crop&q=80',
  'Hoodies':            'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&h=220&fit=crop&q=80',
  'Denim Jacket':       'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=220&fit=crop&q=80',
  // Men Bottomwear
  'Baggy Jeans':        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=220&fit=crop&q=80',
  'Straight Fit Jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=220&fit=crop&q=80',
  'Slim Fit Jeans':     'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=200&h=220&fit=crop&q=80',
  'Cotton Trousers':    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=220&fit=crop&q=80',
  'Joggers':            'https://images.unsplash.com/photo-1556906781-9a412961a28b?w=200&h=220&fit=crop&q=80',
  'Cargo Pants':        'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&h=220&fit=crop&q=80',
  'Formal Pant':        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=220&fit=crop&q=80',
  'Trousers':           'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=220&fit=crop&q=80',
  // Men Footwear
  'Sneakers':           'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=220&fit=crop&q=80',
  'Formal Shoes':       'https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=200&h=220&fit=crop&q=80',
  'Sports Shoes':       'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200&h=220&fit=crop&q=80',
  'Sandals':            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&h=220&fit=crop&q=80',
  'Slippers':           'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=200&h=220&fit=crop&q=80',
  // Women Ethnic
  'Sarees':             'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=220&fit=crop&q=80',
  'Kurtis':             'https://images.unsplash.com/photo-1582718560869-01152e38cfd4?w=200&h=220&fit=crop&q=80',
  'Lehengas':           'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80',
  // Women Western
  'Tops':               'https://images.unsplash.com/photo-1564257577049-b26d2ee15f21?w=200&h=220&fit=crop&q=80',
  'Palazzo':            'https://images.unsplash.com/photo-1594938374182-a57f7f80b9d9?w=200&h=220&fit=crop&q=80',
  'Tops & Tunics':      'https://images.unsplash.com/photo-1564257577049-b26d2ee15f21?w=200&h=220&fit=crop&q=80',
  'Dresses':            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=220&fit=crop&q=80',
  'Skirts':             'https://images.unsplash.com/photo-1583496661160-fb5886a773ec?w=200&h=220&fit=crop&q=80',
  // Women Footwear
  'Heels':              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=220&fit=crop&q=80',
  'Flats':              'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200&h=220&fit=crop&q=80',
  'Wedges':             'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=200&h=220&fit=crop&q=80',
  // Women Bottomwear
  'Cargo Jeans':        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200&h=220&fit=crop&q=80',
  'Skinny Fit Jeans':   'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=200&h=220&fit=crop&q=80',
  // Accessories
  'Sunglasses':         'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=220&fit=crop&q=80',
  'Watches':            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=220&fit=crop&q=80',
  'Wallets':            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=220&fit=crop&q=80',
  'Bags':               'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80',
  'Belts':              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80',
  'Caps':               'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=220&fit=crop&q=80',
  'Chains':             'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80',
  'Bracelets':          'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=220&fit=crop&q=80',
  'Socks':              'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=200&h=220&fit=crop&q=80',
  'Handbags':           'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80',
  'Clutches':           'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=220&fit=crop&q=80',
  'Earrings':           'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=220&fit=crop&q=80',
  'Necklace Sets':      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=220&fit=crop&q=80',
  'Bangles':            'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&h=220&fit=crop&q=80',
  'Hair Accessories':   'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200&h=220&fit=crop&q=80',
  'Scrunchies':         'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200&h=220&fit=crop&q=80',
  'Unisex Sunglasses':  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=220&fit=crop&q=80',
  'Earbuds':            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=220&fit=crop&q=80',
  'Power Banks':        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=220&fit=crop&q=80',
  'Phone Cases':        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=220&fit=crop&q=80',
  'Backpacks':          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=220&fit=crop&q=80',
  // Perfumes
  "Men's Perfume":      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=220&fit=crop&q=80',
  "Women's Perfume":    'https://images.unsplash.com/photo-1541643600914-78b084683702?w=200&h=220&fit=crop&q=80',
  'Unisex Perfume':     'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=220&fit=crop&q=80',
  'Luxury Perfume':     'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=220&fit=crop&q=80',
  'Budget Perfume':     'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=220&fit=crop&q=80',
  'Attar / Ittar':      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=220&fit=crop&q=80',
  'Body Mist':          'https://images.unsplash.com/photo-1541643600914-78b084683702?w=200&h=220&fit=crop&q=80',
  'Deodorant Spray':    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=220&fit=crop&q=80',
  'Gift Set':           'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=220&fit=crop&q=80',
  // Combos
  'Casual Combo':       'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=200&h=220&fit=crop&q=80',
  'Party Wear Combo':   'https://images.unsplash.com/photo-1552896236-74e22da82e93?w=200&h=220&fit=crop&q=80',
  'Gym Combo':          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=220&fit=crop&q=80',
  'Streetwear Combo':   'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=200&h=220&fit=crop&q=80',
  'Office Combo':       'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  'Casual Outfit Combo':'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=200&h=220&fit=crop&q=80',
  'Party Combo':        'https://images.unsplash.com/photo-1552896236-74e22da82e93?w=200&h=220&fit=crop&q=80',
  'Ethnic Combo':       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=220&fit=crop&q=80',
  'Western Combo':      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=220&fit=crop&q=80',
  'College Wear Combo': 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=200&h=220&fit=crop&q=80',
  'Couple Combo':       'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=220&fit=crop&q=80',
  'Best Friend Combo':  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=220&fit=crop&q=80',
  'Matching Outfit Combo':'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=220&fit=crop&q=80',
  'Formal Combo':       'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=200&h=220&fit=crop&q=80',
  'Ethnic Set':         'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=220&fit=crop&q=80',
  'Indo-Western':       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80',
  'Tracksuit':          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=220&fit=crop&q=80',
  'Nehru Jacket Combo': 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  'Sherwani Set':       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=220&fit=crop&q=80',
  // Gold
  'Topwear':            'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=200&h=220&fit=crop&q=80',
  'Bottomwear':         'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=220&fit=crop&q=80',
  'Footwear':           'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=220&fit=crop&q=80',
};

function _getSubImg(sub) {
  // Exact match
  if (SUBCAT_IMGS[sub]) return SUBCAT_IMGS[sub];
  // Partial match (case insensitive)
  const lsub = sub.toLowerCase();
  const key = Object.keys(SUBCAT_IMGS).find(k =>
    k.toLowerCase() === lsub || lsub.includes(k.toLowerCase()) || k.toLowerCase().includes(lsub)
  );
  if (key) return SUBCAT_IMGS[key];
  // Picsum fallback (always works)
  const seed = sub.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed + 100}/200/220`;
}

function _fixCategoryImages() {
  // Fix getSubcategoryImage globally
  if (!window._okImgPatched) {
    window._okImgPatched = true;
    window.getSubcategoryImage = function (categoryName, sub) {
      // Try real product image first
      const allP = [...(window.products || []), ...(window.goldProducts || [])];
      const match = allP.find(p =>
        p.category === categoryName && p.sub === sub && ((p.imgs && p.imgs[0]) || p.img)
      );
      if (match) return (match.imgs && match.imgs[0]) || match.img;
      return _getSubImg(sub);
    };
  }

  // Fix all broken images currently in DOM
  document.querySelectorAll('.ok-sc img, #cat-page-subcat-grid img').forEach(img => {
    if (img.dataset.okFixed) return;
    img.dataset.okFixed = '1';

    // Fix source.unsplash.com (deprecated, returns tiny images)
    if (img.src && (img.src.includes('source.unsplash.com') || img.src.includes('placehold.co'))) {
      img.src = _getSubImg(img.alt || '');
    }

    img.addEventListener('error', function () {
      if (this.dataset.errFixed) return;
      this.dataset.errFixed = '1';
      this.src = _getSubImg(this.alt || '');
    });
  });
}

function _watchCategoryImages() {
  const obs = new MutationObserver(() => setTimeout(_fixCategoryImages, 50));
  ['ok-crp', 'cat-page-subcat-grid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el, { childList: true, subtree: true });
  });
  // Also watch body for new elements
  obs.observe(document.body, { childList: true, subtree: true });
}

function _fixCategories() {
  _fixCategoryImages();
  _watchCategoryImages();

  // Run again after products load
  setTimeout(_fixCategoryImages, 1500);
  setTimeout(_fixCategoryImages, 3000);
  setTimeout(_fixCategoryImages, 6000);
}


/* ================================================================
   6. PRODUCT CARD IMAGES — Proper loading har jagah
   ================================================================ */
function _fixProductImages() {
  const style = document.createElement('style');
  style.id = 'ok-img-fix';
  style.textContent = `
    /* Product card images — proper sizing */
    .product-card img {
      height: 180px !important;
      width: 100% !important;
      object-fit: cover !important;
      background: #f3f4f6;
    }
    @media (min-width: 640px)  { .product-card img { height: 200px !important; } }
    @media (min-width: 1024px) { .product-card img { height: 220px !important; } }

    /* PDP slider images */
    .pdp-img-slider img {
      height: 320px !important;
      object-fit: cover !important;
    }
    @media (min-width: 768px) { .pdp-img-slider img { height: 420px !important; } }

    /* Category page subcat images */
    #cat-page-subcat-grid img {
      width: 56px !important;
      height: 56px !important;
      object-fit: cover !important;
      border-radius: 10px !important;
    }

    /* Categories nav panel images */
    .ok-sc img {
      width: 66px !important;
      height: 74px !important;
      object-fit: cover !important;
      border-radius: 8px !important;
    }

    /* Category bubbles on home */
    #category-bubbles img {
      width: 56px !important;
      height: 56px !important;
      object-fit: cover !important;
      border-radius: 50% !important;
    }

    /* Prevent layout shift */
    img { max-width: 100%; }
    .product-card { height: 100%; }
  `;
  document.head.appendChild(style);

  // Global error handler for product images
  document.addEventListener('error', function (e) {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    if (img.dataset.errHandled) return;
    img.dataset.errHandled = '1';

    const src = img.src || '';
    // Don't retry placeholders
    if (src.includes('placehold.co') || src.includes('picsum.photos')) return;

    // Fallback
    img.src = 'https://placehold.co/200x220/f3f4f6/9ca3af?text=🛍️';
  }, true);
}


/* ================================================================
   INIT — Sab kuch boot karo
   ================================================================ */
function _init() {
  // CSS aur image fixes turant
  _fixBottomNav();
  _fixProductImages();

  // Baki fixes DOM ready hone ke baad
  setTimeout(() => {
    _fixFooter();
    _fixCategories();
    _injectCleanFooter();

    // Help page enhance karo — thoda baad mein taaki DOM fully loaded ho
    const _tryEnhanceHelp = () => {
      const hp = document.getElementById('profile-page-help');
      if (hp) {
        _enhanceHelpPoliciesPage();
      } else {
        setTimeout(_tryEnhanceHelp, 500);
      }
    };
    _tryEnhanceHelp();

    console.log('%c✅ OutfitKart Final Patch Loaded', 'background:#e11d48;color:white;font-weight:900;font-size:11px;padding:3px 10px;border-radius:5px;');
  }, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(_init, 300));
} else {
  setTimeout(_init, 300);
}

})();
