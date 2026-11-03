class Creature {
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;

    }

    update(){
        this.x +=1
        fill(255,0,0);
        stroke(255,255,255);
        strokeWeight(5);

        elipse(this.x,this.y,this.radius)
    }
}
async function setup(){
    console.log("p5 called this function");
    createCanvas(600,400);
    let creature = new Creature(10,50,20)
}

async function getPokemon(id){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+id)
    let json = await response.json();
    return json
}

function draw() {
    background(0,0,0);

}