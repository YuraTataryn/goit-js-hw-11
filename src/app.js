import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let page = 1;
const perPage = 40;
let currentQuery = "";

async function searchImages(query) {
    try {
        const apiKey = "39195594-d036599af5c8df0785332a0c5";
        const response = await axios.get(
            `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch images from Pixabay.");
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        Notiflix.Notify.failure("Failed to fetch images. Please try again later.");
        return null;
    }
}

function renderImages(images) {
    images.forEach((image) => {
        const card = document.createElement("div");
        card.classList.add("photo-card");
        card.innerHTML = `
            <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
            </div>
        `;
        gallery.appendChild(card);
    });
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    gallery.innerHTML = "";
    loadMoreButton.style.display = "none";
    page = 1;
    currentQuery = e.target.searchQuery.value.trim();

    if (currentQuery === "") {
        return;
    }

    const result = await searchImages(currentQuery);

    if (result && result.hits.length > 0) {
        renderImages(result.hits);
        if (result.totalHits > perPage) {
            loadMoreButton.style.display = "block";
        }
    } else {
        console.error("No images found for the query:", currentQuery);
        Notiflix.Notify.warning("No images found for the query.");
    }
});

loadMoreButton.addEventListener("click", async () => {
    page++;
    const result = await searchImages(currentQuery);

    if (result && result.hits.length > 0) {
        renderImages(result.hits);
        if (page * perPage >= result.totalHits) {
            loadMoreButton.style.display = "none";
            console.log("You've reached the end of search results.");
        }
    }
});










// import axios from 'axios';
// import Notiflix from 'notiflix'; 

// const searchForm = document.getElementById("search-form");
// const gallery = document.querySelector(".gallery");
// const loadMoreButton = document.querySelector(".load-more");

// let page = 1;
// const perPage = 40;
// let currentQuery = "";

// async function searchImages(query) {
//     try {
//         const apiKey = "39195594-d036599af5c8df0785332a0c5";
//         const response = await axios.get(
//             `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching images:", error);
//         showErrorMessage();
//         return null;
//     }
// }

// function renderImages(images) {
//     images.forEach((image) => {
//         const card = document.createElement("div");
//         card.classList.add("photo-card");
//         card.innerHTML = `
//             <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
//             <div class="info">
//                 <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//                 <p class="info-item"><b>Views:</b> ${image.views}</p>
//                 <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//                 <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//             </div>
//         `;
//         gallery.appendChild(card);
//     });
// }

// searchForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     gallery.innerHTML = "";
//     loadMoreButton.style.display = "none";
//     page = 1;
//     currentQuery = e.target.searchQuery.value.trim();

//     if (currentQuery === "") {
//         return;
//     }

//     const result = await searchImages(currentQuery);

//     if (result && result.hits.length > 0) {
//         renderImages(result.hits);
//         if (result.totalHits > perPage) {
//             loadMoreButton.style.display = "block";
//         }
//         showSuccessMessage();
//     } else {
//         console.error("No images found for the query:", currentQuery);
//     }
// });

// loadMoreButton.addEventListener("click", async () => {
//     page++;
//     const result = await searchImages(currentQuery);

//     if (result && result.hits.length > 0) {
//         renderImages(result.hits);
//         if (page * perPage >= result.totalHits) {
//             loadMoreButton.style.display = "none";
//             console.log("You've reached the end of search results.");
//         }
//     }
// });

// function showSuccessMessage() {
//     Notiflix.Notify.success("Зображення успішно знайдено!");
// }

// function showErrorMessage() {
//     Notiflix.Notify.failure("Помилка пошуку зображень. Спробуйте ще раз.");
// }














// 39195594-d036599af5c8df0785332a0c5

