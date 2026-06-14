const songs = [
  { title: "하늘색 멜로디", producer: "K-Producer", tags: ["ballad", "감성", "vocaloid"] },
  { title: "별빛 리듬", producer: "MikuLab", tags: ["electronic", "dance", "신나는"] },
  { title: "비 오는 밤", producer: "SynthWave", tags: ["lofi", "mood", "잔잔한"] },
  { title: "새벽의 파편", producer: "NightTone", tags: ["ballad", "night", "서정"] },
  { title: "초여름 스텝", producer: "SunnyNote", tags: ["pop", "bright", "경쾌"] },
  { title: "메아리 정원", producer: "EchoCraft", tags: ["ambient", "dream", "몽환"] }
];

const songGrid = document.getElementById("songGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const commentBtn = document.getElementById("commentBtn");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

function renderSongs(list) {
  songGrid.innerHTML = "";

  if (list.length === 0) {
    songGrid.innerHTML = `
      <div class="song-card">
        <h3>검색 결과가 없습니다.</h3>
        <p>다른 키워드로 다시 검색해보세요.</p>
      </div>
    `;
    return;
  }

  list.forEach(song => {
    const card = document.createElement("article");
    card.className = "song-card";
    card.innerHTML = `
      <h3>${song.title}</h3>
      <p>프로듀서: ${song.producer}</p>
      <div class="badges">
        ${song.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}
      </div>
    `;
    songGrid.appendChild(card);
  });
}

function searchSongs() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(keyword) ||
    song.producer.toLowerCase().includes(keyword) ||
    song.tags.some(tag => tag.toLowerCase().includes(keyword))
  );
  renderSongs(filtered);
}

searchBtn.addEventListener("click", searchSongs);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchSongs();
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderSongs(songs);
});

commentBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  const p = document.createElement("p");
  p.innerHTML = `<strong>익명</strong> · ${text}`;
  commentList.prepend(p);
  commentInput.value = "";
});

renderSongs(songs);
