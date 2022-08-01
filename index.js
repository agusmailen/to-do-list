//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variales //las dejo asi porque si tengo algo en localstorag toma ese valor.
let LIST , id ;

//get item from local storage
let data = localStorage.getItem("TODO");
//check if data is no empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); //load the list to the user interface
} else {
    //if data isn't empty
    LIST = [];
    id = 0;
}
//load items to the user's interface
function loadList(array){
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash);
    });
}
//show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function 
function addToDo(toDo, id, done, trash) {

    if(trash) return 

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}
//add an item to the list user the enter key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13) {
        const toDo = input.value;
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name : toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to local storage (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value="";
    }

});
//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ?  false : true;
}
//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
//target the items create dynamically
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked elemen inside list
    const elementJob = element.attributes.job.value; //complete o delet

    if(elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to local storage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

