import RestaurantSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import { createRestaurantDetailTemplate } from '../templates/creator';
import Reviewresto from '../../utils/review';

const Detail = {
  async render() {
    return `
      <div class="detail-container">
        <div class="restaurant-detail" id="detail-rest"></div>
        <div class="like-button-container" id="likeButtonContainer"></div>
      </div>

      <div class="form-review-container">
        <h2 class="review-header">Write a Review</h2>
        <form id="review-form" class="review-form">
          <div class="form-group">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName" required>
          </div>
          <div class="form-group">
            <label for="inputReview" class="form-label">Review</label>
            <textarea class="form-control" id="inputReview" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#detail-rest');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(
      restaurant.restaurant,
    );

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      Reviewresto();
    });
  },
};

export default Detail;
