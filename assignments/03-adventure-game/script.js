let rootDiv = document.querySelector("#root");
let rooms = {};
let items = {}
let possible_rooms = []
let possible_items = []
let currentRoom
let inventory = []

//function to allow me to easily add rooms
function add_room(k,n,d,r,l,i,t){
    rooms[k] = {name:n,description:d,linkedRooms:r,label:l,item:i,toopen:t};
    possible_rooms.push(k)
};

function add_item(k,n,d,l,u){
    items[k] = {name:n,description:d,label:l,taken:false,used:false,update:u}
    possible_items.push(k)
}


//Where I add all the rooms
add_room("entry","Entry","The entrance room of the suite",["livingRoom","hallway"],"Go back to the entrance",null,null);
add_room("livingRoom","Living Room","the living room, it seems to be empty",["entry"],"Enter the Living room",null,null);
add_room("hallway","Hallway","The hallway, the gateway to the suite",["entry","michaelRoom","sammyRoom","shower","bathroom","closet"],"Go to the hallway",null,null);
add_room("michaelRoom","Michael and Obsa's Room","A beatuiful utopia",["hallway","obsa"],"Michael and Obsa's Room, it's not currently unlocked",null,"onecard")
add_room("sammyRoom","Nick and Sammy's Room","a horrible and disgusting room, inhabited by a terrifying beast",["hallway","sammy"],"Enter Nick and Sammy's Room",null,null)
add_room("closet","The Storage Closet","a barren landscape home to not but scraps",["hallway"],"Try the storage closet","mushroom",null)
add_room("shower","The Shower","a damp swamp, that is suprsingly clean",["hallway"],"Check out the shower","soap",null)
add_room("bathroom","The Bathroom","an incredibly dangerous room filled with a toxic order",["hallway"],"The Bathroom's toxic odor eminates from the hallway",null,"mask")
add_room("obsa","Obsa","Thanks for the food man, here take this mask so you can go to the bathroom",["michaelRoom"],"Michael's Roommate is hungry, he may have something for you if you give him food","mask","mushroom")
add_room("sammy","Sammy","get that disgusting soap away from me, take this to go away",["sammyRoom"],"try to clean the disgusting beast","onecard","soap")

add_item("soap","soap","cleaning supplies","take the soap from the shower","Slightly cleaner beast")
add_item("onecard","onecard","key to Obsa and Michael's Room","Take the OneCard from Sammy","Michael and Obsa's room")
add_item("mushroom","mushroom","actual food in my storage closet","Pick up the mushroom pasta","Obsa")
add_item("mask","mask","mask to gaurd you from the bathroom's scent","take the mask from him","The bathroom can now be used")

function createElementWithID(type,id){
    let element = document.createElement(type)
    element.id = id
    return element
}


function render(room){
    currentRoom = room
    let roomDiv = createElementWithID("div","roomDiv")
    
    let textDiv = createElementWithID("div","textDiv")

    let roomHeader = createElementWithID("h1","roomHeader")
    roomHeader.innerHTML = room.name;
    textDiv.append(roomHeader);

    


    let roomDescription = createElementWithID("p","roomDescription")
    roomDescription.innerHTML = room.description;
    textDiv.append(roomDescription);

    let roomButtons = createElementWithID("div","roomButtons")
    for (let i = 0;i<room.linkedRooms.length;i++){
        let roomButton = createElementWithID("button",room.linkedRooms[i])
        roomButton.innerHTML = rooms[room.linkedRooms[i]].label;
        if (room.opento!=null){
            if (items[room.opento].taken==false){
                roomButton.classList.add("noOpen")
            }
            else{
                roomButton.classList.add("roomButton")
            }
        }
        else{
            roomButton.class="roomButton"
        }
        
        roomButton.class = "roomButton"
        roomButtons.append(roomButton);
    };

    if (room.item!=null){
        let item = items[room.item]
        if (item.taken==false){
            let itemButton = createElementWithID("button",item.name)
            itemButton.innerHTML = (item.label)
            roomButtons.append(itemButton)
        }
    }
    roomDiv.append(textDiv)
    roomDiv.append(roomButtons)
    rootDiv.append(roomDiv);
    console.log(inventory)
    render_inventory()

};



function render_inventory(){
    if (document.querySelector("#inventoryDiv")!=null){
        document.querySelector("#inventoryDiv").remove();
    }
    let inventoryDiv = createElementWithID("div","inventoryDiv")
    let inventoryLabel = createElementWithID("h2","Inventory")
    inventoryLabel.innerHTML = "Inventory"
    inventoryDiv.append(inventoryLabel)


    for (let i=0;i<inventory.length;i++){
        let inventorySlot = createElementWithID("p",(inventory[i]+"Slot"))
        inventorySlot.class="inventorySlot"
        inventorySlot.innerHTML = inventory[i]
        inventoryDiv.append(inventorySlot)

    }
    rootDiv.append(inventoryDiv)
}

function useItem(item,room){
    item.used = true
    inventory.pop(item)
    room.label=item.update

}

rootDiv.addEventListener("click",handleClick)

function handleClick(event){
    document.querySelector("#roomDiv").remove();

    let key = event.target.id
    let isItem=false
    for (let i = 0;i<possible_items.length;i++){
        if (key==possible_items[i]){
            isItem=true
        }
    }
    if (isItem){
        inventory.push(key)
        items[key].taken=true
        render(currentRoom)
        
    }
    else{
        let isRoom = false
        for (let i = 0;i<possible_rooms.length;i++){
            if (key==possible_rooms[i]){
                isRoom=true
            }
        }
        if (isRoom){
            if (rooms[key].toopen==null){
                render(rooms[event.target.id])
            }
            else{
                if (items[rooms[key].toopen].taken){
                    if (items[rooms[key].toopen].used==false){
                        useItem(items[rooms[key].toopen],rooms[key])
                    }
                    
                    render(rooms[event.target.id])
                }
                else{
                    event.target.class = "noOpen"
                    console.log(event.target.class)
                    render(currentRoom)
                }
            }
        }
    }

    
    
}

render(rooms["entry"]);