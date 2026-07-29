document.addEventListener('DOMContentLoaded', () => {
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
        envelopeScreen.style.display = 'flex';
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

  // Mouse Cursor Glow
  const cursorGlow = document.getElementById('cursorGlow');
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('is-active');
      cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'));
  }

  // Scroll Progress & Reveal
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

  // Wedding Countdown Timer (Target: 16 Nov 2026)
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

  // Dynamic Floating Gold Petals
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

  // Firebase Blessings Wall
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
          nameInput.value = '';
          messageInput.value = '';
          if (messagesDisplay) messagesDisplay.scrollTop = 0;
        }
      });
    }
  }

  // Google Calendar Buttons Handler
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
});

// Universal Text-Based Calendar Linker
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.event-card a, .event-card button');
  
  buttons.forEach(btn => {
    const text = btn.innerText.trim().toLowerCase();
    
    // Check if it's an "Add to Calendar" button
    if (text.includes('add to calendar')) {
      // Find which card it belongs to by looking at the parent card's heading
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
});// 3D Tilt Effect on Couple Cards
document.addEventListener('DOMContentLoaded', () => {
  const tiltCards = document.querySelectorAll('.flip-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside card
      const y = e.clientY - rect.top;  // y coordinate inside card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angle (max 15 degrees)
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
    
    // Tap to flip on mobile / click on desktop
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
});// Golden Fireworks Burst Effect Function
function triggerGoldFireworks(x, y) {
  const sparkCount = 30; // Number of sparks in a burst
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.classList.add('firework-spark');
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';

    // Random direction for explosion
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.setProperty('--dx', `${dx}px`);
    spark.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(spark);

    // Remove spark after animation completes
    setTimeout(() => {
      spark.remove();
    }, 800);
  }
}

// Automatically trigger fireworks when someone submits a blessing
document.addEventListener('DOMContentLoaded', () => {
  const blessingForm = document.getElementById('blessingForm');
  if (blessingForm) {
    blessingForm.addEventListener('submit', (e) => {
      // Get position of the submit button to burst fireworks right there
      const btn = blessingForm.querySelector('button[type="submit"]');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        triggerGoldFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);
      } else {
        // Fallback to center of screen
        triggerGoldFireworks(window.innerWidth / 2, window.innerHeight / 2);
      }
    });
  }
});

// VIP Digital Pass Logic
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openVipModalBtn');
  const modal = document.getElementById('vipModal');
  const closeBtn = document.getElementById('closeVipModalBtn');
  const nameDisplay = document.getElementById('passGuestName');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      let guestName = prompt("Please enter your full name for the VIP Pass:", "Guest Name");
      if (guestName && guestName.trim() !== "") {
        nameDisplay.innerText = guestName.trim();
      } else {
        nameDisplay.innerText = "Honoured Guest";
      }
      modal.classList.add('is-active');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-active');
      }
    });
  }
});

// Updated VIP Pass JPEG Download with Fallback
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadPassBtn');
  const passCard = document.getElementById('vipPassCardContent');

  if (downloadBtn && passCard) {
    downloadBtn.addEventListener('click', () => {
      // Check if html2canvas is loaded
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
        
        // Try automatic download via anchor tag
        const link = document.createElement('a');
        link.download = 'Sufyan-Fareeya-VIP-Pass.jpg';
        link.href = imageURL;
        
        try {
          link.click();
        } catch (e) {
          // Fallback for mobile browsers that block direct click
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
// --- VIP Modal Open/Close Fix ---
document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openVipModalBtn");
    const closeBtn = document.getElementById("closeVipModalBtn");
    const modal = document.getElementById("vipModal");
    const guestNameInput = document.getElementById("guestName");
    const passGuestName = document.getElementById("passGuestName");

    if (openBtn && modal) {
        openBtn.addEventListener("click", function() {
            // Agar guest name bhara hai toh pass par wohi naam show ho jaye
            if (guestNameInput && guestNameInput.value.trim() !== "") {
                passGuestName.textContent = guestNameInput.value.trim();
            } else {
                passGuestName.textContent = "Honourable Guest";
            }
            modal.classList.add("active");
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", function() {
            modal.classList.remove("active");
        });
    }

    // Modal ke background (dark overlay) par click karne se bhi band ho jaye
    if (modal) {
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});

// ROYAL PRELOADER EXCLUSIVITY
document.addEventListener("DOMContentLoaded", function() {
    // 3.5 Seconds tak animation chalne ke baad fade-out trigger hoga
    setTimeout(function() {
        const preloader = document.getElementById("royal-preloader");
        if(preloader) {
            preloader.classList.add("fade-out");
            
            // Gates poore khulne ke baad element ko dom se hide kar denge
            setTimeout(function() {
                preloader.style.display = "none";
            }, 1200); // match css gate transition length
        }
    }, 3500); 
});