// DARK / LIGHT MODE
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// YOUTUBE API
const apiKey = 'AIzaSyCOjmfN9cdRkQHYNUPL1DtVXVvfUQM_Je0';
const channelId = 'UC9zB6FFeOwdWT_aAjruvT2w';
const maxResults = 10;

const track = document.querySelector('.carousel-track');

async function fetchVideos() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
    );
    const data = await res.json();
    track.innerHTML = '';

    data.items.forEach(item => {
      if(item.id.kind === "youtube#video") {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        track.appendChild(iframe);
      }
    });
  } catch(err) {
    console.error("Error fetching videos:", err);
    track.innerHTML = "<p>Unable to load videos.</p>";
  }
}
fetchVideos();

// CAROUSEL FUNCTION
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');
let position = 0;

btnLeft.addEventListener('click', () => {
  const slideWidth = track.children[0].offsetWidth + 20;
  position = Math.min(position + slideWidth, 0);
  track.style.transform = `translateX(${position}px)`;
});

btnRight.addEventListener('click', () => {
  const slideWidth = track.children[0].offsetWidth + 20;
  const maxTranslate = -(track.scrollWidth - track.offsetWidth);
  position = Math.max(position - slideWidth, maxTranslate);
  track.style.transform = `translateX(${position}px)`;
});
