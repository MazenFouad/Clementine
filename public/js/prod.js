// var wishlistIcons = document.querySelectorAll('.ri-heart-line');

var popup = document.getElementById('popup');
$(document).on('click', '.ri-heart-line', async function () {
    var prodID = $(this).data('productid');
    document
        .getElementById('heart-icon-' + prodID)
        .setAttribute('class', 'ri-heart-fill');
    fetch('/add-to-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prodID }),
    })
        .then((res) => res.json())
        .then((data) => {
            let product = data.product;
            popup.classList.add('open-popup');
            popup.innerHTML = ``;
            popup.innerHTML += `You have added <span> ${product.name} </span>to your wishlist`;
            setTimeout(function () {
                popup.className = 'popup';
            }, 3000);
            
        });
});



// var removeWish = document.querySelectorAll('.ri-heart-fill');

$(document).on('click', '.ri-heart-fill', async function () {
    var wishprodID = $(this).data('productid');
    document
        .getElementById('heart-icon-' + wishprodID)
        .setAttribute('class', 'ri-heart-line');

    fetch('/remove-from-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishprodID }),
    });
});

var select = document.getElementById('sort');
var value = select.options[select.selectedIndex].value;

// let productContainer = document.querySelector('.product-container');

// $(document).on('click', '.ri-heart-line', async function () {
//     var prodid = $(this).data('productid');
//     fetch('/add-to-wishlist', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ payload: prodid }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         let payload = data.payload;
//         let products = data.product;
//         productContainer.innerHTML = '';

//         products.forEach((items) => {
//             productContainer.innerHTML += `<div class="box">`;
//             if (payload.id == items._id) {
//                 productContainer.innerHTML += `<a alt="" class="ri-heart-fill" data-productid="${items._id}"> </a>`;
//             } else {
//                 productContainer.innerHTML += `<a alt="" class="ri-heart-line" data-productid="${items._id}"> </a>`;
//             }
//             productContainer.innerHTML += ` <a href="/product/${items._id}"> <img class="imgg" src="/Images/${items.image}" alt=""> </a>
//         <div class="items">
//           <div class="prodetails">
//             <p>${items.name} </p>
//             <p class="price"> EGP ${items.price} </p>
//            </div>
//            <button class="cartbtn" data-cartitem="${items._id}"> Add to cart </button>
//         </div>
//      </div>`;});
//     });
// });

// $(document).on('click', '.ri-heart-fill', async function () {
//     var removewish = $(this).data('productid');

//     fetch('/remove-from-wishlist', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ payload: removewish }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         productContainer.innerHTML = '';
//         let payload = data.payload;
//         let products = data.product;
//         products.forEach((items) => {
//             productContainer.innerHTML += `<div class="box">`;
//             if (payload.includes(items._id)) {
//                 productContainer.innerHTML += `<a alt="" class="ri-heart-fill" data-productid="${items._id}"> </a>`;
//             } else {
//                 productContainer.innerHTML += `<a alt="" class="ri-heart-line" data-productid="${items._id}"> </a>`;
//             }
//             productContainer.innerHTML += ` <a href="/product/${items._id}"> <img class="imgg" src="/Images/${items.image}" alt=""> </a>
//         <div class="items">
//           <div class="prodetails">
//             <p>${items.name} </p>
//             <p class="price"> EGP ${items.price} </p>
//            </div>
//            <button class="cartbtn" data-cartitem="${items._id}"> Add to cart </button>
//         </div>
//      </div>`;});
//     });
// });
