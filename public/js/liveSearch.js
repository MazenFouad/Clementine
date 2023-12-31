function sendData(inputField) {
  const searchResults = document.getElementById('searchResults');

  fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payload: inputField.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      let payload = data.payload;
      searchResults.innerHTML = '';
      if (payload.length < 1) {
        searchResults.innerHTML =
          '<p>Nothing was found, try a different word</p>';
      }
      else {
        payload.forEach((item, index) => {
          if (index > 0) {
            searchResults.innerHTML += `<hr>`
          }
          searchResults.innerHTML += `<a href="/product/${item._id}"> <img src="/Images/${item.image}"><p>${item.name}</p></a>`
        });
        return;
      }
    });

  if (inputField.value === '') {
    searchResults.innerHTML = '';
    //toring to fix en search results not cleared lama user ymsah
  }
}
