/**
 * Bitqik Modern Crypto Exchange Landing Page
 * Interactive Logic, Live Simulated Market, Chart.js, Multi-Language, and Currency
 */

// ==============================================================
// 1. STATE & CONSTANTS
// ==============================================================
let currentLang = 'lo'; // Default Lao
let currentCurrency = 'LAK'; // Default Lao Kip
let currencyRate = { LAK: 22000, USD: 1, THB: 36 };
let currencySymbol = { LAK: '₭', USD: '$', THB: '฿' };
let currentFilter = 'all';
let selectedCoin = 'BTC';
let selectedTimeframe = '24H';
let chartInstance = null;

// Initial Coin Market Database
const coinsData = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', icon: '₿', priceUSD: 68450.20, change24h: 2.84, volumeUSD: '32.4B', isHot: true, isLayer1: true },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', priceUSD: 3520.10, change24h: 1.95, volumeUSD: '18.2B', isHot: true, isLayer1: true },
  { id: 'SOL', name: 'Solana', symbol: 'SOL', icon: '◎', priceUSD: 154.60, change24h: 6.42, volumeUSD: '6.8B', isHot: true, isLayer1: true },
  { id: 'BNB', name: 'BNB', symbol: 'BNB', icon: '✦', priceUSD: 592.80, change24h: 0.88, volumeUSD: '1.9B', isHot: false, isLayer1: true },
  { id: 'XRP', name: 'Ripple', symbol: 'XRP', icon: '✕', priceUSD: 0.582, change24h: 3.12, volumeUSD: '2.1B', isHot: true, isLayer1: false },
  { id: 'SUI', name: 'Sui', symbol: 'SUI', icon: '💧', priceUSD: 1.82, change24h: 8.75, volumeUSD: '980M', isHot: true, isLayer1: true },
  { id: 'ADA', name: 'Cardano', symbol: 'ADA', icon: '₳', priceUSD: 0.392, change24h: -0.45, volumeUSD: '640M', isHot: false, isLayer1: true },
  { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð', priceUSD: 0.124, change24h: 4.85, volumeUSD: '1.4B', isHot: true, isLayer1: false },
  { id: 'AVAX', name: 'Avalanche', symbol: 'AVAX', icon: '▲', priceUSD: 28.40, change24h: 1.20, volumeUSD: '520M', isHot: false, isLayer1: true }
];

