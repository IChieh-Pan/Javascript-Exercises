
function createTable (dataset) {
    var body = document.getElementById("property-table");
    body.innerHTML = "";
    var table = document.createElement("table");
    var tBody = document.createElement('tBody');
    var th;
    var td;
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    th = document.createElement('th');
    th.innerHTML = "Neighborhood";
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Year";
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Amount";
    tr.appendChild(th);

    thead.appendChild(tr);
    table.appendChild(thead);  
    
    
    for (var i = 0; i < dataset.length; i++) {
        tr = document.createElement('tr');
        td1 = document.createElement('td');
        td1.innerHTML = dataset[i].neighborhood;
        tr.appendChild(td1);

        td2 = document.createElement('td');
        td2.innerHTML = dataset[i].year;
        tr.appendChild(td2);

        td3 = document.createElement('td');
        td3.innerHTML = dataset[i].amount;
        tr.appendChild(td3);
        
        tBody.appendChild(tr);

    }
    table.appendChild(tBody);
    body.appendChild(table);
}



function filter() {
    var result = [];
    var q = document.getElementById("filterBtn").value;

    for (var x = 0; x < dataset.length; x++) {
        if (dataset[x].year != "undefined" && dataset[x].year === q) {
            result.push(dataset[x]);
        }
        else {
            if (dataset[x].year === "default") {
                result.push(dataset[x]);
            }
        }
  
    console.log(result);
    createTable(result);
    }
}



function showSelected() {
    filter();  
}

/* function filter() {
    var result = [];
    var q = document.getElementById("filterBtn").value;

    for (var x = 0; x < dataset.length; x++) {
        /* if (dataset[x].year === 'default') {
            console.log(filter);
        } */
        /*  if (dataset[x].year === q) {
            result.push(dataset[x]);
        }
    console.log(result);
    createTable(result);
    }
} */

