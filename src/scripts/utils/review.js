import RestaurantSource from '../data/restaurantdb-source';
import UrlParser from '../routes/url-parser';

const Reviewresto = async () => {
  const url = UrlParser.parseActiveUrlWithoutCombiner();
  const inputReviewName = document.getElementById('inputName');
  const inputReview = document.getElementById('inputReview');
  const reviewContainer = document.querySelector('.detail-review');

  const dataInput = {
    id: url.id,
    name: inputReviewName.value,
    review: inputReview.value,
  };

  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const newReview = `
    <div class="detail-review-item">
      <div class="header-review">
        <p class="name-review"><i title="restaurant" class="fa fa-user" style="font-size:1.5em; padding-right:15px;"></i>${dataInput.name}</p>
        <p class="date-review">${date}</p>
      </div>
      <div class="body-review">
        ${dataInput.review}
      </div>
    </div>
  `;

  await RestaurantSource.Reviewresto(dataInput);
  reviewContainer.innerHTML += newReview;
  inputReviewName.value = '';
  inputReview.value = '';
};

export default Reviewresto;