// Multilingual Dictionary
const i18nDict = {
  lo: {
    license_badge: "Bank of Laos Licensed",
    ticker_promo: "🎉 ໂປຣໂມຊັ່ນ: ຝາກເງິນກີບຜ່ານ BCEL One ຟຣີຄ່າທຳນຽມ 0% ຕະຫຼອດ 24 ຊົ່ວໂມງ!",
    nav_about: "ກ່ຽວກັບພວກເຮົາ",
    nav_careers: "ຮັບສະໝັກງານ",
    nav_products: "ຜະລິດຕະພັນ",
    nav_market: "ຕະຫຼາດ",
    nav_why: "ຈຸດເດັ່ນ",
    nav_how: "ວິທີເລີ່ມຕົ້ນ",
    nav_learn: "ຮຽນຮູ້",
    nav_news: "ຂ່າວສານ",
    nav_news_announcements: "ຂ່າວສານ & ປະກາດ",
    menu_official_announcements: "ປະກາດທາງການ",
    menu_official_sub: "ອັບເດດລະບົບ, ລິດຫຼຽນໃໝ່, ໂປຣໂມຊັ່ນ",
    menu_crypto_news: "ຂ່າວສານຄຣິບໂຕ",
    menu_crypto_sub: "ການເຄື່ອນໄຫວຕະຫຼາດ, ບົດວິເຄາະ BTC",
    tab_official_announcements: "📢 ປະກາດທາງການ (Official)",
    tab_crypto_news: "📰 ຂ່າວສານຄຣິບໂຕ (Crypto News)",
    careers_title: "ຮ່ວມງານກັບ Bitqik (Careers)",
    careers_subtitle: "ມາຮ່ວມສ້າງອະນາຄົດຂອງລະບົບການເງິນດິຈິຕອນ ແລະ ເທັກໂນໂລຊີ Blockchain ໃນ ສປປ ລາວ ໄປກັບພວກເຮົາ.",
    btn_login: "ເຂົ້າສູ່ລະບົບ",
    btn_register: "ລົງທະບຽນ",
    btn_exchange: "Exchange Pro",
    hero_badge: "🇱🇦 ຜູ້ໃຫ້ບໍລິການຊັບສິນດິຈິຕອນທີ່ໄດ້ຮັບອະນຸຍາດແຫ່ງທຳອິດໃນລາວ",
    hero_title_1: "ຊື້, ຂາຍ & ເທຣດ",
    hero_title_on: "ເທິງ",
    hero_subtitle: "ວິທີທີ່ງ່າຍດາຍ, ປອດໄພ ແລະ ວ່ອງໄວທີ່ສຸດໃນການເທຣດຫຼຽນດິຈິຕອນດ້ວຍເງິນກີບ (LAK), ບາດ (THB) ແລະ ໂດລາ (USD) ທຸກທີ່ ທຸກເວລາ ພ້ອມຝາກ-ຖອນທັນໃຈຜ່ານ BCEL One.",
    hero_cta_start: "ເລີ່ມຕົ້ນເທຣດເລີຍ",
    hero_cta_explore: "ສຳຫຼວດຜະລິດຕະພັນ",
    swap_quick_trade: "Fast Buy / Express Swap",
    swap_zero_fee: "0% Deposit Fee (BCEL One)",
    swap_you_pay: "ເຈົ້າຈ່າຍ (You Pay)",
    swap_you_get: "ເຈົ້າຈະໄດ້ຮັບ (You Receive)",
    swap_best_rate: "Best Rate Live",
    swap_btn: "ຊື້ທັນທີຜ່ານ BCEL One QR Code",
    trust_secure: "100% Secure",
    trust_secure_sub: "Cold Storage",
    trust_fee: "Low Fees",
    trust_fee_sub: "From 0.05%",
    trust_fast: "Fast Orders",
    trust_fast_sub: "<10ms Engine",
    trust_support: "Local Support",
    trust_support_sub: "24/7 Lao & Thai",
    why_badge: "WHY CHOOSE BITQIK?",
    why_title: "ເປັນຫຍັງຕ້ອງເລືອກ Bitqik?",
    why_subtitle: "ຫຼາຍກວ່າການເປັນສູນຊື້ຂາຍຊັບສິນດິຈິຕອນ ພວກເຮົາຄືຄູ່ຮ່ວມທາງທີ່ໜ້າເຊື່ອຖືທີ່ສຸດໃນໂລກການລົງທຶນຂອງທ່ານ.",
    why_sec_title: "Top Security & 100% Reserves",
    why_sec_desc: "ຊັບສິນຂອງທ່ານໄດ້ຮັບການປົກປ້ອງດ້ວຍລະບົບ Multi-Signature Cold Storage ມາດຕະຖານໂລກ ພ້ອມຫຼັກຖານເງິນສຳຮອງ 100% ທີ່ກວດສອບໄດ້.",
    why_fast_title: "Fast & Ultra-Reliable",
    why_fast_desc: "ເຄື່ອງຈັກຈັບຄູ່ຄຳສັ່ງ (Matching Engine) ຄວາມໄວສູງສຸດ <10ms ສາມາດຮອງຮັບໄດ້ຫຼາຍກວ່າ 1,000,000 ຄຳສັ່ງຕໍ່ວິນາທີ ໂດຍບໍ່ມີການສະດຸດ.",
    why_fee_title: "Low Fees & Zero-Fee Deposit",
    why_fee_desc: "ຄ່າທຳນຽມການເທຣດເລີ່ມຕົ້ນພຽງແຕ່ 0.05% ແລະ ຟຣີຄ່າທຳນຽມການຝາກເງິນກີບຜ່ານລະບົບທະນາຄານລາວ ບໍ່ມີຄ່າໃຊ້ຈ່າຍແອບແຝງ.",
    why_sup_title: "Local Support 24/7 (Lao & Thai)",
    why_sup_desc: "ທີມງານຊ່ວຍເຫຼືອຄົນລາວ ແລະ ໄທ ພ້ອມຕອບຄຳຖາມ ແລະ ແກ້ໄຂບັນຫາໃຫ້ທ່ານຕະຫຼອດ 24 ຊົ່ວໂມງ ຜ່ານ Live Chat, Telegram ແລະ WhatsApp.",
    why_ui_title: "User-Friendly for Beginners & Pros",
    why_ui_desc: "ອອກແບບໃຫ້ໃຊ້ງານງ່າຍ ມີໂໝດ Lite ສຳລັບຜູ້ເລີ່ມຕົ້ນຊື້-ຂາຍໃນ 1 ຄລິກ ແລະ ໂໝດ Pro ພ້ອມເຄື່ອງມື TradingView ຄົບວົງຈອນ.",
    why_bank_title: "Direct BCEL One & Lao Banks",
    why_bank_desc: "ເຊື່ອມຕໍ່ລະບົບການຊຳລະເງິນທະນາຄານພາຍໃນປະເທດລາວໂດຍກົງ ຝາກ-ຖອນສະດວກ ປອດໄພ ແລະ ຖືກຕ້ອງຕາມລະບຽບການຂອງທະນາຄານແຫ່ງ ສປປ ລາວ.",
    products_badge: "OUR PRODUCTS",
    products_title: "ທຸກສິ່ງທີ່ທ່ານຕ້ອງການໃນການເທຣດ",
    products_subtitle: "ຜະລິດຕະພັນທີ່ອອກແບບມາເພື່ອຕອບສະໜອງທຸກຮູບແບບການລົງທຶນ ຕັ້ງແຕ່ຜູ້ເລີ່ມຕົ້ນຈົນເຖິງເທຣດເດີມືອາຊີບ.",
    prod_spot_card_title: "Spot Trading",
    prod_spot_card_desc: "ຊື້-ຂາຍຫຼຽນດິຈິຕອນດ້ວຍລະບົບ Orderbook ທີ່ເຂົ້າໃຈງ່າຍ ສະພາບຄ່ອງສູງ ລາຄາຊັດເຈນ ບໍ່ມີຄ່າໃຊ້ຈ່າຍແອບແຝງ.",
    prod_fut_card_title: "Futures",
    prod_fut_card_desc: "ເຂົ້າເຖິງການເທຣດສັນຍາລ່ວງໜ້າ (Derivatives) ພ້ອມເຄື່ອງມືບໍລິຫານຄວາມສ່ຽງລະດັບສູງ Stop Loss & Take Profit.",
    prod_exp_card_title: "Express Buy/Sell",
    prod_exp_card_desc: "ຊື້ ແລະ ຂາຍຫຼຽນດິຈິຕອນໄດ້ຢ່າງສະດວກ ວ່ອງໄວ ໂດຍການສະແກນ QR Code ທະນາຄານພາຍໃນບໍ່ເທົ່າໃດວິນາທີ.",
    prod_dep_card_title: "Deposit & Withdraw",
    prod_dep_card_desc: "ເຄື່ອນຍ້າຍຊັບສິນຂອງທ່ານໄດ້ຢ່າງງ່າຍດາຍ ປອດໄພ ຮອງຮັບເງິນກີບ (LAK), ບາດ (THB) ແລະ ຫຼຽນຄຣິບໂຕຫຼັກທຸກສາຍ.",
    learn_more: "ອ່ານເພີ່ມເຕີມ",
    how_badge: "HOW IT WORKS",
    how_title: "ເລີ່ມຕົ້ນງ່າຍໆ ພາຍໃນ 4 ຂັ້ນຕອນ",
    how_subtitle: "ເຂົ້າຮ່ວມກັບ Bitqik ໄດ້ງ່າຍໆ ໃຊ້ເວລາພຽງແຕ່ 3 ນາທີ ເພື່ອເລີ່ມຕົ້ນເທຣດ.",
    step1_title: "Create Account",
    step1_desc: "ລົງທະບຽນດ້ວຍອີເມວ ຫຼື ເບີໂທລະສັບຂອງທ່ານ ພາຍໃນ 30 ວິນາທີ ຟຣີບໍ່ມີຄ່າໃຊ້ຈ່າຍ.",
    step2_title: "Complete KYC",
    step2_desc: "ຢືນຢັນຕົວຕົນດ້ວຍບັດປະຈຳຕົວ ຫຼື ໜັງສືຜ່ານແດນ ຜ່ານລະບົບ AI ອັດຕະໂນມັດພາຍໃນ 2 ນາທີ.",
    step3_title: "Deposit Funds",
    step3_desc: "ຝາກເງິນກີບຜ່ານ BCEL One, PromptPay ຫຼື ໂອນຫຼຽນຄຣິບໂຕເຂົ້າມາໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງ.",
    step4_title: "Start Trading",
    step4_desc: "ເລືອກຫຼຽນທີ່ທ່ານມັກ ແລະ ເລີ່ມຕົ້ນຊື້-ຂາຍ ຫຼື ສະສົມຫຼຽນເພື່ອສ້າງຜົນກຳໄລໄດ້ທັນທີ.",
    step_cta: "ສ້າງບັນຊີເລີຍຕອນນີ້",
    sec_badge: "FORTRESS-GRADE PROTECTION",
    sec_title: "ຄວາມປອດໄພຂອງທ່ານ ຄືສິ່ງສຳຄັນອັນດັບ 1 ຂອງພວກເຮົາ",
    sec_subtitle: "ພວກເຮົາໃຊ້ເຕັກໂນໂລຊີຄວາມປອດໄພມາດຕະຖານສາກົນທີ່ທັນສະໄໝທີ່ສຸດ ເພື່ອປົກປ້ອງຊັບສິນ ແລະ ຂໍ້ມູນສ່ວນຕົວຂອງທ່ານໃຫ້ປອດໄພ 100%.",
    sec_kyc: "KYC / AML Standard",
    sec_kyc_sub: "ການກວດສອບຕົວຕົນມາດຕະຖານສາກົນ ປ້ອງກັນການຟອກເງິນ",
    sec_2fa: "Two-Factor Auth (2FA)",
    sec_2fa_sub: "ການເຂົ້າລະຫັດ 2 ຊັ້ນ Google Authenticator & SMS",
    sec_vault: "Asset Protection",
    sec_vault_sub: "98% ຂອງຊັບສິນຖືກເກັບໃນ Cold Wallet ແຍກອອບໄລນ໌",
    sec_risk: "Risk Management",
    sec_risk_sub: "ລະບົບກວດຈັບຄວາມຜິດປົກກະຕິດ້ວຍ AI ຕະຫຼອດ 24/7",
    sec_protection_fund: "ມີກອງທຶນປະກັນໄພປົກປ້ອງຜູ້ໃຊ້ງານ (User Protection Fund) ມູນຄ່າ $10,000,000 USD ຮອງຮັບທຸກກໍລະນີ.",
    market_badge: "MARKET OVERVIEW",
    market_title: "ພາບລວມຕະຫຼາດແບບ Real-Time",
    market_subtitle: "ລາຄາສົດ, ການປ່ຽນແປງ 24 ຊົ່ວໂມງ ແລະ ໂອກາດໃນການເທຣດທີ່ດີທີ່ສຸດ.",
    th_name: "Asset",
    th_price: "Price",
    th_change: "24h Change",
    th_volume: "24h Volume",
    th_action: "Trade",
    learn_badge: "BITQIK ACADEMY",
    learn_title: "ຮຽນຮູ້ & ເຕີບໃຫຍ່ໄປກັບ Bitqik",
    learn_subtitle: "ສ້າງຄວາມຮູ້ດ້ານຄຣິບໂຕຂອງທ່ານ ເທຣດດ້ວຍຄວາມໝັ້ນໃຈ ພ້ອມບົດຄວາມ ແລະ ວິດີໂອສອນແບບລະອຽດ.",
    learn_view_all: "ສຳຫຼວດທຸກຫຼັກສູດ Academy",
    read_now: "ອ່ານບົດຄວາມ",
    learn1_title: "What is Bitcoin?",
    learn1_desc: "ບົດຮຽນພື້ນຖານສຳລັບຜູ້ເລີ່ມຕົ້ນ: ບິດຄອຍແມ່ນຫຍັງ ແລະ ເປັນຫຍັງຈຶ່ງເປັນອະນາຄົດຂອງການເງິນ.",
    learn2_title: "What is Spot Trading?",
    learn2_desc: "ວິທີເທຣດຊັບສິນດິຈິຕອນແບບ Spot ການຕັ້ງ Limit Order, Market Order ແລະ ການບໍລິຫານພອດ.",
    learn3_title: "How to Deposit?",
    learn3_desc: "ຄູ່ມືເທື່ອລະຂັ້ນຕອນ: ວິທີຝາກເງິນກີບຜ່ານ BCEL One ແລະ ທະນາຄານພາຍໃນປະເທດລາວ.",
    learn4_title: "Crypto Basics",
    learn4_desc: "ສິ່ງທີ່ຄວນຮູ້ກ່ອນລົງທຶນ: Blockchain ເຮັດວຽກແນວໃດ ແລະ ວິທີປົກປ້ອງ Private Key ຂອງທ່ານ.",
    learn_earn_title: "ຮຽນຮູ້ & ຮັບຫຼຽນຟຣີ (Learn & Earn)",
    learn_earn_desc: "ຕອບຄຳຖາມສັ້ນໆ 3 ຂໍ້ ຫຼັງອ່ານຈົບ ຮັບ Bitcoin ມູນຄ່າ 50,000 LAK ເຂົ້າກະເປົາຟຣີທັນທີ!",
    learn_earn_btn: "ເລີ່ມຕອບຄຳຖາມຮັບລາງວັນ",
    news_badge: "LATEST ANNOUNCEMENTS",
    news_title: "ອັບເດດຂ່າວສານ ແລະ ກິດຈະກຳຫຼ້າສຸດ",
    news_subtitle: "ຕິດຕາມຂ່າວສານການລົງລາຍການຫຼຽນໃໝ່, ໂປຣໂມຊັ່ນ ແລະ ການປັບປຸງລະບົບ.",
    view_all: "View All (ທັງໝົດ)",
    news1_title: "New Listing: SOL/USDT & SOL/LAK",
    news1_desc: "Bitqik ເປີດໃຫ້ບໍລິການເທຣດຄູ່ Solana (SOL) ດ້ວຍເງິນກີບ ພ້ອມໂປຣໂມຊັ່ນ 0% ຄ່າທຳນຽມ 7 ວັນທຳອິດ.",
    news2_title: "Core Engine 2.0 Upgrade Completed",
    news2_desc: "ການອັບເກຣດລະບົບເຄື່ອງຈັກຈັບຄູ່ຄຳສັ່ງສຳເລັດແລ້ວ ຄວາມໄວເພີ່ມຂຶ້ນ 300% ຮອງຮັບການເທຣດໄລຍະສູງ.",
    news3_title: "Bitqik Futures Championship",
    news3_desc: "ການແຂ່ງຂັນເທຣດຊີງເງິນລາງວັນລວມກວ່າ $50,000 USDT! ລົງທະບຽນເຂົ້າຮ່ວມຟຣີ ພ້ອມລຸ້ນຮັບຂອງລາງວັນໃຫຍ່.",
    news4_title: "Deposit & Earn: 12% APY on USDT",
    news4_desc: "ຝາກ USDT ຮັບດອກເບ້ຍສູງສຸດ 12% ຕໍ່ປີ ຈ່າຍດອກເບ້ຍທຸກວັນ ຖອນໄດ້ທຸກເວລາ ບໍ່ມີກຳນົດໄລຍະເວລາ.",
    faq_badge: "FREQUENTLY ASKED QUESTIONS",
    faq_title: "ຄຳຖາມທີ່ພົບບ່ອຍ (FAQ)",
    faq_subtitle: "ຄົ້ນຫາຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປກ່ຽວກັບການເທຣດ, ການຝາກ-ຖອນ ແລະ ຄວາມປອດໄພ.",
    final_title: "ພ້ອມແລ້ວຫຼືຍັງທີ່ຈະເລີ່ມຕົ້ນເທຣດ?",
    final_subtitle: "ເຂົ້າຮ່ວມກັບ Bitqik ມື້ນີ້ ແລະ ສຳຜັດກັບປະສົບການການເທຣດຊັບສິນດິຈິຕອນທີ່ງ່າຍດາຍ, ປອດໄພ ແລະ ວ່ອງໄວທີ່ສຸດ."
  },
  en: {
    license_badge: "Bank of Laos Licensed",
    ticker_promo: "🎉 Promo: 0% fee on LAK deposits via BCEL One 24/7!",
    nav_about: "About Us",
    nav_careers: "Careers",
    nav_products: "Products",
    nav_market: "Markets",
    nav_why: "Why Us",
    nav_how: "How It Works",
    nav_learn: "Learn",
    nav_news: "News",
    nav_news_announcements: "News & Notices",
    menu_official_announcements: "Official Announcements",
    menu_official_sub: "System updates, new listings, promos",
    menu_crypto_news: "Crypto Market News",
    menu_crypto_sub: "Market trends, Bitcoin insights",
    tab_official_announcements: "📢 Official Announcements",
    tab_crypto_news: "📰 Crypto Market News",
    careers_title: "Careers at Bitqik",
    careers_subtitle: "Build the future of digital finance and blockchain technology in Lao PDR together with us.",
    btn_login: "Log In",
    btn_register: "Register",
    btn_exchange: "Exchange Pro",
    hero_badge: "🇱🇦 The 1st Regulated Digital Asset Exchange in Laos",
    hero_title_1: "Buy, Sell & Trade",
    hero_title_on: "on",
    hero_subtitle: "The simplest, safest and fastest platform to trade digital assets using Lao Kip (LAK), Thai Baht (THB), and USD — anytime, anywhere with instant BCEL One deposits.",
    hero_cta_start: "Start Trading Now",
    hero_cta_explore: "Explore Products",
    swap_quick_trade: "Fast Buy / Express Swap",
    swap_zero_fee: "0% Deposit Fee (BCEL One)",
    swap_you_pay: "You Pay",
    swap_you_get: "You Receive",
    swap_best_rate: "Best Rate Live",
    swap_btn: "Instant Buy with BCEL One QR",
    trust_secure: "100% Secure",
    trust_secure_sub: "Cold Storage",
    trust_fee: "Low Fees",
    trust_fee_sub: "From 0.05%",
    trust_fast: "Fast Orders",
    trust_fast_sub: "<10ms Engine",
    trust_support: "Local Support",
    trust_support_sub: "24/7 Lao & Thai",
    why_badge: "WHY CHOOSE BITQIK?",
    why_title: "Why Choose Bitqik?",
    why_subtitle: "More than just a digital exchange, we are your most reliable partner in your cryptocurrency investment journey.",
    why_sec_title: "Top Security & 100% Reserves",
    why_sec_desc: "Your assets are safeguarded with institutional multi-sig cold storage and verifiable 100% Proof of Reserves.",
    why_fast_title: "Fast & Ultra-Reliable",
    why_fast_desc: "High-frequency matching engine with <10ms execution, handling over 1,000,000 orders/sec with 99.99% uptime.",
    why_fee_title: "Low Fees & Zero-Fee Deposit",
    why_fee_desc: "Maker fees start as low as 0.05%, with zero deposit fees when transferring through domestic Lao banks.",
    why_sup_title: "Local Support 24/7 (Lao & Thai)",
    why_sup_desc: "Native Lao, Thai, and English support agents standing by 24/7 via Live Chat, Telegram, and WhatsApp.",
    why_ui_title: "User-Friendly for Beginners & Pros",
    why_ui_desc: "Seamless Lite mode for 1-click swaps and Pro mode with full TradingView technical charting.",
    why_bank_title: "Direct BCEL One & Lao Banks",
    why_bank_desc: "Direct integration with Lao banking systems, fully compliant with Bank of the Lao PDR regulations.",
    products_badge: "OUR PRODUCTS",
    products_title: "Everything You Need to Trade",
    products_subtitle: "Comprehensive suites designed for every investor level, from absolute beginners to professional high-frequency traders.",
    prod_spot_card_title: "Spot Trading",
    prod_spot_card_desc: "Trade leading digital currencies with deep institutional liquidity and ultra-tight spreads.",
    prod_fut_card_title: "Futures",
    prod_fut_card_desc: "Access leveraged contracts with up to 100x leverage, hedge mode, and automated risk protection.",
    prod_exp_card_title: "Express Buy/Sell",
    prod_exp_card_desc: "Buy and sell digital assets instantly within 30 seconds using convenient local QR payment.",
    prod_dep_card_title: "Deposit & Withdraw",
    prod_dep_card_desc: "Seamless fiat and crypto deposits supporting LAK, THB, USD, and all major blockchain networks.",
    learn_more: "Learn more",
    how_badge: "HOW IT WORKS",
    how_title: "Get Started in 4 Simple Steps",
    how_subtitle: "Join Bitqik today in less than 3 minutes to begin trading digital assets.",
    step1_title: "Create Account",
    step1_desc: "Sign up with your email or phone number in 30 seconds. 100% free.",
    step2_title: "Complete KYC",
    step2_desc: "Verify identity with your Lao ID card or passport via our automated AI in under 2 minutes.",
    step3_title: "Deposit Funds",
    step3_desc: "Deposit LAK via BCEL One QR code, PromptPay, or transfer crypto directly 24/7.",
    step4_title: "Start Trading",
    step4_desc: "Select your favorite cryptocurrencies and begin trading or accumulating for long-term growth.",
    step_cta: "Create Account Now",
    sec_badge: "FORTRESS-GRADE PROTECTION",
    sec_title: "Your Security Comes First",
    sec_subtitle: "We employ world-class cybersecurity standards and strict regulatory safeguards to ensure your assets are protected.",
    sec_kyc: "KYC / AML Standard",
    sec_kyc_sub: "International compliance preventing financial crime and fraud",
    sec_2fa: "Two-Factor Auth (2FA)",
    sec_2fa_sub: "Hardware token, Google Authenticator & SMS multi-factor login",
    sec_vault: "Asset Protection",
    sec_vault_sub: "98% of user funds secured in offline multi-sig cold vaults",
    sec_risk: "Risk Management",
    sec_risk_sub: "24/7 AI-driven behavioral anomaly detection systems",
    sec_protection_fund: "Covered by a dedicated $10,000,000 USD User Protection Reserve Fund.",
    market_badge: "MARKET OVERVIEW",
    market_title: "Real-Time Market Overview",
    market_subtitle: "Live prices, 24-hour fluctuations, and premium trading opportunities.",
    th_name: "Asset",
    th_price: "Price",
    th_change: "24h Change",
    th_volume: "24h Volume",
    th_action: "Trade",
    learn_badge: "BITQIK ACADEMY",
    learn_title: "Learn & Grow with Bitqik",
    learn_subtitle: "Elevate your crypto knowledge, trade with confidence through in-depth guides and video walkthroughs.",
    learn_view_all: "Explore All Academy Courses",
    read_now: "Read Article",
    learn1_title: "What is Bitcoin?",
    learn1_desc: "Beginner foundations: Understanding Bitcoin, blockchain, and why digital scarcity matters.",
    learn2_title: "What is Spot Trading?",
    learn2_desc: "Mastering order books, Limit Orders, Market Orders, and portfolio risk management.",
    learn3_title: "How to Deposit?",
    learn3_desc: "Step-by-step walkthrough: Depositing Lao Kip via BCEL One and domestic banking apps.",
    learn4_title: "Crypto Basics",
    learn4_desc: "Essential security guide: How blockchain works and safeguarding your private keys.",
    learn_earn_title: "Learn & Earn Crypto Rewards",
    learn_earn_desc: "Complete a short 3-question quiz after reading and earn 50,000 LAK worth of Bitcoin directly in your wallet!",
    learn_earn_btn: "Start Quiz & Claim Rewards",
    news_badge: "LATEST ANNOUNCEMENTS",
    news_title: "Latest News & Events",
    news_subtitle: "Stay updated on newly listed coins, seasonal competitions, and system improvements.",
    view_all: "View All",
    news1_title: "New Listing: SOL/USDT & SOL/LAK",
    news1_desc: "Bitqik officially opens trading for Solana pairs with 0% trading fee promotion for the first 7 days.",
    news2_title: "Core Engine 2.0 Upgrade Completed",
    news2_desc: "Matching engine architecture enhanced with 300% throughput boost and reduced latency.",
    news3_title: "Bitqik Futures Championship",
    news3_desc: "Join our trading competition with a $50,000 USDT prize pool! Free registration with top trader leaderboards.",
    news4_title: "Deposit & Earn: 12% APY on USDT",
    news4_desc: "Earn high flexible yield on USDT with daily payouts and zero lock-up commitments.",
    faq_badge: "FREQUENTLY ASKED QUESTIONS",
    faq_title: "Frequently Asked Questions (FAQ)",
    faq_subtitle: "Find quick answers regarding trading, banking deposits, and platform security.",
    final_title: "Ready to Start Trading?",
    final_subtitle: "Join Bitqik today and experience the simplest, safest, and most rewarding digital asset platform in Laos."
  },
  th: {
    license_badge: "Bank of Laos Licensed",
    ticker_promo: "🎉 โปรโมชั่น: ฝากเงินผ่าน BCEL One ฟรีค่าธรรมเนียม 0% ตลอด 24 ชม.!",
    nav_about: "เกี่ยวกับเรา",
    nav_careers: "ร่วมงานกับเรา",
    nav_products: "ผลิตภัณฑ์",
    nav_market: "ตลาด",
    nav_why: "จุดเด่น",
    nav_how: "วิธีเริ่มต้น",
    nav_learn: "เรียนรู้",
    nav_news: "ข่าวสาร",
    nav_news_announcements: "ข่าวสาร & ประกาศ",
    menu_official_announcements: "ประกาศทางการ",
    menu_official_sub: "อัปเดตระบบ, ลิสต์เหรียญใหม่, โปรโมชั่น",
    menu_crypto_news: "ข่าวสารคริปโต",
    menu_crypto_sub: "ความเคลื่อนไหวตลาด, บทวิเคราะห์ BTC",
    tab_official_announcements: "📢 ประกาศทางการ (Official)",
    tab_crypto_news: "📰 ข่าวสารคริปโต (Crypto News)",
    careers_title: "ร่วมงานกับ Bitqik (Careers)",
    careers_subtitle: "มาร่วมสร้างอนาคตของระบบการเงินดิจิทัลและเทคโนโลยี Blockchain ใน สปป. ลาว ไปกับเรา.",
    btn_login: "เข้าสู่ระบบ",
    btn_register: "ลงทะเบียน",
    btn_exchange: "Exchange Pro",
    hero_badge: "🇱🇦 ผู้ให้บริการสินทรัพย์ดิจิทัลที่ได้รับอนุญาตแห่งแรกในสปป. ลาว",
    hero_title_1: "ซื้อ, ขาย & เทรด",
    hero_title_on: "บน",
    hero_subtitle: "วิธีที่ง่าย ปลอดภัย และรวดเร็วที่สุดในการเทรดสินทรัพย์ดิจิทัลด้วยเงินกีบ (LAK), บาท (THB) และดอลลาร์ (USD) พร้อมฝาก-ถอนทันใจ.",
    hero_cta_start: "เริ่มต้นเทรดเลย",
    hero_cta_explore: "สำรวจผลิตภัณฑ์",
    swap_quick_trade: "Fast Buy / Express Swap",
    swap_zero_fee: "0% ค่าธรรมเนียมฝากเงิน",
    swap_you_pay: "คุณจ่าย (You Pay)",
    swap_you_get: "คุณจะได้รับ (You Receive)",
    swap_best_rate: "Best Rate Live",
    swap_btn: "ซื้อทันทีผ่านระบบ QR Code",
    trust_secure: "100% Secure",
    trust_secure_sub: "Cold Storage",
    trust_fee: "Low Fees",
    trust_fee_sub: "เริ่มต้น 0.05%",
    trust_fast: "Fast Orders",
    trust_fast_sub: "<10ms Engine",
    trust_support: "Local Support",
    trust_support_sub: "ทีมงานดูแล 24/7",
    why_badge: "ทำไมต้องเลือก BITQIK?",
    why_title: "ทำไมต้องเลือก Bitqik?",
    why_subtitle: "มากกว่าการเป็นศูนย์ซื้อขายสินทรัพย์ดิจิทัล เราคือพันธมิตรที่น่าเชื่อถือที่สุดในเส้นทางการลงทุนของคุณ.",
    why_sec_title: "ความปลอดภัยระดับสากล & เงินสำรอง 100%",
    why_sec_desc: "สินทรัพย์ของคุณได้รับการปกป้องด้วย Multi-Sig Cold Storage และหลักฐานเงินสำรอง 100% ตรวจสอบได้.",
    why_fast_title: "รวดเร็ว & เสถียรภาพสูงสุด",
    why_fast_desc: "Matching Engine ความเร็วสูง <10ms รองรับกว่า 1,000,000 คำสั่งต่อวินาทีอย่างราบรื่น.",
    why_fee_title: "ค่าธรรมเนียมต่ำ & ฝากเงินฟรี",
    why_fee_desc: "ค่าธรรมเนียมเทรดเริ่มต้นเพียง 0.05% และไม่มีค่าธรรมเนียมแอบแฝงในการฝากเงิน.",
    why_sup_title: "ทีมงานดูแล 24/7 ภาษาลาว & ไทย",
    why_sup_desc: "ทีมงานพร้อมตอบคำถามและดูแลคุณตลอด 24 ชั่วโมงผ่าน Live Chat และ Telegram.",
    why_ui_title: "ใช้งานง่ายทั้งมือใหม่และมือโปร",
    why_ui_desc: "มีทั้งโหมด Lite สำหรับมือใหม่ และโหมด Pro พร้อมเครื่องมือ TradingView ครบวงจร.",
    why_bank_title: "เชื่อมต่อธนาคารโดยตรง",
    why_bank_desc: "เชื่อมต่อระบบชำระเงินธนาคารสะดวก รวดเร็ว ถูกต้องตามระเบียบธนาคารแห่ง สปป. ลาว.",
    products_badge: "OUR PRODUCTS",
    products_title: "ทุกสิ่งที่คุณต้องการในการเทรด",
    products_subtitle: "ผลิตภัณฑ์ที่ออกแบบมาเพื่อตอบสนองทุกสไตล์การลงทุน ตั้งแต่มือใหม่จนถึงเทรดเดอร์มืออาชีพ.",
    prod_spot_card_title: "Spot Trading",
    prod_spot_card_desc: "ซื้อ-ขายเหรียญดิจิทัลด้วย Orderbook สภาพคล่องสูง ราคาแม่นยำ.",
    prod_fut_card_title: "Futures",
    prod_fut_card_desc: "เทรดสัญญาล่วงหน้าพร้อมเลเวอเรจสูงสุด 100x และระบบบริหารความเสี่ยงขั้นสูง.",
    prod_exp_card_title: "Express Buy/Sell",
    prod_exp_card_desc: "ซื้อและขายเหรียญอย่างสะดวก รวดเร็ว เพียงสแกน QR Code ภายในไม่กี่วินาที.",
    prod_dep_card_title: "Deposit & Withdraw",
    prod_dep_card_desc: "โยกย้ายสินทรัพย์อย่างปลอดภัย รองรับเงิน LAK, THB, USD และเหรียญคริปโตชั้นนำ.",
    learn_more: "อ่านเพิ่มเติม",
    how_badge: "HOW IT WORKS",
    how_title: "เริ่มต้นง่ายๆ ใน 4 ขั้นตอน",
    how_subtitle: "เข้าร่วมกับ Bitqik ภายในเวลาเพียง 3 นาทีเพื่อเริ่มต้นเทรด.",
    step1_title: "สร้างบัญชีผู้ใช้",
    step1_desc: "ลงทะเบียนด้วยอีเมลหรือเบอร์โทรศัพท์ของคุณภายใน 30 วินาที ฟรีไม่มีค่าใช้จ่าย.",
    step2_title: "ยืนยันตัวตน KYC",
    step2_desc: "ยืนยันตัวตนด้วยบัตรประชาชนหรือพาสปอร์ตผ่านระบบ AI อัตโนมัติภายใน 2 นาที.",
    step3_title: "ฝากเงินเข้าบัญชี",
    step3_desc: "ฝากเงินผ่าน QR Code หรือโอนเหรียญคริปโตเข้ามาได้ตลอด 24 ชั่วโมง.",
    step4_title: "เริ่มต้นเทรด",
    step4_desc: "เลือกเหรียญที่คุณชื่นชอบและเริ่มซื้อขายเพื่อสร้างผลกำไรได้ทันที.",
    step_cta: "สร้างบัญชีทันที",
    sec_badge: "FORTRESS-GRADE PROTECTION",
    sec_title: "ความปลอดภัยของคุณคือสิ่งสำคัญอันดับ 1",
    sec_subtitle: "เราใช้เทคโนโลยีความปลอดภัยระดับโลกเพื่อปกป้องสินทรัพย์และข้อมูลของคุณให้ปลอดภัย 100%.",
    sec_kyc: "มาตรฐาน KYC / AML",
    sec_kyc_sub: "ตรวจสอบตัวตนมาตรฐานสากลป้องกันการฟอกเงิน",
    sec_2fa: "ระบบยืนยันตัวตน 2 ชั้น (2FA)",
    sec_2fa_sub: "ความปลอดภัยระดับสูงด้วย Google Authenticator & SMS",
    sec_vault: "การปกป้องสินทรัพย์",
    sec_vault_sub: "98% ของสินทรัพย์ถูกเก็บไว้ใน Cold Storage ออฟไลน์",
    sec_risk: "การจัดการความเสี่ยง",
    sec_risk_sub: "ระบบ AI ตรวจจับความผิดปกติตลอด 24/7",
    sec_protection_fund: "มีกองทุนคุ้มครองผู้ใช้งานมูลค่า $10,000,000 USD รองรับทุกกรณี.",
    market_badge: "ภาพรวมตลาด",
    market_title: "ภาพรวมตลาดแบบ Real-Time",
    market_subtitle: "ราคาล่าสุด การเปลี่ยนแปลง 24 ชม. และโอกาสในการเทรดที่ดีที่สุด.",
    th_name: "สินทรัพย์",
    th_price: "ราคา",
    th_change: "เปลี่ยนแปลง 24ชม.",
    th_volume: "ปริมาณ 24ชม.",
    th_action: "เทรด",
    learn_badge: "BITQIK ACADEMY",
    learn_title: "เรียนรู้ & เติบโตไปกับ Bitqik",
    learn_subtitle: "เสริมสร้างความรู้ด้านคริปโต เทรดด้วยความมั่นใจพร้อมบทความและวิดีโอแนะนำ.",
    learn_view_all: "ดูคอร์สทั้งหมด",
    read_now: "อ่านบทความ",
    learn1_title: "What is Bitcoin?",
    learn1_desc: "พื้นฐานสำหรับมือใหม่: บิตคอยน์คืออะไร และทำไมถึงเป็นอนาคตของการเงิน.",
    learn2_title: "What is Spot Trading?",
    learn2_desc: "วิธีเทรด Spot การตั้ง Limit Order และการบริหารความเสี่ยง.",
    learn3_title: "How to Deposit?",
    learn3_desc: "คู่มือขั้นตอนการฝากเงินผ่านระบบธนาคารอย่างปลอดภัย.",
    learn4_title: "Crypto Basics",
    learn4_desc: "สิ่งที่ควรรู้ก่อนลงทุน: บล็อกเชนทำงานอย่างไร และการปกป้อง Private Key.",
    learn_earn_title: "เรียนรู้ & รับเหรียญฟรี (Learn & Earn)",
    learn_earn_desc: "ตอบคำถามสั้นๆ 3 ข้อหลังอ่านจบ รับ Bitcoin มูลค่า 50,000 LAK ฟรีทันที!",
    learn_earn_btn: "เริ่มตอบคำถามรับรางวัล",
    news_badge: "ข่าวสารล่าสุด",
    news_title: "อัปเดตข่าวสารและกิจกรรมล่าสุด",
    news_subtitle: "ติดตามข่าวสารการลิสต์เหรียญใหม่ โปรโมชั่น และการอัปเกรดระบบ.",
    view_all: "ดูทั้งหมด",
    news1_title: "เปิดตัวเหรียญใหม่: SOL/USDT & SOL/LAK",
    news1_desc: "เปิดให้เทรดคู่ Solana พร้อมโปรโมชั่นค่าธรรมเนียม 0% สัปดาห์แรก.",
    news2_title: "อัปเกรดระบบ Core Engine สำเร็จ",
    news2_desc: "ระบบจับคู่คำสั่งเวอร์ชันใหม่ทำงานเร็วขึ้น 300% ตอบสนองทันใจ.",
    news3_title: "การแข่งขัน Bitqik Futures",
    news3_desc: "ร่วมแข่งขันเทรดชิงรางวัลรวมกว่า $50,000 USDT เข้าร่วมฟรี!",
    news4_title: "Deposit & Earn: 12% APY on USDT",
    news4_desc: "ฝาก USDT รับผลตอบแทนสูงสุด 12% ต่อปี จ่ายดอกเบี้ยทุกวัน ถอนได้ตลอด.",
    faq_badge: "คำถามที่พบบ่อย",
    faq_title: "คำถามที่พบบ่อย (FAQ)",
    faq_subtitle: "ค้นหาคำตอบสำหรับข้อสงสัยเกี่ยวกับการเทรด การฝากถอน และความปลอดภัย.",
    final_title: "พร้อมเริ่มต้นเทรดหรือยัง?",
    final_subtitle: "เข้าร่วมกับ Bitqik วันนี้และสัมผัสประสบการณ์เทรดสินทรัพย์ดิจิทัลที่ดีที่สุด."
  }
};

