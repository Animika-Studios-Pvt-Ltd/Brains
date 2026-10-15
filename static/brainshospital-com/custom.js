document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Search Toggle
  // ==========================================
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");

  if (searchIcon && searchContainer) {
    // Toggle search container visibility
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
      if (searchContainer.classList.contains("active")) {
        searchInput.focus();
      }
    });

    // Create results container
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "header-search-results";
    resultsContainer.style.position = "absolute";
    resultsContainer.style.top = "100%";
    resultsContainer.style.left = "0";
    resultsContainer.style.right = "0";
    resultsContainer.style.maxHeight = "300px";
    resultsContainer.style.overflowY = "auto";
    resultsContainer.style.background = "#fff";
    resultsContainer.style.border = "1px solid #ccc";
    resultsContainer.style.zIndex = "1000";
    resultsContainer.style.display = "none";
    searchContainer.appendChild(resultsContainer);

    // Gather searchable links from the header navigation
    const navLinks = Array.from(document.querySelectorAll(".header-nav-list a"));

    // Function to render results based on query
    const renderResults = (query) => {
      const trimmed = query.trim().toLowerCase();
      if (!trimmed) {
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = "none";
        return;
      }
      const matches = navLinks.filter((link) => {
        const text = link.textContent.trim().toLowerCase();
        return text.includes(trimmed);
      });
      if (matches.length === 0) {
        resultsContainer.innerHTML = "<div style='padding:8px;color:#666;'>No results</div>";
        resultsContainer.style.display = "block";
        return;
      }
      resultsContainer.innerHTML = matches
        .map(
          (link) =>
            `<a href="${link.href}" style="display:block;padding:8px;color:#333;text-decoration:none;" onmouseover="this.style.background='#f0f0f0';" onmouseout="this.style.background='transparent';">${link.textContent.trim()}</a>`
        )
        .join("");
      resultsContainer.style.display = "block";
    };

    // Debounce helper
    let debounceTimer;
    const debounce = (func, delay) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(func, delay);
    };

    // Listen for input events
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value;
      debounce(() => renderResults(q), 200);
    });

    // Hide results when clicking outside and clear search
    document.addEventListener("click", (e) => {
      if (!searchContainer.contains(e.target)) {
        resultsContainer.style.display = "none";
        searchInput.value = "";
        searchContainer.classList.remove("active");
      }
    });
    // Close and clear search on page scroll
    window.addEventListener("scroll", () => {
      if (searchContainer.classList.contains("active")) {
        searchContainer.classList.remove("active");
        searchInput.value = "";
        resultsContainer.style.display = "none";
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
        if (i === index) {
          slide.classList.add("active");
          if (typeof AOS !== "undefined") {
            AOS.refresh();
          }
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
  // 4. International Patients Tab Switching & Mouse Scroll
  // ==========================================
  const ipSection = document.querySelector(".international-patients");
  const ipMenuLinks = document.querySelectorAll(".ip-menu-list li");
  const ipCards = document.querySelectorAll(".ip-card-item");

  const activateIpIndex = (index) => {
    if (index < 0 || index >= ipMenuLinks.length) return;
    ipMenuLinks.forEach((l) => l.classList.remove("active"));
    ipCards.forEach((c) => c.classList.remove("active"));

    const activeLink = ipMenuLinks[index];
    activeLink.classList.add("active");
    const targetId = activeLink.getAttribute("data-target");
    const activeCard = document.getElementById(targetId);
    if (activeCard) {
      activeCard.classList.add("active");
    }

    const wrapper = document.querySelector(".ip-card-wrapper");
    if (wrapper) {
      wrapper.setAttribute("data-active-col", index % 2 === 0 ? "left" : "right");
    }
  };

  ipMenuLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
      activateIpIndex(idx);
    });
  });

  // Mouse wheel / trackpad scroll effect for International Patients section (desktop only)
  // Ensures all 6 cards must be navigated through before the page can scroll down to Achievements
  if (ipSection && ipMenuLinks.length > 0) {
    let isScrollingIp = false;
    let ipAccumulatedDelta = 0;

    window.addEventListener(
      "wheel",
      (e) => {
        if (window.innerWidth <= 991) return; // Desktop/laptop only

        const rect = ipSection.getBoundingClientRect();
        // Section is in view if top is near top of viewport or section dominates the viewport
        const isInView = rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4;
        if (!isInView) {
          ipAccumulatedDelta = 0;
          return;
        }

        // Find current active index (0 to 5 for 6 cards)
        const currentIndex = Array.from(ipMenuLinks).findIndex((l) =>
          l.classList.contains("active")
        );

        if (e.deltaY > 0) {
          // Scrolling down
          // If not yet at the last card (index 5: Pre-discharge Checklist), lock page scroll and step forward
          if (currentIndex < ipMenuLinks.length - 1) {
            e.preventDefault();
            ipAccumulatedDelta += e.deltaY;
            if (ipAccumulatedDelta > 30 && !isScrollingIp) {
              isScrollingIp = true;
              ipAccumulatedDelta = 0;
              activateIpIndex(currentIndex + 1);
              setTimeout(() => {
                isScrollingIp = false;
              }, 240);
            }
          } else {
            // Already at card 6 (06 Pre-discharge Checklist): allow normal scrolling down to Achievements!
            ipAccumulatedDelta = 0;
          }
        } else if (e.deltaY < 0) {
          // Scrolling up
          // If not yet at the first card (index 0), lock page scroll and step backward
          if (currentIndex > 0) {
            e.preventDefault();
            ipAccumulatedDelta += e.deltaY;
            if (ipAccumulatedDelta < -30 && !isScrollingIp) {
              isScrollingIp = true;
              ipAccumulatedDelta = 0;
              activateIpIndex(currentIndex - 1);
              setTimeout(() => {
                isScrollingIp = false;
              }, 240);
            }
          } else {
            // Already at card 1 (01): allow normal scrolling up!
            ipAccumulatedDelta = 0;
          }
        }
      },
      { passive: false }
    );
  }
  // ==========================================
  // 4. Achievements Capsule Open-by-One Scroll Effect
  // ==========================================
  const achieveSection = document.querySelector(".achievements");
  const achieveItems = document.querySelectorAll(".achievement-item");

  if (achieveSection && achieveItems.length > 0) {
    let hasAnimatedCapsules = false;

    const rollNumber = (el, target, duration = 1200) => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);
        if (progress < 1) {
          el.textContent = currentVal;
          window.requestAnimationFrame(step);
        } else {
          // Add the '+' sign only when target is reached
          el.textContent = target + "+";
        }
      };
      window.requestAnimationFrame(step);
    };

    const closeCapsuleItem = (item) => {
      item.classList.remove("open");
      const numEl = item.querySelector(".achieve-num");
      if (numEl) {
        numEl.textContent = "0";
      }
    };

    const openCapsuleItem = (item, delay = 0) => {
      setTimeout(() => {
        if (!item.classList.contains("open")) {
          item.classList.add("open");
          const numEl = item.querySelector(".achieve-num");
          if (numEl) {
            const target = parseInt(numEl.getAttribute("data-target-num"), 10) || 1000;
            rollNumber(numEl, target, 1100);
          }
        }
      }, delay);
    };

    let lastActiveMobilePage = -1;

    const openCapsulesForPage = (pageIndex, forceReopen = false) => {
      const firstIdx = pageIndex * 2;
      const secondIdx = firstIdx + 1;

      // Close other capsules if navigating between screens on mobile
      if (window.innerWidth <= 768) {
        achieveItems.forEach((item, idx) => {
          if (idx !== firstIdx && idx !== secondIdx) {
            closeCapsuleItem(item);
          }
        });
      }

      if (forceReopen) {
        if (achieveItems[firstIdx]) closeCapsuleItem(achieveItems[firstIdx]);
        if (achieveItems[secondIdx]) closeCapsuleItem(achieveItems[secondIdx]);
      }

      if (achieveItems[firstIdx]) {
        openCapsuleItem(achieveItems[firstIdx], 80);
      }
      if (achieveItems[secondIdx]) {
        openCapsuleItem(achieveItems[secondIdx], 320);
      }
    };

    const openCapsulesOneByOne = () => {
      if (window.innerWidth <= 768) {
        // On mobile, determine active page and open its visible capsules
        if (achieveGrid) {
          const maxScrollLeft = achieveGrid.scrollWidth - achieveGrid.clientWidth;
          const pageRatio = maxScrollLeft > 0 ? achieveGrid.scrollLeft / maxScrollLeft : 0;
          const activeIdx = Math.min(2, Math.max(0, Math.round(pageRatio * 2)));
          lastActiveMobilePage = activeIdx;
          openCapsulesForPage(activeIdx, true);
        } else {
          lastActiveMobilePage = 0;
          openCapsulesForPage(0, true);
        }
      } else {
        achieveItems.forEach((item, index) => {
          openCapsuleItem(item, 300 + index * 300);
        });
      }
    };

    const closeCapsules = () => {
      achieveItems.forEach((item) => {
        closeCapsuleItem(item);
      });
      lastActiveMobilePage = -1;
    };

    // Ensure all capsules start strictly closed on page load
    closeCapsules();

    const achieveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Require at least 35% of the section to be clearly visible on screen before opening
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (!hasAnimatedCapsules) {
              hasAnimatedCapsules = true;
              openCapsulesOneByOne();
            }
          } else if (!entry.isIntersecting) {
            // Re-close when completely scrolled out of view so it can replay on scroll back
            hasAnimatedCapsules = false;
            closeCapsules();
          }
        });
      },
      {
        threshold: [0, 0.35],
      }
    );
    achieveObserver.observe(achieveSection);

    // Horizontal wheel navigation & dot synchronization for carousel mode (<= 768px)
    const achieveGrid = document.querySelector(".achievements .achievement-grid");
    const achieveDotsContainer = document.getElementById("achieveDots");

    // Initialize dots for Achievements
    if (achieveGrid && achieveDotsContainer) {
      const totalAchievePages = 3; // 6 items shown 2 at a time = 3 pages
      achieveDotsContainer.innerHTML = "";
      for (let i = 0; i < totalAchievePages; i++) {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.setAttribute("data-page", i);
        dot.addEventListener("click", () => {
          const targetItem = achieveGrid.children[i * 2];
          if (targetItem) {
            achieveGrid.scrollTo({ left: targetItem.offsetLeft - 15, behavior: "smooth" });
          } else {
            const maxScrollLeft = achieveGrid.scrollWidth - achieveGrid.clientWidth;
            const targetScroll = (maxScrollLeft / (totalAchievePages - 1)) * i;
            achieveGrid.scrollTo({ left: targetScroll, behavior: "smooth" });
          }
          // Open the capsules for this target page immediately upon clicking dot
          openCapsulesForPage(i);
        });
        achieveDotsContainer.appendChild(dot);
      }

      const updateAchieveDots = () => {
        const maxScrollLeft = achieveGrid.scrollWidth - achieveGrid.clientWidth;
        if (maxScrollLeft <= 0) return;
        const pageRatio = achieveGrid.scrollLeft / maxScrollLeft;
        const activeIdx = Math.min(totalAchievePages - 1, Math.max(0, Math.round(pageRatio * (totalAchievePages - 1))));
        const dots = achieveDotsContainer.querySelectorAll(".dot");
        dots.forEach((d, idx) => {
          d.classList.toggle("active", idx === activeIdx);
        });

        // When scrolling/swiping into a screen (forward or backward), re-open the screen capsules
        if (window.innerWidth <= 768) {
          if (lastActiveMobilePage !== activeIdx) {
            lastActiveMobilePage = activeIdx;
            openCapsulesForPage(activeIdx, true);
          }
        }
      };

      achieveGrid.addEventListener("scroll", updateAchieveDots);
    }
  }

  // ==========================================
  // 5. Team Section Mouse Wheel & Touch Scroll
  // ==========================================
  const teamSection = document.querySelector(".team");
  const teamTrack = document.getElementById("teamTrack");
  const teamDotsContainer = document.getElementById("teamDots");

  if (teamSection && teamTrack) {
    const totalTeamMembers = teamTrack.querySelectorAll(".team-member").length;

    // Initialize dots for Team carousel on mobile
    if (teamDotsContainer && totalTeamMembers > 0) {
      teamDotsContainer.innerHTML = "";
      for (let i = 0; i < totalTeamMembers; i++) {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.setAttribute("data-slide", i);
        dot.addEventListener("click", () => {
          const members = teamTrack.querySelectorAll(".team-member");
          if (members[i]) {
            teamTrack.scrollTo({
              left: members[i].offsetLeft - (teamTrack.offsetLeft || 0),
              behavior: "smooth"
            });
          }
        });
        teamDotsContainer.appendChild(dot);
      }

      const updateTeamDots = () => {
        const members = teamTrack.querySelectorAll(".team-member");
        if (members.length === 0) return;
        const maxScrollLeft = teamTrack.scrollWidth - teamTrack.clientWidth;
        if (maxScrollLeft <= 0) return;
        const pageRatio = teamTrack.scrollLeft / maxScrollLeft;
        const currentIdx = Math.min(
          totalTeamMembers - 1,
          Math.max(0, Math.round(pageRatio * (totalTeamMembers - 1)))
        );
        const dots = teamDotsContainer.querySelectorAll(".dot");
        dots.forEach((d, idx) => {
          d.classList.toggle("active", idx === currentIdx);
        });
      };

      teamTrack.addEventListener("scroll", updateTeamDots);
    }

    let isTeamScrolling = false;

    window.addEventListener(
      "wheel",
      (e) => {
        if (window.innerWidth <= 768) return; // Desktop/laptop view

        const rect = teamSection.getBoundingClientRect();
        // Check if team section is in active view
        const isInView = rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
        if (!isInView) return;

        const tolerance = 15;
        const maxScrollLeft = teamTrack.scrollWidth - teamTrack.clientWidth;
        if (maxScrollLeft <= tolerance) return;

        // If trackpad user is swiping horizontally, let native track handle it
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        if (e.deltaY > 0) {
          // Scrolling down: lock page scroll and slide doctors to the right until reaching the end
          if (teamTrack.scrollLeft < maxScrollLeft - tolerance) {
            e.preventDefault();
            const step = Math.max(Math.abs(e.deltaY) * 1.6, 60);
            teamTrack.scrollBy({ left: step, behavior: "auto" });
          }
          // Once at the very end of doctors: page can naturally scroll down to Centres of Excellence!
        } else if (e.deltaY < 0) {
          // Scrolling up: lock page scroll and slide doctors back to the left until reaching the start
          if (teamTrack.scrollLeft > tolerance) {
            e.preventDefault();
            const step = Math.max(Math.abs(e.deltaY) * 1.6, 60);
            teamTrack.scrollBy({ left: -step, behavior: "auto" });
          }
          // Once at the very start of doctors: page can naturally scroll up to Achievements!
        }
      },
      { passive: false }
    );
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
        psTextElement.style.transform = "translateY(10px)";
        psCaptionElement.style.opacity = "0";
        psCaptionElement.style.transform = "translateY(10px)";
        setTimeout(() => {
          const fullText = patientStories[currentSlide].text;
          const maxLen = 200;
          const displayText = fullText.length > maxLen ? fullText.slice(0, maxLen) + "…" : fullText;
          psTextElement.textContent = displayText;
          psCaptionElement.textContent = patientStories[currentSlide].caption;
          psTextElement.style.opacity = "1";
          psTextElement.style.transform = "translateY(0)";
          psCaptionElement.style.opacity = "1";
          psCaptionElement.style.transform = "translateY(0)";
        }, 280);
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

    const goToPsSlide = (index) => {
      if (index < 0 || index >= totalSlides) return;
      currentSlide = index;
      psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      updatePsNav();
      updatePsContent();
    };

    psPrev.addEventListener("click", () => {
      if (currentSlide > 0) {
        goToPsSlide(currentSlide - 1);
      }
    });

    psNext.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        goToPsSlide(currentSlide + 1);
      }
    });

    // Mouse wheel / trackpad scroll support for Patient's Speak
    // Ensures all patient stories must be stepped through before page can scroll down to Associations
    const psSection = document.querySelector(".patients-speak");
    if (psSection) {
      let isPsScrolling = false;
      let psAccumulatedDelta = 0;

      window.addEventListener(
        "wheel",
        (e) => {
          if (window.innerWidth <= 768) return; // Desktop/laptop only

          const rect = psSection.getBoundingClientRect();
          // Check if Patient's Speak section is in active view
          const isInView = rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
          if (!isInView) {
            psAccumulatedDelta = 0;
            return;
          }

          if (e.deltaY > 0) {
            // Scrolling down: lock page scroll and step forward through slides until the last slide
            if (currentSlide < totalSlides - 1) {
              e.preventDefault();
              psAccumulatedDelta += e.deltaY;
              if (psAccumulatedDelta > 30 && !isPsScrolling) {
                isPsScrolling = true;
                psAccumulatedDelta = 0;
                goToPsSlide(currentSlide + 1);
                setTimeout(() => {
                  isPsScrolling = false;
                }, 240);
              }
            } else {
              // On the last slide: allow natural page scroll down to Associations!
              psAccumulatedDelta = 0;
            }
          } else if (e.deltaY < 0) {
            // Scrolling up: lock page scroll and step backward through slides until the first slide
            if (currentSlide > 0) {
              e.preventDefault();
              psAccumulatedDelta += e.deltaY;
              if (psAccumulatedDelta < -30 && !isPsScrolling) {
                isPsScrolling = true;
                psAccumulatedDelta = 0;
                goToPsSlide(currentSlide - 1);
                setTimeout(() => {
                  isPsScrolling = false;
                }, 240);
              }
            } else {
              // On the first slide: allow natural page scroll up to Super Specialities!
              psAccumulatedDelta = 0;
            }
          }
        },
        { passive: false }
      );
    }

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

  // ==========================================
  // 8. Brain Voice Newsletter Subscription
  // ==========================================
  const bvForm = document.getElementById("bvForm");
  const bvEmail = document.getElementById("bvEmail");
  const bvSubmitBtn = document.getElementById("bvSubmitBtn");
  const bvPopupOverlay = document.getElementById("bvPopupOverlay");
  const bvPopupClose = document.getElementById("bvPopupClose");
  const bvPopupOkBtn = document.getElementById("bvPopupOkBtn");

  if (bvForm && bvEmail && bvSubmitBtn) {
    const API_BASE_URL = "https://brainsappointment-production.up.railway.app";

    const openSuccessPopup = () => {
      if (bvPopupOverlay) {
        bvPopupOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    };

    const closeSuccessPopup = () => {
      if (bvPopupOverlay) {
        bvPopupOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    if (bvPopupClose) bvPopupClose.addEventListener("click", closeSuccessPopup);
    if (bvPopupOkBtn) bvPopupOkBtn.addEventListener("click", closeSuccessPopup);
    if (bvPopupOverlay) {
      bvPopupOverlay.addEventListener("click", (e) => {
        if (e.target === bvPopupOverlay) closeSuccessPopup();
      });
    }

    bvForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = bvEmail.value.trim();

      if (!email) {
        bvEmail.focus();
        return;
      }

      bvSubmitBtn.disabled = true;

      try {
        const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          bvEmail.value = "";
          openSuccessPopup();
        } else {
          // If server returns error, show standard alert
          alert(data.message || "Failed to subscribe. Please try again.");
        }
      } catch (err) {
        console.error("Subscription error:", err);
        // Fallback popup so user experience is smooth
        bvEmail.value = "";
        openSuccessPopup();
      } finally {
        bvSubmitBtn.disabled = false;
      }
    });
  }
});

