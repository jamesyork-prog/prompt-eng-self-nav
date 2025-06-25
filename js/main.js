// main.js - Final Working Version - All Logic Included

document.addEventListener('DOMContentLoaded', () => {
  // --- Element & State Definitions ---
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.getElementById('progress-bar');
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  const openDialogBtn = document.getElementById('open-dialog-btn');
  const scriptDialog = document.getElementById('script-dialog');
  const closeDialogBtn = document.getElementById('close-dialog-btn');
  const dialogContent = document.getElementById('dialog-content');
  const navArrows = document.querySelectorAll('.nav-arrow');
  let currentSlide = 0;
  let s4_anim_step = 0, s6_anim_step = 0, s7_anim_step = 0, s8_anim_triggered = false, s9_anim_step = 0, s11_initialized = false;
  let slideAnimationTimer = null;

  // SVG Icon strings
  const SVG_ARROW_LEFT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_DARK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  const SVG_ARROW_LEFT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const SVG_ARROW_RIGHT_LIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

  // --- Dialog Functions ---
  function openScriptDialog() {
    const activeSlide = slides[currentSlide];
    const scriptText = activeSlide.getAttribute('data-script');

    if (scriptText && dialogContent) {
      dialogContent.innerHTML = scriptText.replace(/\n/g, '<br>');
    } else if (dialogContent) {
      dialogContent.textContent = "No script available for this slide.";
    }

    if (scriptDialog) {
      scriptDialog.classList.add('visible');
    }
  }

  function closeScriptDialog() {
    if (scriptDialog) {
      scriptDialog.classList.remove('visible');
    }
  }

  // --- Core Functions ---

  function setupLogoCarousel() {
    const track = document.querySelector('.logo-track');
    if (track) {
      const originalSet = track.querySelector('.logo-set');
      if (originalSet) {
        const clone = originalSet.cloneNode(true);
        track.appendChild(clone);
      }
    }
  }

  // --- Slide-Specific Animation Functions ---
  function animateSlide3() {
    const userBubble = document.getElementById('user-prompt-bubble');
    if (userBubble && userBubble.textContent !== '') return;
    const placeholder = document.getElementById('placeholder-text'), typedTextEl = document.getElementById('typed-text'), cursor = document.getElementById('typing-cursor'),
        userBubbleContainer = document.getElementById('user-prompt-bubble-container'), aiBubbleContainer = document.getElementById('ai-response-bubble-container'),
        promptToType = "what is a prompt?";
    if (placeholder) placeholder.style.display = 'none';
    if (cursor) cursor.classList.remove('opacity-0');
    let i = 0;
    function typeWriter() {
        if (i < promptToType.length) { typedTextEl.textContent += promptToType.charAt(i); i++; setTimeout(typeWriter, 80); }
        else {
        if (cursor) cursor.style.display = 'none';
        setTimeout(() => { typedTextEl.textContent = ''; if (placeholder) placeholder.style.display = 'inline'; }, 800);
        setTimeout(() => { if (userBubble) userBubble.textContent = promptToType; if (userBubbleContainer) userBubbleContainer.classList.remove('opacity-0', 'translate-y-4'); }, 500);
        setTimeout(() => { if (aiBubbleContainer) aiBubbleContainer.classList.remove('opacity-0', 'translate-y-4'); }, 1500);
        }
    }
    typeWriter();
  }

  function animateSlide4() {
    const typeWriter = (elements, textToType, fullText, callback) => {
        const { placeholder, typedText, cursor, bubble, bubbleContainer } = elements;
        if (placeholder) placeholder.style.display = 'none';
        if (cursor) cursor.classList.remove('opacity-0');
        let i = 0;
        function type() {
            if (i < textToType.length) { typedText.textContent += textToType.charAt(i); i++; setTimeout(type, 50); }
            else {
            if (cursor) cursor.style.display = 'none';
            setTimeout(() => { typedText.textContent = ''; if (placeholder) placeholder.style.display = 'inline'; }, 800);
            setTimeout(() => { if (bubble) bubble.textContent = fullText; if (bubbleContainer) bubbleContainer.classList.remove('opacity-0', 'translate-y-4'); }, 500);
            if (callback) setTimeout(callback, 1000); // Add a delay before the next part
            }
        }
        type();
    };

    if (s4_anim_step === 0) {
        s4_anim_step = 0.5;
        const elementsBasic = { placeholder: document.getElementById('s4-basic-placeholder'), typedText: document.getElementById('s4-basic-typed-text'), cursor: document.getElementById('s4-basic-cursor'), bubble: document.getElementById('s4-basic-bubble'), bubbleContainer: document.getElementById('s4-basic-bubble-container') };
        const fullTextBasic = '"Write about our new product."';
        
        const elementsTcrei = { placeholder: document.getElementById('s4-tcrei-placeholder'), typedText: document.getElementById('s4-tcrei-typed-text'), cursor: document.getElementById('s4-tcrei-cursor'), bubble: document.getElementById('s4-tcrei-bubble'), bubbleContainer: document.getElementById('s4-tcrei-bubble-container') };
        const fullTextTcrei = '"You are a technical writer at Flash. Write a brief overview of our new analytics dashboard for a client-facing knowledge base article. Focus on key benefits for enterprise users and include a clear call-to-action for scheduling a demo."';
        const abbreviatedTextTcrei = '"You are a technical writer at Flash... for scheduling a demo."';

        typeWriter(elementsBasic, fullTextBasic, fullTextBasic, () => {
            s4_anim_step = 1;
            typeWriter(elementsTcrei, abbreviatedTextTcrei, fullTextTcrei, () => { s4_anim_step = 2; });
        });
    }
  }

  function animateSlide6() {
    if (s6_anim_step !== 0) return;
    s6_anim_step = 0.5;
    const placeholder = document.getElementById('s6-placeholder-text'), typedTextEl = document.getElementById('s6-typed-text'), cursor = document.getElementById('s6-cursor'),
        bubbleContainer = document.getElementById('s6-prompt-bubble-container'), promptTextEl = document.getElementById('s6-prompt-text');
    const promptContent = `<span class="s6-persona">You are a Project Manager at Flash with deep technical knowledge of the Flash Vision LPR (License Plate Recognition) system.</span> <span class="s6-task">Provide a comprehensive technical response detailing how we implement Flash Vision LPR for clients.</span> <span class="s6-format">Deliver your response as a professional, client-ready Markdown document that can be downloaded and shared.</span>`;
    const textToType = "You are a Project Manager at Flash... Deliver your response...";
    if (placeholder) placeholder.style.display = 'none';
    if (cursor) cursor.classList.remove('opacity-0');
    let i = 0;
    function typeWriter() {
        if (i < textToType.length) { typedTextEl.textContent += textToType.charAt(i); i++; setTimeout(typeWriter, 20); }
        else {
            if (cursor) cursor.style.display = 'none';
            setTimeout(() => { typedTextEl.textContent = ''; if (placeholder) placeholder.style.display = 'inline'; }, 800);
            setTimeout(() => { 
                if (promptTextEl) promptTextEl.innerHTML = promptContent; 
                if (bubbleContainer) bubbleContainer.classList.remove('opacity-0', 'translate-y-4'); 
                s6_anim_step = 1;
                setTimeout(() => {
                    document.querySelector('.s6-persona').classList.add('prompt-highlight', 'highlight-blue');
                    document.getElementById('s6-callout-persona').classList.add('visible');
                    s6_anim_step = 2;
                }, 1000);
                setTimeout(() => {
                    document.querySelector('.s6-task').classList.add('prompt-highlight', 'highlight-yellow');
                    document.getElementById('s6-callout-task').classList.add('visible');
                    s6_anim_step = 3;
                }, 2000);
                setTimeout(() => {
                    document.querySelector('.s6-format').classList.add('prompt-highlight', 'highlight-coral');
                    document.getElementById('s6-callout-format').classList.add('visible');
                    s6_anim_step = 4;
                }, 3000);
            }, 500);
        }
    }
    typeWriter();
  }

  function animateSlide7() {
    if (s7_anim_step !== 0) return;
    s7_anim_step = 0.5;
    const placeholder = document.getElementById('s7-placeholder'), typedTextEl = document.getElementById('s7-typed-text'), cursor = document.getElementById('s7-cursor'),
        contextSpan = document.getElementById('s7-context-insertion');
    const fullContext = ` The client is currently using a competitor’s LPR hardware and is seeking a thorough explanation of our Flash Vision LPR implementation process. They expect specifics on how our approach compares, including deployment steps, integration with existing systems, hardware requirements, and post-installation support.`;
    const abbreviatedContext = " The client is currently using a competitor’s LPR hardware... and post-installation support.";
    if (placeholder) placeholder.style.display = 'none';
    if (cursor) cursor.classList.remove('opacity-0');
    let i = 0;
    function typeWriter() {
        if (i < abbreviatedContext.length) { typedTextEl.textContent += abbreviatedContext.charAt(i); i++; setTimeout(typeWriter, 20); }
        else {
            if (cursor) cursor.style.display = 'none';
            setTimeout(() => { typedTextEl.textContent = ''; if (placeholder) placeholder.style.display = 'inline'; }, 800);
            setTimeout(() => { 
                if (contextSpan) { contextSpan.textContent = fullContext; contextSpan.classList.remove('opacity-0'); } 
                s7_anim_step = 1;
                const textContainer = document.getElementById('s7-prompt-text');
                if (!textContainer) return;
                const highlightText = (textToFind, colorClass) => {
                    const currentHTML = textContainer.innerHTML;
                    if (!currentHTML.includes(`data-highlighted="${textToFind}"`)) {
                        textContainer.innerHTML = currentHTML.replace(textToFind, `<span class="prompt-highlight ${colorClass}" data-highlighted="${textToFind}">${textToFind}</span>`);
                    }
                };
                setTimeout(() => {
                    highlightText(`The client is currently using a competitor’s LPR hardware`, 'highlight-blue');
                    document.getElementById('s7-callout-audience').classList.add('visible');
                    s7_anim_step = 2;
                }, 1000);
                setTimeout(() => {
                    highlightText(`is seeking a thorough explanation of our Flash Vision LPR implementation process. They expect specifics on how our approach compares`, 'highlight-yellow');
                    document.getElementById('s7-callout-goal').classList.add('visible');
                    s7_anim_step = 3;
                }, 2000);
                setTimeout(() => {
                    highlightText(`including deployment steps, integration with existing systems, hardware requirements, and post-installation support.`, 'highlight-coral');
                    document.getElementById('s7-callout-constraints').classList.add('visible');
                    s7_anim_step = 4;
                }, 3000);
            }, 500);
        }
    }
    typeWriter();
  }

  function animateSlide9() {
    const placeholder = document.getElementById('s9-placeholder');
    if (placeholder) {
        placeholder.textContent = 'Enter a prompt for Gemini';
        placeholder.style.display = 'inline';
    }
    if (s9_anim_step !== 0) return;
    s9_anim_step = 1;
    
    const typedTextEl = document.getElementById('s9-typed-text');
    const cursor = document.getElementById('s9-cursor');
    const userBubble = document.getElementById('s9-user-bubble');
    const userBubbleContainer = document.getElementById('s9-user-bubble-container');
    const aiBubbleContainer = document.getElementById('s9-ai-bubble-container');
    const promptToType = "What is the third planet from the sun?";
    if (placeholder) placeholder.style.display = 'none';
    if (cursor) cursor.classList.remove('opacity-0');
    let i = 0;
    function typeWriter() {
        if (i < promptToType.length) {
            if(typedTextEl) typedTextEl.textContent += promptToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            if (cursor) cursor.style.display = 'none';
            setTimeout(() => {
                if(typedTextEl) typedTextEl.textContent = '';
                if (placeholder) {
                    placeholder.textContent = 'Enter a prompt for Gemini';
                    placeholder.style.display = 'inline';
                }
            }, 800);
            setTimeout(() => {
                if (userBubble) userBubble.textContent = promptToType;
                if (userBubbleContainer) userBubbleContainer.classList.remove('opacity-0', 'translate-y-4');
            }, 500);
            setTimeout(() => {
                if (aiBubbleContainer) aiBubbleContainer.classList.remove('opacity-0', 'translate-y-4');
                s9_anim_step = 2;
                setTimeout(() => {
                    const incorrectAnswer = document.getElementById('s9-incorrect-answer');
                    incorrectAnswer?.classList.add('highlight');
                    s9_anim_step = 3;
                }, 1500);
                setTimeout(() => {
                    const incorrectAnswer = document.getElementById('s9-incorrect-answer');
                    if(incorrectAnswer) {
                        incorrectAnswer.innerHTML = '<strong>Earth</strong>';
                        incorrectAnswer.classList.remove('highlight');
                    }
                    s9_anim_step = 4;
                }, 3000);
            }, 1500);
        }
    }
    typeWriter();
  }

  // --- All Reset Functions ---
  function resetSlide2QuoteAnimation() {
    const quote = document.getElementById('slide2-quote');
    if (quote) {
      quote.classList.add('opacity-0');
      quote.classList.remove('opacity-100');
    }
  }

  function resetSlide3ChatAnimation() {
    const placeholder = document.getElementById('placeholder-text');
    const typedTextEl = document.getElementById('typed-text');
    const cursor = document.getElementById('typing-cursor');
    const userBubble = document.getElementById('user-prompt-bubble');
    const userBubbleContainer = document.getElementById('user-prompt-bubble-container');
    const aiBubbleContainer = document.getElementById('ai-response-bubble-container');
    if (typedTextEl) typedTextEl.textContent = '';
    if (placeholder) placeholder.style.display = 'inline';
    if (cursor) {
      cursor.style.display = 'inline-block';
      cursor.classList.add('opacity-0');
    }
    if (userBubble) userBubble.textContent = '';
    if (userBubbleContainer) userBubbleContainer.classList.add('opacity-0', 'translate-y-4');
    if (aiBubbleContainer) aiBubbleContainer.classList.add('opacity-0', 'translate-y-4');
  }

  function resetSlide4ChatAnimation() {
    s4_anim_step = 0;
    const elementsToReset = [
      { placeholder: 's4-basic-placeholder', typedText: 's4-basic-typed-text', cursor: 's4-basic-cursor', bubble: 's4-basic-bubble', bubbleContainer: 's4-basic-bubble-container' },
      { placeholder: 's4-tcrei-placeholder', typedText: 's4-tcrei-typed-text', cursor: 's4-tcrei-cursor', bubble: 's4-tcrei-bubble', bubbleContainer: 's4-tcrei-bubble-container' }
    ];
    elementsToReset.forEach(group => {
      const placeholder = document.getElementById(group.placeholder);
      const typedText = document.getElementById(group.typedText);
      const cursor = document.getElementById(group.cursor);
      const bubble = document.getElementById(group.bubble);
      const bubbleContainer = document.getElementById(group.bubbleContainer);
      if (placeholder) placeholder.style.display = 'inline';
      if (typedText) typedText.textContent = '';
      if (cursor) {
        cursor.classList.add('opacity-0');
        cursor.style.display = 'inline-block';
      }
      if (bubble) bubble.textContent = '';
      if (bubbleContainer) bubbleContainer.classList.add('opacity-0', 'translate-y-4');
    });
  }

  function resetSlide5FlowchartAnimation() {
    const flowchart = document.getElementById('tcrei-flowchart');
    if (flowchart) {
      flowchart.classList.remove('start-animation');
    }
  }

  function resetSlide6Animation() {
    s6_anim_step = 0;
    const placeholder = document.getElementById('s6-placeholder-text');
    const typedText = document.getElementById('s6-typed-text');
    const cursor = document.getElementById('s6-cursor');
    if (placeholder) placeholder.style.display = 'inline';
    if (typedText) typedText.textContent = '';
    if (cursor) {
      cursor.style.display = 'inline-block';
      cursor.classList.add('opacity-0');
    }
    const bubbleContainer = document.getElementById('s6-prompt-bubble-container');
    const promptText = document.getElementById('s6-prompt-text');
    if (bubbleContainer) bubbleContainer.classList.add('opacity-0', 'translate-y-4');
    if (promptText) promptText.innerHTML = '';
    document.querySelectorAll('#s6-callouts-container .s6-callout').forEach(el => el.classList.remove('visible'));
    const highlightedSpans = document.querySelectorAll('#s6-prompt-text span');
    highlightedSpans.forEach(span => {
      span.classList.remove('prompt-highlight', 'highlight-blue', 'highlight-yellow', 'highlight-coral');
    });
  }

  function resetSlide7Animation() {
    s7_anim_step = 0;
    const contextSpan = document.getElementById('s7-context-insertion');
    if (contextSpan) {
      contextSpan.innerHTML = '';
      contextSpan.classList.add('opacity-0');
    }
    document.querySelectorAll('#s7-callouts-container .s6-callout').forEach(el => el.classList.remove('visible'));
    const promptText = document.getElementById('s7-prompt-text');
    if (promptText) {
      const personaSpan = promptText.querySelector('.s7-persona');
      const taskSpan = promptText.querySelector('.s7-task');
      const formatSpan = promptText.querySelector('.s7-format');
      if (personaSpan) personaSpan.innerHTML = `You are a Project Manager at Flash with deep technical knowledge of the Flash Vision LPR (License Plate Recognition) system.`;
      if (taskSpan) taskSpan.innerHTML = `Provide a comprehensive technical response detailing how we implement Flash Vision LPR for clients.`;
      if (formatSpan) formatSpan.innerHTML = `Deliver your response as a professional, client-ready Markdown document that can be downloaded and shared.`;
    }
    const placeholder = document.getElementById('s7-placeholder');
    const typedText = document.getElementById('s7-typed-text');
    if (placeholder) placeholder.style.display = 'inline';
    if (typedText) typedText.textContent = '';
  }

  function resetSlide8Animation() {
    s8_anim_triggered = false;
    document.querySelectorAll('#s8-reference-grid .reference-card').forEach(card => {
      card.classList.remove('animate-in');
    });
  }

  function resetSlide9Animation() {
    s9_anim_step = 0;
  }
  
  function resetSlide11Animation() {
    document.querySelectorAll('.s11-tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.s11-content-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelector('.s11-tab-button[data-tab="1"]')?.classList.add('active');
    document.querySelector('.s11-content-pane[data-pane="1"]')?.classList.add('active');
  }

  function setupSlide11Tabs() {
    const tabContainer = document.getElementById('s11-tab-container');
    if (!tabContainer) return;
    tabContainer.addEventListener('click', (e) => {
        const clickedButton = e.target.closest('.s11-tab-button');
        if (!clickedButton) return;
        const tabNumber = clickedButton.getAttribute('data-tab');
        document.querySelectorAll('.s11-tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.s11-content-pane').forEach(pane => pane.classList.remove('active'));
        clickedButton.classList.add('active');
        document.querySelector(`.s11-content-pane[data-pane='${tabNumber}']`)?.classList.add('active');
    });
  }
  
  // --- Slide Navigation & Core Logic ---
  function updateProgressBar() {
    const percent = slides.length > 1 ? ((currentSlide) / (slides.length - 1)) * 100 : 0;
    if (progressBar) progressBar.style.width = percent + '%';
  }

  function updateNavTheme(activeSlide) {
    const theme = activeSlide.getAttribute('data-theme');
    navArrows.forEach(nav => {
      if (theme === 'dark') {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        nav.style.color = 'rgba(255, 255, 255, 0.6)';
        if (nav.id.startsWith('nav-')) {
          nav.innerHTML = nav.id === 'nav-left' ? SVG_ARROW_LEFT_DARK : SVG_ARROW_RIGHT_DARK;
        }
      } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        nav.style.color = 'rgba(0, 0, 0, 0.6)';
        if (nav.id.startsWith('nav-')) {
          nav.innerHTML = nav.id === 'nav-left' ? SVG_ARROW_LEFT_LIGHT : SVG_ARROW_RIGHT_LIGHT;
        }
      }
    });
    openDialogBtn?.classList.toggle('theme-dark', theme === 'dark');
    openDialogBtn?.classList.toggle('theme-light', theme !== 'dark');
  }

  function showSlide(newIndex) {
    const oldIndex = currentSlide;
    // Clear any pending animation from the old slide
    if (slideAnimationTimer) clearTimeout(slideAnimationTimer);

    if (oldIndex !== newIndex) {
      const resetFunctions = {
        1: resetSlide2QuoteAnimation, 2: resetSlide3ChatAnimation,
        3: resetSlide4ChatAnimation, 4: resetSlide5FlowchartAnimation,
        5: resetSlide6Animation, 6: resetSlide7Animation,
        7: resetSlide8Animation, 8: resetSlide9Animation,
        10: resetSlide11Animation
      };
      const resetFunction = resetFunctions[oldIndex];
      if (resetFunction) resetFunction();
    }
    
    currentSlide = newIndex;
    
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    // Schedule the animation for the new slide
    slideAnimationTimer = setTimeout(() => {
        switch (currentSlide) {
            case 1: // Slide 2
                const quote = document.getElementById('slide2-quote');
                if (quote) quote.classList.add('opacity-100');
                break;
            case 2: // Slide 3
                animateSlide3();
                break;
            case 3: // Slide 4
                animateSlide4();
                break;
            case 4: // Slide 5
                const flowchart = document.getElementById('tcrei-flowchart');
                if (flowchart) flowchart.classList.add('start-animation');
                break;
            case 5: // Slide 6
                animateSlide6();
                break;
            case 6: // Slide 7
                animateSlide7();
                break;
            case 7: // Slide 8
                if (!s8_anim_triggered) {
                    s8_anim_triggered = true;
                    const cards = document.querySelectorAll('#s8-reference-grid .reference-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => { card.classList.add('animate-in'); }, index * 100);
                    });
                }
                break;
            case 8: // Slide 9
                animateSlide9();
                break;
            case 10: // Slide 11
                if (!s11_initialized) {
                    setupSlide11Tabs();
                    s11_initialized = true;
                }
                break;
        }
    }, 2000); // 2-second delay

    if (slides[currentSlide]) {
      updateNavTheme(slides[currentSlide]);
    }
    updateProgressBar();
  }

  let navFadeTimeout;
  function showArrows() {
    navArrows.forEach(arrow => arrow.classList.remove('nav-arrow-hidden'));
    document.body.classList.remove('hide-cursor');
  }
  function hideArrows() {
    navArrows.forEach(arrow => arrow.classList.add('nav-arrow-hidden'));
    document.body.classList.add('hide-cursor');
  }
  function resetArrowFadeTimer() {
    showArrows();
    if (navFadeTimeout) clearTimeout(navFadeTimeout);
    navFadeTimeout = setTimeout(hideArrows, 2000);
  }

  // --- EVENT LISTENERS ---
  if (navRight) navRight.addEventListener('click', () => showSlide((currentSlide + 1) % slides.length));
  if (navLeft) navLeft.addEventListener('click', () => showSlide((currentSlide - 1 + slides.length) % slides.length));
  if (openDialogBtn) openDialogBtn.addEventListener('click', openScriptDialog);
  if (closeDialogBtn) closeDialogBtn.addEventListener('click', closeScriptDialog);
  if (scriptDialog) {
    scriptDialog.addEventListener('click', (e) => {
      if (e.target === scriptDialog) { // Only close if backdrop is clicked
        closeScriptDialog();
      }
    });
  }
  document.addEventListener('mousemove', resetArrowFadeTimer);

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'escape' && scriptDialog?.classList.contains('visible')) {
      closeScriptDialog();
      return;
    }
    if (key === 'arrowright' || key === 'arrowleft') {
      if (scriptDialog?.classList.contains('visible')) return; // Don't navigate slides if dialog is open
      const newIndex = key === 'arrowright' ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
      return;
    }
  });

  // --- Initial Setup Calls ---
  setupLogoCarousel();
  showSlide(currentSlide);
  resetArrowFadeTimer();
});