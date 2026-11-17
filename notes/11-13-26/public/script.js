let formElement = document.querySelector("#formElement");
let foodInput = document.querySelector("#foodInput")
let userInput = document.querySelector("#userInput")

formElement.addEventListener("submit", async (e)=>{
    e.preventDefault();

    console.log("FORM SUBMITTED")

    let dataFromFrontEnd = {
        food: foodInput.value,
        user: userInput.value
    }

    let response = await fetch("/products")
    console.log(products)

    

    let jsonFromServer = await response.json();
    console.log(jsonFromServer.message);
    
})