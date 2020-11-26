// var list = ["Vril", "Answer Code Request", "Len Faki", "Rødhåd"];
/* var dataList = document.getElementById("dataList");

for (var g = 0; g < list.length; g++) {
    var li = document.createElement("li")
    li.innerText = list[g];
    li.style.color = "#333";
    console.log(li); 
    dataList.appendChild(li)   
} */


function appendData(data) {
    console.log(data)
    //var mainContainer = document.getElementById("property-list");
    var mainContainer = document.getElementsByTagName("body")[0];
    console.log(mainContainer)
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        
        var ol = document.createElement("ol");
        var li = document.createElement("li");
        li.innerText = 'Neighborhood: ' + data[i].neighborhood;
        // div.innerHTML = 'Neighborhood: ' + 'dataset[i].neighborhood';
        ol.appendChild(li);
        div.appendChild(ol);
        mainContainer.appendChild(div);
    }
}
appendData(dataset);
