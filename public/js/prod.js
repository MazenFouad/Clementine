
const wishlistIcon = document.getElementById('heart-icon');

wishlistIcon.addEventListener('click', async () => {

  const prodID = wishlistIcon.dataset.productId;

  const response = await fetch('/wishlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prodID })
  });
});