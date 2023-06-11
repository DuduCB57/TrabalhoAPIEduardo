const params = new URLSearchParams(window.location.search);
const query =  params.get("query");
if (query !== null) {
    url = `https://diwserver.vps.webdock.cloud/products/search?query=${query}`
    fetch(url)
        .then(response => response.json())
        .then(data => {


            const products = document.getElementById('secao-pesquisa');
            if (data.length < 10) {
                for (let i = 0; i < data.length; i++) {
                    const product = data[i];
                    products.innerHTML += `
                        <div class="row align-items-center" onclick="productDetail(${product.id})" style="cursor: pointer">
                            <div class="col-3 my-2" >
                                    <img src=${product.image} class="img-fluid img-thumbnail" alt=${product.title}>
                            </div>
                            <div class="col-9" >
                                    <h6>${product.title}</h6>
                                    <h6>Price: R#${product.price}</h6>
                                    <h6>Rating: ${product.rating.rate}</h6>
                             </div>
                        </div>
                    `
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    const product = data[i];
                    products.innerHTML += `
                        <div class="row align-items-center" onclick="productDetail(${product.id})" style="cursor: pointer">
                            <div class="col-3 my-2" >
                                    <img src=${product.image} class="img-fluid img-thumbnail" alt=${product.title}>
                            </div>
                            <div class="col-9" >
                                    <h6>${product.title}</h6>
                                    <h6>Price: R$${product.price}</h6>
                                    <h6>Rating: ${product.rating.rate}</h6>
                                    <p>Categories: ${product.displayCategories}</p>
                             </div>
                        </div>
                    `
                }
            }
        })
        .catch(error => {
            console.log('API ERROR:', error);
        });
}

function productDetail(id) {
    window.location.href = `/Trabalho-2/detalhes.html?product=${id}`;
}

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