const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/categories`
  );
  const data = await response.json();
  showCategories(data.categories);
  return;
};

const showCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.id = item.category_id;
    button.textContent = item.category;
    button.addEventListener("click", () => {
      loadVidByCategory(item.category_id);
    });
    categoryContainer.appendChild(button);
  });
};

const loadVideos = async () => {
  const allBtn = document.getElementById("all-btn");
  allBtn.classList.add("btn-error");
  const activated = document.getElementsByClassName("btn-error");
  if (activated.length > 1) {
    activated[1].classList.remove("btn-error");
  }
  const noVideoContainer = document.getElementById("no-video-container");
  noVideoContainer.classList.add("hidden");
  try {
    showSpinner();
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos`
    );

    if (!response.status) {
      throw new Error(`HTTP error! Status:${response.status}`);
    }
    const data = await response.json();
    showVideos(data.videos);
    if (!data?.videos) {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.log("failed to load. Error:", error.message);
  } finally{
    hideSpinner();
  }
};

const getTime = (seconds) => {
  const units = [
    { label: "y", seconds: 60 * 60 * 24 * 365 },
    { label: "m", seconds: 60 * 60 * 24 * 30 },
    { label: "d", seconds: 60 * 60 * 24 },
    { label: "h", seconds: 60 * 60 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];
  let remaining = seconds;
  let result = [];
  for (const unit of units) {
    const count = Math.floor(remaining / unit.seconds);
    if (count > 0) {
      result.push(count + unit.label);
      remaining %= unit.seconds;
    }
    if (result.length === 2) break;
  }
  return (time = result.join(" ") + " ago");
};

const noVideo = () => {
  const videoContainer = document.getElementById("video-container");
  const noVideoContainer = document.getElementById("no-video-container");
  noVideoContainer.classList.remove("hidden");
  videoContainer.innerHTML = "";
  noVideoContainer.innerHTML = "";
  const noVideoPage = document.createElement("div");
  noVideoPage.className = "h-[40vh] flex flex-col justify-center items-center";
  noVideoPage.innerHTML = `
      <img src="assets/icon.png" class="w-40 block mx-auto" />
        <h2 class="font-bold text-2xl text-center mx-auto w-80"> Oops!! Sorry, There is no content here </h2>
      `;
  noVideoContainer.appendChild(noVideoPage);
};

const isActiveBtn = (id) => {
  const activeBtn = document.getElementsByClassName("btn-error");
  if (activeBtn.length > 0) activeBtn[0].classList.remove("btn-error");
  const clickedBtn = document.getElementById(id);
  clickedBtn.classList.add("btn-error");
};

const showSpinner = ()=> {
  const spinner = document.getElementById('spinner');
  spinner.classList.add('flex');
  spinner.classList.remove('hidden');
}

const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.classList.add('hidden');
  spinner.classList.remove("flex");
}

const showVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "card shadow-sm";
    videoCard.innerHTML = `
    <figure class="relative">
            <img class="w-full object-cover h-[200px]" src="${
              video.thumbnail
            }" />
            <p class="absolute ${
              video.others.posted_date ? "" : "hidden"
            } bottom-2 right-2 bg-[rgba(0,0,0,0.5)] text-white p-1 rounded-sm text-sm">${getTime(
      video.others?.posted_date
    )}</p>
          </figure>
          <div class="card-body">
            <div class="flex flex-row gap-3">
              <img class="h-[50px] w-[50px] object-cover rounded-full" src="${
                video.authors[0].profile_picture
              }">
              <div class="w-5/6">
                <h2 class="font-bold mb-2">
                  ${video.title}
                </h2>
                <p class="text-gray-500">${video.authors[0].profile_name} ${
      video.authors[0].verified
        ? '<span class="text-blue-700"><i class="fa-solid fa-circle-check"></i></span>'
        : ""
    }</p>
                <p class="text-gray-500">${video.others.views} views</p>
              </div>
            </div>
          </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

const loadVidByCategory = async (categoryId) => {
  isActiveBtn(categoryId);
  const noVideoContainer = document.getElementById("no-video-container");
  noVideoContainer.classList.add("hidden");
  try {
    showSpinner();
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`
    );
    const data = await response.json();
    if (!data.status) {
      noVideo();
    } else {
      showVideos(data.category);
    }
  } catch (error) {
    console.log("failed to load. Error:", error);
  } finally{
    hideSpinner();
  }
};

const handleSearch = async () => {
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  const activeBtn = document.getElementsByClassName("btn-error");
  if (activeBtn.length > 0) activeBtn[0].classList.remove("btn-error");
  const noVideoContainer = document.getElementById("no-video-container");
  noVideoContainer.classList.add("hidden");

  try {
    showSpinner();
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    const data = await response.json();
    if (data.videos.length > 0) {
      showVideos(data.videos);
    } else {
      noVideo();
    }
  } catch (error) {
    console.log("Error loading content. Error:", error.message);
  } finally{
    hideSpinner();
  }
};

loadCategories();
loadVideos();
