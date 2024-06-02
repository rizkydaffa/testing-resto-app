import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../templates/creator';

const Favorite = {
  async render() {
    return `
      <main id="mainContent" class="main-content">
        <section class="favorite-section">
          <div class="favorite-header">
            <h2 class="favorite-title">Your Favorite Restaurants</h2>
          </div>
          <div id="favorite-list" class="favorite-list"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const favoriteList = document.getElementById('favorite-list');

    if (restaurants.length === 0) {
      favoriteList.innerHTML = `
        <div class="empty-favorite">
          <p>No favorite restaurants found.</p>
        </div>
      `;
    } else {
      restaurants.forEach((restaurant) => {
        favoriteList.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
