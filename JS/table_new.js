
//Create table from dataset

function createTable(data) {
  // console.log(createTable(data));
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

 data.forEach((item) => {
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

const fetchData = async () => {
  
  let response  = await fetch("https://usc.data.socrata.com/resource/4a97-v5tx.json")
  let data = await response.json();
  return data;
};


function tableDataFilter(data) {
  let result = [];
  data.forEach((item) => {
    if (item.year < 2011) {
      result.push(item);
    }
    console.log(result);
  });
  createTable(result);
}

//Get unique values from attributes in an array
const unique = (data) => {
  const yearMap = new Set(data.map((data) => data.year));
  const yearCount = [...yearMap];
  console.log(yearCount);

  const ngrhoodCount = [...new Set(data.map((data) => data.neighborhood))];
  // console.log(ngrhoodCount);
  return yearCount;
};

//Populate dropdown list from unique value array
const dropdown = (yearCount) => {
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
};

//control select tag with array attribute value
function filter(data) {
  //   let result = [];
  let q = document.getElementById("filterBtn").value;
  //   console.log(q);
  if (q === "default") {
    createTable(data);
  } else {
    const filterArray = data.filter((item) => {
      return item.year === q && item.neighborhood === "Long Beach";
    });

        data.forEach((item) => {
        if (item.year === q) {
          result.push(item);
        }
        // console.log(
      });

    createTable(filterArray);
  }
}


//DOM control of select tag "onChange" event listener
function showSelected() {
  filter(data);
}
//Checkbox
function showData(data) {
  if (document.getElementById("showBefore2012").checked) {
    tableDataFilter(data);
  } else {
    fetchData(data);
  }
}



/* for (var x = 0; x < dataset.length; x++) {
        if (dataset[x].year != "undefined" && dataset[x].year === q) {
            result.push(dataset[x]);
        }
        else {
            if (dataset[x].year === "default") {
                result.push(dataset[x]);
            }
        } */

async function controller() {
  const data = await fetchData();
  // console.log(data);
  createTable(data);
  unique(data);
  tableDataFilter(data);
  filter(data);
  showData(data);
  showSelected()

}
controller();