// ==============================================================
// 2. INITIALIZATION
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Populate Market Table
  renderMarketTable();

  // Initialize Interactive Chart
  initMarketChart();

  // Initialize Instant Swap Calculator
  initSwapCalculator();

  // Start Real-time Price Simulation Ticker
  startPriceTickerSimulation();

  // Setup Event Listeners
  setupEventListeners();

  // Set default language
  applyLanguage(currentLang);
});

// ==============================================================
// 3. MARKET TABLE RENDERING & FILTERING
// ==============================================================
function renderMarketTable() {
  const tbody = document.getElementById('marketTableBody');
  if (!tbody) return;

  let filtered = coinsData;
  if (currentFilter === 'hot') {
    filtered = coinsData.filter(c => c.isHot);
  } else if (currentFilter === 'gainers') {
    filtered = [...coinsData].sort((a, b) => b.change24h - a.change24h);
  } else if (currentFilter === 'layer1') {
    filtered = coinsData.filter(c => c.isLayer1);
  }

  tbody.innerHTML = filtered.map((coin, index) => {
    const isPos = coin.change24h >= 0;
    const changeClass = isPos ? 'text-emerald-400' : 'text-red-400';
    const changeSign = isPos ? '+' : '';
    const formattedPrice = formatCurrencyPrice(coin.priceUSD);

    return `
      <tr class="hover:bg-white/5 transition-colors cursor-pointer group" onclick="selectCoinForChart('${coin.id}')">
        <td class="py-4 px-4 font-bold text-slate-500 text-xs">${index + 1}</td>
        <td class="py-4 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-base text-brand-400 group-hover:scale-110 transition">
              ${coin.icon}
            </div>
            <div>
              <div class="font-bold text-white group-hover:text-brand-400 transition flex items-center gap-1.5">
                ${coin.symbol}
                <span class="text-[10px] text-slate-400 font-normal">/USDT</span>
              </div>
              <div class="text-[11px] text-slate-400">${coin.name}</div>
            </div>
          </div>
        </td>
        <td class="py-4 px-4 font-bold text-white font-mono" id="table-price-${coin.id}">
          ${formattedPrice}
        </td>
        <td class="py-4 px-4 font-bold ${changeClass} font-mono" id="table-change-${coin.id}">
          <span class="inline-flex items-center gap-0.5">
            ${isPos ? '▲' : '▼'} ${changeSign}${coin.change24h.toFixed(2)}%
          </span>
        </td>
        <td class="py-4 px-4 text-slate-400 font-mono text-xs hidden sm:table-cell">
          $${coin.volumeUSD}
        </td>
        <td class="py-4 px-4 text-right">
          <button onclick="event.stopPropagation(); quickTradeAction('${coin.symbol}')" class="px-3.5 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500 text-brand-400 hover:text-white font-bold text-xs transition duration-200">
            Trade
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterMarket(filterType) {
  currentFilter = filterType;
  document.querySelectorAll('.market-pill').forEach(btn => {
    btn.classList.remove('active', 'bg-brand-500', 'text-white');
    btn.classList.add('bg-white/5', 'text-slate-300');
  });

  const activeBtn = event.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-brand-500', 'text-white');
    activeBtn.classList.remove('bg-white/5', 'text-slate-300');
  }

  renderMarketTable();
}

// ==============================================================
// 4. CHART.JS INTERACTIVE MARKET GRAPH
// ==============================================================
function initMarketChart() {
  const ctx = document.getElementById('marketChart');
  if (!ctx) return;

  const initialData = generateChartData(selectedCoin, selectedTimeframe);

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: initialData.labels,
      datasets: [{
        label: `${selectedCoin} Price`,
        data: initialData.prices,
        borderColor: '#ff6600',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(255, 102, 0, 0.2)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(255, 102, 0, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 102, 0, 0.0)');
          return gradient;
        },
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ff6600',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#0f1420',
          titleColor: '#94a3b8',
          bodyColor: '#ffffff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Price: $${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: '#64748b', font: { size: 10 }, maxTicksLimit: 6 }
        },
        y: {
          position: 'right',
          grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
          ticks: {
            color: '#64748b',
            font: { size: 10 },
            callback: (value) => `$${value > 1000 ? (value / 1000).toFixed(1) + 'k' : value}`
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
}

function generateChartData(coinSymbol, tf) {
  const coin = coinsData.find(c => c.id === coinSymbol) || coinsData[0];
  const basePrice = coin.priceUSD;
  const count = tf === '1H' ? 12 : tf === '24H' ? 24 : tf === '7D' ? 14 : 30;
  
  let labels = [];
  let prices = [];
  let current = basePrice * (1 - (coin.change24h / 100) * 0.7);

  for (let i = 0; i < count; i++) {
    if (tf === '1H') labels.push(`${i * 5}m`);
    else if (tf === '24H') labels.push(`${i}:00`);
    else if (tf === '7D') labels.push(`Day ${Math.floor(i / 2) + 1}`);
    else labels.push(`${i + 1}`);

    const swing = (Math.random() - 0.47) * (basePrice * 0.015);
    current += swing;
    if (i === count - 1) current = basePrice; // match current price
    prices.push(parseFloat(current.toFixed(2)));
  }

  return { labels, prices };
}

function selectCoinForChart(coinId) {
  selectedCoin = coinId;
  const coin = coinsData.find(c => c.id === coinId);
  if (!coin) return;

  // Update UI Elements in the Featured Card
  document.getElementById('chartCoinIcon').innerText = coin.icon;
  document.getElementById('chartCoinPair').innerText = `${coin.symbol}/USDT`;
  document.getElementById('chartCoinName').innerText = coin.name;
  document.getElementById('chartCoinPrice').innerText = formatCurrencyPrice(coin.priceUSD);
  
  const isPos = coin.change24h >= 0;
  const changeEl = document.getElementById('chartCoinChange');
  changeEl.className = `text-xs font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'}`;
  changeEl.innerText = `${isPos ? '+' : ''}${coin.change24h.toFixed(2)}%`;

  document.getElementById('chartTradeBtnText').innerText = `Trade ${coin.symbol} Now`;

  // Update Chart
  if (chartInstance) {
    const data = generateChartData(selectedCoin, selectedTimeframe);
    chartInstance.data.labels = data.labels;
    chartInstance.data.datasets[0].label = `${coin.symbol} Price`;
    chartInstance.data.datasets[0].data = data.prices;
    chartInstance.update();
  }
}

function setTimeframe(tf) {
  selectedTimeframe = tf;
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-brand-500', 'text-white');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active', 'bg-brand-500', 'text-white');
  }

  if (chartInstance) {
    const data = generateChartData(selectedCoin, selectedTimeframe);
    chartInstance.data.labels = data.labels;
    chartInstance.data.datasets[0].data = data.prices;
    chartInstance.update();
  }
}

