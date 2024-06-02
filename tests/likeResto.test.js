/* eslint-disable no-undef */
import LikeButtonHandler from '../src/scripts/utils/like-button-presenter';
import FavoriteRestaurant from '../src/scripts/data/favorite-resto-idb';

describe('Like a Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show like button when not liked before', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });

    // Logging untuk memastikan elemen ada
    console.log(document.querySelector('[aria-label="Like This Restaurant"]'));
    expect(document.querySelector('[aria-label="Like This Restaurant"]')).toBeTruthy();
  });

  it('should not show unlike button when not liked before', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });
    expect(document.querySelector('[aria-label="Unlike This Restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add the restaurant again when already liked', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
      favoriteRestaurants: FavoriteRestaurant,
    });

    await FavoriteRestaurant.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);

    await FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add restaurant when it has no id', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
      favoriteRestaurants: FavoriteRestaurant,
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
