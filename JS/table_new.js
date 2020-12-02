


function fetchData() {
  fetch("https://usc.data.socrata.com/resource/4a97-v5tx.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch", data);
    });
  console.log("data :>> ", fetchData);
  fetchData();
};



  function tableDataFilter() {
    let result = [];
    dataset.forEach((item) => {
      if (item.year < 2011) {
        result.push(item);
      }
      console.log(result);
    });
    createTable(result);
  }

  //Create table from dataset
  function createTable(data) {
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

  // createTable(dataset);

  //Get unique values from attributes in an array

  const yearMap = new Set(data.map((data) => data.year));
  const yearCount = [...yearMap];
  console.log(yearCount);

  const ngrhoodCount = [...new Set(data.map((data) => data.neighborhood))];
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
      createTable(data);
    } else {
      const filterArray = data.filter((item) => {
        return item.year === q && item.neighborhood === "Long Beach";
      });

      /*     dataset.forEach((item) => {
        if (item.year === q) {
          result.push(item);
        }
        console.log(
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

  function showData() {
    if (document.getElementById("showBefore2012").checked) {
      tableDataFilter();
    } else {
      fetchData();
    }
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
