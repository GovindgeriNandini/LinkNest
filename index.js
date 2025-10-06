
let myLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem(("myLinks")));

if(leadsFromLocalStorage){
    myLinks = leadsFromLocalStorage;
    render(myLinks);
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
        
    });
});
// localStorage.setItem("myName", "Nani");
// localStorage.getItem();
// localStorage.clear();

function render(leads){
    let listItems = "";

    for(let i=0; i<leads.length;i++){
        // listItems += "<li> <a target ='_blank' href='"+myLeads+"'>" + myLeads[i] + "</a> </li>";
        listItems += `<li> 
                            <a target ='_blank' href='${leads[i]}'> ${leads[i]}
                            </a>
                      </li>`;

        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }

    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click",function(){
    myLinks.push(inputEl.value);
    inputEl.value ="";
    // saves mylinks array to local storage 
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
    //console.log(localStorage.getItem("myLeads"));

}); 

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLinks=[];
    render(myLinks);
});
