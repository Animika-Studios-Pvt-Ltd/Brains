function animateValue(e, t, i, o) {
  let n = null,
    a = (r) => {
      n || (n = r);
      let l = Math.min((r - n) / o, 1);
      ((e.innerHTML = Math.floor(l * (i - t) + t) + "+"),
        l < 1 && window.requestAnimationFrame(a));
    };
  window.requestAnimationFrame(a);
}
(AOS.init(),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelectorAll(".count");
    e.forEach((e) => {
      let t = parseInt(e.getAttribute("data-start"), 10),
        i = parseInt(e.getAttribute("data-end"), 10),
        o = parseInt(e.getAttribute("data-duration"), 20);
      ((e.innerHTML = t + "+"), animateValue(e, t, i, o));
    });
  }),
  $(".doctors-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !0,
    autoplaySpeed: 1e3,
    arrows: !0,
    dots: !1,
    adaptiveHeight: !0,
    responsive: [
      {
        breakpoint: 1121,
        settings: {
          slidesToShow: 3,
          adaptiveHeight: !0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: !0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          adaptiveHeight: !0,
        },
      },
    ],
  }));
var $slider = $(".excellence-slider"),
  $paginationNumber = $(".excellence-pagination-number");
function padNumber(e) {
  return e < 10 ? "0" + e : e;
}
($slider.slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: !0,
  autoplaySpeed: 1e3,
  arrows: !0,
  dots: !1,
  adaptiveHeight: !0,
  responsive: [
    {
      breakpoint: 1121,
      settings: {
        slidesToShow: 3,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
  ],
}),
  $slider.on("init reInit afterChange", function (e, t, i) {
    var o = t.currentSlide + 1,
      n = t.slideCount;
    $paginationNumber.text(padNumber(o) + "/" + padNumber(n));
  }),
  $(window).scroll(function () {
    $(this).scrollTop() >= 50
      ? $("#return-to-top").fadeIn(200)
      : $("#return-to-top").fadeOut(200);
  }),
  $("#return-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500,
    );
  }));
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Search Toggle
  // ==========================================
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");

  if (searchIcon && searchContainer) {
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
      if (searchContainer.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  // ==========================================
  // 2. Sidebar Toggle
  // ==========================================
  const hamburger = document.querySelector(".header-hamburger");
  const sidebar = document.getElementById("sidebarMenu");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const sidebarDropdowns = document.querySelectorAll(".header-sidebar-nav-list .header-has-dropdown > a");

  if (hamburger && sidebar && sidebarClose && sidebarOverlay) {
    const closeSidebar = () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      
      // Close all open dropdowns inside the sidebar
      sidebarDropdowns.forEach(link => {
        const parentLi = link.parentElement;
        if (parentLi.classList.contains("active")) {
          parentLi.classList.remove("active");
          const icon = link.querySelector("i");
          if (icon) {
            icon.style.transform = "rotate(0deg)";
          }
        }
      });
    };

    hamburger.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });

    sidebarClose.addEventListener("click", closeSidebar);
    sidebarOverlay.addEventListener("click", closeSidebar);

    window.addEventListener("scroll", () => {
      if (sidebar.classList.contains("active")) {
        closeSidebar();
      }
    });
  }

  // Sidebar Dropdown Toggle
  sidebarDropdowns.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const parentLi = link.parentElement;
      
      // Close all other open dropdowns
      sidebarDropdowns.forEach(otherLink => {
        if (otherLink !== link) {
          const otherParent = otherLink.parentElement;
          if (otherParent.classList.contains("active")) {
            otherParent.classList.remove("active");
            const otherIcon = otherLink.querySelector("i");
            if (otherIcon) {
              otherIcon.style.transform = "rotate(0deg)";
            }
          }
        }
      });

      parentLi.classList.toggle("active");
      
      const icon = link.querySelector("i");
      if (icon) {
        icon.style.transition = "transform 0.3s ease";
        icon.style.transform = parentLi.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });
  // ==========================================
  // 3. Hero Carousel Logic
  // ==========================================
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");
  if (heroSlides.length > 0 && heroPrev && heroNext) {
    let currentHero = 0;
    
    const showHeroSlide = (index) => {
      heroSlides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
        if(i === index) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
      });
      
      // Disable or enable previous button
      if (index === 0) {
        heroPrev.disabled = true;
        heroPrev.style.opacity = "0.4";
        heroPrev.style.cursor = "default";
      } else {
        heroPrev.disabled = false;
        heroPrev.style.opacity = "1";
        heroPrev.style.cursor = "pointer";
      }
      
      // Disable or enable next button
      if (index === heroSlides.length - 1) {
        heroNext.disabled = true;
        heroNext.style.opacity = "0.4";
        heroNext.style.cursor = "default";
      } else {
        heroNext.disabled = false;
        heroNext.style.opacity = "1";
        heroNext.style.cursor = "pointer";
      }
    };

    // Initialize button states on load
    showHeroSlide(currentHero);

    heroPrev.addEventListener("click", () => {
      if (currentHero > 0) {
        currentHero--;
        showHeroSlide(currentHero);
      }
    });

    heroNext.addEventListener("click", () => {
      if (currentHero < heroSlides.length - 1) {
        currentHero++;
        showHeroSlide(currentHero);
      }
    });
  }

  // ==========================================
  // 4. International Patients Tab Switching
  // ==========================================
  const ipMenuLinks = document.querySelectorAll(".ip-menu-list li");
  const ipCards = document.querySelectorAll(".ip-card-item");

  ipMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      ipMenuLinks.forEach((l) => l.classList.remove("active"));
      ipCards.forEach((c) => c.classList.remove("active"));

      link.classList.add("active");
      const targetId = link.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      const allLinks = Array.from(ipMenuLinks);
      const index = allLinks.indexOf(link);
      const wrapper = document.querySelector(".ip-card-wrapper");
      if (wrapper) {
        wrapper.setAttribute("data-active-col", index % 2 === 0 ? "left" : "right");
      }
    });
  });
  // ==========================================
  // 5. Team Carousel Logic
  // ==========================================
  const teamTrack = document.getElementById("teamTrack");
  const teamPrev = document.getElementById("teamPrev");
  const teamNext = document.getElementById("teamNext");

  if (teamTrack && teamPrev && teamNext) {
    const updateTeamNav = () => {
      // Prev button
      if (teamTrack.scrollLeft <= 0) {
        teamPrev.disabled = true;
        teamPrev.style.opacity = "0.4";
        teamPrev.style.cursor = "default";
      } else {
        teamPrev.disabled = false;
        teamPrev.style.opacity = "1";
        teamPrev.style.cursor = "pointer";
      }

      // Next button
      if (teamTrack.scrollLeft + teamTrack.clientWidth >= teamTrack.scrollWidth - 5) {
        teamNext.disabled = true;
        teamNext.style.opacity = "0.4";
        teamNext.style.cursor = "default";
      } else {
        teamNext.disabled = false;
        teamNext.style.opacity = "1";
        teamNext.style.cursor = "pointer";
      }
    };

    // Initialize button states
    setTimeout(updateTeamNav, 100);
    window.addEventListener("resize", updateTeamNav);
    teamTrack.addEventListener("scroll", updateTeamNav);

    teamPrev.addEventListener("click", () => {
      if(!teamPrev.disabled) {
        const itemWidth = teamTrack.firstElementChild.offsetWidth + 20; // item width + gap
        teamTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    });

    teamNext.addEventListener("click", () => {
      if(!teamNext.disabled) {
        const itemWidth = teamTrack.firstElementChild.offsetWidth + 20;
        teamTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    });
  }

  // ==========================================
  // 6. Super Specialities Carousel Logic
  // ==========================================
  const spTrack = document.getElementById("spTrack");
  const spPrev = document.getElementById("spPrev");
  const spNext = document.getElementById("spNext");
  const spCurrentIndex = document.getElementById("spCurrentIndex");

  if (spTrack && spPrev && spNext && spCurrentIndex) {
    let currentItem = 1;
    const totalItems = spTrack.children.length;

    const updateCounter = () => {
      spCurrentIndex.textContent = currentItem;
    };
    
    const updateSpNav = () => {
      // Prev button
      if (spTrack.scrollLeft <= 0) {
        spPrev.disabled = true;
        spPrev.style.opacity = "0.4";
        spPrev.style.cursor = "default";
      } else {
        spPrev.disabled = false;
        spPrev.style.opacity = "1";
        spPrev.style.cursor = "pointer";
      }

      // Next button
      if (spTrack.scrollLeft + spTrack.clientWidth >= spTrack.scrollWidth - 5) {
        spNext.disabled = true;
        spNext.style.opacity = "0.4";
        spNext.style.cursor = "default";
      } else {
        spNext.disabled = false;
        spNext.style.opacity = "1";
        spNext.style.cursor = "pointer";
      }
    };

    // Initialize states
    setTimeout(updateSpNav, 100);
    window.addEventListener("resize", updateSpNav);

    spPrev.addEventListener("click", () => {
      if (!spPrev.disabled) {
        if (currentItem > 1) {
          currentItem--;
        } else {
          currentItem = 1;
        }
        updateCounter();
        const itemWidth = spTrack.firstElementChild.offsetWidth + 50; // item width + gap
        spTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    });

    spNext.addEventListener("click", () => {
      if (!spNext.disabled) {
        if (currentItem < totalItems) {
          currentItem++;
        } else {
          currentItem = totalItems;
        }
        updateCounter();
        const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
        spTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    });

    // Optional: Update counter on manual scroll
    spTrack.addEventListener("scroll", () => {
      updateSpNav();
      const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
      const scrollLeft = spTrack.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth) + 1;
      if (newIndex >= 1 && newIndex <= totalItems) {
        currentItem = newIndex;
        updateCounter();
      }
    });

    // Update active card on hover or click
    const spCards = spTrack.querySelectorAll(".speciality-card");
    spCards.forEach((card) => {
      const activateCard = () => {
        spCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        // Update carousel counter based on active card
        const index = Array.from(spCards).indexOf(card) + 1;
        currentItem = index;
        updateCounter();
      };
      card.addEventListener("mouseenter", activateCard);
      card.addEventListener("click", activateCard);
    });
  }

  // ==========================================
  // 7. Patient's Speak Carousel
  // ==========================================
  const psTrack = document.getElementById("psCarouselTrack");
  const psPrev = document.getElementById("psNavPrev");
  const psNext = document.getElementById("psNavNext");
  const psTextElement = document.querySelector(".ps-circle-text p");
  const psCaptionElement = document.querySelector(".ps-caption");

  const patientStories = [
    { text: "70 year old Muthukumar, a resident of Bangalore, a heart patient, noticed sudden weakness on the right side of his body. He guessed it to be a symptom of a stroke and rushed to the hospital as quickly as possible, within one hour he was at Brains Hospital. He underwent a CT Scan and was diagnosed with a stroke. He was put on clot dissolving medicine and fortunately his stroke got reversed. Muthukumar said: \"I had lost hope, my right side was totally paralyzed. Since I reached the hospital on time, the doctors were able to take immediate action. The doctors consoled me and told me not to worry. The procedure took around 40 minutes, then I got some hope. I was able to walk the next day and carry on my daily routine activities. I am very thankful to the doctors, especially Dr. Venkataramana and all the staff who took care of me very well.\"", caption: "Stroke is reversible. Time is key." },
    { text: "This is the story of a 40-year-old patient of a serious brain disorder called right mesial temporal (RMT) sclerosis. In his own words the patient, Saneerappa A B, who lives on the outskirts of Bangalore, describes how his difficult battle with this serious condition took a dramatic turn for the better after he met Dr N K Venkataramana, the Founder and Chief Neurosurgeon of Brains in December 2016. RMT Sclerosis, also known as Hippocampal sclerosis (HS), leads to serious loss of neuronal cells and causes seizures. Greetings from me and my family to Dr. Venkataramana. I am a resident of Dasarahalli on Tumkur Road, Bangalore City. For eight long and traumatic years I suffered from a serious neurological condition that caused seizures. In this period I consulted several neurologists in and around Bangalore but to no avail. It seemed I had reached a dead‑end with little hope of recovery. In December 2016 the President of the Karnataka Rakshana Veedike, T A Naryan Gowda advised me to consult Dr Venkataramana. On my first visit the doctor examined me clinically and evaluated all my reports, following which he patiently explained the problem. \"You have a problem on the right side of your brain,\" he said. \"But don’t worry, this can be treated with a surgery.\" Initially, the thought of a brain surgery was unnerving, but the doctor gave me the confidence to go through it. I was admitted to the Brains Hospital on January 25, 2017 and operated upon on January 27. During my stay at the hospital I was asked to follow certain instructions which I did religiously. I am now seizure‑free and feeling much better. I am very grateful to Dr. Venkataramana, he is equivalent to god for me.", caption: "Brains has changed my life" },
    { text: "For many months my mother felt constantly tired and had difficulty in even walking, says the daughter of 70‑year‑old Gowramma. An MRI revealed a tumour (tentorial meningioma). She was referred to the world‑renowned neurosurgeon at the Brains Hospital. She was operated upon soon after and recovered completely. Our special thanks to Brains Hospital and its expert teams of neurosurgeons and neurologists led by Dr. Venkataramana for taking care of her so well.", caption: "We are happy because the doctor saved my mother" },
    { text: "\"It has been three months since I was first hit by a terrible head that required surgery. Thanks to Brains and their expert doctors, I am now doing fine.\" 55 year old Syed Ziaulla's son said, \"When we brought him to Brains we had no idea what had led to his terrible condition but thanks to the care at the hospital, my father is now leading a normal life. Indeed, a series of tests revealed a large high‑flow arteriovenous malformation in the left frontal region. He went through surgery and is now fine.\"", caption: "Thanks to Brains and their expert doctors, I am now doing fine." },
    { text: "Being diagnosed with serious brain disease can be nerve‑shattering. Sonia Singh, a mother of a three‑month infant, took the news in stride and remained strong. Dr. N K Venkataramana operated on her at Brains Hospital and she recovered well.", caption: "Thanks to Dr Venkataramana and his team, I am back to normal" },
    { text: "Early cerebral degenerative disease was diagnosed in 46‑year‑old Vishala. After treatment at Brains Hospitals her aggressive behavior reduced, walking improved and she is now able to hold things and walk. She and her husband thank the entire team of doctors.", caption: "We are extremely thankful to the entire team of doctor" }
  ];

  if (psTrack && psPrev && psNext) {
    let currentSlide = 0;
    const totalSlides = psTrack.children.length;

    if (psTextElement) psTextElement.style.transition = "opacity 0.3s ease";
    if (psCaptionElement) psCaptionElement.style.transition = "opacity 0.3s ease";

    const updatePsContent = () => {
      if (psTextElement && psCaptionElement && patientStories[currentSlide]) {
        psTextElement.style.opacity = "0";
        psCaptionElement.style.opacity = "0";
        setTimeout(() => {
          const fullText = patientStories[currentSlide].text;
          const maxLen = 200;
          const displayText = fullText.length > maxLen ? fullText.slice(0, maxLen) + "…" : fullText;
          psTextElement.textContent = displayText;
          psCaptionElement.textContent = patientStories[currentSlide].caption;
          psTextElement.style.opacity = "1";
          psCaptionElement.style.opacity = "1";
        }, 300);
      }
    };

    const updatePsNav = () => {
      // Prev button
      if (currentSlide === 0) {
        psPrev.disabled = true;
        psPrev.style.opacity = "0.4";
        psPrev.style.cursor = "default";
      } else {
        psPrev.disabled = false;
        psPrev.style.opacity = "1";
        psPrev.style.cursor = "pointer";
      }

      // Next button
      if (currentSlide === totalSlides - 1) {
        psNext.disabled = true;
        psNext.style.opacity = "0.4";
        psNext.style.cursor = "default";
      } else {
        psNext.disabled = false;
        psNext.style.opacity = "1";
        psNext.style.cursor = "pointer";
      }
    };

    updatePsNav();

    psPrev.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updatePsNav();
        updatePsContent();
      }
    });

    psNext.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updatePsNav();
        updatePsContent();
      }
    });

    // Move Heading outside circle on Mobile
    const psHeading = document.querySelector(".ps-circle-text h2");
    const psInnerContent = document.querySelector(".ps-inner-content");
    const psCircleBox = document.querySelector(".ps-circle-box");
    const psCircleText = document.querySelector(".ps-circle-text");
    const psParagraph = document.querySelector(".ps-circle-text p");
    const psCircleImg = document.querySelector(".ps-circle-img");

    if (psHeading && psInnerContent && psCircleBox && psCircleText) {
      const handlePsHeading = () => {
        if (window.innerWidth < 767) {
          if (psHeading.parentNode !== psInnerContent) {
            psInnerContent.insertBefore(psHeading, psCircleBox);
            psHeading.style.color = "#144e97";
            psHeading.style.marginBottom = "0px";
            psHeading.style.width = "100%";
          }
          // swap to alternate image for small screens
          if (psCircleImg) {
            psCircleImg.src = "static/brainshospital-com/patients-speak-text-1.webp";
          }
        } else {
          if (psHeading.parentNode !== psCircleText) {
            psCircleText.insertBefore(psHeading, psParagraph);
            psHeading.style.color = "white";
            psHeading.style.marginBottom = "25px";
            psHeading.style.width = "auto";
          }
          // ensure default image for larger screens
          if (psCircleImg) {
            psCircleImg.src = "static/brainshospital-com/patients-speak-text.webp";
          }
        }
      };
      window.addEventListener("resize", handlePsHeading);
      handlePsHeading();
    }
  }
});
