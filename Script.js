// console.log("I am in Sctipt file ");
let currentDraggedItem;
const tierInput = document.getElementById("tier");
const submitButton = document.getElementById("Submit");

const itemContainers = document.getElementsByClassName("item-container");
const imageForm = document.getElementById("img-form");

const tierLists = document.querySelectorAll(".tier-list");
// console.log(tierLists);

tierLists.forEach(setUpDropZoneInTierListItem);
// itemContainers.forEach(setUpItemContainerForDrag());

for(const itemContainer of itemContainers){
  setUpItemContainerForDrag(itemContainer);
}



imageForm.addEventListener("submit", ()=>{
  event.preventDefault();
  // console.log("form-submitted");
  const formData  = new FormData(imageForm);
  console.log(formData);

  const imageItemInput = document.getElementById("img-item");

const imageUrl = imageItemInput.value;

if(imageItemInput.value===""){
  alert("Please Enter a valid image url ");
  return ; 
}
createTierListItem(imageUrl);
imageItemInput.value='';
});





submitButton.addEventListener("click",()=>{
  // console.log("button is clicked");  // function run only when event or click is performed.
  event.preventDefault(); // stops the default behaviour of the event;

  const target = event.target;
  console.log(tierInput.value); // print the target element which is triggered by performing event.
  if(tierInput.value===""){
    alert("please fill the tier list name");
    return;
  }
  createTierList(tierInput.value); // calling the function to create tier list. 
  tierInput.value="";
});

function createTierList(tierListName){
  const newTierList =document.createElement('div');
  newTierList.classList.add("tier-List");

  const  heading = document.createElement("h1");
  heading.textContent = tierListName;

  const newTierListItems = document.createElement('div');
  newTierListItems.classList.add("tier-list-items");

  newTierList.appendChild(heading);
  newTierList.appendChild(newTierListItems);

  setUpDropZoneInTierListItem(newTierListItems);

  const tierSection =document.getElementById('tier-list-section');
  tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl){
  const imageDiv = document.createElement('div');
  imageDiv.classList.add("item-container");
  imageDiv.setAttribute("draggable","true");

  setUpItemContainerForDrag(imageDiv);

  const img= document.createElement('img');
  img.src=imageUrl;

  imageDiv.appendChild(img);
  
  const nonTierSection = document.getElementById("non-tier-Section");
  nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainers){
  itemContainers.addEventListener('dragstart',(event)=>{
    console.log(event.target.parentNode);
    currentDraggedItem = event.target.parentNode;
  });

  itemContainers.addEventListener('dblclick',(event) =>{

    const parentNode = event.target.parentNode;
    const nonTierSection = document.getElementById("non-tier-Section");
    nonTierSection.appendChild(parentNode);

  });
}

function setUpDropZoneInTierListItem(TierListItems){
  console.log(TierListItems);
  // console.log("setupZone", tierListItem);
  TierListItems.addEventListener('drop',(event)=>{
    event.preventDefault();
    // event.target.appendChild(currentDraggedItem);
    // console.log("Drop on a drop Zone");
    console.log("Dropped");
  });

  TierListItems.addEventListener('dragover',function (event){
    console.log("dragged over drop ");
    console.log(event);
    // event.target.appendChild(currentDraggedItem);

    if(this!= currentDraggedItem.parentNode){
      // console.log(event.target);
      this.appendChild(currentDraggedItem);
    }
  });
}