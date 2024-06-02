/* eslint-disable no-undef */
import FavoriteRestaurant from '../src/scripts/data/favorite-resto-idb';
import LikeButtonHandler from '../src/scripts/utils/like-button-presenter';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unlike Resto', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurant.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should show unlike icon when already liked', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not show like icon when already liked', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });
    expect(document.querySelector('[aria-label="like restaurant"]')).toBeFalsy();
  });

  it('should be able to remove like', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getRestaurant(1)).toEqual(undefined);
  });

  it('should not error if unlike not in list', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });
    await FavoriteRestaurant.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getRestaurant(1)).toEqual(undefined);
  });
});
