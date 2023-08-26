// app.js

import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual Pixabay API key
const PER_PAGE = 40;
let currentPage = 1;
let currentQuery = '';

const lightbox = new SimpleLightbox('.photo-card a');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = e.target.searchQuery.value.trim();
  currentPage = 1;
  gallery.innerHTML = '';

  searchImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  searchImages();
});

async function searchImages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    const imagesMarkup = hits
      .map((image) => `
        <div class="photo-card">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      `)
      .join('');

    gallery.insertAdjacentHTML('beforeend', imagesMarkup);
    lightbox.refresh();

    if (currentPage < Math.ceil(totalHits / PER_PAGE)) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    scrollToNextGroup();
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
}

function scrollToNextGroup() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
