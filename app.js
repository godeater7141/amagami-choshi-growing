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

  const media = document.createElement("div");
  media.className = "card-media";
  if (spot.image) {
    const img = document.createElement("img");
    img.src = spot.image;
    img.alt = spot.name;
    img.loading = "lazy";
    media.appendChild(img);
  }
  article.appendChild(media);

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = spot.tag;
  article.appendChild(tag);

  const title = document.createElement("h3");
  title.textContent = spot.name;
  article.appendChild(title);

  const summary = document.createElement("p");
  summary.textContent = spot.summary;
  article.appendChild(summary);

  const tip = document.createElement("p");
  tip.innerHTML = "<strong>メモ:</strong> ";
  tip.append(document.createTextNode(spot.tip));
  article.appendChild(tip);

  return article;
}

function createPanel(text) {
  const article = document.createElement("article");
  article.className = "panel";
  const p = document.createElement("p");
  p.textContent = text;
  article.appendChild(p);
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
      const strong = document.createElement("strong");
      strong.textContent = step.title;
      const span = document.createElement("span");
      span.textContent = step.body;
      li.append(strong, span);
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
