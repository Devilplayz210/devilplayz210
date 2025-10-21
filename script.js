// ==========================
// DARK / LIGHT MODE TOGGLE
// ==========================
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// ==========================
// FETCH LATEST VIDEOS FROM YOUTUBE API
// ==========================
const apiKey = 'AIzaSyCOjmfN9cdRkQHYNUPL1DtVXVvfUQM_Je0';
const channelId = 'UC9zB6FFeOwdWT_aAjruvT2w';
const maxResults = 5;

const videoGrid = document.querySelector('.video-grid');

async function fetchVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
    );
    const data = await response.json();

    // Clear any existing content
    videoGrid.innerHTML = '';

    // Loop through videos
    data.items.forEach(item => {
      if (item.id.kind === "youtube#video") {
        const videoId = item.id.videoId;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.frameBorder = 0;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        videoGrid.appendChild(iframe);
      }
    });
  } catch (err) {
    console.error("Error fetching videos:", err);
    videoGrid.innerHTML = "<p>Unable to load videos at the moment.</p>";
  }
}

// Call the function on page load
fetchVideos();