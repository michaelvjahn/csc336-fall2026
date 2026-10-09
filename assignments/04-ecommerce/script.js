let rootDiv = document.querySelector("#root");
let productsDiv = document.querySelector("#productsDiv");
let cartDiv = document.querySelector("#cartDiv")

let allProducts = [];
let products=allProducts = []
let categories = [];
let cart = [];
let selected = [];
let selectedBoxes = [];

let currentCategory = null
let currentSort = null

function addProduct(name,price,description,image,category){
    allProducts.push({name:name,price:price,description:description,image:image,category:category})
    let notInCategories = true
    //This is a longer way of checking but I wasn't sure if we were allowed to use more complicated methods
    for (let i = 0;i<categories.length;i++){
        if (categories[i] == category){
            notInCategories=false
        }
    }
    if (notInCategories){
        categories.push(category);
    }
}

function filterByCategory(category){
    currentCategory = category
    if (category=="all"){
        products = allProducts
    }
    else{
        products = allProducts.filter(product => product.category==category)
    }
    sort(currentSort)
    
}

function sort(type){
    currentSort = type
    console.log("sort")
    if (type == "price h-l"){
        products = products.sort((p1,p2) => p2.price-p1.price)
    }
    if (type == "price l-h"){
        products = products.sort((p1,p2) => p1.price-p2.price)
    }
    if (type == "name a-z"){
        products = products.sort((p1,p2) => p1.name>p2.name)
    }
    if (type == "name z-a"){
        products = products.sort((p1,p2) => p1.name<p2.name)
    }
    render()
}

function renderProduct(product){
    //Creates the Div for the Product card
    let productDiv = document.createElement("div");
    productDiv.classList.add("productDiv");

    //Creates the title of the Product, sets its text to the name of the product, and adds it to the product card
    let productTitle = document.createElement("h3");
    productTitle.innerHTML = product.name;
    productTitle.classList.add("productTitle");
    productDiv.append(productTitle);

    //Creates the Image for the Product, changes it to be the products image, and adds it to the product card
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.classList.add("productImage");
    productDiv.append(productImage);

    //Creates the label for the price of the product, sets to the correct value and adds it to the product card
    let productPrice = document.createElement("p");
    productPrice.innerHTML = ("Price: $"+String(product.price));
    productPrice.classList.add("productPrice");
    productDiv.append(productPrice);

    //Creates the text for the description of the product, sets to the correct description and adds it to the product card
    let productDescription = document.createElement("p");
    productDescription.innerHTML = (product.description);
    productDescription.classList.add("productDescription");
    productDiv.append(productDescription);

    //Creates the button to buy the product, adds an event listener to add correct product to cart
    let productButtonDiv = document.createElement("div")
    productButtonDiv.classList.add("productButtonDiv")


    let productButton = document.createElement("button");
    productButton.innerHTML = "Add to Cart!";
    productButton.classList.add("productButton");
    productButton.addEventListener("click", e=>addToCart(product));
    productButtonDiv.append(productButton);

    let productCheckBox = document.createElement("input")
    productCheckBox.type = "checkbox"
    productButtonDiv.addEventListener("change", function(e){
        if (e.target.checked){
            selected.push(product)
            selectedBoxes.push(productCheckBox)
        }
        else{
            let temp = []
            selected.forEach(element=>{
                if(element!=product){
                    temp.push(element)
                }
            })
            selected = temp
            let temp2 = []
            selectedBoxes.forEach(element=>{
                if(element!=productCheckBox){
                    temp2.push(element)
                }
            })
            selectedBoxes = temp2
        }
    })
    productButtonDiv.append(productCheckBox)

    productDiv.append(productButtonDiv)


    //Adds the product card to the main document
    productsDiv.append(productDiv);

    return productDiv;
}

function renderInCart(product){

    let productDiv = document.createElement("div");
    productDiv.classList.add("cartProductDiv")

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "&#128465;"
    deleteButton.classList.add("deleteButton")
    deleteButton.addEventListener("click",e=>removeFromCart(productDiv,product))
    productDiv.append(deleteButton)

    let productText = document.createElement("p")
    productText.innerHTML = (product.name+": $"+String(product.price))
    productText.classList.add("cartProductText")
    productDiv.append(productText)

    let productImage = document.createElement("img")
    productImage.src = product.image
    productImage.classList.add("cartProductImage")
    productDiv.append(productImage)

    cartDiv.append(productDiv)
    



}

function render(){
    productsDiv.replaceChildren()
    products.forEach(element => {
         renderProduct(element)
    })
}

function addToCart(product){
    cart.push(product)
    renderInCart(product)
}

function removeFromCart(card,product){
    var newCart = []
    cart.forEach(element => {
        if (element!=product){
            newCart.push(element)
        }
    });
    card.remove()
    cart = newCart
    
}

function addSelectedToCart(){
    selected.forEach(e=>{
        addToCart(e)
    })
    selectedBoxes.forEach(e=>{
        e.checked = false
    })
    selected=[]
    selectedBoxes=[]
}



function updateCategories(){
    let dropDown = document.querySelector("#categorySelect")
    let sortDropDown = document.querySelector("#sortSelect")
    let addSelectedButton = document.querySelector("#addSelectedButton")
    categories.forEach(category =>{
        dropDown.add(new Option(category,category))
    })
    dropDown.addEventListener("change",e=>{filterByCategory(dropDown.value)})
    sortDropDown.addEventListener("change",e=>{sort(sortDropDown.value)})
    addSelectedButton.addEventListener("click",e=>{addSelectedToCart()})
}



addProduct("Socks",10,"some socks","https://babybeauandbelle.com/cdn/shop/files/baby-heirloom-boys-white-knee-socks-1251473008.jpg?v=1785422471&width=2400","not socks")
addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","socks")
addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","socks")
addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","socks")
addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","socks")
addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","socks")
updateCategories()

render()