// ==============================================================
// 5. REAL-TIME SIMULATION ENGINE (PRICE FLASHES & TICKERS)
// ==============================================================
function startPriceTickerSimulation() {
  setInterval(() => {
    // Pick 1 or 2 random coins
    const randomCoin = coinsData[Math.floor(Math.random() * coinsData.length)];
    const deltaPercent = (Math.random() * 0.5 - 0.23); // small fluctuation
    const oldPrice = randomCoin.priceUSD;
    randomCoin.priceUSD = parseFloat((oldPrice * (1 + deltaPercent / 100)).toFixed(2));
    randomCoin.change24h = parseFloat((randomCoin.change24h + deltaPercent * 0.1).toFixed(2));

    const isUp = deltaPercent >= 0;

    // Flash table cell
    const priceCell = document.getElementById(`table-price-${randomCoin.id}`);
    const changeCell = document.getElementById(`table-change-${randomCoin.id}`);

    if (priceCell) {
      priceCell.innerText = formatCurrencyPrice(randomCoin.priceUSD);
      priceCell.classList.remove('price-flash-up', 'price-flash-down');
      void priceCell.offsetWidth; // trigger reflow
      priceCell.classList.add(isUp ? 'price-flash-up' : 'price-flash-down');
    }

    if (changeCell) {
      const isPos = randomCoin.change24h >= 0;
      changeCell.className = `py-4 px-4 font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'} font-mono`;
      changeCell.innerHTML = `<span class="inline-flex items-center gap-0.5">${isPos ? '▲' : '▼'} ${isPos ? '+' : ''}${randomCoin.change24h.toFixed(2)}%</span>`;
    }

    // If selected coin updated, update card
    if (randomCoin.id === selectedCoin) {
      document.getElementById('chartCoinPrice').innerText = formatCurrencyPrice(randomCoin.priceUSD);
      const isPos = randomCoin.change24h >= 0;
      const changeEl = document.getElementById('chartCoinChange');
      changeEl.className = `text-xs font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'}`;
      changeEl.innerText = `${isPos ? '+' : ''}${randomCoin.change24h.toFixed(2)}%`;
    }

    // Update Top Marquee Ticker values
    if (randomCoin.id === 'BTC') {
      const btcTick = document.querySelector('.ticker-btc-price');
      if (btcTick) btcTick.innerText = `$${randomCoin.priceUSD.toLocaleString()}`;
      updateSwapCalculator();
    } else if (randomCoin.id === 'ETH') {
      const ethTick = document.querySelector('.ticker-eth-price');
      if (ethTick) ethTick.innerText = `$${randomCoin.priceUSD.toLocaleString()}`;
    } else if (randomCoin.id === 'SOL') {
      const solTick = document.querySelector('.ticker-sol-price');
      if (solTick) solTick.innerText = `$${randomCoin.priceUSD.toLocaleString()}`;
    }
  }, 2400);
}

