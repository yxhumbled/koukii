// The page is intentionally plain JavaScript so it works on GitHub Pages and offline.
const revealButton = document.querySelector('#reveal-button');
const hiddenMessage = document.querySelector('#hidden-message');
const confettiLayer = document.querySelector('#confetti-layer');

// Reveal the note and add a tiny burst of hearts/sparkles. Click again to tuck it away.
revealButton.addEventListener('click', () => {
  const isOpening = hiddenMessage.hidden;
  hiddenMessage.hidden = !isOpening;
  revealButton.setAttribute('aria-expanded', String(isOpening));
  revealButton.textContent = isOpening ? 'Hide it' : 'Show me';
  if (isOpening) makeLittleBurst();
});

function makeLittleBurst() {
  const marks = ['♡', '✦', '♥', '✧'];
  for (let i = 0; i < 12; i += 1) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.textContent = marks[i % marks.length];
    bit.style.setProperty('--x', `${Math.round(Math.random() * 260 - 130)}px`);
    bit.style.setProperty('--y', `${Math.round(Math.random() * -150 - 20)}px`);
    bit.style.setProperty('--turn', `${Math.round(Math.random() * 70 - 35)}deg`);
    confettiLayer.append(bit);
    bit.addEventListener('animationend', () => bit.remove(), { once: true });
  }
}

// Missing photo files show the cute scrapbook placeholder instead of a broken-image icon.
document.querySelectorAll('.photo-frame img').forEach((photo) => {
  const showFallback = () => photo.closest('.photo-frame').classList.add('is-missing');
  photo.addEventListener('error', showFallback);
  if (photo.complete && photo.naturalWidth === 0) showFallback();
});

// A tiny original melody made with Web Audio, so the site needs no music file or service.
const songButton = document.querySelector('#song-button');
const songSection = document.querySelector('.song-section');
let audioContext;
let songTimer;
let songStep = 0;

// Note frequencies for a gentle little major-key loop.
const tune = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 392.00];

function playNote(frequency, startTime) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.34);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + 0.36);
}

function playNextNote() {
  if (audioContext.state === 'suspended') audioContext.resume();
  playNote(tune[songStep % tune.length], audioContext.currentTime);
  songStep += 1;
  songTimer = window.setTimeout(playNextNote, 390);
}

songButton.addEventListener('click', async () => {
  if (songTimer) {
    window.clearTimeout(songTimer);
    songTimer = undefined;
    songButton.textContent = '▶ Play the tiny song';
    songButton.setAttribute('aria-pressed', 'false');
    songSection.classList.remove('is-playing');
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    songButton.textContent = 'Song unavailable in this browser';
    songButton.disabled = true;
    return;
  }
  audioContext ??= new AudioContextClass();
  await audioContext.resume();
  songButton.textContent = '■ Pause the tiny song';
  songButton.setAttribute('aria-pressed', 'true');
  songSection.classList.add('is-playing');
  playNextNote();
});
