let rootDiv = document.querySelector("#root");
let productsDiv = document.querySelector("#productsDiv");
let cartDiv = document.querySelector("#cartDiv")
let userForm = document.querySelector("#productForm")

let allProducts = [];

let categories = [];
let originalCategories = ["Socks","Individual Socks","Used Socks","Not Socks"]
let names = [];
let cart = [];
let cartTotal = 0;
let selected = [];
let selectedBoxes = [];

let otherSelected = false;

var originalProducts = [
    addProduct("Socks",10,"some socks","https://babybeauandbelle.com/cdn/shop/files/baby-heirloom-boys-white-knee-socks-1251473008.jpg?v=1785422471&width=2400","Socks"),
    addProduct("Socks 2",10000,"better socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y4q6rUg9OU898rMyktjZBDByyznF-2DOfdEOlGHfZA&s=10","Socks"),
    addProduct("Fancy socks",100,"luxury socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjoJiKrQESaY-zGVeyMuzXRAsfk9ESfM08Ge4UbKzsHQ&s=10","Socks"),
    addProduct("Sock 1",2,"1 sock","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbztuAWozHMfsIo-poY_rLf_KmcC7tsO6JwakqyMl1wQ&s=10","Individual Socks"),
    addProduct("Sock 2",11,"another sock","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbztuAWozHMfsIo-poY_rLf_KmcC7tsO6JwakqyMl1wQ&s=10","Individual Socks"),
    addProduct("Socks I found",3,"Some socks I found outside","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWVVyTPkgIeisyBAR1fHO30aXZVi2kX6Busq4qOMNkg&s=10","Used Socks"),
    addProduct("Jordan Poole Socks",100000000,"Socks worn in game by Jordan Poole","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBW79rbzoSmRhLkbWacX5-wMg9aWX6_iJaXeMCuFwQjw&s","Used Socks"),
    addProduct("Boxers",7,"A pair of boxers","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMJtltXI9dfLFVHjdGgbbbXPFe4-Ql_xaaqN9ZMcfWg&s=10","Not Socks"),
    addProduct("Sock 3",12,"a third, mysterious sock","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyb5sqL26Jbp3PI4kpEyeK-nvmII4RSTwW-KfNqjfbjA&s","Individual Socks"),
    addProduct("No socks",0,"just feet","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY5h8G3M1lLxynCOqRkjrI9Gd-nbjUAdlaMGUXE1vrqA&s=10","Not Socks"),
    addProduct("Radioactive Socks",25,"glowing, radiated socks","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyTO980BqQ0hm3uvUeSwUiroX1-ncr3PTYgRruAwLX5w&s=10","Socks"),
    addProduct("Gucci Socks",120,"Designer Socks","https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1680717637/750705_4GADU_6566_002_100_0000_Light-round-interlocking-g-cotton-socks.jpg","Socks")
];

if (localStorage.getItem("products")==null){
    localStorage.setItem("products",JSON.stringify(originalProducts))
}
else{
    allProducts = JSON.parse(localStorage.getItem("products"))
}
if (localStorage.getItem("categories")==null){
    localStorage.setItem("categories",JSON.stringify(originalCategories))
}
else{
    categories = JSON.parse(localStorage.getItem("categories"))
}
let products=allProducts;

updateCategories();


let currentCategory = null
let currentSort = null



function addProduct(name,price,description,image,category){
    let newProduct = {name:name,image:image,price:price,description:description,category:category}
    allProducts.push(newProduct)
    let notInCategories = true
    categories.forEach(element =>{
        if (element == category){
             notInCategories=false
        }
    })

    if (notInCategories){
        categories.push(category);
        localStorage.setItem("categories",JSON.stringify(categories))
        names.push(name)
        
    }
    updateCategories()
    return newProduct
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
    cartTotal+=product.price
    let cartLabel = document.querySelector("#cartHeader")
    if (cart.length>1){
        cartLabel.innerHTML = ("Cart ("+String(cart.length)+" items) Total: $"+String(cartTotal))
    }
    else{
        cartLabel.innerHTML = ("Cart (1 item) Total: $"+String(cartTotal))
    }
    
}

