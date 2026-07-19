document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.lucide) lucide.createIcons();

  /* Scroll progress and header */
  const header = $(".site-header");
  const progressBar = $(".scroll-progress span");

  function updatePageScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
  }

  updatePageScroll();
  window.addEventListener("scroll", updatePageScroll, { passive: true });

  /* Mobile menu */
  const menuButton = $(".menu-toggle");
  const nav = $(".main-nav");

  function setMobileMenu(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    lucide.createIcons();
  }

  menuButton.addEventListener("click", () => setMobileMenu(!nav.classList.contains("open")));
  $$(".main-nav a").forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });

  /* Language menu */
  const languageMenu = $(".language-menu");
  const languageCurrent = $(".language-current");

  languageCurrent.addEventListener("click", () => {
    const open = languageMenu.classList.toggle("open");
    languageCurrent.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!languageMenu.contains(event.target)) {
      languageMenu.classList.remove("open");
      languageCurrent.setAttribute("aria-expanded", "false");
    }
  });

  /*
    One i18n object. Add future strings here, then put the matching key
    in HTML as data-i18n="key".
  */
  const i18n = {
    en: {
      navServices:"Services", navTechnology:"Technology", navTeam:"Our team", navFaq:"FAQ",
      bookNow:"Book now", heroEyebrow:"Modern dental clinic in Erbil",
      heroWordOne:"Confident smiles,", heroWordTwo:"gentle care —", heroWordThree:"every day in Erbil.",
      heroDescription:"Modern technology, experienced dentists, and a calm environment for your dental health.",
      heroServices:"Services", heroLocation:"Our location", heroNote:"Clean, safe, and thoughtful care",
      trustOne:"Modern equipment", trustTwo:"Sterile and safe", trustThree:"Kurdish, Arabic, and English staff", trustFour:"Central Erbil location",
      storyEyebrow:"Human-centered care", storyTitle:"Great dentistry is not only treatment; it is calm, listening, and building trust.",
      filmCaption:"See how our team welcomes every visit", unmute:"Turn sound on",
      servicesEyebrow:"Services", servicesTitle:"Everything for a <em>healthy</em> smile", servicesText:"Every treatment plan begins with your needs, comfort, and questions.",
      generalCare:"General care", generalDetail:"Check-ups, cleaning, and everyday prevention.",
      cosmeticCare:"Cosmetic dentistry", cosmeticDetail:"Whitening, bonding, and natural-looking veneers.",
      orthoCare:"Orthodontics", orthoDetail:"Braces and clear aligners for a balanced smile.",
      implantCare:"Dental implants", implantDetail:"A strong, natural-feeling option for missing teeth.",
      rootCare:"Root canal care", rootDetail:"Precise care to preserve your natural tooth.",
      kidsCare:"Children's dentistry", kidsDetail:"A calm, friendly visit for younger patients.", bookThis:"Book this service",
      technologyEyebrow:"Why Promed?", technologyTitle:"Technology precision, <em>gentle</em> care",
      techOne:"Digital and 3D imaging", techOneText:"A clearer picture before treatment.",
      techTwo:"Gentle clinical care", techTwoText:"Step by step, with time to listen.",
      techThree:"A clear treatment plan", techThreeText:"A transparent conversation about every next step.",
      techFour:"Easy to reach", techFourText:"Conveniently located in central Erbil.",
      techCaption:"Modern technology for clearer decisions",
      teamEyebrow:"Our team", teamTitle:"The doctors behind <em>your</em> smile", teamText:"A team that listens, explains, and plans with you.",
      doctorOneRole:"General and cosmetic dentistry", doctorTwoRole:"Implant and oral surgery", doctorThreeRole:"Orthodontics and children's dentistry",
      calmEyebrow:"A calm place", calmTitle:"When you feel calm, <em>care</em> gets better.", calmText:"From first contact to the final check-up, we make time to listen and explain.",
      reviewEyebrow:"Patient feedback", reviewTitle:"A better feeling at <em>every</em> visit", demoNote:"Note: these are sample review cards. Replace them with real, consented feedback before publishing.",
      reviewOne:"“Every step was explained calmly and clearly.”", reviewTwo:"“The clinic feels peaceful and the team is welcoming.”", reviewThree:"“The treatment plan was explained around my needs.”", sampleReview:"— Sample feedback",
      faqEyebrow:"Common questions", faqTitle:"Have a question? <em>We are</em> here.", faqText:"For anything else, contact the team directly.", contactUs:"Contact us",
      faqQ1:"Is treatment painful?", faqA1:"Your comfort is considered at every stage of the treatment plan.",
      faqQ2:"Do you accept walk-ins?", faqA2:"For urgent situations, please contact us first to confirm availability.",
      faqQ3:"How do I book?", faqA3:"Complete the form below or contact the clinic directly.",
      faqQ4:"Which languages do you speak?", faqA4:"Our team welcomes you in Kurdish, Arabic, and English.",
      faqQ5:"Do you treat children?", faqA5:"Yes. We provide calm, age-appropriate care for children.",
      bookingEyebrow:"Book an appointment", bookingTitle:"Let’s take the first step toward <em>your smile.</em>", bookingText:"Complete the form and our team will contact you.",
      whatsapp:"WhatsApp", callUs:"Call us", formName:"Full name", namePlaceholder:"Write your name", formPhone:"Phone number", formService:"Your service",
      formSelect:"Choose a service", formDate:"Preferred date", formTime:"Preferred time", formNote:"Notes", notePlaceholder:"Tell us anything useful...", formSubmit:"Send appointment request",
      contactEyebrow:"Contact", contactTitle:"Welcome to <em>Promed</em>", contactText:"We are nearby whenever you are ready to visit.",
      address:"Address", addressText:"Erbil, Kurdistan Region, Iraq", email:"Email", hours:"Opening hours", weekday:"Saturday–Thursday", friday:"Friday", byAppointment:"By appointment",
      directions:"Directions", footerText:"Modern dentistry with confidence and a human touch.", quickLinks:"Quick links", backTop:"Back to top"
    },

    ar: {
      navServices:"الخدمات", navTechnology:"التقنية", navTeam:"فريقنا", navFaq:"الأسئلة",
      bookNow:"احجز موعداً", heroEyebrow:"عيادة أسنان حديثة في أربيل",
      heroWordOne:"ابتسامات واثقة،", heroWordTwo:"رعاية لطيفة —", heroWordThree:"كل يوم في أربيل.",
      heroDescription:"تقنية حديثة وأطباء ذوو خبرة وبيئة هادئة لصحة أسنانك.",
      heroServices:"الخدمات", heroLocation:"موقعنا", heroNote:"رعاية نظيفة وآمنة ومدروسة",
      trustOne:"معدات حديثة", trustTwo:"بيئة آمنة ومعقمة", trustThree:"فريق بالكردية والعربية والإنجليزية", trustFour:"موقع مركزي في أربيل",
      storyEyebrow:"رعاية إنسانية", storyTitle:"طب الأسنان الجيد ليس علاجاً فقط؛ بل هدوء واستماع وبناء ثقة.",
      filmCaption:"شاهد كيف يرحب بك فريقنا", unmute:"تشغيل الصوت",
      servicesEyebrow:"الخدمات", servicesTitle:"كل ما تحتاجه من أجل <em>ابتسامة صحية</em>", servicesText:"كل خطة علاج تبدأ من احتياجاتك وراحتك وأسئلتك.",
      generalCare:"العناية العامة", generalDetail:"فحص وتنظيف ووقاية يومية.",
      cosmeticCare:"تجميل الأسنان", cosmeticDetail:"تبييض وتجميل وتركيبات بشكل طبيعي.",
      orthoCare:"تقويم الأسنان", orthoDetail:"تقويم وشفافات للأسنان لابتسامة متوازنة.",
      implantCare:"زراعة الأسنان", implantDetail:"خيار قوي وطبيعي للأسنان المفقودة.",
      rootCare:"علاج الجذور", rootDetail:"عناية دقيقة للحفاظ على الأسنان الطبيعية.",
      kidsCare:"أسنان الأطفال", kidsDetail:"زيارة هادئة ولطيفة للمرضى الصغار.", bookThis:"احجز هذه الخدمة",
      technologyEyebrow:"لماذا Promed؟", technologyTitle:"دقة التقنية، <em>ولطف</em> الرعاية",
      techOne:"تصوير رقمي وثلاثي الأبعاد", techOneText:"صورة أوضح قبل العلاج.",
      techTwo:"رعاية لطيفة", techTwoText:"خطوة بخطوة، مع وقت للاستماع.",
      techThree:"خطة علاج واضحة", techThreeText:"حديث واضح عن كل خطوة قادمة.",
      techFour:"سهل الوصول", techFourText:"في موقع مريح وسط أربيل.",
      techCaption:"تقنية حديثة لقرارات أوضح",
      teamEyebrow:"فريقنا", teamTitle:"الأطباء خلف <em>ابتسامتك</em>", teamText:"فريق يستمع ويشرح ويخطط معك.",
      doctorOneRole:"طب الأسنان العام والتجميلي", doctorTwoRole:"زراعة وجراحة الفم", doctorThreeRole:"تقويم وأسنان الأطفال",
      calmEyebrow:"مكان هادئ", calmTitle:"عندما تشعر بالهدوء، تصبح <em>الرعاية</em> أفضل.", calmText:"من أول تواصل حتى الفحص الأخير، نمنح وقتاً للاستماع والشرح.",
      reviewEyebrow:"آراء المرضى", reviewTitle:"شعور أفضل في <em>كل</em> زيارة", demoNote:"ملاحظة: هذه بطاقات تجريبية. استبدلها بآراء حقيقية بعد الموافقة.",
      reviewOne:"“تم شرح كل خطوة بهدوء ووضوح.”", reviewTwo:"“العيادة هادئة والفريق مرحب.”", reviewThree:"“تم شرح خطة العلاج حسب احتياجاتي.”", sampleReview:"— رأي تجريبي",
      faqEyebrow:"أسئلة شائعة", faqTitle:"لديك سؤال؟ <em>نحن</em> هنا.", faqText:"لأي سؤال آخر، تواصل مع الفريق مباشرة.", contactUs:"تواصل معنا",
      faqQ1:"هل العلاج مؤلم؟", faqA1:"راحتك جزء أساسي من كل مرحلة في خطة العلاج.",
      faqQ2:"هل تقبلون الزيارات دون موعد؟", faqA2:"للحالات العاجلة، يرجى الاتصال أولاً لتأكيد التوفر.",
      faqQ3:"كيف أحجز؟", faqA3:"املأ النموذج أدناه أو تواصل مع العيادة مباشرة.",
      faqQ4:"ما اللغات التي تتحدثون بها؟", faqA4:"يرحب بكم فريقنا بالكردية والعربية والإنجليزية.",
      faqQ5:"هل تعالجون الأطفال؟", faqA5:"نعم، نقدم رعاية هادئة ومناسبة للأطفال.",
      bookingEyebrow:"احجز موعداً", bookingTitle:"لنأخذ الخطوة الأولى نحو <em>ابتسامتك.</em>", bookingText:"املأ النموذج وسيتواصل معك فريقنا.",
      whatsapp:"واتساب", callUs:"اتصل بنا", formName:"الاسم الكامل", namePlaceholder:"اكتب اسمك", formPhone:"رقم الهاتف", formService:"الخدمة المطلوبة",
      formSelect:"اختر خدمة", formDate:"التاريخ المفضل", formTime:"الوقت المفضل", formNote:"ملاحظات", notePlaceholder:"اكتب أي معلومات مفيدة...", formSubmit:"أرسل طلب الموعد",
      contactEyebrow:"تواصل", contactTitle:"أهلاً بك في <em>Promed</em>", contactText:"نحن قريبون منك عندما تكون مستعداً للزيارة.",
      address:"العنوان", addressText:"أربيل، إقليم كردستان، العراق", email:"البريد الإلكتروني", hours:"أوقات العمل", weekday:"السبت–الخميس", friday:"الجمعة", byAppointment:"بموعد",
      directions:"الاتجاهات", footerText:"طب أسنان حديث بثقة ولمسة إنسانية.", quickLinks:"روابط سريعة", backTop:"العودة للأعلى"
    }
  };

  function setLanguage(language) {
    const html = document.documentElement;
    const translation = i18n[language];

    html.lang = language;
    html.dir = language === "en" ? "ltr" : "rtl";
    document.title = language === "en" ? "Promed Dental | Modern Dental Clinic" : language === "ar" ? "بروميد لطب الأسنان" : "Promed Dental | پڕۆمید ددانتازی";

    $$(".language-options button").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === language);
    });

    const names = { ckb: "کوردی", ar: "عربي", en: "English" };
    $(".language-current span").textContent = names[language];

    if (translation) {
      $$("[data-i18n]").forEach((element) => {
        const text = translation[element.dataset.i18n];
        if (text) element.innerHTML = text;
      });

      $$("[data-i18n-placeholder]").forEach((element) => {
        const text = translation[element.dataset.i18nPlaceholder];
        if (text) element.placeholder = text;
      });
    }

    localStorage.setItem("promed-language", language);
    if (window.lucide) lucide.createIcons();
  }

  $$(".language-options button").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
      languageMenu.classList.remove("open");
      languageCurrent.setAttribute("aria-expanded", "false");
    });
  });

  const storedLanguage = localStorage.getItem("promed-language");
  if (storedLanguage && ["ckb", "ar", "en"].includes(storedLanguage)) setLanguage(storedLanguage);

  /* Talking video */
  const clinicVideo = $(".clinic-video");
  const soundButton = $(".sound-toggle");

  function tryPlay(video) {
    video.play().catch(() => {});
  }

  tryPlay(clinicVideo);

  soundButton.addEventListener("click", () => {
    clinicVideo.muted = !clinicVideo.muted;
    tryPlay(clinicVideo);

    const on = !clinicVideo.muted;
    soundButton.setAttribute("aria-pressed", String(on));
    soundButton.innerHTML = on
      ? '<i data-lucide="volume-2"></i><span>دەنگ داخراوە</span>'
      : '<i data-lucide="volume-x"></i><span>دەنگ بکرێتەوە</span>';

    lucide.createIcons();
  });

  /* FAQ */
  $$(".faq-item").forEach((item) => {
    const button = $("button", item);

    button.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("open");

      $$(".faq-item").forEach((faq) => {
        faq.classList.remove("open");
        $("button", faq).setAttribute("aria-expanded", "false");
      });

      if (shouldOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* +964 mask */
  const phone = $(".phone-input");

  phone.addEventListener("focus", () => {
    if (!phone.value.startsWith("+964")) phone.value = "+964 ";
  });

  phone.addEventListener("input", () => {
    const digits = phone.value.replace(/\D/g, "").replace(/^964/, "").slice(0, 10);
    phone.value = `+964 ${digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim()}`;
  });

  /* Demo booking form: replace with Supabase submission */
  const bookingForm = $("#booking-form");
  const formMessage = $(".form-message");
  const dateInput = $('input[type="date"]', bookingForm);
  dateInput.min = new Date().toISOString().split("T")[0];

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const language = document.documentElement.lang;
    const name = bookingForm.elements.name.value.trim();

    const messages = {
      ckb: `سوپاس ${name || ""}، داواکارییەکەت نێردرا. بە زووترین کات پەیوەندیت پێوە دەکەین.`,
      ar: `شكراً ${name || ""}، تم إرسال طلبك. سيتواصل معك فريقنا قريباً.`,
      en: `Thank you ${name || ""}. Your request was sent; our team will contact you soon.`
    };

    formMessage.textContent = messages[language] || messages.ckb;
    bookingForm.reset();
    phone.value = "+964 ";
  });

  $("#year").textContent = new Date().getFullYear();

  /* Magnetic three hero buttons */
  const magneticButtons = $$("[data-magnetic-group] .button");

  magneticButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      magneticButtons.forEach((other) => {
        other.style.transform = other === button ? "scale(1.08)" : "scale(.96)";
      });
    });

    button.addEventListener("mouseleave", () => {
      magneticButtons.forEach((other) => {
        other.style.transform = "";
      });
    });
  });

  /* GSAP / ScrollTrigger */
  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* Hero video scale and headline word motion */
    gsap.to(".hero-video", {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.fromTo(".hero-word",
      { y: 34, opacity: 0.25 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "40% top",
          scrub: true
        }
      }
    );

    gsap.to(".hero-photo-track", {
      yPercent: -28,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    /* Headings move both directions through scroll */
    gsap.utils.toArray(".section-heading, .story-section .eyebrow, .technology-copy > h2, .technology-copy > .eyebrow").forEach((element) => {
      gsap.fromTo(element,
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            end: "top 57%",
            scrub: true
          }
        }
      );
    });

    /* Vertical scroll-fill */
    const scrollFill = $(".scroll-fill");
    scrollFill.classList.add("enhanced");

    ScrollTrigger.create({
      trigger: ".story-section",
      start: "top 72%",
      end: "bottom 42%",
      scrub: true,
      onUpdate: (self) => {
        scrollFill.style.setProperty("--fill", `${Math.round(self.progress * 100)}%`);
      }
    });

    /* Clinic video frame parallax */
    gsap.fromTo(".clinic-film",
      { y: 52, scale: 0.96, opacity: 0.35 },
      {
        y: -12,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".clinic-film-section",
          start: "top 90%",
          end: "bottom 40%",
          scrub: true
        }
      }
    );

    /* Batch stagger fades, reversed when going back upward */
    ScrollTrigger.batch(".trust-item, .service-card, .doctor-card, .faq-item", {
      start: "top 87%",
      onEnter: (items) => gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, overwrite: true }),
      onLeaveBack: (items) => gsap.to(items, { y: 40, opacity: 0, stagger: 0.05, duration: 0.28, overwrite: true })
    });

    /* Pinned technology scroll-swap */
    const technologyImages = $$(".tech-image");
    const technologySteps = $$(".technology-step");

    function setTechnologyStep(index) {
      technologyImages.forEach((image, imageIndex) => image.classList.toggle("active", imageIndex === index));
      technologySteps.forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === index));
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 761px)", () => {
      ScrollTrigger.create({
        trigger: ".technology-section",
        start: "top top",
        end: "+=320%",
        pin: ".technology-pin",
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(3, Math.floor(self.progress * 4));
          setTechnologyStep(index);
        }
      });
    });

    media.add("(max-width: 760px)", () => {
      technologySteps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          end: "bottom 40%",
          onEnter: () => setTechnologyStep(index),
          onEnterBack: () => setTechnologyStep(index)
        });
      });
    });

    /* Scatter collage: tilted photos settle as user scrolls */
    const collage = [
      { selector: ".photo-a", x: -110, y: 45, rotation: -13 },
      { selector: ".photo-b", x: 90, y: -50, rotation: 11 },
      { selector: ".photo-c", x: 60, y: 80, rotation: -9 },
      { selector: ".photo-d", x: 100, y: 32, rotation: 15 }
    ];

    collage.forEach((item) => {
      gsap.fromTo(item.selector,
        { x: item.x, y: item.y, rotation: item.rotation, opacity: 0 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".calm-collage",
            start: "top 88%",
            end: "bottom 42%",
            scrub: true
          }
        }
      );
    });

    /* Extra touches: footer reveal + contact map movement */
    gsap.fromTo(".contact-grid",
      { y: 38, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 82%",
          end: "top 48%",
          scrub: true
        }
      }
    );

    gsap.fromTo(".site-footer",
      { backgroundColor: "#152443" },
      {
        backgroundColor: "#0f1e3d",
        ease: "none",
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top bottom",
          end: "top 55%",
          scrub: true
        }
      }
    );
  }
});
