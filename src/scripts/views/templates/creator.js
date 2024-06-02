import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
<article class="resto-item" tabindex="0">
  <a href="/#/detail/${restaurant.id}" class="resto-link">
    <div class="resto-image-container">
      <img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}" class="resto-item-image" tabindex="0"/>
    </div>
    <div class="resto-info">
      <p class="resto-item-city" aria-label="Restaurant location: ${restaurant.city}" tabindex="0">
        ${restaurant.city}
        <span class="resto-item-rating" aria-label="Rating: ${restaurant.rating}">&star; ${restaurant.rating}</span>
      </p>
      <h2 class="resto-item-name" tabindex="0">${restaurant.name}</h2>
      <p class="resto-item-desc" tabindex="0">${restaurant.description}</p>
    </div>
  </a>
</article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<section class="restaurant">
  <div class="restaurant-detail-wrapper">
    <div class="resto-item-image-container">
      <img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="Image of ${restaurant.name}" class="detail-img" tabindex="0"/>
    </div>
    <div class="detail-info">
      <h2 class="detail-name-address-rating resto-name" tabindex="0">${restaurant.name}</h2>
      <p class="resto-address" tabindex="0"><i class="fa fa-map-marker-alt icon-primary"></i> ${restaurant.address}, ${restaurant.city}</p>
      <p class="resto-rating" tabindex="0"><i class="fa fa-star icon-primary"></i> ${restaurant.rating}</p>
      <p class="detail-desc" tabindex="0">${restaurant.description}</p>
      <div class="restaurant-detail-category">
        ${restaurant.categories.map((category) => `<span class="category">${category.name}</span>`).join('')}
      </div>
    </div>
  </div>
  <div class="restaurant-detail-menu-list">
    <h3 class="explore-restaurant-label">Menu</h3>
    <div class="foods">
      <h4 class="detail-info">Food</h4>
      <ul class="restaurant-detail-foods">
        ${restaurant.menus.foods.map((food) => `<li class="menu-item"><i class="fa fa-utensils icon-primary"></i> ${food.name}</li>`).join('')}
      </ul>
    </div>
    <div class="drinks">
      <h4 class="detail-info">Drink</h4>
      <ul class="restaurant-detail-drinks">
        ${restaurant.menus.drinks.map((drink) => `<li class="menu-item"><i class="fa fa-coffee icon-primary"></i> ${drink.name}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="restaurant-detail-review">
    <h3 class="explore-restaurant-label">Reviews</h3>
    ${restaurant.customerReviews.map((review) => `
      <div class="detail-review-item">
        <div class="header-review">
          <p class="name-review"><i class="fa fa-user icon-primary"></i> ${review.name}</p>
          <p class="date-review">${review.date}</p>
        </div>
        <div class="body-review">${review.review}</div>
      </div>
    `).join('')}
  </div>
</section>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="Like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="Unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
