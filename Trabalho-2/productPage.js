const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
console.log(product);

// Fetch products from Fakestore API cards
fetch('https://diwserver.vps.webdock.cloud/products/'+product)
    .then(response => response.json())
    .then(data => {
        const productElement = document.getElementById('secao-produto');

            const card = document.createElement('div');
            const productData = data;
            console.log(productData);
            card.className = 'col';
            card.innerHTML = `
            <div class="product-page">
                <img src="${productData.image}">
                <div class="card-body">
                    <h2 class="card-title">${productData.title}</h2>
                    <p class="price">R$${productData.price}</p>
                    <div>
                    <p class="description"><strong>Description</strong>: ${productData.description}</p>
                    </div>
                </div>
            </div>
        `;

            productElement.appendChild(card);
        }
    );

    function pesquisa(event) {
        event.preventDefault()
        const pesquisa = document.getElementById('search-input').value
        const pesquisaMobile = document.getElementById('search-input-mobile').value
        console.log(pesquisa);
        if (pesquisa !== '') {
            window.location.href = `pesquisa.html?query=${pesquisa}`;
        }
        if (pesquisaMobile !== '') {
            window.location.href = `pesquisa.html?query=${pesquisa}`;
        }
    }

