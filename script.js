/**
 * UPSC ZONE AI — THE SYLLABUS METRO
 * Master Controller Script
 * Handles:
 * - Scroll progress "You Are Here" indicator & SVG track drawing
 * - Live Prelims countdown timer
 * - Interactive Station Inspection Modal with CSS Mock UIs
 * - Line filter tabs (All, Prelims, Mains, Interview)
 * - Animated telemetry stats counters
 * - Split-Flap Arrivals Board simulation & mechanical flip effect
 * - Mobile hamburger navigation
 * - Commuter pass validation & instant issuance
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STATION DATABASE & CSS MOCK UI TEMPLATES
     ========================================================================== */
  const STATIONS_DATA = {
    1: {
      id: 'PL-01',
      line: 'Line 1: Prelims Express (Saffron)',
      lineClass: 'saffron',
      title: 'AI Mock Tests',
      benefit: 'Adaptive question sets that calibrate difficulty dynamically based on your weak zones.',
      stops: [
        'Polity: Fundamental Rights & Basic Structure Doctrine',
        'Economy: Monetary Policy Committee & Inflation Targeting',
        'Environment: Wildlife Protection Act & Ramsar Sites Matrix'
      ],
      mockHtml: `
        <div class="mock-ui-test">
          <div class="mock-test-header">
            <span>QUESTION 24 OF 100 [POLITY]</span>
            <span class="mock-test-timer">⏱ 01:14 REMAINING</span>
          </div>
          <p class="mock-question-title">
            With reference to the 'Doctrine of Basic Structure', consider the following statements:
          </p>
          <div class="mock-options-list">
            <div class="mock-option" data-correct="false">
              <span>A. It was explicitly defined in Article 368 of the Constitution.</span>
            </div>
            <div class="mock-option correct" data-correct="true">
              <span>B. It was established in the Kesavananda Bharati case (1973).</span>
              <span class="mock-prob-badge">✓ AI 96% CONFIDENCE</span>
            </div>
            <div class="mock-option" data-correct="false">
              <span>C. Parliament can abrogate it by 2/3rd majority plus state ratification.</span>
            </div>
            <div class="mock-option" data-correct="false">
              <span>D. It applies exclusively to judicial review provisions.</span>
            </div>
          </div>
          <div class="mock-ai-diagnosis">
            <strong>AI Elimination Assist:</strong> Statement A is a common distractor. Article 368 contains amendment powers, but 'Basic Structure' is a judicial creation.
          </div>
        </div>
      `
    },
    2: {
      id: 'INT-02',
      line: 'Interchange Station: Line 1 + Line 2',
      lineClass: 'interchange',
      title: 'Current Affairs Engine',
      benefit: 'Syllabus-tagged daily editorial synthesis with automatic GS paper linking and prelims MCQs.',
      stops: [
        'The Hindu & Indian Express Editorial AI Deconstruction',
        'Direct Micro-tagging to GS-I, GS-II, GS-III, GS-IV Syllabi',
        'Daily 5-MCQ Drill Generated from Morning Headlines'
      ],
      mockHtml: `
        <div class="mock-ui-editorial">
          <div class="mock-paper-tag">GS PAPER II • CONSTITUTION & GOVERNANCE</div>
          <h4 class="mock-editorial-headline">Cooperative Federalism and Fiscal Transfers: Interpreting the 16th Finance Commission Mandate</h4>
          <div class="mock-bullets-box">
            <div>• <strong>Horizontal Devolution:</strong> Performance-based incentives vs population weighting tradeoffs.</div>
            <div>• <strong>Cess & Surcharges:</strong> Constitutional cap debates under Article 270.</div>
            <div>• <strong>Mains Anchor:</strong> Inter-state council rejuvenation & Article 263.</div>
          </div>
          <div class="mock-prelims-pointer">
            ✦ PRELIMS POINTER: Article 280 requires President to constitute Finance Commission every 5 years.
          </div>
        </div>
      `
    },
    3: {
      id: 'MN-03',
      line: 'Line 2: Mains Corridor (Sapphire)',
      lineClass: 'blue',
      title: 'Smart Notes',
      benefit: 'Micro-diagrams, mnemonic flowcharts, and high-yield data points compressed for rapid recall.',
      stops: [
        'GS-III: Renewable Energy Targets & Green Hydrogen Mission',
        'GS-I: Temple Architecture Styles: Nagara, Dravida, Vesara',
        'GS-II: Statutory Bodies: NHRC, CVC & Lokpal Powers'
      ],
      mockHtml: `
        <div class="mock-ui-notes">
          <div class="notes-mindmap-root">ENERGY TRANSITION ARCHITECTURE [GS-3]</div>
          <div class="notes-branches">
            <div class="notes-branch-leaf">
              <div class="leaf-title">PANCHAMRIT GOALS</div>
              <div class="leaf-items">
                • 500 GW Non-fossil by 2030<br>
                • 50% Energy via Renewables<br>
                • 1 Billion Ton CO₂ Reduction
              </div>
            </div>
            <div class="notes-branch-leaf">
              <div class="leaf-title">BOTTLENECKS</div>
              <div class="leaf-items">
                • Grid Storage Parity<br>
                • Critical Mineral Supply<br>
                • DISCOM Financial Stress
              </div>
            </div>
          </div>
        </div>
      `
    },
    4: {
      id: 'INT-04',
      line: 'Interchange Station: Line 1 + Line 2',
      lineClass: 'interchange',
      title: 'PYQ Matrix Navigator',
      benefit: '30-year trend analytics showing topic weightage, recurring themes, and trap question patterns.',
      stops: [
        '1995–2026 Question Database Indexed by Micro-Topic',
        'Trap-Word Frequency: "Only", "All", "Drastic" Analytics',
        'Direct Trend Correlation to Cutoff Fluctuations'
      ],
      mockHtml: `
        <div class="mock-ui-pyq">
          <div class="pyq-trend-header">30-YEAR WEIGHTAGE ANALYSIS: POLITY & ECONOMY</div>
          <div class="pyq-bar-group">
            <div class="pyq-bar-row">
              <span class="pyq-label">Preamble & FRs</span>
              <div class="pyq-track"><div class="pyq-fill polity"></div></div>
              <span class="pyq-count">84 Qs</span>
            </div>
            <div class="pyq-bar-row">
              <span class="pyq-label">Banking & RBI</span>
              <div class="pyq-track"><div class="pyq-fill economy"></div></div>
              <span class="pyq-count">68 Qs</span>
            </div>
            <div class="pyq-bar-row">
              <span class="pyq-label">Biodiversity</span>
              <div class="pyq-track"><div class="pyq-fill env"></div></div>
              <span class="pyq-count">59 Qs</span>
            </div>
          </div>
        </div>
      `
    },
    5: {
      id: 'MN-05',
      line: 'Line 2: Mains Corridor (Sapphire)',
      lineClass: 'blue',
      title: 'Answer Writing Evaluator',
      benefit: 'Instant multi-parameter rubric scoring: Intro, Context, Structure, Case Laws, Conclusion.',
      stops: [
        'UPSC Evaluator-Trained Rubric Calibration',
        'Sub-3 Minute Automated Feedback Loop',
        'Standard Value Addition Suggestions: Law Commission Reports'
      ],
      mockHtml: `
        <div class="mock-ui-evaluator">
          <div class="eval-score-badge">
            <span>QUESTION EVALUATION SCORE</span>
            <span class="eval-score-num">7.0 / 10</span>
          </div>
          <div class="eval-rubric-breakdown">
            <div class="eval-pill">
              <span>Introduction & Context:</span>
              <strong style="color:#10B981;">1.8 / 2.0</strong>
            </div>
            <div class="eval-pill">
              <span>Multi-Dimensional Points (PESTLE):</span>
              <strong style="color:#F59E0B;">2.4 / 4.0</strong>
            </div>
            <div class="eval-pill">
              <span>Judicial Case Laws Cited:</span>
              <strong style="color:#10B981;">1.5 / 2.0</strong>
            </div>
            <div class="eval-pill">
              <span>Forward-Looking Conclusion:</span>
              <strong style="color:#10B981;">1.3 / 2.0</strong>
            </div>
          </div>
        </div>
      `
    },
    6: {
      id: 'IN-06',
      line: 'Line 3: Personality Line (Teal Terminus)',
      lineClass: 'teal',
      title: 'Interview Simulator',
      benefit: 'DAF-based AI board simulations with cross-examination on hobbies, home state, and policy.',
      stops: [
        'Detailed Application Form (DAF-I & II) Keyword Parsing',
        'Voice & Poise Tone Analytics via Web Speech API',
        'Controversial Scenario Stress Testing'
      ],
      mockHtml: `
        <div class="mock-ui-interview">
          <div class="board-avatar-circle">🏛️</div>
          <p class="interview-prompt">
            "Candidate, your DAF lists Amateur Astronomy as an interest. In an era of acute rural poverty, how do you justify state capital expenditure on space exploration missions like Gaganyaan?"
          </p>
          <div class="daf-telemetry">
            <div class="telemetry-item">
              <span>STRESS INDEX</span> LOW (0.18)
            </div>
            <div class="telemetry-item">
              <span>CONSTITUTIONAL ANCHOR</span> 94% ALIGNED
            </div>
            <div class="telemetry-item">
              <span>DELIVERY CADENCE</span> 132 WPM
            </div>
          </div>
        </div>
      `
    }
  };

  let currentStationId = 1;

  /* ==========================================================================
     2. SCROLL PROGRESS "YOU ARE HERE" TRAIN & TRACK DRAWING
     ========================================================================== */
  const progressBar = document.getElementById('scrollProgressBar');
  const trainIndicator = document.getElementById('trainIndicator');
  const prelimsTrack = document.getElementById('trackPrelims');
  const mainsTrack = document.getElementById('trackMains');
  const interviewTrack = document.getElementById('trackInterview');
  const animatedTrain = document.getElementById('animatedTrain');

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);

    if (progressBar) {
      progressBar.style.width = `${clampedPercent}%`;
    }
    if (trainIndicator) {
      if (scrollTop > 0) {
        trainIndicator.classList.add('visible');
      } else {
        trainIndicator.classList.remove('visible');
      }
      trainIndicator.style.left = `${clampedPercent}%`;
    }

    // Trigger SVG map lines draw once journey section nears viewport
    const journeySection = document.getElementById('journey');
    if (journeySection) {
      const rect = journeySection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        if (prelimsTrack) prelimsTrack.classList.add('drawn');
        if (mainsTrack) mainsTrack.classList.add('drawn');
        if (interviewTrack) interviewTrack.classList.add('drawn');
      }
    }

    // Move SVG train sprite dynamically along the active corridor on desktop
    if (animatedTrain) {
      const t = clampedPercent / 100;
      let tx = 160;
      let ty = 130;

      if (t <= 0.35) {
        // Line 1: (160, 130) -> (380, 130)
        const subT = t / 0.35;
        tx = 160 + subT * (380 - 160);
        ty = 130;
      } else if (t <= 0.70) {
        // Line 2: (380, 130) -> (500, 280) -> (780, 280)
        const subT = (t - 0.35) / 0.35;
        if (subT <= 0.4) {
          const curveT = subT / 0.4;
          tx = 380 + curveT * (500 - 380);
          ty = 130 + curveT * (280 - 130);
        } else {
          const lineT = (subT - 0.4) / 0.6;
          tx = 500 + lineT * (780 - 500);
          ty = 280;
        }
      } else {
        // Line 3: (780, 280) -> (960, 400)
        const subT = (t - 0.70) / 0.30;
        tx = 780 + subT * (960 - 780);
        ty = 280 + subT * (400 - 280);
      }

      animatedTrain.setAttribute('transform', `translate(${tx.toFixed(1)}, ${ty.toFixed(1)})`);
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ==========================================================================
     3. LIVE PRELIMS COUNTDOWN TIMER
     ========================================================================== */
  const countdownEl = document.getElementById('countdownTimer');
  // Target date: Next UPSC Civil Services Preliminary Examination (e.g. May 30, 2027)
  const targetExamDate = new Date('2027-05-30T09:30:00+05:30').getTime();

  function updateCountdown() {
    if (!countdownEl) return;
    const now = new Date().getTime();
    const distance = targetExamDate - now;

    if (distance <= 0) {
      countdownEl.textContent = 'EXAMINATION IN PROGRESS';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    countdownEl.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     4. LIVE CLOCKS (ARRIVALS BOARD & FOOTER)
     ========================================================================== */
  const boardClock = document.getElementById('boardStationClock');
  const footerClock = document.getElementById('footerClock');

  function updateLiveClocks() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${mins}:${secs} HRS`;
    const footerTimeStr = `${hours}:${mins}:${secs} IST`;

    if (boardClock) boardClock.textContent = timeStr;
    if (footerClock) footerClock.textContent = footerTimeStr;
  }

  setInterval(updateLiveClocks, 1000);
  updateLiveClocks();

  /* ==========================================================================
     5. STATION INSPECTION MODAL (POPUP PREVIEW)
     ========================================================================== */
  const modalOverlay = document.getElementById('stationModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalLineBadge = document.getElementById('modalLineBadge');
  const modalLineName = document.getElementById('modalLineName');
  const modalStationCode = document.getElementById('modalStationCode');
  const modalStationTitle = document.getElementById('modalStationTitle');
  const modalStationBenefit = document.getElementById('modalStationBenefit');
  const modalStopsList = document.getElementById('modalStopsList');
  const mockContainer = document.getElementById('mockContainer');
  const modalNextBtn = document.getElementById('modalNextStationBtn');

  function openStationModal(stationId) {
    const data = STATIONS_DATA[stationId];
    if (!data || !modalOverlay) return;

    currentStationId = parseInt(stationId, 10);

    // Update Text Content
    if (modalStationCode) modalStationCode.textContent = `STATION ${data.id}`;
    if (modalStationTitle) modalStationTitle.textContent = data.title;
    if (modalStationBenefit) modalStationBenefit.textContent = data.benefit;
    if (modalLineName) modalLineName.textContent = data.line;

    // Badge styling
    if (modalLineBadge) {
      modalLineBadge.className = `modal-line-pill ${data.lineClass}`;
    }

    // Populate Stops List
    if (modalStopsList) {
      modalStopsList.innerHTML = data.stops.map(stop => `<li>${stop}</li>`).join('');
    }

    // Populate CSS Mock Display
    if (mockContainer) {
      mockContainer.innerHTML = data.mockHtml;
      attachMockInteractions();
    }

    // Open Modal
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeStationModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Interactive Options within the Mock UI
  function attachMockInteractions() {
    const options = document.querySelectorAll('.mock-option');
    options.forEach(opt => {
      opt.style.cursor = 'pointer';
      opt.addEventListener('click', () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        options.forEach(o => o.classList.remove('correct', 'incorrect'));
        if (isCorrect) {
          opt.classList.add('correct');
        } else {
          opt.classList.add('incorrect');
          opt.style.borderColor = '#EF4444';
          opt.style.background = 'rgba(239, 68, 68, 0.15)';
        }
      });
    });
  }

  // Station Click / Keypress Handlers for Desktop SVG
  const stationGroups = document.querySelectorAll('.station-group');
  stationGroups.forEach(stn => {
    stn.addEventListener('click', () => {
      const stnId = stn.getAttribute('data-station');
      if (stnId) openStationModal(stnId);
    });

    stn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const stnId = stn.getAttribute('data-station');
        if (stnId) openStationModal(stnId);
      }
    });
  });

  // Mobile Station Card Triggers
  const mobileTriggers = document.querySelectorAll('.m-preview-trigger');
  mobileTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const stnId = btn.getAttribute('data-station');
      if (stnId) openStationModal(stnId);
    });
  });

  // Hero Dock Station Nodes
  const heroDockNodes = document.querySelectorAll('.dock-node');
  heroDockNodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      heroDockNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      openStationModal(idx + 1);
    });
  });

  // Modal Controls
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeStationModal);
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      const nextId = currentStationId >= 6 ? 1 : currentStationId + 1;
      openStationModal(nextId);
    });
  }

  // Close on backdrop click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeStationModal();
      }
    });
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeStationModal();
    }
  });

  /* ==========================================================================
     6. METRO LINE FILTER TABS
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const line = tab.getAttribute('data-line');
      applyLineFilter(line);
    });
  });

  function applyLineFilter(line) {
    // Filter SVG Station Groups
    stationGroups.forEach(stn => {
      const id = parseInt(stn.getAttribute('data-station'), 10);
      let match = false;
      if (line === 'all') match = true;
      else if (line === 'prelims' && (id === 1 || id === 2 || id === 4)) match = true;
      else if (line === 'mains' && (id === 2 || id === 3 || id === 4 || id === 5)) match = true;
      else if (line === 'interview' && id === 6) match = true;

      stn.style.opacity = match ? '1' : '0.25';
      stn.style.transition = 'opacity 300ms ease';
    });

    // Filter Mobile Cards
    const mobileCards = document.querySelectorAll('.m-station-card');
    mobileCards.forEach(card => {
      const id = parseInt(card.getAttribute('data-station'), 10);
      let match = false;
      if (line === 'all') match = true;
      else if (line === 'prelims' && (id === 1 || id === 2 || id === 4)) match = true;
      else if (line === 'mains' && (id === 2 || id === 3 || id === 4 || id === 5)) match = true;
      else if (line === 'interview' && id === 6) match = true;

      card.style.display = match ? 'block' : 'none';
    });
  }

  /* ==========================================================================
     7. TELEMETRY STATS ANIMATED COUNTERS
     ========================================================================== */
  const statsSection = document.getElementById('stats');
  let statsCounted = false;

  function runStatsCounters() {
    const counters = [
      { el: document.getElementById('counter1'), target: 1840000, suffix: '+', format: true },
      { el: document.getElementById('counter2'), target: 42500, suffix: '+', format: true },
      { el: document.getElementById('counter3'), target: 312000, suffix: '+', format: true },
      { el: document.getElementById('counter4'), target: 98.4, suffix: '%', format: false, decimals: 1 }
    ];

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      counters.forEach(item => {
        if (!item.el) return;
        const currentVal = item.target * ease;
        if (item.format) {
          item.el.textContent = Math.floor(currentVal).toLocaleString('en-IN') + item.suffix;
        } else {
          item.el.textContent = currentVal.toFixed(item.decimals || 0) + item.suffix;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          runStatsCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* ==========================================================================
     8. ARRIVALS BOARD (SPLIT-FLAP REFRESH ANIMATION)
     ========================================================================== */
  const btnRefreshBoard = document.getElementById('btnRefreshBoard');
  const flapRows = document.querySelectorAll('.flap-row');

  function flipArrivalsBoard() {
    flapRows.forEach((row, rIndex) => {
      const flapTexts = row.querySelectorAll('.flap-text');
      flapTexts.forEach(el => {
        const originalText = el.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#';
        let step = 0;
        const totalSteps = 8;
        const interval = setInterval(() => {
          step++;
          if (step >= totalSteps) {
            clearInterval(interval);
            el.textContent = originalText;
            el.style.transform = 'none';
          } else {
            // Pick random characters for mechanical split-flap simulation
            el.textContent = Array.from(originalText)
              .map(ch => ch === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])
              .join('');
            el.style.transform = 'rotateX(90deg)';
            setTimeout(() => { el.style.transform = 'rotateX(0deg)'; }, 40);
          }
        }, 50 + rIndex * 15);
      });
    });
  }

  if (btnRefreshBoard) {
    btnRefreshBoard.addEventListener('click', flipArrivalsBoard);
  }

  /* ==========================================================================
     9. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      } else {
        mobileNav.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
      }
    });

    // Close when clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ==========================================================================
     10. COMMUTER PASS SIGNUP FORM
     ========================================================================== */
  const signupForm = document.getElementById('signupForm');
  const aspirantEmail = document.getElementById('aspirantEmail');
  const formFeedback = document.getElementById('formFeedback');

  if (signupForm && aspirantEmail && formFeedback) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = aspirantEmail.value.trim();
      if (!email || !email.includes('@')) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.style.color = '#EF4444';
        return;
      }

      const randomPassCode = `PASS-ZONE-${Math.floor(1000 + Math.random() * 9000)}`;
      formFeedback.innerHTML = `
        <span style="color:#10B981;">✓ BOARDING PASS ISSUED: <strong>${randomPassCode}</strong></span><br>
        <span style="color:#CBD5E1; font-size:0.75rem;">7-Day complimentary access code transmitted to <em>${email}</em>. Proceed to Station 1.</span>
      `;
      aspirantEmail.value = '';
    });
  }

  // Smooth scroll offset adjustment for sticky navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  console.log('🚇 UPSC ZONE AI — The Syllabus Metro Engine Initialized Successfully.');
});
