let pokemonOn = 3;
let pokemonList = []
let setUpPokemon = [255,50,158,70,108,138,163,202,209,265,270,279,298,328,519]




class Pokemon{
    constructor(id){
        this.id = id
        
        
    }

    update(){
        fill(255,27,27);
        rect(550,20,200,200);

        image(this.image,650,120,200,200);
        fill(0,0,0);
        textSize(32);
        text("Name: "+this.name,790,40);
        textSize(22);
        text("Pokemon #"+this.id,790,80);
        text("Type: "+this.type,790,120);
        
    }


}



async function getPokemon(id){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
    let json = await response.json();
    return json
}


async function setup(){
    createCanvas(1200,600);
    imageMode(CENTER);
    
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

function capitalize(string){
    return(string.charAt(0).toUpperCase()+string.slice(1))
}




function draw(){
    background(100, 50, 50);

    pokemonList[pokemonOn].update()
    let y = 60
    let x = 50
    for (let i = 0;i<pokemonList.length;i++){
        console.log(i)
        if (i%6==0 && i>5){
            y+=80
            x=50
        }
        
        if (i==pokemonOn){
            fill(255,27,27);
            rect(x-50,y-50,100,100)
            image(pokemonList[i].image,x,y,130,130)
        }
        else{
            image(pokemonList[i].image,x,y,100,100)
        }
        x+=80
    }
}

document.querySelector("#leftButton").addEventListener("click",(event)=>{
    if (pokemonOn>0){
        pokemonOn-=1
    }
})

document.querySelector("#rightButton").addEventListener("click",(event)=>{
    if (pokemonOn<pokemonList.length-1){
        pokemonOn+=1
    }
})
