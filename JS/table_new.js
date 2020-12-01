//Create table from dataset
function createTable(dataset) {
  let body = document.getElementById("property-table");
  body.innerHTML = "";
  let table = document.createElement("table");
  let tBody = document.createElement("tBody");
  let th;
  let td;
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  th = document.createElement("th");
  th.innerHTML = "Neighborhood";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerHTML = "Year";
  tr.appendChild(th);

  th = document.createElement("th");
  th.innerHTML = "Amount";
  tr.appendChild(th);

  thead.appendChild(tr);
  table.appendChild(thead);

  dataset.forEach((item) => {
    // for (var i = 0; i < dataset.length; i++) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td1.innerHTML = item.neighborhood;
    tr.appendChild(td1);

    td2 = document.createElement("td");
    td2.innerHTML = item.year;
    tr.appendChild(td2);

    td3 = document.createElement("td");
    td3.innerHTML = item.amount;
    tr.appendChild(td3);

    tBody.appendChild(tr);
  });
  table.appendChild(tBody);
  body.appendChild(table);
}

createTable(dataset);

//Get unique values from attributes in an array
const yearMap = new Set(dataset.map((dataset) => dataset.year));
const yearCount = [...yearMap];
console.log(yearCount);

const ngrhoodCount = [
  ...new Set(dataset.map((dataset) => dataset.neighborhood)),
];
console.log(ngrhoodCount);

//Populate dropdown list from unique value array
yearCount.forEach(function (item) {
  function countYear() {
    const dropdown = document.getElementById("filterBtn");
    const yearList = document.createElement("option");
    yearList.textContent = item;
    yearList.value = item;
    dropdown.appendChild(yearList);
  }
  countYear();
});

//control select tag with array attribute value
function filter() {
  //   let result = [];
  let q = document.getElementById("filterBtn").value;
  //   console.log(q);
  if (q === "default") {
    createTable(dataset);
  } else {
    const filterArray = dataset.filter((item) => {
      return item.year === q && item.neighborhood === "Long Beach";
    });

    /*     dataset.forEach((item) => {
      if (item.year === q) {
        result.push(item);
      }
      console.log(result);
    }); */

    createTable(filterArray);
  }
}

/*   for (var x = 0; x < dataset.length; x++) {
         if (dataset[x].year === q) {
            result.push(dataset[x]);
        } */

//DOM control of select tag "onChange" event listener
function showSelected() {
  filter();
}

//
/* function filter() {
    let result = [];
    let q = document.getElementById("filterBtn").value;

    const callback = (item, index) => {
        if (document.getElementById("filterBtn").value === "default")
            return;
        console.log(callback);

    dataset.forEach(callback)
    }
    filter() */

/* for (var x = 0; x < dataset.length; x++) {
        if (dataset[x].year != "undefined" && dataset[x].year === q) {
            result.push(dataset[x]);
        }
        else {
            if (dataset[x].year === "default") {
                result.push(dataset[x]);
            }
        } */