function removeFromCart(card,product){
    var newCart = []
    let cartLabel = document.querySelector("#cartHeader")
    cart.forEach(element => {
        if (element!=product){
            newCart.push(element)
        }
    });
    cartTotal=cartTotal-product.price
    cart = newCart
    if (cart.length==1){
        cartLabel.innerHTML = ("Cart (1 item) Total: $"+String(cartTotal))
    }    
    if (cart.length>2){
        cartLabel.innerHTML = ("Cart ("+String(cart.length)+" items) Total: $"+String(cartTotal))    
    }
    if (cart.length==0){
        cartLabel.innerHTML = "Cart"
    }
    card.remove()
    
    
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
    document.querySelector("#productCategoryInput").replaceChildren()
    document.querySelector("#categorySelect").replaceChildren()
    categories.forEach(category =>{
        dropDown.add(new Option(category,category))
        document.querySelector("#productCategoryInput").add(new Option(category,category))
        
    })
    document.querySelector("#productCategoryInput").add(new Option("Other","Other"))
    dropDown.addEventListener("change",e=>{filterByCategory(dropDown.value)})
    sortDropDown.addEventListener("change",e=>{sort(sortDropDown.value)})
    addSelectedButton.addEventListener("click",e=>{addSelectedToCart()})
}

userForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    let newProduct = 0;
    let productFormData = new FormData(userForm)
    if (productFormData.get("name")=="" ||productFormData.get("description")==""||productFormData.get("price")=="" ||productFormData.get("image")=="" || productFormData.get("price")<0){
        
        return false
    }
    names.forEach(e=>{
        if (e==productFormData.get("name")){
            return false;
        }
    })
    
    if (productFormData.get("category")=="Other"){
        if (productFormData.get("newCategory")==null){
            
            return false
        }
        newProduct =addProduct(productFormData.get("name"),productFormData.get("price"),productFormData.get("description"),productFormData.get("image"),productFormData.get("newCategory"));
        
    }
    else{
        if (productFormData.get("category")==null){
            return false
        }
        newProduct =addProduct(productFormData.get("name"),productFormData.get("price"),productFormData.get("description"),productFormData.get("image"),productFormData.get("category"));
    }
    
    
    renderProduct(newProduct)
    localStorage.setItem("products",JSON.stringify(allProducts))
    if (document.querySelector("#otherCategoryInput")!=null){
        document.querySelector("#otherCategoryInput").remove();
        document.querySelector("#otherCategoryLabel").remove();
    }
    userForm.reset()
})

document.querySelector("#resetButton").addEventListener("click",(event)=>{
    localStorage.setItem("products",JSON.stringify(originalProducts));
    allProducts = JSON.parse(localStorage.getItem("products"));
    products= JSON.parse(localStorage.getItem("products"));
    localStorage.setItem("categories",JSON.stringify(originalCategories));
    categories = JSON.parse(localStorage.getItem("categories"));
    updateCategories();
    render()
})

document.querySelector("#productCategoryInput").addEventListener("change", (event)=>{
    if (event.target.value=="Other"){
        let newLabel =document.createElement("label");
        newLabel.id = "otherCategoryLabel";
        newLabel.innerHTML = "Other Category";
        newLabel.for = "otherCategoryInput";
        let input = document.createElement("input");
        input.type = "text";
        input.name = "newCategory";
        input.id = "otherCategoryInput";
        input.placeholder="New Category";
        document.querySelector("#formCategoryDiv").append(newLabel);
        document.querySelector("#formCategoryDiv").append(input);
    }
    else{
        if (document.querySelector("#otherCategoryInput")!=null){
            document.querySelector("#otherCategoryInput").remove()
            document.querySelector("#otherCategoryLabel").remove()
        }
    }
})






render()
