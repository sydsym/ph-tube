const categoryContainer = document.getElementById("category-container");

const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/categories`
  );
  const data = await response.json();
  showCategories(data.categories);
  return;
};

const showCategories = (categories) => {
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.id = item.category_id;
    button.textContent = item.category;
    categoryContainer.appendChild(button);
  });
};

const loadVideos = async (category = "") => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${category}`
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
  }
};

const getTime = (seconds) =>{
  
};
const showVideos = (videos) => {
  videos.forEach((video) => {
    console.log(video)
    const videoContainer = document.getElementById("video-container");
    const videoCard = document.createElement("div");
    videoCard.className = "card shadow-sm";
    videoCard.innerHTML = `
    <figure class="relative">
            <img class="content-cover h-[200px]" src="${video.thumbnail}" />
            <p class="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.5)] text-white p-1 rounded-sm text-sm">absolute</p>
          </figure>
          <div class="card-body">
            <div class="flex flex-row gap-3">
              <img class="h-[50px] rounded-full" src="https://i.ibb.co/D9wWRM6/olivia.jpg">
              <div class="w-5/6">
                <h2 class="font-bold mb-2">
                  Building a Winning UX Strategy Using the Kano Model
                </h2>
                <p class="text-gray-500">autor name <span class="text-blue-700"><i class="fa-solid fa-circle-check"></i></span></p>
                <p class="text-gray-500">10k views</p>
              </div>
            </div>
          </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

loadCategories();
loadVideos();
