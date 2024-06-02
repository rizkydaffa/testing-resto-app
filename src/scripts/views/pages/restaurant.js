import RestaurantSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/creator';

const Restaurant = {
  async render() {
    return `
      <main id="mainContent" class="main-content">
        <section class="restaurant-section">
          <div class="restaurant-header">
            <h2 class="restaurant-title">Explore Our Restaurants</h2>
          </div>
          <div id="restaurant-list" class="restaurant-list"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();
    const restaurantList = document.getElementById('restaurant-list');

    restaurants.forEach((restaurant) => {
      restaurantList.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Restaurant;
