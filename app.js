async function loadData() {
  const response = await fetch("./data/site-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load site data: ${response.status}`);
  }
  return response.json();
}

function createCard(spot) {
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `
    <span class="tag">${spot.tag}</span>
    <h3>${spot.name}</h3>
    <p>${spot.summary}</p>
    <p><strong>メモ:</strong> ${spot.tip}</p>
  `;
  return article;
}

function createPanel(text) {
  const article = document.createElement("article");
  article.className = "panel";
  article.innerHTML = `<p>${text}</p>`;
  return article;
}

async function boot() {
  try {
    const data = await loadData();

    const spotGrid = document.getElementById("spotGrid");
    data.spots.forEach((spot) => spotGrid.appendChild(createCard(spot)));

    const courseList = document.getElementById("courseList");
    data.course.forEach((step) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${step.title}</strong><span>${step.body}</span>`;
      courseList.appendChild(li);
    });

    const highlights = document.getElementById("highlights");
    data.highlights.forEach((item) => highlights.appendChild(createPanel(item)));

    const etiquetteList = document.getElementById("etiquetteList");
    data.etiquette.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      etiquetteList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div style="padding:16px;background:#fee;border-bottom:1px solid #d99;color:#700">サイトデータの読み込みに失敗しました。ローカル配信で開いてください。</div>`
    );
  }
}

boot();
