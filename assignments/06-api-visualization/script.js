
//The Value for which Pokemon is currently displayed
let pokemonOn = 0;

//The list of the Pokemon in the Pokedex
let pokemonList = []

//The list of the IDs of the Pokemon in the dex
let setUpPokemon = [255,50,158,70,108,138,163,202,209,265,270,279,298,328,519]

//The current x and y values of the pokemon list, used for adding new pokemon
let y = 60;
let x = 50;



//The class for the pokemon that is being displayed
class Pokemon{
    //The constructor
    constructor(id){
        this.id = id
    }

    //Controls what the pokemon object displays
    update(){
        //Creates the background
        fill(255,27,27);
        rect(550,20,200,200);

        //Displays the image of the pokemon, gotten from setup()
        image(this.image,650,120,200,200);

        //Adds the text of the Pokemon's name
        fill(255,255,255);
        textSize(32);
        text("Name: "+this.name,790,40);

        //Adds the rest of the info
        textSize(22);
        text("Pokemon #"+this.id,790,80);
        text("Type: "+this.type,790,120);
    }
}


//Retrieves the pokemons info from the API based on it's id
async function getPokemon(id){
    //Gets the data
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
    //Converts it to a JSON
    let json = await response.json();
    return json
}

//Sets up the Program, mainly the visualization and the information for each pokemon
async function setup(){
    //Creates the area for the data to be visualized
    createCanvas(1200,600);
    //Makes images be centered at their x and y
    imageMode(CENTER);
    
    //Uses each id in setUpPokemon and adds the pokemon they represent to pokemonList
    for (let i = 0;i<setUpPokemon.length;i++){
        let poke = new Pokemon(setUpPokemon[i])
        poke.data = await getPokemon(poke.id)
        poke.image = await loadImage(poke.data.sprites.front_default);
        poke.name = capitalize(poke.data.name);
        poke.type = capitalize(poke.data.types[0].type.name)
        poke.height = poke.data.height
        poke.weight = poke.data.weight
        pokemonList.push(poke)
    }
    
}


//A helper function that capitalizes the first letter of a string
function capitalize(string){
    return(string.charAt(0).toUpperCase() + string.slice(1))
}


//Adds functionality for the left button
function leftButton(){
    if (pokemonOn>0){
        pokemonOn-=1
    }
}

//Adds functionality for the left button
function rightButton(){
    if (pokemonOn<pokemonList.length-1){
        pokemonOn+=1
    }
}

//Adds functionality for the new pokemon form
document.querySelector("#newPokeForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    
    let val = document.querySelector("#formId").value;
    if (val>0&& val<=1000 &&val!=null){
        newPokemon(val)
        document.querySelector("#formId").value=null
    }
})

//Resets the pokemon to the original pokemon I set
async function resetPokemon(){
    pokemonList=[]
    for (let i = 0;i<setUpPokemon.length;i++){
        let poke = new Pokemon(setUpPokemon[i])
        poke.data = await getPokemon(poke.id)
        poke.image = await loadImage(poke.data.sprites.front_default);
        poke.name = capitalize(poke.data.name);
        poke.type = capitalize(poke.data.types[0].type.name)
        poke.height = poke.data.height
        poke.weight = poke.data.weight
        pokemonList.push(poke)
    }
}

//Creates a new pokemon
async function newPokemon(id) {
    let poke = new Pokemon(id)
    poke.data = await getPokemon(poke.id)
    poke.image = await loadImage(poke.data.sprites.front_default);
    poke.name = capitalize(poke.data.name);
    poke.type = capitalize(poke.data.types[0].type.name)
    poke.height = poke.data.height
    poke.weight = poke.data.weight
    pokemonList.push(poke)
}

//Creates the visualization of the pokemon
function draw(){
    

    //Changes the background color
    background(100, 50, 50);

    //Displays the data of only the pokemon that the user is currently on
    if (pokemonList.length>0){
        pokemonList[pokemonOn].update()
    }
    let y = 60
    let x = 50
    //Creates the list of pokemon to select
    for (let i = 0;i<pokemonList.length;i++){
        //Makes sure that if more than 6 it goes to the next line
        if (i%6==0 && i>5){
            y+=80
            x=50
        }
        if (i>42){
            break
        }
        //Makes the pokemon the user is on a little bit bigger and gives it a red background
        if (i==pokemonOn){
            fill(255,27,27);
            stroke(255,255,255);
            rect(x-50,y-50,100,100);
            image(pokemonList[i].image,x,y,130,130)
        }
        //Displays the image of the pokemon
        else{
            image(pokemonList[i].image,x,y,100,100)
        }
        x+=80
    }
}