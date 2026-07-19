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

  /* Language support */
  const copy = {
    en: {
      navServices: "Services", navTechnology: "Technology", navTeam: "Our team", navFaq: "FAQ",
      bookNow: "Book now", heroEyebrow: "Modern dental clinic in Erbil",
      heroTitle: "A <em>more confident</em> smile, every day.",
      heroDescription: "At Promed, we connect modern dental technology with calm, thoughtful clinical care.",
      heroCta: "Book your visit", tourButton: "Take a clinic tour", heroTrust: "Safe, clean, and considered care",
      scrollLabel: "Scroll down", trustOne: "Modern equipment", trustTwo: "Sterile and safe",
      trustThree: "Kurdish, Arabic, and English staff", trustFour: "Central Erbil location",
      storyEyebrow: "Human-centered care",
      storyTitle: "Great dentistry is not only treatment; it is calm, listening, and building trust.",
      servicesEyebrow: "Services", servicesTitle: "Everything for a <em>healthy</em> smile",
      servicesDescription: "Every treatment plan begins with your needs, comfort, and questions.",
      details: "Explore service", bookService: "Book this service",
      serviceGeneral: "General care", serviceGeneralText: "Check-ups, cleaning, and everyday prevention.", serviceGeneralDetails: "Detailed exams, professional cleaning, and practical daily guidance.",
      serviceCosmetic: "Cosmetic dentistry", serviceCosmeticText: "Veneers, whitening, and subtle smile refinement.", serviceCosmeticDetails: "Natural-looking whitening, bonding, and veneers.",
      serviceOrtho: "Orthodontics", serviceOrthoText: "Braces and clear aligners for a balanced smile.", serviceOrthoDetails: "Modern braces, clear aligners, and ongoing monitoring.",
      serviceImplants: "Dental implants", serviceImplantsText: "A strong, natural-feeling option for missing teeth.", serviceImplantsDetails: "A personal plan, digital imaging, and post-treatment care.",
      serviceRoot: "Root canal care", serviceRootText: "Precise care to preserve your natural tooth.", serviceRootDetails: "Assessment and treatment based on your individual needs.",
      serviceKids: "Children's dentistry", serviceKidsText: "A gentle, friendly visit for younger patients.", serviceKidsDetails: "Age-appropriate care with patience and reassurance.",
      technologyEyebrow: "Why Promed?", technologyTitle: "Technology precision, <em>gentle</em> care",
      techOne: "Digital and 3D imaging", techOneText: "A clearer picture before treatment.",
      techTwo: "Gentle clinical care", techTwoText: "Step by step, with time to listen.",
      techThree: "A clear treatment plan", techThreeText: "A transparent conversation about each next step.",
      techFour: "Easy to reach", techFourText: "Conveniently located in central Erbil.",
      techCaption: "Modern technology for clearer decisions",
      teamEyebrow: "Our team", teamTitle: "The doctors behind <em>your</em> smile", teamDescription: "A team that listens, explains, and plans with you.",
      doctorOneRole: "General and cosmetic dentistry", doctorTwoRole: "Implant and oral surgery", doctorThreeRole: "Orthodontics and children's dentistry",
      galleryEyebrow: "Clinic atmosphere", galleryTitle: "A calm space for <em>better</em> care",
      galleryDescription: "These are design images. Replace them with real clinic photography before publishing.", galleryNote: "Natural, clean, and welcoming",
      feedbackEyebrow: "Patient feedback", feedbackTitle: "A better feeling at <em>every</em> visit",
      demoFeedback: "Note: these are sample review cards. Replace them with consented, real feedback before publishing.",
      quoteOne: "“Every step was explained calmly and clearly.”", quoteTwo: "“The clinic feels peaceful and the team is welcoming.”", quoteThree: "“The treatment plan was explained around my needs.”", quoteOneName: "— Sample feedback", quoteTwoName: "— Sample feedback", quoteThreeName: "— Sample feedback",
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
      footerCopy: "Modern dentistry with confidence and a human touch.", quickLinks: "Quick links", backTop: "Back to top",
      tourEyebrow: "Clinic tour", tourTitle: "A place designed for calm.", tourText: "This is a design image. You can replace it later with a real clinic video."
    },

    ar: {
      navServices: "الخدمات", navTechnology: "التقنية", navTeam: "فريقنا", navFaq: "الأسئلة",
      bookNow: "احجز موعداً", heroEyebrow: "عيادة أسنان حديثة في أربيل",
      heroTitle: "ابتسامة <em>أكثر ثقة</em> كل يوم.",
      heroDescription: "في Promed، نجمع التكنولوجيا الحديثة مع رعاية أسنان هادئة ومدروسة.",
      heroCta: "احجز زيارتك", tourButton: "شاهد العيادة", heroTrust: "رعاية آمنة ونظيفة ومدروسة",
      scrollLabel: "مرر للأسفل", trustOne: "معدات حديثة", trustTwo: "بيئة آمنة ومعقمة",
      trustThree: "فريق بالكردية والعربية والإنجليزية", trustFour: "موقع مركزي في أربيل",
      storyEyebrow: "رعاية إنسانية", storyTitle: "طب الأسنان الجيد ليس علاجاً فقط؛ بل هدوء واستماع وبناء ثقة.",
      servicesEyebrow: "الخدمات", servicesTitle: "كل ما تحتاجه من أجل <em>ابتسامة صحية</em>",
      servicesDescription: "كل خطة علاج تبدأ من احتياجاتك وراحتك وأسئلتك.", details: "اكتشف الخدمة", bookService: "احجز هذه الخدمة",
      technologyEyebrow: "لماذا Promed؟", technologyTitle: "دقة التقنية، <em>ولطف</em> الرعاية",
      techOne: "تصوير رقمي وثلاثي الأبعاد", techOneText: "صورة أوضح قبل العلاج.",
      techTwo: "رعاية لطيفة", techTwoText: "خطوة بخطوة، مع وقت للاستماع.",
      techThree: "خطة علاج واضحة", techThreeText: "حديث واضح عن كل خطوة قادمة.",
      techFour: "سهل الوصول", techFourText: "في موقع مريح وسط أربيل.",
      techCaption: "تقنية حديثة لقرارات أوضح",
      teamEyebrow: "فريقنا", teamTitle: "الأطباء خلف <em>ابتسامتك</em>", teamDescription: "فريق يستمع ويشرح ويخطط معك.",
      galleryEyebrow: "أجواء العيادة", galleryTitle: "مكان هادئ من أجل <em>رعاية</em> أفضل",
      galleryDescription: "هذه صور تصميمية؛ استبدلها بصور العيادة الحقيقية قبل النشر.", galleryNote: "طبيعي، نظيف، ومرحب",
      feedbackEyebrow: "آراء المرضى", feedbackTitle: "شعور أفضل في <em>كل</em> زيارة",
      demoFeedback: "ملاحظة: هذه بطاقات تجريبية. استبدلها بآراء حقيقية بعد الموافقة.",
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
      footerCopy: "طب أسنان حديث بثقة ولمسة إنسانية.", quickLinks: "روابط سريعة", backTop: "العودة للأعلى",
      tourEyebrow: "جولة في العيادة", tourTitle: "مكان مصمم للهدوء.", tourText: "هذه صورة تصميمية. يمكنك استبدالها لاحقاً بفيديو حقيقي للعيادة."
    }
  };

  function applyLanguage(language) {
    const html = document.documentElement;
    const dictionary = copy[language];

    html.lang = language;
    html.dir = language === "en" ? "ltr" : "rtl";
    document.title = language === "en" ? "Promed Dental | Modern Dental Clinic" : language === "ar" ? "بروميد لطب الأسنان" : "Promed Dental | پڕۆمید ددانتازی";

    $$("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === language);
    });

    if (dictionary) {
      $$("[data-i18n]").forEach((element) => {
        const text = dictionary[element.dataset.i18n];
        if (text) element.innerHTML = text;
      });

      $$("[data-i18n-placeholder]").forEach((element) => {
        const text = dictionary[element.dataset.i18nPlaceholder];
        if (text) element.placeholder = text;
      });
    }

    if (window.lucide) lucide.createIcons();
    localStorage.setItem("promed-language", language);
  }

  $$("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });

  const storedLanguage = localStorage.getItem("promed-language");
  if (storedLanguage && ["ckb", "ar", "en"].includes(storedLanguage)) applyLanguage(storedLanguage);

  /* Service accordion */
  $$(".service-card").forEach((card) => {
    const button = $(".service-toggle", card);

    button.addEventListener("click", () => {
      const opening = !card.classList.contains("open");

      $$(".service-card").forEach((item) => {
        item.classList.remove("open");
        $(".service-toggle", item).setAttribute("aria-expanded", "false");
      });

      if (opening) {
        card.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

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

  /* Technology image swap */
  function activateTechnology(name) {
    $$(".technology-point").forEach((point) => {
      point.classList.toggle("active", point.dataset.tech === name);
    });

    $$(".technology-image").forEach((image) => {
      image.classList.toggle("active", image.dataset.techImage === name);
    });
  }

  $$(".technology-point").forEach((point) => {
    point.addEventListener("click", () => activateTechnology(point.dataset.tech));
  });

  /* Cursor spotlight: desktop only, disabled for reduced motion */
  const spotlight = $("[data-spotlight]");

  if (spotlight && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    spotlight.addEventListener("pointermove", (event) => {
      const rect = spotlight.getBoundingClientRect();
      spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  }

  /* Accessible modal */
  const modal = $(".tour-modal");
  const openTour = $("[data-open-tour]");
  const closeTour = $("[data-close-tour]");

  openTour.addEventListener("click", () => modal.showModal());
  closeTour.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });

  /* Demo booking form */
  const form = $("#booking-form");
  const formMessage = $(".form-message");

  const dateInput = $('input[type="date"]', form);
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const language = document.documentElement.lang;

    const message = {
      ckb: name ? `سوپاس ${name}، داواکارییەکەت نێردرا. بە زووترین کات پەیوەندیت پێوە دەکەین.` : "سوپاس، داواکارییەکەت نێردرا.",
      ar: name ? `شكراً ${name}، تم إرسال طلبك. سيتواصل معك فريقنا قريباً.` : "تم إرسال طلبك. سيتواصل معك فريقنا قريباً.",
      en: name ? `Thank you, ${name}. Your request was sent; our team will contact you soon.` : "Your request was sent; our team will contact you soon."
    };

    formMessage.textContent = message[language] || message.ckb;
    form.reset();
  });

  $("#year").textContent = new Date().getFullYear();

  /* GSAP motion */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-copy > *", {
      y: 26,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.1
    });

    gsap.to(".photo-column-a", { yPercent: -16, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(".photo-column-b", { yPercent: 16, duration: 17, ease: "sine.inOut", repeat: -1, yoyo: true });

    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.from(element, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 85%", once: true }
      });
    });

    const scrollFill = $(".scroll-fill");

    if (scrollFill) {
      scrollFill.classList.add("enhanced");

      ScrollTrigger.create({
        trigger: ".story-section",
        start: "top 75%",
        end: "bottom 48%",
        scrub: true,
        onUpdate: (self) => {
          scrollFill.style.setProperty("--fill", `${Math.round(self.progress * 100)}%`);
        }
      });
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 901px)", () => {
      $$(".technology-point").forEach((point) => {
        ScrollTrigger.create({
          trigger: point,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateTechnology(point.dataset.tech),
          onEnterBack: () => activateTechnology(point.dataset.tech)
        });
      });

      gsap.to(".doctor-b .doctor-portrait img", {
        y: -16,
        ease: "none",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });
  }
});