// ==============================================================
// 6. FAST BUY / SWAP CALCULATOR WIDGET
// ==============================================================
function initSwapCalculator() {
  const payInput = document.getElementById('swapPayInput');
  const coinSelect = document.getElementById('swapCoinSelect');

  if (payInput) payInput.addEventListener('input', updateSwapCalculator);
  if (coinSelect) coinSelect.addEventListener('change', updateSwapCalculator);

  updateSwapCalculator();
}

function updateSwapCalculator() {
  const payInput = document.getElementById('swapPayInput');
  const coinSelect = document.getElementById('swapCoinSelect');
  const receiveEl = document.getElementById('swapReceiveValue');
  const rateTextEl = document.getElementById('swapRateText');

  if (!payInput || !coinSelect || !receiveEl) return;

  const payAmount = parseFloat(payInput.value) || 0;
  const targetSymbol = coinSelect.value;
  const targetCoin = coinsData.find(c => c.symbol === targetSymbol) || coinsData[0];

  // Convert pay amount in current currency to USD
  const rateToUSD = currencyRate[currentCurrency] || 22000;
  const amountInUSD = currentCurrency === 'USD' ? payAmount : payAmount / rateToUSD;

  // Calculate crypto received
  const cryptoReceived = amountInUSD / targetCoin.priceUSD;
  receiveEl.innerText = cryptoReceived < 0.0001 ? cryptoReceived.toFixed(6) : cryptoReceived.toFixed(4);

  // Rate text: 1 Coin = X CurrentCurrency
  const oneCoinInLocal = targetCoin.priceUSD * rateToUSD;
  const sym = currencySymbol[currentCurrency];
  rateTextEl.innerText = `${sym}${Math.round(oneCoinInLocal).toLocaleString()}`;
}

