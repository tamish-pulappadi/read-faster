// State Management
const state = {
  words: [],
  currentIndex: 0,
  wpm: 300,
  isPlaying: false,
  isPaused: false,
  timeoutId: null
};

// DOM Elements
const elements = {
  setupPanel: document.getElementById('setup-panel'),
  textInput: document.getElementById('text-input'),
  wpmSetup: document.getElementById('wpm-setup'),
  wpmSetupDisplay: document.getElementById('wpm-setup-display'),
  startBtn: document.getElementById('start-btn'),
  readingDisplay: document.getElementById('reading-display'),
  wordBefore: document.getElementById('word-before'),
  wordAnchor: document.getElementById('word-anchor'),
  wordAfter: document.getElementById('word-after'),
  progressIndicator: document.getElementById('progress-indicator'),
  controls: document.getElementById('controls'),
  wpmLive: document.getElementById('wpm-live'),
  wpmLiveDisplay: document.getElementById('wpm-live-display'),
  pauseBtn: document.getElementById('pause-btn'),
  stopBtn: document.getElementById('stop-btn'),
  themeToggle: document.getElementById('theme-toggle')
};

// Calculate anchor letter position based on word length
function calculateAnchorPosition(word) {
  const length = word.length;
  if (length <= 1) return 0;
  if (length <= 4) return 1;  // 2-4 letters: 2nd letter (index 1)
  if (length <= 6) return 2;  // 5-6 letters: 3rd letter (index 2)
  if (length <= 9) return 3;  // 7-9 letters: 4th letter (index 3)
  if (length <= 13) return 4; // 10-13 letters: 5th letter (index 4)
  return Math.floor(length * 0.35); // Very long words: ~35% position
}

// Parse text into words array
function parseText(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

// Display a single word with anchor highlighting
function displayWord(word) {
  const anchorIndex = calculateAnchorPosition(word);
  const before = word.substring(0, anchorIndex);
  const anchor = word.charAt(anchorIndex);
  const after = word.substring(anchorIndex + 1);

  elements.wordBefore.textContent = before;
  elements.wordAnchor.textContent = anchor;
  elements.wordAfter.textContent = after;

  // Update progress indicator
  elements.progressIndicator.textContent = `${state.currentIndex + 1} / ${state.words.length}`;

  // Check for sentence ending
  if (word.match(/[.!?]$/)) {
    return 1000; // 1 second pause for sentence endings
  }
  return 60000 / state.wpm; // Normal duration based on WPM
}

// Play the next word
function playWord() {
  if (!state.isPlaying || state.isPaused) return;

  if (state.currentIndex >= state.words.length) {
    // Reading complete
    stopReading();
    return;
  }

  const currentWord = state.words[state.currentIndex];
  const duration = displayWord(currentWord);

  state.currentIndex++;

  state.timeoutId = setTimeout(playWord, duration);
}

// Start reading session
function startReading() {
  const text = elements.textInput.value.trim();

  if (!text) {
    alert('Please enter some text to read.');
    return;
  }

  // Parse text and initialize state
  state.words = parseText(text);
  state.currentIndex = 0;
  state.isPlaying = true;
  state.isPaused = false;
  state.wpm = parseInt(elements.wpmSetup.value);

  // Sync live WPM slider with setup value
  elements.wpmLive.value = state.wpm;
  elements.wpmLiveDisplay.textContent = `${state.wpm} WPM`;

  // Show reading display and controls, hide setup panel
  elements.setupPanel.classList.add('hidden');
  elements.readingDisplay.classList.remove('hidden');
  elements.controls.classList.remove('hidden');

  // Start playing
  playWord();
}

// Pause reading
function pauseReading() {
  if (state.isPaused) {
    // Resume
    state.isPaused = false;
    elements.pauseBtn.textContent = 'Pause';
    playWord();
  } else {
    // Pause
    state.isPaused = true;
    elements.pauseBtn.textContent = 'Resume';
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }
  }
}

// Stop reading and return to setup
function stopReading() {
  state.isPlaying = false;
  state.isPaused = false;
  state.currentIndex = 0;

  if (state.timeoutId) {
    clearTimeout(state.timeoutId);
  }

  // Show setup panel, hide reading display and controls
  elements.setupPanel.classList.remove('hidden');
  elements.readingDisplay.classList.add('hidden');
  elements.controls.classList.add('hidden');

  // Clear word display
  elements.wordBefore.textContent = '';
  elements.wordAnchor.textContent = '';
  elements.wordAfter.textContent = '';

  // Reset pause button
  elements.pauseBtn.textContent = 'Pause';
}

// Update WPM in real-time
function updateWPM(newWPM) {
  state.wpm = parseInt(newWPM);
  elements.wpmLiveDisplay.textContent = `${state.wpm} WPM`;

  // If playing and not paused, restart timer with new WPM
  if (state.isPlaying && !state.isPaused) {
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }
    playWord();
  }
}

// Toggle theme between light and dark
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);

  // Store preference
  localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Event Listeners
elements.startBtn.addEventListener('click', startReading);
elements.pauseBtn.addEventListener('click', pauseReading);
elements.stopBtn.addEventListener('click', stopReading);
elements.themeToggle.addEventListener('click', toggleTheme);

// WPM slider updates
elements.wpmSetup.addEventListener('input', (e) => {
  elements.wpmSetupDisplay.textContent = `${e.target.value} WPM`;
});

elements.wpmLive.addEventListener('input', (e) => {
  updateWPM(e.target.value);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Only activate shortcuts when reading
  if (!state.isPlaying) {
    // Allow Enter to start reading when in setup
    if (e.key === 'Enter' && document.activeElement !== elements.textInput) {
      e.preventDefault();
      startReading();
    }
    return;
  }

  switch(e.key) {
    case ' ':
      e.preventDefault();
      pauseReading();
      break;
    case 'Escape':
      e.preventDefault();
      stopReading();
      break;
  }
});

// Initialize app
initTheme();

// Auto-focus text input on load
elements.textInput.focus();
