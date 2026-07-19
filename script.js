document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.lucide) lucide.createIcons();

  /* Header and reading progress */
  const header = $(".site-header");
  const progress = $(".scroll-progress span");

  function updateScrollUI() {
    header.classList.toggle("scrolled", window.scrollY > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const current = max ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(current, 100)}%`;
  }

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  /* Mobile navigation */
  const menuButton = $(".menu-toggle");
  const nav = $(".main-nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    if (window.lucide) lucide.createIcons();
  }

  menuButton.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$(".main-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) setMenu(false);
  });

  /* ---------- Language (one i18n object, one setLang) ---------- */
  const i18n = {
    ckb: {
      navHome: "ماڵەوە", navServices: "خزمەتگوزارییەکان", navTechnology: "تەکنەلۆجیا", navTeam: "تیمەکەمان", navFaq: "پرسیارەکان",
      bookNow: "نۆرە بگرە", heroEyebrow: "کلینیکی ددانی نوێ لە هەولێر",
      heroTitle: "پێکەنینێکی <em>دڵنیاتر</em>، هەموو ڕۆژێک.",
      heroDescription: "لە Promed، چاودێریی نەرم و تەکنەلۆژیای نوێ پێکەوە دەبەستینەوە بۆ ئارامی تۆ.",
      heroCtaBook: "نۆرە بگرە", heroCtaServices: "خزمەتگوزارییەکان", heroCtaLocation: "شوێن",
      heroTrust: "چاودێرییەکی سەلامەت، پاک و بە متمانە",
      trustOne: "ئامێری پزیشکی نوێ", trustTwo: "ژینگەی پاک و سەلامەت", trustThree: "ستافی کوردی، عەرەبی و ئینگلیزی", trustFour: "شوێنێکی ناوەندی لە هەولێر",
      storyEyebrow: "چاودێرییەکی مرۆیی",
      storyTitle: "ددانپزیشکی باش تەنها چارەسەر نییە؛ ئارامی، گوێگرتن و دروستکردنی متمانەیە.",
      clinicEyebrow: "ناو کلینیک", clinicTitle: "چرکەیەک لەگەڵ <em>تیمەکەمان</em>",
      servicesEyebrow: "خزمەتگوزارییەکان", servicesTitle: "هەموو شتێک بۆ <em>پێکەنینی</em> تەندروست",
      servicesDescription: "هەر پلانێک بە پێی پێویستی و ئارامی خۆت دادەنرێت.", bookThis: "ئەمە نۆرە بگرە",
      serviceGeneral: "چاودێریی گشتی", serviceGeneralDetails: "پشکنینی وردی، پاککردنەوەی پیشەیی و ڕێنمایی ڕۆژانە.",
      serviceCosmetic: "جوانکاریی ددان", serviceCosmeticDetails: "سپیکردنەوەی سروشتی، bonding و veneer.",
      serviceOrtho: "ڕێکخستنی ددان", serviceOrthoDetails: "Braceی نوێ، clear aligner و چاودێریی بەردەوام.",
      serviceImplants: "چاندنی ددان", serviceImplantsDetails: "پلانی تایبەت، وێنەی دیجیتاڵ و چاودێریی پاش چاندن.",
      serviceRoot: "چارەسەری ڕەگ", serviceRootDetails: "هەڵسەنگاندن و چارەسەر بە پێی دۆخی ددانت.",
      serviceKids: "ددانی منداڵان", serviceKidsDetails: "چاودێرییەکی گونجاو بە تەمەن و هەستەکانی منداڵ.",
      technologyEyebrow: "بۆچی Promed؟", technologyTitle: "وردیی تەکنەلۆجیا، <em>نەرمی</em> چاودێری",
      techOne: "وێنەی دیجیتاڵ و 3D", techOneText: "بڕیارێکی ڕوونتر پێش چارەسەر.",
      techTwo: "چاودێریی بە نەرمی", techTwoText: "هەنگاو بە هەنگاو، بە گوێگرتن لە تۆ.",
      techThree: "پلانی ڕوون", techThreeText: "گفتوگۆی ڕوون بۆ هەنگاوی داهاتوو.",
      techFour: "شوێنێکی ئاسان", techFourText: "گەیشتنێکی ئاسان لە ناوەندی هەولێر.",
      techCaption: "تەکنەلۆژیای نوێ، بۆ بڕیارێکی دڵنیاتر",
      teamEyebrow: "تیمەکەمان", teamTitle: "پزیشکانی <em>پێکەنینت</em>", teamDescription: "تیمێک کە گوێت لێدەگرێت و لەگەڵت پلان دەدات.",
      doctorOneRole: "ددانپزیشکی گشتی و جوانکاری", doctorTwoRole: "پسپۆڕی چاندنی ددان و نەشتەرگەری", doctorThreeRole: "ڕاستکەرەوەی ددان و ددانی منداڵان",
      galleryEyebrow: "چاودێریی تەواو", galleryTitle: "هەموو چاودێری لە <em>یەک</em> شوێن",
      galleryDescription: "وێنەکان نمونەی دیزاینن؛ پێش بڵاوکردنەوە بە وێنەی ڕاستەقینەی کلینیک بگۆڕدرێن.", galleryNote: "سروشتی، پاک و دۆستانە",
      feedbackEyebrow: "دەنگی نەخۆشەکان", feedbackTitle: "هەستێکی باشتر لە <em>هەموو</em> سەردانێکدا",
      demoFeedback: "تێبینی: ئەم دەقانە نمونەن؛ پێش بڵاوکردنەوە بە ڕەخنەی ڕاستەقینە و ڕەزامەندی بگۆڕدرێن.",
      quoteOne: "“هەموو هەنگاوێکیان بە ئارامی و بە ڕوونی بۆم ڕوونکردەوە.”", quoteTwo: "“ژینگەکە ئارامە و تیمەکە بە گرمی پێشوازی دەکات.”", quoteThree: "“چارەسەرەکە بە پێی پێویستییەکانم بۆم ڕوونکرایەوە.”", quoteFour: "“بە نەرمی و دڵنیاییەوە چاودێرییان کردم.”",
      quoteOneName: "— نمونەی ڕەخنە", quoteTwoName: "— نمونەی ڕەخنە", quoteThreeName: "— نمونەی ڕەخنە", quoteFourName: "— نمونەی ڕەخنە",
      faqEyebrow: "پرسیارە باوەکان", faqTitle: "پرسیارت هەیە؟ <em>ئێمە</em> لێرەین.", faqDescription: "ئەگەر پرسیارێکی دیکەت هەیە، پەیوەندیمان پێوە بکە.", contactUs: "پەیوەندی پێوە بکە",
      faqQ1: "ئایا چارەسەرەکان ئازاردەرن؟", faqA1: "پلانی چاودێرییەکانمان بۆ کەمکردنەوەی نیگەرانی و ئارامی تۆیە.",
      faqQ2: "ئایا بەبێ نۆرە وەردەگرن؟", faqA2: "بۆ دۆخە فریاکەوتنەکان، پەیوەندیمان پێوە بکە بۆ دڵنیابوونەوە.",
      faqQ3: "چۆن نۆرە بگرم؟", faqA3: "فۆڕمی خوارەوە پڕبکەرەوە یان ڕاستەوخۆ پەیوەندیمان پێوە بکە.",
      faqQ4: "بە چ زمانێک قسە دەکەن؟", faqA4: "تیمەکەمان بە کوردی، عەرەبی و ئینگلیزی بەخێرهاتنت دەکات.",
      faqQ5: "ئایا منداڵان چارەسەر دەکەن؟", faqA5: "بەڵێ، چاودێرییەکی تایبەتی و دۆستانە بۆ منداڵانمان هەیە.",
      bookingEyebrow: "نۆرە بگرە", bookingTitle: "با یەکەم هەنگاو بۆ <em>پێکەنینت</em> هەڵبگرین.",
      bookingDescription: "فۆڕمەکە پڕبکەرەوە؛ تیمەکەمان پەیوەندیت پێوە دەکات.", callUs: "پەیوەندی", whatsappUs: "نامەمان بۆ بنێرە",
      formName: "ناوی تەواو", namePlaceholder: "ناوت بنووسە", formPhone: "ژمارەی مۆبایل", formService: "خزمەتگوزارییەکەت",
      formServiceDefault: "خزمەتگوزارییەک هەڵبژێرە", formDate: "بەرواری پێشنیارکراو", formTime: "کاتی پێشنیارکراو", formNotes: "تێبینی",
      notesPlaceholder: "هەر شتێک دەتەوێت پێمان بڵێیت...", formSubmit: "داواکاری نۆرە بنێرە",
      contactEyebrow: "پەیوەندی", contactTitle: "بەخێربێیت بۆ <em>Promed</em>", contactDescription: "ئێمە لە نزیکتین؛ کاتێک دڵت خواست، سەردانمان بکە.",
      sampleAddress: "هەولێر، هەرێمی کوردستان", viewMap: "شوێنەکە لە نەخشەدا ببینە", address: "ناونیشان", email: "ئیمەیڵ", hours: "کاتەکانی کار", hoursValue: "شەممە–پێنجشەممە: ٩:٠٠–٨:٠٠",
      footerCopy: "چاودێریی ددانی نوێ، بە دڵنیایی و گرمییەکی مرۆیی.", quickLinks: "بەستەرە خێراکان", backTop: "بگەڕێوە سەرەوە"
    },

    en: {
      navHome: "Home", navServices: "Services", navTechnology: "Technology", navTeam: "Our team", navFaq: "FAQ",
      bookNow: "Book now", heroEyebrow: "Modern dental clinic in Erbil",
      heroTitle: "A <em>more confident</em> smile, every day.",
      heroDescription: "At Promed, we connect gentle clinical care with modern technology, built around your comfort.",
      heroCtaBook: "Book now", heroCtaServices: "Services", heroCtaLocation: "Location",
      heroTrust: "Safe, clean, and considered care",
      trustOne: "Modern equipment", trustTwo: "Sterile and safe", trustThree: "Kurdish, Arabic, and English staff", trustFour: "Central Erbil location",
      storyEyebrow: "Human-centered care",
      storyTitle: "Great dentistry is not only treatment; it is calm, listening, and building trust.",
      clinicEyebrow: "Inside the clinic", clinicTitle: "A moment with <em>our team</em>",
      servicesEyebrow: "Services", servicesTitle: "Everything for a <em>healthy</em> smile",
      servicesDescription: "Every treatment plan begins with your needs, comfort, and questions.", bookThis: "Book this",
      serviceGeneral: "General care", serviceGeneralDetails: "Detailed exams, professional cleaning, and practical daily guidance.",
      serviceCosmetic: "Cosmetic dentistry", serviceCosmeticDetails: "Natural-looking whitening, bonding, and veneers.",
      serviceOrtho: "Orthodontics", serviceOrthoDetails: "Modern braces, clear aligners, and ongoing monitoring.",
      serviceImplants: "Dental implants", serviceImplantsDetails: "A personal plan, digital imaging, and post-treatment care.",
      serviceRoot: "Root canal care", serviceRootDetails: "Assessment and treatment based on your individual needs.",
      serviceKids: "Children's dentistry", serviceKidsDetails: "Age-appropriate care with patience and reassurance.",
      technologyEyebrow: "Why Promed?", technologyTitle: "Technology precision, <em>gentle</em> care",
      techOne: "Digital and 3D imaging", techOneText: "A clearer picture before treatment.",
      techTwo: "Gentle clinical care", techTwoText: "Step by step, with time to listen.",
      techThree: "A clear treatment plan", techThreeText: "A transparent conversation about each next step.",
      techFour: "Easy to reach", techFourText: "Conveniently located in central Erbil.",
      techCaption: "Modern technology for clearer decisions",
      teamEyebrow: "Our team", teamTitle: "The doctors behind <em>your</em> smile", teamDescription: "A team that listens, explains, and plans with you.",
      doctorOneRole: "General and cosmetic dentistry", doctorTwoRole: "Implant and oral surgery", doctorThreeRole: "Orthodontics and children's dentistry",
      galleryEyebrow: "Comprehensive care", galleryTitle: "All your care in <em>one</em> place",
      galleryDescription: "These are design images. Replace them with real clinic photography before publishing.", galleryNote: "Natural, clean, and welcoming",
      feedbackEyebrow: "Patient feedback", feedbackTitle: "A better feeling at <em>every</em> visit",
      demoFeedback: "Note: these are sample review cards. Replace them with consented, real feedback before publishing.",
      quoteOne: "“Every step was explained calmly and clearly.”", quoteTwo: "“The clinic feels peaceful and the team is welcoming.”", quoteThree: "“The treatment plan was explained around my needs.”", quoteFour: "“They cared for me gently and with real reassurance.”",
      quoteOneName: "— Sample feedback", quoteTwoName: "— Sample feedback", quoteThreeName: "— Sample feedback", quoteFourName: "— Sample feedback",
      faqEyebrow: "Common questions", faqTitle: "Have a question? <em>We are</em> here.", faqDescription: "For anything else, contact the team directly.", contactUs: "Contact us",
      faqQ1: "Is treatment painful?", faqA1: "Your comfort is considered at every stage of the treatment plan.",
      faqQ2: "Do you accept walk-ins?", faqA2: "For urgent situations, please contact us first to confirm availability.",
      faqQ3: "How do I book?", faqA3: "Complete the form below or contact the clinic directly.",
      faqQ4: "Which languages do you speak?", faqA4: "Our team welcomes you in Kurdish, Arabic, and English.",
      faqQ5: "Do you treat children?", faqA5: "Yes. We provide calm, age-appropriate care for children.",
      bookingEyebrow: "Book an appointment", bookingTitle: "Let’s take the first step toward <em>your smile.</em>",
      bookingDescription: "Complete the form and our team will contact you.", callUs: "Call us", whatsappUs: "Message us on WhatsApp",
      formName: "Full name", namePlaceholder: "Write your name", formPhone: "Phone number", formService: "Your service",
      formServiceDefault: "Choose a service", formDate: "Preferred date", formTime: "Preferred time", formNotes: "Notes",
      notesPlaceholder: "Tell us anything useful...", formSubmit: "Send appointment request",
      contactEyebrow: "Contact", contactTitle: "Welcome to <em>Promed</em>", contactDescription: "We are nearby whenever you are ready to visit.",
      sampleAddress: "Erbil, Kurdistan Region, Iraq", viewMap: "View location on maps", address: "Address", email: "Email", hours: "Opening hours", hoursValue: "Saturday–Thursday: 9:00–20:00",
      footerCopy: "Modern dentistry with confidence and a human touch.", quickLinks: "Quick links", backTop: "Back to top"
    },

    ar: {
      navHome: "الرئيسية", navServices: "الخدمات", navTechnology: "التقنية", navTeam: "فريقنا", navFaq: "الأسئلة",
      bookNow: "احجز موعداً", heroEyebrow: "عيادة أسنان حديثة في أربيل",
      heroTitle: "ابتسامة <em>أكثر ثقة</em> كل يوم.",
      heroDescription: "في Promed، نجمع الرعاية اللطيفة مع التكنولوجيا الحديثة، حول راحتك أنت.",
      heroCtaBook: "احجز موعداً", heroCtaServices: "الخدمات", heroCtaLocation: "الموقع",
      heroTrust: "رعاية آمنة ونظيفة ومدروسة",
      trustOne: "معدات حديثة", trustTwo: "بيئة آمنة ومعقمة", trustThree: "فريق بالكردية والعربية والإنجليزية", trustFour: "موقع مركزي في أربيل",
      storyEyebrow: "رعاية إنسانية", storyTitle: "طب الأسنان الجيد ليس علاجاً فقط؛ بل هدوء واستماع وبناء ثقة.",
      clinicEyebrow: "داخل العيادة", clinicTitle: "لحظة مع <em>فريقنا</em>",
      servicesEyebrow: "الخدمات", servicesTitle: "كل ما تحتاجه من أجل <em>ابتسامة صحية</em>",
      servicesDescription: "كل خطة علاج تبدأ من احتياجاتك وراحتك وأسئلتك.", bookThis: "احجز هذه",
      serviceGeneral: "رعاية عامة", serviceGeneralDetails: "فحوصات دقيقة، تنظيف احترافي، وإرشاد يومي عملي.",
      serviceCosmetic: "تجميل الأسنان", serviceCosmeticDetails: "تبييض طبيعي، bonding، وعدسات veneer.",
      serviceOrtho: "تقويم الأسنان", serviceOrthoDetails: "تقويم حديث، aligners شفافة، ومتابعة مستمرة.",
      serviceImplants: "زراعة الأسنان", serviceImplantsDetails: "خطة شخصية، تصوير رقمي، ورعاية بعد الزراعة.",
      serviceRoot: "علاج الجذور", serviceRootDetails: "تقييم وعلاج بحسب حالة أسنانك.",
      serviceKids: "أسنان الأطفال", serviceKidsDetails: "رعاية مناسبة للعمر بصبر وطمأنينة.",
      technologyEyebrow: "لماذا Promed؟", technologyTitle: "دقة التقنية، <em>ولطف</em> الرعاية",
      techOne: "تصوير رقمي وثلاثي الأبعاد", techOneText: "صورة أوضح قبل العلاج.",
      techTwo: "رعاية لطيفة", techTwoText: "خطوة بخطوة، مع وقت للاستماع.",
      techThree: "خطة علاج واضحة", techThreeText: "حديث واضح عن كل خطوة قادمة.",
      techFour: "سهل الوصول", techFourText: "في موقع مريح وسط أربيل.",
      techCaption: "تقنية حديثة لقرارات أوضح",
      teamEyebrow: "فريقنا", teamTitle: "الأطباء خلف <em>ابتسامتك</em>", teamDescription: "فريق يستمع ويشرح ويخطط معك.",
      doctorOneRole: "طب الأسنان العام والتجميلي", doctorTwoRole: "زراعة الأسنان وجراحة الفم", doctorThreeRole: "تقويم الأسنان وأسنان الأطفال",
      galleryEyebrow: "رعاية متكاملة", galleryTitle: "كل رعايتك في <em>مكان</em> واحد",
      galleryDescription: "هذه صور تصميمية؛ استبدلها بصور العيادة الحقيقية قبل النشر.", galleryNote: "طبيعي، نظيف، ومرحب",
      feedbackEyebrow: "آراء المرضى", feedbackTitle: "شعور أفضل في <em>كل</em> زيارة",
      demoFeedback: "ملاحظة: هذه بطاقات تجريبية. استبدلها بآراء حقيقية بعد الموافقة.",
      quoteOne: "“شُرحت كل خطوة بهدوء ووضوح.”", quoteTwo: "“العيادة هادئة والفريق مرحّب.”", quoteThree: "“شُرحت خطة العلاج حول احتياجاتي.”", quoteFour: "“اعتنوا بي بلطف وطمأنينة حقيقية.”",
      quoteOneName: "— رأي تجريبي", quoteTwoName: "— رأي تجريبي", quoteThreeName: "— رأي تجريبي", quoteFourName: "— رأي تجريبي",
      faqEyebrow: "أسئلة شائعة", faqTitle: "لديك سؤال؟ <em>نحن</em> هنا.", faqDescription: "لأي سؤال آخر، تواصل مع الفريق مباشرة.", contactUs: "تواصل معنا",
      faqQ1: "هل العلاج مؤلم؟", faqA1: "راحتك جزء أساسي من كل مرحلة في خطة العلاج.",
      faqQ2: "هل تقبلون الزيارات دون موعد؟", faqA2: "للحالات العاجلة، يرجى الاتصال أولاً لتأكيد التوفر.",
      faqQ3: "كيف أحجز؟", faqA3: "املأ النموذج أدناه أو تواصل مع العيادة مباشرة.",
      faqQ4: "ما اللغات التي تتحدثون بها؟", faqA4: "يرحب بكم فريقنا بالكردية والعربية والإنجليزية.",
      faqQ5: "هل تعالجون الأطفال؟", faqA5: "نعم، نقدم رعاية هادئة ومناسبة للأطفال.",
      bookingEyebrow: "احجز موعداً", bookingTitle: "لنأخذ الخطوة الأولى نحو <em>ابتسامتك.</em>",
      bookingDescription: "املأ النموذج وسيتواصل معك فريقنا.", callUs: "اتصل بنا", whatsappUs: "راسلنا على واتساب",
      formName: "الاسم الكامل", namePlaceholder: "اكتب اسمك", formPhone: "رقم الهاتف", formService: "الخدمة المطلوبة",
      formServiceDefault: "اختر خدمة", formDate: "التاريخ المفضل", formTime: "الوقت المفضل", formNotes: "ملاحظات",
      notesPlaceholder: "اكتب أي معلومات مفيدة...", formSubmit: "أرسل طلب الموعد",
      contactEyebrow: "تواصل", contactTitle: "أهلاً بك في <em>Promed</em>", contactDescription: "نحن قريبون منك عندما تكون مستعداً للزيارة.",
      sampleAddress: "أربيل، إقليم كردستان، العراق", viewMap: "شاهد الموقع على الخريطة", address: "العنوان", email: "البريد الإلكتروني", hours: "أوقات العمل", hoursValue: "السبت–الخميس: ٩:٠٠–٢٠:٠٠",
      footerCopy: "طب أسنان حديث بثقة ولمسة إنسانية.", quickLinks: "روابط سريعة", backTop: "العودة للأعلى"
    }
  };

  const langNames = { ckb: "کوردی", ar: "عربی", en: "English" };
  const titles = {
    ckb: "Promed Dental | پڕۆمید ددانتازی",
    ar: "بروميد لطب الأسنان",
    en: "Promed Dental | Modern Dental Clinic"
  };

  const langSwitch = $("[data-lang-switch]");
  const langLabel = $("[data-lang-label]");

  function setLang(lang) {
    const dict = i18n[lang];
    if (!dict) return;

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "en" ? "ltr" : "rtl";
    document.title = titles[lang] || titles.ckb;

    $$("[data-i18n]").forEach((el) => {
      const text = dict[el.dataset.i18n];
      if (text != null) el.innerHTML = text;
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const text = dict[el.dataset.i18nPlaceholder];
      if (text != null) el.placeholder = text;
    });

    if (langLabel) langLabel.textContent = langNames[lang];
    $$("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));

    if (window.lucide) lucide.createIcons();
    localStorage.setItem("promed-language", lang);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  // Dropdown open/close
  if (langSwitch) {
    const trigger = $(".lang-current", langSwitch);
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = langSwitch.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
    });
    $$("[data-lang]", langSwitch).forEach((b) => {
      b.addEventListener("click", () => {
        setLang(b.dataset.lang);
        langSwitch.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", (e) => {
      if (!langSwitch.contains(e.target)) {
        langSwitch.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const stored = localStorage.getItem("promed-language");
  setLang(stored && i18n[stored] ? stored : "ckb");

  /* FAQ accordion */
  $$(".faq-item").forEach((item) => {
    const button = $("button", item);
    button.addEventListener("click", () => {
      const opening = !item.classList.contains("open");
      $$(".faq-item").forEach((faq) => {
        faq.classList.remove("open");
        $("button", faq).setAttribute("aria-expanded", "false");
      });
      if (opening) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Technology: hover to swap image + highlight step (tap on touch) */
  function activateTechnology(name) {
    $$(".technology-point").forEach((p) => p.classList.toggle("active", p.dataset.tech === name));
    $$(".technology-image").forEach((img) => img.classList.toggle("active", img.dataset.techImage === name));
  }
  $$(".technology-point").forEach((p) => {
    p.addEventListener("mouseenter", () => activateTechnology(p.dataset.tech));
    p.addEventListener("focus", () => activateTechnology(p.dataset.tech));
    p.addEventListener("click", () => activateTechnology(p.dataset.tech));
  });

  /* Demo booking form */
  const form = $("#booking-form");
  const formMessage = $(".form-message");
  const dateInput = $('input[type="date"]', form);
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const lang = document.documentElement.lang;
    const message = {
      ckb: name ? `سوپاس ${name}، داواکارییەکەت نێردرا. بە زووترین کات پەیوەندیت پێوە دەکەین.` : "سوپاس، داواکارییەکەت نێردرا.",
      ar: name ? `شكراً ${name}، تم إرسال طلبك. سيتواصل معك فريقنا قريباً.` : "تم إرسال طلبك. سيتواصل معك فريقنا قريباً.",
      en: name ? `Thank you, ${name}. Your request was sent; our team will contact you soon.` : "Your request was sent; our team will contact you soon."
    };
    formMessage.textContent = message[lang] || message.ckb;
    form.reset();
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Magnetic buttons (desktop, fine pointer) ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    $$("[data-magnetic]").forEach((btn) => {
      const strength = 0.35;
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.setProperty("--mx", `${x}px`);
        btn.style.setProperty("--my", `${y}px`);
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- GSAP motion ---------- */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // 13 — Hero load: words stagger up + fade, buttons after, video slow scale
    const heroTl = gsap.timeline({ delay: 0.15 });
    heroTl.from(".hero-copy .eyebrow, .hero-copy h1, .hero-copy .hero-description", {
      y: 34, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out"
    });
    heroTl.from(".hero-actions .button", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", clearProps: "transform" }, "-=0.2");
    heroTl.from(".hero-trust", { opacity: 0, duration: 0.5 }, "-=0.2");
    gsap.fromTo(".hero-video", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power2.out" });

    // 14 — Scroll-telling headings: translate up + fade tied to scroll, reverses
    $$("[data-scroll-head]").forEach((el) => {
      gsap.fromTo(el, { y: 46, opacity: 0.15 }, {
        y: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true }
      });
    });

    // Story statement: gentle fade/rise on enter (no gray→blue fill)
    const scrollFill = $(".scroll-fill");
    if (scrollFill) {
      gsap.from(scrollFill, {
        y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".story-section", start: "top 75%" }
      });
    }

    // 15 — Parallax: clinic video frame enters with light parallax
    const clinicFrame = $("[data-parallax-media]");
    if (clinicFrame) {
      gsap.fromTo(clinicFrame, { yPercent: 12, scale: 0.96 }, {
        yPercent: -4, scale: 1, ease: "none",
        scrollTrigger: { trigger: ".clinic-video-section", start: "top bottom", end: "bottom top", scrub: true }
      });
    }

    // 18 — Stagger fade-up via batch (service, doctor, faq)
    ScrollTrigger.batch(".stagger > *", {
      start: "top 88%",
      onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: true }),
      onLeaveBack: (els) => gsap.to(els, { y: 40, opacity: 0, duration: 0.3, overwrite: true })
    });
    gsap.set(".stagger > *", { y: 40, opacity: 0 });


    // 19 — Scatter reveal: collage items fly in tilted, settle straight
    const collageItems = $$("[data-collage] [data-scatter]");
    collageItems.forEach((item) => {
      const [x, y, rot] = item.dataset.scatter.split(",").map(Number);
      gsap.fromTo(item, { xPercent: x, yPercent: y, rotate: rot, opacity: 0 }, {
        xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: "[data-collage]", start: "top 85%", end: "top 40%", scrub: true }
      });
    });

    // 20 — Reviews marquee: seamless infinite loop, smooth pause on hover
    const track = $("[data-marquee]");
    if (track) {
      const set = [...track.children];
      set.forEach((card) => track.appendChild(card.cloneNode(true)));
      // exact width of one set (cards + their inline-end margins) for a seamless wrap
      const marginEnd = parseFloat(getComputedStyle(set[0]).marginInlineEnd || getComputedStyle(set[0]).marginRight) || 0;
      const setWidth = set.reduce((w, c) => w + c.getBoundingClientRect().width + marginEnd, 0);
      const speed = 80; // px per second
      const loop = gsap.fromTo(track, { x: 0 }, { x: -setWidth, duration: setWidth / speed, ease: "none", repeat: -1 });
      const win = $(".testimonial-window");
      win.addEventListener("pointerenter", () => gsap.to(loop, { timeScale: 0, duration: 0.35 }));
      win.addEventListener("pointerleave", () => gsap.to(loop, { timeScale: 1, duration: 0.35 }));
    }

    // 21 — Card lift handled in CSS; add subtle tilt on doctor cards
    if (window.matchMedia("(pointer: fine)").matches) {
      $$(".doctor-card").forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
          gsap.to(card, { rotationX: rx, rotationY: ry, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("pointerleave", () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5 }));
      });
    }

    ScrollTrigger.refresh();
  }
});