let bcelTimerInterval = null;

function handleInstantBuy() {
  const payInput = document.getElementById('swapPayInput');
  const coinSelect = document.getElementById('swapCoinSelect');
  const receiveEl = document.getElementById('swapReceiveValue');
  
  const payVal = payInput ? payInput.value : '5000000';
  const coin = coinSelect ? coinSelect.value : 'BTC';
  const cryptoVal = receiveEl ? receiveEl.innerText : '0.003315';
  const sym = currencySymbol[currentCurrency] || '₭';

  openBcelQrModal(payVal, coin, cryptoVal, sym);
}

function openBcelQrModal(payVal, coin, cryptoVal, sym) {
  const modal = document.getElementById('bcelQrModal');
  if (!modal) return;

  const modalAmount = document.getElementById('bcelModalAmount');
  const modalCrypto = document.getElementById('bcelModalCrypto');
  const refCodeEl = document.getElementById('bcelRefCode');

  if (modalAmount) modalAmount.innerText = `${sym}${parseFloat(payVal).toLocaleString()}`;
  if (modalCrypto) modalCrypto.innerText = `≈ ${cryptoVal} ${coin}`;
  if (refCodeEl) refCodeEl.innerText = `BQ-${Math.floor(100000 + Math.random() * 900000)}`;

  modal.classList.remove('hidden');
  startBcelCountdownTimer();

  if (window.lucide) window.lucide.createIcons();
  showNotification('ສ້າງ QR Code BCEL One ສຳເລັດ! ກະລຸນາສະແກນພາຍໃນ 5 ນາທີ', 'info');
}

function closeBcelQrModal() {
  const modal = document.getElementById('bcelQrModal');
  if (modal) modal.classList.add('hidden');
  if (bcelTimerInterval) clearInterval(bcelTimerInterval);
}

function startBcelCountdownTimer() {
  if (bcelTimerInterval) clearInterval(bcelTimerInterval);
  let timeLeft = 300; // 5 minutes

  const timerEl = document.getElementById('bcelTimer');
  if (!timerEl) return;

  timerEl.innerText = '05:00';
  bcelTimerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(bcelTimerInterval);
      timerEl.innerText = '00:00 (Expired)';
      showNotification('QR Code ໝົດອາຍຸແລ້ວ ກະລຸນາກົດສ້າງໃໝ່', 'warning');
      return;
    }
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    timerEl.innerText = `${mins}:${secs}`;
  }, 1000);
}

function confirmBcelPayment() {
  closeBcelQrModal();
  showNotification('✅ ຢືນຢັນການຊຳລະເງິນສຳເລັດ 100%! ລະບົບໂອນຫຼຽນເຂົ້າກະເປົາ Bitqik ແລ້ວ', 'success');
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
  }
}

function simulateBcelAppLaunch() {
  showNotification('📱 ກຳລັງເປີດແອັບ BCEL One ໃນອຸປະກອນຂອງທ່ານ... ກະລຸນາກົດຢືນຢັນການໂອນ', 'info');
}

