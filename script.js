// The page is intentionally plain JavaScript so it works on GitHub Pages and offline.
const revealButton = document.querySelector('#reveal-button');
const hiddenMessage = document.querySelector('#hidden-message');
const confettiLayer = document.querySelector('#confetti-layer');
const openButton = document.querySelector('#open-surprise');
const songSection = document.querySelector('.song-section');
const birthdaySong = document.querySelector('#birthday-song');
const songCaption = document.querySelector('#song-caption');

function updateSongState(isPlaying) {
  songSection.classList.toggle('is-playing', isPlaying);
}

async function startSong() {
  try {
    await birthdaySong.play();
    updateSongState(true);
    songCaption.textContent = 'A little soundtrack for your surprise 🎶';
  } catch (error) {
    // Some browsers still require a direct tap on the visible audio player's play control.
    updateSongState(false);
    songCaption.textContent = 'Tap play in the little audio player if it didn’t start 🎶';
  }
}

// The opening click is the visitor's gesture that lets browsers start the tune.
openButton.addEventListener('click', () => {
  document.body.classList.remove('locked');
  document.body.classList.add('is-open');
  startSong();
  window.setTimeout(() => {
    document.querySelector('#apology').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
});

// Keep the button and little music doodle in sync with playback.
birthdaySong.addEventListener('play', () => updateSongState(true));
birthdaySong.addEventListener('pause', () => updateSongState(false));
birthdaySong.addEventListener('ended', () => {
  updateSongState(false);
  songCaption.textContent = 'That was the song I picked for you 💗';
});

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

