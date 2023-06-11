//Fetch product categories for search
fetch('https://diwserver.vps.webdock.cloud/products/categories')
    .then(response => response.json())
    .then(data => {
        const categories = document.getElementById('categories');
        categories.innerHTML += `
        <option value="-">-</option>
        `
        for(let i = 0; i < data.length; i++) {
            categories.innerHTML += `
            <option value="${data[i]}">${data[i]}</option>
            `
        }
    })
    .catch(error => {
        console.log('API ERROR:', error);
    });

let url = 'https://diwserver.vps.webdock.cloud/products'
const params = new URLSearchParams(window.location.search);
console.log(params)
if (params.size !== 0) {
    const category =  params.get("category");
    url = `https://diwserver.vps.webdock.cloud/products/category/${category}`
}

function enviarForm(event) {
    event.preventDefault()
    let page = window.location.origin + window.location.pathname;
    const selectedCategory = document.getElementById('categories').value
    if (selectedCategory !== '-' ) {
        page = page + `?category=${selectedCategory}`
    }
    window.location.href = page;

}



// Fetch product data from FakeStore API carrousell
fetch(url)
    .then(response => response.json())
    .then(data => {

        // Fetch product data from FakeStore API carrousell
        const carouselItems = document.querySelectorAll('.carousel-item');
        for (let i = 0; i < carouselItems.length; i++) {
            const item = carouselItems[i];
            const product = data.products[i];

            const img = item.querySelector('img');
            img.src = product.image;

            const caption = item.querySelector('.carousel-caption');
            const title = caption.querySelector('h5');
            title.textContent = product.title;
        }

        // Fetch products from Fakestore API cards
        const productList = document.getElementById('product-list');
        for (let i = 0; i < 9; i++) {
            const product = data.products[i];
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" width="200" height="150" alt="...">
                <div class="card-body">
                    <a class="card-title" href="/Trabalho-2/detalhes.html?product=${product.id}">${product.title}</a>
                    <div class="d-flex justify-content-between align-items-center">
                    <p class="cards-categoria"><strong>Category</strong>: ${product.category}</h5>
                    </div>
                    <p class="card-text">R$${product.price}</p>
                </div>
            </div>
        `;

            productList.appendChild(card);
        }

        //barra lateral
        const produtosLaterais = document.getElementById('produtosLaterais');
        for (let i = 0; i < 5; i++) {
            const product = data.products[i];
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.image}" class="img-fluid rounded" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="ratings">
                                        <p>Rating: ${product.rating.rate}</p>
                                    </div>
                                </div>
                                <p class="card-text"><small class="text-body-secondary"><strong>R$${product.price}</strong></small></p>
                            </div>
                        </div>
                    </div>
                </div>
    `;

            produtosLaterais.appendChild(card);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

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