// ==============================================================
// 7. CURRENCY & FORMATTING ENGINE
// ==============================================================
function setCurrency(currency, symbol) {
  currentCurrency = currency;
  document.getElementById('currentCurrencyLabel').innerText = `${currency} (${symbol})`;
  document.getElementById('swapPayCurrencyText').innerText = currency;
  document.getElementById('currencyDropdown').classList.add('hidden');

  // Update Balances and Rate labels
  if (currency === 'LAK') {
    document.getElementById('swapBalLabel').innerText = 'ຍອດເຫຼືອ: ₭10,000,000';
  } else if (currency === 'USD') {
    document.getElementById('swapBalLabel').innerText = 'Balance: $450.00';
  } else if (currency === 'THB') {
    document.getElementById('swapBalLabel').innerText = 'ยอดคงเหลือ: ฿15,000';
  }

  renderMarketTable();
  updateSwapCalculator();
  selectCoinForChart(selectedCoin);
  showNotification(`ປ່ຽນສະກຸນເງິນສະແດງຜົນເປັນ ${currency} ແລ້ວ`, 'info');
}

function formatCurrencyPrice(priceUSD) {
  const rate = currencyRate[currentCurrency] || 1;
  const sym = currencySymbol[currentCurrency] || '$';
  const val = priceUSD * rate;

  if (currentCurrency === 'LAK') {
    return `${sym}${Math.round(val).toLocaleString()}`;
  } else if (currentCurrency === 'THB') {
    return `${sym}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    return `${sym}${val < 1 ? val.toFixed(4) : val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

// ==============================================================
// 8. MULTI-LANGUAGE SYSTEM (Lao / English / Thai)
// ==============================================================
function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('langDropdown').classList.add('hidden');

  const flagMap = { lo: '🇱🇦', en: '🇺🇸', th: '🇹🇭' };
  const labelMap = { lo: 'ລາວ', en: 'English', th: 'ไทย' };

  document.getElementById('currentLangFlag').innerText = flagMap[lang];
  document.getElementById('currentLangLabel').innerText = labelMap[lang];

  applyLanguage(lang);
  showNotification(`Language switched to ${labelMap[lang]}`, 'info');
}

function applyLanguage(lang) {
  const dict = i18nDict[lang] || i18nDict['lo'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });
}

// ==============================================================
// 9. HOW IT WORKS INTERACTIVE STEP SELECTOR
// ==============================================================
const stepData = [
  {
    step: 1,
    titleLo: "ສ້າງບັນຊີຟຣີ ພາຍໃນ 30 ວິນາທີ",
    titleEn: "Create Free Account in 30 Seconds",
    descLo: "ລົງທະບຽນດ້ວຍອີເມວ ຫຼື ເບີໂທລະສັບຂອງທ່ານ ຕັ້ງລະຫັດຜ່ານ ແລະ ເປີດໃຊ້ງານລະບົບປ້ອງກັນ 2FA ໄດ້ທັນທີ.",
    descEn: "Sign up with email or phone, set password, and enable 2FA protection immediately.",
    icon: "user-plus"
  },
  {
    step: 2,
    titleLo: "ຢືນຢັນຕົວຕົນ (KYC) ຜ່ານ AI ໃນ 2 ນາທີ",
    titleEn: "Instant AI Identity Verification (KYC)",
    descLo: "ຖ່າຍຮູບພ້ອມບັດປະຈຳຕົວ ຫຼື ໜັງສືຜ່ານແດນ ລະບົບ AI ກວດສອບອັດຕະໂນມັດ ຖືກຕ້ອງຕາມກົດໝາຍທະນາຄານແຫ່ງ ສປປ ລາວ.",
    descEn: "Upload passport or Lao ID card with selfie for automated 2-minute compliance verification.",
    icon: "file-check"
  },
  {
    step: 3,
    titleLo: "ຝາກເງິນກີບທັນໃຈຜ່ານ BCEL One 0% Fee",
    titleEn: "Deposit LAK Instantly with BCEL One 0% Fee",
    descLo: "ສະແກນ QR Code BCEL One ເງິນເຂົ້າບັນຊີທັນທີ ຟຣີຄ່າທຳນຽມ 0% ຕະຫຼອດ 24 ຊົ່ວໂມງ.",
    descEn: "Scan BCEL One dynamic QR code for instant balance credit with 0% transaction fee 24/7.",
    icon: "wallet"
  },
  {
    step: 4,
    titleLo: "ເລີ່ມຕົ້ນເທຣດ ແລະ ຮັບກຳໄລ",
    titleEn: "Start Trading & Accumulate Crypto",
    descLo: "ເລືອກເທຣດ Spot, Futures ຫຼື ສະສົມຫຼຽນ Bitqik Earn ຮັບດອກເບ້ຍສູງສຸດ 12.5% APY.",
    descEn: "Trade Spot, Futures with 100x leverage or stake in Bitqik Earn for up to 12.5% APY yield.",
    icon: "trending-up"
  }
];

function selectStep(stepNum) {
  document.querySelectorAll('.step-card').forEach((card, idx) => {
    if (idx + 1 === stepNum) {
      card.classList.add('active', 'border-brand-500/50');
      card.classList.remove('border-white/10');
      card.querySelector('span').classList.add('text-brand-500');
      card.querySelector('span').classList.remove('text-slate-500');
    } else {
      card.classList.remove('active', 'border-brand-500/50');
      card.classList.add('border-white/10');
      card.querySelector('span').classList.remove('text-brand-500');
      card.querySelector('span').classList.add('text-slate-500');
    }
  });

  const data = stepData[stepNum - 1];
  const titleEl = document.getElementById('stepPreviewTitle');
  const descEl = document.getElementById('stepPreviewDesc');
  const iconEl = document.getElementById('stepPreviewIcon');

  if (titleEl && descEl && data) {
    titleEl.innerText = currentLang === 'en' ? data.titleEn : data.titleLo;
    descEl.innerText = currentLang === 'en' ? data.descEn : data.descLo;
    if (iconEl) {
      iconEl.setAttribute('data-lucide', data.icon);
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

// ==============================================================
// 10. FAQ ACCORDION & SEARCH
// ==============================================================
function toggleFaq(item) {
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');
  const isOpen = !answer.classList.contains('hidden');

  if (isOpen) {
    answer.classList.add('hidden');
    icon.classList.remove('rotate-45');
    item.classList.remove('border-brand-500/50');
  } else {
    answer.classList.remove('hidden');
    icon.classList.add('rotate-45');
    item.classList.add('border-brand-500/50');
  }
}

// ==============================================================
// 11. MODALS & UI HELPERS
// ==============================================================
let authMode = 'login';

function openAuthModal(mode = 'login') {
  authMode = mode;
  updateAuthModalUI();
  document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.add('hidden');
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'register' : 'login';
  updateAuthModalUI();
}

function updateAuthModalUI() {
  const title = document.getElementById('authModalTitle');
  const sub = document.getElementById('authModalSub');
  const submitBtn = document.getElementById('authSubmitText');
  const toggleText = document.getElementById('authToggleText');
  const toggleBtn = document.getElementById('authToggleBtn');

  if (authMode === 'login') {
    title.innerText = currentLang === 'en' ? 'Log in to Bitqik' : 'ເຂົ້າສູ່ລະບົບ Bitqik';
    sub.innerText = currentLang === 'en' ? 'Welcome back! Manage your portfolio.' : 'ຍິນດີຕ້ອນຮັບກັບຄືນ! ຈັດການພອດ ແລະ ເລີ່ມເທຣດ.';
    submitBtn.innerText = currentLang === 'en' ? 'Log In' : 'ເຂົ້າສູ່ລະບົບ';
    toggleText.innerText = currentLang === 'en' ? "Don't have an account?" : 'ຍັງບໍ່ມີບັນຊີບໍ?';
    toggleBtn.innerText = currentLang === 'en' ? 'Register Now' : 'ລົງທະບຽນໃໝ່';
  } else {
    title.innerText = currentLang === 'en' ? 'Create Bitqik Account' : 'ສ້າງບັນຊີ Bitqik';
    sub.innerText = currentLang === 'en' ? 'Get $50 welcome fee rebate upon KYC.' : 'ຮັບໂບນັດຄ່າທຳນຽມ $50 ເມື່ອຢືນຢັນ KYC ສຳເລັດ.';
    submitBtn.innerText = currentLang === 'en' ? 'Create Account' : 'ສ້າງບັນຊີເລີຍ';
    toggleText.innerText = currentLang === 'en' ? 'Already have an account?' : 'ມີບັນຊີຢູ່ແລ້ວບໍ?';
    toggleBtn.innerText = currentLang === 'en' ? 'Log In' : 'ເຂົ້າສູ່ລະບົບ';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  closeAuthModal();
  showNotification(authMode === 'login' ? 'ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ!' : 'ລົງທະບຽນສຳເລັດ! ຍິນດີຕ້ອນຮັບສູ່ Bitqik 🇱🇦', 'success');

  if (window.confetti) {
    window.confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  }
}

function handleQuickRegister() {
  const email = document.getElementById('finalEmailInput').value;
  if (!email) {
    showNotification('ກະລຸນາປ້ອນອີເມວຂອງທ່ານກ່ອນ', 'warning');
    return;
  }
  showNotification(`ກຳລັງສ້າງບັນຊີສຳລັບ ${email}... ລະຫັດ OTP ຖືກສົ່ງແລ້ວ!`, 'success');
  if (window.confetti) {
    window.confetti({ particleCount: 80, spread: 90 });
  }
}

function quickTradeAction(symbol) {
  selectCoinForChart(symbol);
  showNotification(`ເປີດໜ້າຕ່າງເທຣດຄູ່ ${symbol}/USDT`, 'info');
}

function tradeCoinNow() {
  showNotification(`ກຳລັງເຊື່ອມຕໍ່ກັບ Orderbook ຂອງ ${selectedCoin}/USDT...`, 'success');
}

function claimQuizReward() {
  showNotification('🎉 ຍິນດີນຳ! ທ່ານຕອບຖືກທຸກຂໍ້ ໄດ້ຮັບ 50,000 LAK ເຂົ້າກະເປົາ Bitqik!', 'success');
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
  }
}

function switchProductTab(tab) {
  document.querySelectorAll('.prod-tab-btn').forEach(btn => {
    btn.classList.remove('bg-brand-500', 'text-white');
    btn.classList.add('bg-white/5', 'text-slate-300');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('bg-brand-500', 'text-white');
    event.currentTarget.classList.remove('bg-white/5', 'text-slate-300');
  }
  showNotification(`ກອງຂໍ້ມູນຜະລິດຕະພັນ: ${tab.toUpperCase()}`, 'info');
}

// Toast Notification
function showNotification(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-600' : type === 'warning' ? 'bg-amber-600' : 'bg-brand-500';
  
  toast.className = `${bg} text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto`;
  toast.innerHTML = `<span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==============================================================
// 12. EVENT LISTENERS
// ==============================================================
function setupEventListeners() {
  // Currency Dropdown toggle
  const currBtn = document.getElementById('currencyBtn');
  const currMenu = document.getElementById('currencyDropdown');
  if (currBtn && currMenu) {
    currBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currMenu.classList.toggle('hidden');
    });
  }

  // Language Dropdown toggle
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langDropdown');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });
  }

  // Close dropdowns on body click
  document.addEventListener('click', () => {
    if (currMenu) currMenu.classList.add('hidden');
    if (langMenu) langMenu.classList.add('hidden');
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      showNotification(isDark ? 'ເປີດໂໝດມືດ (Dark Mode)' : 'ເປີດໂໝດສະຫວ່າງ (Light Mode)', 'info');
    });
  }

  // Search Modal
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const quickSearchInput = document.getElementById('quickSearchInput');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      if (quickSearchInput) quickSearchInput.focus();
      populateSearchResults('');
    });
  }

  if (quickSearchInput) {
    quickSearchInput.addEventListener('input', (e) => {
      populateSearchResults(e.target.value);
    });
  }

  // FAQ Search
  const faqSearchInput = document.getElementById('faqSearchInput');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.faq-item').forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }

  // Keyboard shortcut Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal) {
        searchModal.classList.toggle('hidden');
        if (!searchModal.classList.contains('hidden') && quickSearchInput) {
          quickSearchInput.focus();
          populateSearchResults('');
        }
      }
    }
  });

  // Sticky Mobile Bottom Bar setup
  setupStickyMobileBar();
}

function closeSearchModal() {
  document.getElementById('searchModal').classList.add('hidden');
}

function populateSearchResults(q) {
  const container = document.getElementById('quickSearchResults');
  if (!container) return;

  const filtered = coinsData.filter(c => 
    c.name.toLowerCase().includes(q.toLowerCase()) || 
    c.symbol.toLowerCase().includes(q.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-slate-500">ບໍ່ພົບຫຼຽນທີ່ຄົ້ນຫາ (No coins found)</div>`;
    return;
  }

  container.innerHTML = filtered.map(coin => `
    <div onclick="selectCoinForChart('${coin.id}'); closeSearchModal();" class="p-3 rounded-xl hover:bg-white/5 flex items-center justify-between cursor-pointer transition">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-brand-400">${coin.icon}</span>
        <div>
          <div class="text-sm font-bold text-white">${coin.symbol} <span class="text-xs text-slate-400 font-normal">/USDT</span></div>
          <div class="text-xs text-slate-400">${coin.name}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-sm font-bold text-white">${formatCurrencyPrice(coin.priceUSD)}</div>
        <div class="text-xs ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}">${coin.change24h >= 0 ? '+' : ''}${coin.change24h}%</div>
      </div>
    </div>
  `).join('');
}

// Careers Modal Handlers
function openCareersModal() {
  const modal = document.getElementById('careersModal');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeCareersModal() {
  const modal = document.getElementById('careersModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function applyJob(position) {
  closeCareersModal();
  showNotification(`ຂອບໃຈສຳລັບຄວາມສົນໃຈໃນຕຳແໜ່ງ ${position}! ກະລຸນາສົ່ງ CV ມາທີ່ careers@bitqik.com`, 'success');
  if (window.confetti) {
    window.confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// ==============================================================
// 13. NEWS & ANNOUNCEMENTS TAB SWITCHER
// ==============================================================
function switchNewsTab(tabType) {
  const announcementsGrid = document.getElementById('announcementsGrid');
  const cryptoNewsGrid = document.getElementById('cryptoNewsGrid');
  const tabBtnAnnouncements = document.getElementById('tabBtnAnnouncements');
  const tabBtnCryptoNews = document.getElementById('tabBtnCryptoNews');

  if (tabType === 'announcements') {
    if (announcementsGrid) announcementsGrid.classList.remove('hidden');
    if (cryptoNewsGrid) cryptoNewsGrid.classList.add('hidden');

    if (tabBtnAnnouncements) {
      tabBtnAnnouncements.className = 'news-tab-btn px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition flex items-center gap-2';
    }
    if (tabBtnCryptoNews) {
      tabBtnCryptoNews.className = 'news-tab-btn px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-transparent text-slate-300 hover:text-white transition flex items-center gap-2';
    }
  } else if (tabType === 'crypto_news') {
    if (announcementsGrid) announcementsGrid.classList.add('hidden');
    if (cryptoNewsGrid) cryptoNewsGrid.classList.remove('hidden');

    if (tabBtnCryptoNews) {
      tabBtnCryptoNews.className = 'news-tab-btn px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition flex items-center gap-2';
    }
    if (tabBtnAnnouncements) {
      tabBtnAnnouncements.className = 'news-tab-btn px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-transparent text-slate-300 hover:text-white transition flex items-center gap-2';
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

// ==============================================================
// 14. PRO VS. LITE VIEW MODE TOGGLE (CRO ACCELERATOR)
// ==============================================================
let currentViewMode = 'pro'; // 'pro' or 'lite'

function toggleViewMode() {
  const proContent = document.getElementById('proDeviceContent');
  const liteContent = document.getElementById('liteDeviceContent');
  const textDesktop = document.getElementById('viewModeText');
  const textMobile = document.getElementById('mobileViewModeText');
  const iconDesktop = document.getElementById('viewModeIcon');
  const iconMobile = document.getElementById('mobileViewModeIcon');

  if (currentViewMode === 'pro') {
    currentViewMode = 'lite';
    if (proContent) proContent.classList.add('hidden');
    if (liteContent) liteContent.classList.remove('hidden');

    if (textDesktop) textDesktop.innerText = 'Lite Mode';
    if (textMobile) textMobile.innerText = 'Lite Mode';
    if (iconDesktop) iconDesktop.innerText = '🌱';
    if (iconMobile) iconMobile.innerText = '🌱';

    showNotification('ປ່ຽນເປັນ Lite Mode: ເໝາະສຳລັບຜູ້ເລີ່ມຕົ້ນ ຊື້-ຂາຍງ່າຍໃນ 1 ຄລິກ ຜ່ານ BCEL One', 'info');
  } else {
    currentViewMode = 'pro';
    if (proContent) proContent.classList.remove('hidden');
    if (liteContent) liteContent.classList.add('hidden');

    if (textDesktop) textDesktop.innerText = 'Pro Mode';
    if (textMobile) textMobile.innerText = 'Pro Mode';
    if (iconDesktop) iconDesktop.innerText = '⚡';
    if (iconMobile) iconMobile.innerText = '⚡';

    showNotification('ປ່ຽນເປັນ Pro Mode: ເຄື່ອງມືວິເຄາະກຣາຟ TradingView & Order Book ເຕັມຮູບແບບ', 'info');
  }

  if (window.lucide) window.lucide.createIcons();
}

// ==============================================================
// 15. STICKY MOBILE CONVERSION BAR HANDLERS
// ==============================================================
let isStickyBarDismissed = false;

function setupStickyMobileBar() {
  const stickyBar = document.getElementById('stickyMobileBar');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    if (isStickyBarDismissed) return;
    if (window.scrollY > 350) {
      stickyBar.classList.remove('translate-y-full');
    } else {
      stickyBar.classList.add('translate-y-full');
    }
  });
}

function dismissStickyBar() {
  const stickyBar = document.getElementById('stickyMobileBar');
  if (stickyBar) {
    stickyBar.classList.add('translate-y-full');
  }
  isStickyBarDismissed = true;
}

// ==============================================================
// 16. REFERRAL / AFFILIATE LINK COPY
// ==============================================================
function copyReferralLink() {
  const link = "https://bitqik.la/ref/VIP888";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => {
      showNotification('ຄັດລອກລິ້ງແນະນຳໝູ່ແລ້ວ! ແບ່ງປັນເພື່ອຮັບຄ່າຄອມມິດຊັ່ນ 20%', 'success');
    }).catch(() => {
      showNotification('ຄັດລອກລິ້ງ: ' + link, 'success');
    });
  } else {
    showNotification('ຄັດລອກລິ້ງແນະນຳໝູ່ແລ້ວ: https://bitqik.la/ref/VIP888', 'success');
  }

  if (window.confetti) {
    window.confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  }
}

