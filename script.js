/**
 * ============================================================================
 * GOLDEN DAYS — INTERACTIVE ENGINE & CINEMATIC CONTROLLER (script.js)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Members from Store
  let allMembers = window.GoldenDaysStore.getMembers();
  let currentIndex = 0;
  let autoPlayTimer = null;
  let progressInterval = null;
  let isAutoPlaying = false;
  const AUTO_PLAY_DURATION = 5500; // 5.5 seconds per member

  // 2. DOM Elements
  const introOverlay = document.getElementById("introOverlay");
  const enterBtn = document.getElementById("enterBtn");
  const mainApp = document.getElementById("mainApp");

  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicIconOn = document.getElementById("musicIconOn");
  const musicIconOff = document.getElementById("musicIconOff");
  let isMusicPlaying = false;

  const spotlightCard = document.getElementById("spotlightCard");
  const spotAvatar = document.getElementById("spotAvatar");
  const spotIndex = document.getElementById("spotIndex");
  const spotName = document.getElementById("spotName");
  const spotHandle = document.getElementById("spotHandle");
  const spotBio = document.getElementById("spotBio");
  const spotInstaBtn = document.getElementById("spotInstaBtn");

  const prevMemberBtn = document.getElementById("prevMemberBtn");
  const nextMemberBtn = document.getElementById("nextMemberBtn");
  const autoPlayBtn = document.getElementById("autoPlayBtn");
  const autoPlayIcon = document.getElementById("autoPlayIcon");
  const autoPlayText = document.getElementById("autoPlayText");
  const autoplayProgressBar = document.getElementById("autoplayProgressBar");

  const membersGalleryGrid = document.getElementById("membersGalleryGrid");
  const memberSearchInput = document.getElementById("memberSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const noSearchResults = document.getElementById("noSearchResults");
  const totalMembersCount = document.getElementById("totalMembersCount");

  const liveClock = document.getElementById("liveClock");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const backToTopBtn = document.getElementById("backToTopBtn");

  // ==========================================================================
  // A. CINEMATIC INTRO TRANSITION & OPTIONAL AUDIO START
  // ==========================================================================
  enterBtn.addEventListener("click", () => {
    introOverlay.classList.add("fade-out");
    mainApp.classList.remove("hidden-app");

    // Attempt optional background music after user gesture
    if (bgMusic) {
      bgMusic.volume = 0.45;
      bgMusic.play()
        .then(() => {
          isMusicPlaying = true;
          updateMusicUI();
        })
        .catch(() => {
          // Audio file not uploaded yet or blocked by browser policy
          isMusicPlaying = false;
          updateMusicUI();
        });
    }

    setTimeout(() => {
      introOverlay.style.display = "none";
    }, 950);
  });

  // Music Toggle Control
  function updateMusicUI() {
    if (isMusicPlaying) {
      musicIconOn.classList.remove("hidden");
      musicIconOff.classList.add("hidden");
    } else {
      musicIconOn.classList.add("hidden");
      musicIconOff.classList.remove("hidden");
    }
  }

  musicToggleBtn.addEventListener("click", () => {
    if (!bgMusic) return;
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      updateMusicUI();
    } else {
      bgMusic.play()
        .then(() => {
          isMusicPlaying = true;
          updateMusicUI();
        })
        .catch(() => {
          alert("Ambient music file not found. Upload an MP3 file named 'bg-music.mp3' inside the 'assets/' folder to enable music.");
        });
    }
  });

  // ==========================================================================
  // B. SPOTLIGHT MEMBER RENDERER (WITH SMOOTH TRANSITION)
  // ==========================================================================
  function padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  function renderSpotlight(index, animate = true) {
    if (!allMembers.length) return;

    currentIndex = (index + allMembers.length) % allMembers.length;
    const member = allMembers[currentIndex];
    const cleanUser = window.GoldenDaysStore.sanitizeUsername(member.username);

    const applyData = () => {
      spotName.textContent = member.name;
      spotHandle.textContent = `@${cleanUser}`;
      spotBio.textContent = member.bio;
      spotIndex.textContent = `MEMBER ${padZero(currentIndex + 1)} / ${padZero(allMembers.length)}`;
      spotInstaBtn.href = `https://www.instagram.com/${encodeURIComponent(cleanUser)}/`;

      spotAvatar.onerror = () => {
        spotAvatar.onerror = null;
        spotAvatar.src = createFallbackDP(member.name);
      };
      spotAvatar.src = member.avatar || createFallbackDP(member.name);
      spotAvatar.alt = `${member.name} (@${cleanUser})`;

      // Highlight active card in gallery
      document.querySelectorAll(".gallery-card").forEach(card => {
        card.classList.toggle("active-spotlight-card", Number(card.dataset.index) === currentIndex);
      });
    };

    if (animate) {
      spotlightCard.classList.add("transition-out");
      setTimeout(() => {
        applyData();
        spotlightCard.classList.remove("transition-out");
      }, 280);
    } else {
      applyData();
    }
  }

  prevMemberBtn.addEventListener("click", () => {
    renderSpotlight(currentIndex - 1, true);
    if (isAutoPlaying) resetAutoPlayTimer();
  });

  nextMemberBtn.addEventListener("click", () => {
    renderSpotlight(currentIndex + 1, true);
    if (isAutoPlaying) resetAutoPlayTimer();
  });

  // Keyboard Arrow Navigation
  document.addEventListener("keydown", (e) => {
    if (document.activeElement === memberSearchInput) return;
    if (e.key === "ArrowRight") {
      renderSpotlight(currentIndex + 1, true);
      if (isAutoPlaying) resetAutoPlayTimer();
    } else if (e.key === "ArrowLeft") {
      renderSpotlight(currentIndex - 1, true);
      if (isAutoPlaying) resetAutoPlayTimer();
    }
  });

  // ==========================================================================
  // C. AUTOMATIC ONE-BY-ONE PRESENTATION MODE
  // ==========================================================================
  function startAutoPlay() {
    isAutoPlaying = true;
    autoPlayBtn.classList.add("active");
    autoPlayIcon.textContent = "❚❚";
    autoPlayText.textContent = "AUTO SHOWCASE: ON";
    resetAutoPlayTimer();
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    autoPlayBtn.classList.remove("active");
    autoPlayIcon.textContent = "▶";
    autoPlayText.textContent = "AUTO SHOWCASE: OFF";
    clearInterval(autoPlayTimer);
    clearInterval(progressInterval);
    autoplayProgressBar.style.width = "0%";
  }

  function resetAutoPlayTimer() {
    clearInterval(autoPlayTimer);
    clearInterval(progressInterval);
    let elapsed = 0;
    const step = 50;
    autoplayProgressBar.style.width = "0%";

    progressInterval = setInterval(() => {
      elapsed += step;
      const pct = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
      autoplayProgressBar.style.width = `${pct}%`;
    }, step);

    autoPlayTimer = setInterval(() => {
      elapsed = 0;
      renderSpotlight(currentIndex + 1, true);
    }, AUTO_PLAY_DURATION);
  }

  autoPlayBtn.addEventListener("click", () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // ==========================================================================
  // D. MEMBER GALLERY & LIVE SEARCH
  // ==========================================================================
  function renderGallery(filterQuery = "") {
    const query = filterQuery.trim().toLowerCase().replace(/^@+/, "");
    membersGalleryGrid.innerHTML = "";
    let matchCount = 0;

    allMembers.forEach((member, idx) => {
      const cleanUser = window.GoldenDaysStore.sanitizeUsername(member.username);
      const matchesName = member.name.toLowerCase().includes(query);
      const matchesUser = cleanUser.toLowerCase().includes(query);

      if (!query || matchesName || matchesUser) {
        matchCount++;
        const card = document.createElement("div");
        card.className = "gallery-card";
        if (idx === currentIndex) card.classList.add("active-spotlight-card");
        card.dataset.index = idx;

        card.innerHTML = `
          <span class="gallery-card-num">#${padZero(idx + 1)}</span>
          <div class="gallery-avatar-ring">
            <img src="${member.avatar || createFallbackDP(member.name)}" alt="${member.name}" loading="lazy" />
          </div>
          <h3>${escapeHTML(member.name)}</h3>
          <p>@${escapeHTML(cleanUser)}</p>
        `;

        const img = card.querySelector("img");
        img.onerror = () => {
          img.onerror = null;
          img.src = createFallbackDP(member.name);
        };

        // Clicking any gallery card jumps to their full Spotlight profile
        card.addEventListener("click", () => {
          renderSpotlight(idx, true);
          if (isAutoPlaying) resetAutoPlayTimer();
          document.getElementById("spotlightSection").scrollIntoView({ behavior: "smooth" });
        });

        membersGalleryGrid.appendChild(card);
      }
    });

    noSearchResults.classList.toggle("hidden", matchCount > 0);
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  memberSearchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    clearSearchBtn.classList.toggle("hidden", val.length === 0);
    renderGallery(val);
  });

  clearSearchBtn.addEventListener("click", () => {
    memberSearchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    renderGallery("");
  });

  // ==========================================================================
  // E. LIVE CLOCK, COUNTER, MOBILE NAV & BACK TO TOP
  // ==========================================================================
  totalMembersCount.textContent = padZero(allMembers.length);

  function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  updateClock();
  setInterval(updateClock, 1000);

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 420) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ==========================================================================
  // F. DESKTOP GOLDEN CURSOR & FLOATING GOLD PARTICLES CANVAS
  // ==========================================================================
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (cursorDot && cursorRing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("button, a, .gallery-card, input")) {
        cursorRing.classList.add("active");
      } else {
        cursorRing.classList.remove("active");
      }
    });
  }

  // Floating Golden Dust Canvas
  const canvas = document.getElementById("goldParticles");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particleCount = Math.min(65, Math.floor(window.innerWidth / 22));
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.1 + 0.5,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.65 + 0.2
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(249, 229, 158, 0.5)";
      ctx.fill();
    });
    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // Initialize Initial Views
  renderSpotlight(0, false);
  renderGallery("");
});
