document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 0️⃣ ROYAL SHAHI ENTRY PRELOADER LOGIC
  // ==========================================================================
  setTimeout(function() {
    const preloader = document.getElementById("royal-preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      
      // Gates poore split (khulne) ke baad DOM se hide kar denge
      setTimeout(function() {
        preloader.style.display = "none";
      }, 1200); // 1.2s CSS transition time match kiya
    }
  }, 3500); // 3.5 Seconds tak baggi entry animation chalegi


  // ==========================================================================
  // 1️⃣ MAIN INVITATION & MUSIC LOGIC
  // ==========================================================================
  const openInviteBtn = document.getElementById('openInviteBtn');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const siteMain = document.getElementById('siteMain');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  // Direct open function
  function openInvitation(e) {
    if (e) e.preventDefault();
    
    if (envelopeScreen) {
      envelopeScreen.classList.add('is-opened');
      // Completely hide after transition so clicks pass through to main site
      setTimeout(() => {
        envelopeScreen.style.display = 'flex'; // Fix: keeps layout active if required
      }, 1200);
    }
    
    if (siteMain) {
      siteMain.setAttribute('aria-hidden', 'false');
    }
    
    if (bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.play().then(() => {
        if (musicToggle) musicToggle.classList.add('is-playing');
      }).catch(err => console.log("Audio play restricted:", err));
    }
  }

  // Multiple event listeners to ensure it triggers on mobile and desktop
  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', openInvitation);
    openInviteBtn.addEventListener('touchend', openInvitation);
  }

  if (envelopeScreen) {
    envelopeScreen.addEventListener('click', openInvitation);
  }

  // Audio Toggle Button
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.classList.add('is-playing');
        }).catch(err => console.log("Play failed", err));
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('is-playing');
      }
    });
  }


  // ==========================================================================
  // 2️⃣ MOUSE CURSOR GLOW EFFECT
  // ==========================================================================
  const cursorGlow = document.getElementById('cursorGlow');
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('is-active');
      cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'));
  }


  // ==========================================================================
  // 3️⃣ SCROLL PROGRESS & REVEAL SECTION
  // ==========================================================================
  const progressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('section, header');
  const navDots = document.querySelectorAll('.side-dot');

  function handleScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('is-visible');
      }
    });

    let activeId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      if (window.scrollY >= top - 160) {
        activeId = section.getAttribute('id');
      }
    });

    navDots.forEach(dot => {
      dot.classList.remove('is-active');
      if (dot.getAttribute('href') === `#${activeId}`) dot.classList.add('is-active');
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ==========================================================================
  // 4️⃣ WEDDING COUNTDOWN TIMER (Target: 16 Nov 2026)
  // ==========================================================================
  const targetDate = new Date('2026-11-16T19:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      const cdContainer = document.querySelector('.countdown');
      if(cdContainer) cdContainer.innerHTML = "<h3>The Celebration Has Begun!</h3>";
      clearInterval(countdownInterval);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    updateElement('cd-days', d);
    updateElement('cd-hours', h);
    updateElement('cd-minutes', m);
    updateElement('cd-seconds', s);

    updateRing('daysRing', d, 365);
    updateRing('hoursRing', h, 24);
    updateRing('minutesRing', m, 60);
    updateRing('secondsRing', s, 60);
  }

  function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value < 10 ? '0' + value : value;
  }

  function updateRing(id, val, max) {
    const ring = document.getElementById(id);
    if (ring) ring.style.strokeDashoffset = 327 - (val / max) * 327;
  }
  
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);


  // ==========================================================================
  // 5️⃣ DYNAMIC FLOATING GOLD PETALS
  // ==========================================================================
  const petalsContainer = document.getElementById('petals');
  const roseSVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="var(--gold-light)"><path d="M12,2 C12,2 4,10 4,15 C4,19.4 7.6,23 12,23 C16,23 20,19.4 20,15 C20,10 12,2 12,2 Z" opacity="0.45"/></svg>`;

  function createFloatingElement() {
    if(document.hidden || !petalsContainer) return; 
    const item = document.createElement('div');
    item.classList.add('petal');
    item.innerHTML = roseSVG;
    item.style.left = Math.random() * 100 + 'vw';
    const scale = Math.random() * 0.7 + 0.5;
    item.style.transform = `scale(${scale})`;
    item.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    const duration = Math.random() * 5 + 6;
    item.style.animationDuration = duration + 's';
    petalsContainer.appendChild(item);
    setTimeout(() => item.remove(), duration * 1000);
  }
  setInterval(createFloatingElement, 900);


  // ==========================================================================
  // 6️⃣ FIREBASE BLESSINGS WALL & FIREWORKS
  // ==========================================================================
  const firebaseConfig = {
    apiKey: "AIzaSyB6KYel7PoUZUcPIDJ1zvuu9EK520WvWEc",
    authDomain: "wedding-card-a18fc.firebaseapp.com",
    databaseURL: "https://wedding-card-a18fc-default-rtdb.firebaseio.com",
    projectId: "wedding-card-a18fc",
    storageBucket: "wedding-card-a18fc.appspot.com",
    messagingSenderId: "994347375243",
    appId: "1:994347375243:web:caefe031f77c646527128e"
  };

  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const blessingsRef = database.ref('blessings');
    const blessingForm = document.getElementById('blessingForm');
    const messagesDisplay = document.getElementById('messagesDisplay');

    if (messagesDisplay) {
      blessingsRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        const card = document.createElement('div');
        card.classList.add('blessing-card');
        card.innerHTML = `<p class="guest-msg">"${data.message}"</p><h4 class="guest-name">- ${data.name}</h4>`;
        messagesDisplay.insertBefore(card, messagesDisplay.firstChild);
      });
    }

    if (blessingForm) {
      blessingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('guestName');
        const messageInput = document.getElementById('guestMessage');
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
          blessingsRef.push({ name, message, timestamp: Date.now() });
          
          // Trigger Gold Fireworks on submit
          const btn = blessingForm.querySelector('button[type="submit"]');
          if (btn) {
            const rect = btn.getBoundingClientRect();
            triggerGoldFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);
          } else {
            triggerGoldFireworks(window.innerWidth / 2, window.innerHeight / 2);
          }

          nameInput.value = '';
          messageInput.value = '';
          if (messagesDisplay) messagesDisplay.scrollTop = 0;
        }
      });
    }
  }


  // ==========================================================================
  // 7️⃣ GOOGLE CALENDAR BUTTONS HANDLER (Universal & Direct)
  // ==========================================================================
  const baratBtn = document.getElementById('addBaratToCalendar');
  const valimaBtn = document.getElementById('addValimaToCalendar');

  if (baratBtn) {
    baratBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Sufyan & Fareeya — Barat Ceremony")}&dates=20261114T210000/20261115T010000&details=${encodeURIComponent("Join us for the Barat ceremony!")}&location=${encodeURIComponent("Global Banquet, Shah Faisal Colony Karachi")}&sf=true&output=xml`;
      window.open(url, '_blank');
    });
  }

  if (valimaBtn) {
    valimaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Sufyan & Fareeya — Valima Reception")}&dates=20261116T210000/20261117T010000&details=${encodeURIComponent("Join us for the Valima reception!")}&location=${encodeURIComponent("The Heaven Banquet, Gulistan-e-Johar Karachi")}&sf=true&output=xml`;
      window.open(url, '_blank');
    });
  }

  // Universal Text-Based Linker fallback
  const calButtons = document.querySelectorAll('.event-card a, .event-card button');
  calButtons.forEach(btn => {
    const text = btn.innerText.trim().toLowerCase();
    if (text.includes('add to calendar')) {
      const card = btn.closest('.event-card');
      const cardTitle = card ? card.querySelector('h3').innerText.toLowerCase() : '';
      
      if (cardTitle.includes('barat')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Sufyan & Fareeya — Barat Ceremony")}&dates=20261114T210000/20261115T010000&details=${encodeURIComponent("Join us for the Barat ceremony!")}&location=${encodeURIComponent("Global Banquet, Shah Faisal Colony Karachi")}&sf=true&output=xml`;
          window.open(url, '_blank');
        });
      } else if (cardTitle.includes('valima')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Sufyan & Fareeya — Valima Reception")}&dates=20261116T210000/20261117T010000&details=${encodeURIComponent("Join us for the Valima reception!")}&location=${encodeURIComponent("The Heaven Banquet, Gulistan-e-Johar Karachi")}&sf=true&output=xml`;
          window.open(url, '_blank');
        });
      }
    }
  });


  // ==========================================================================
  // 8️⃣ 3D TILT EFFECT ON COUPLE CARDS
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.flip-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
    
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });


  // ==========================================================================
  // 9️⃣ VIP DIGITAL PASS MODAL OPEN/CLOSE & DOWNLOAD
  // ==========================================================================
  const vipOpenBtn = document.getElementById("openVipModalBtn");
  const vipCloseBtn = document.getElementById("closeVipModalBtn");
  const vipModal = document.getElementById("vipModal");
  const guestNameInput = document.getElementById("guestName");
  const passGuestName = document.getElementById("passGuestName");
  const downloadBtn = document.getElementById('downloadPassBtn');
  const passCard = document.getElementById('vipPassCardContent');

  if (vipOpenBtn && vipModal) {
    vipOpenBtn.addEventListener("click", function() {
      if (guestNameInput && guestNameInput.value.trim() !== "") {
        passGuestName.textContent = guestNameInput.value.trim();
      } else {
        passGuestName.textContent = "Honourable Guest";
      }
      vipModal.classList.add("active");
    });
  }

  if (vipCloseBtn && vipModal) {
    vipCloseBtn.addEventListener("click", function() {
      vipModal.classList.remove("active");
    });
  }

  if (vipModal) {
    vipModal.addEventListener("click", function(e) {
      if (e.target === vipModal) {
        vipModal.classList.remove("active");
      }
    });
  }

  if (downloadBtn && passCard) {
    downloadBtn.addEventListener('click', () => {
      if (typeof html2canvas === 'undefined') {
        alert("Download library is still loading. Please try again in a few seconds.");
        return;
      }
      downloadBtn.innerText = "Generating...";
      
      html2canvas(passCard, {
        backgroundColor: '#071208',
        scale: 2,
        useCORS: true
      }).then(canvas => {
        const imageURL = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.download = 'Sufyan-Fareeya-VIP-Pass.jpg';
        link.href = imageURL;
        
        try {
          link.click();
        } catch (e) {
          window.open(imageURL, '_blank');
        }
        downloadBtn.innerText = "Download JPEG";
      }).catch(err => {
        console.error("Error generating image:", err);
        alert("Could not generate image. Please take a screenshot instead.");
        downloadBtn.innerText = "Download JPEG";
      });
    });
  }
});

// Universal Golden Fireworks Burst Generator Function
function triggerGoldFireworks(x, y) {
  const sparkCount = 30; 
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.classList.add('firework-spark');
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.setProperty('--dx', `${dx}px`);
    spark.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 800);
  }
}