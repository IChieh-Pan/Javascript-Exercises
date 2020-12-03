
const fetchData = async () => {
  const response = await fetch(
    "https://usc.data.socrata.com/resource/4a97-v5tx.json"
  );
  const data = await response.json();
  return data;
};



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


//Get unique values from attributes in an array
function unique(data)  {
  const yearMap = new Set(data.map((data) => data.year));
  console.log(yearMap);
  const yearCount = [...yearMap];
  console.log(yearCount);
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



//control select tag with array attribute value (using .filter() function)
function filter(data) {
  let result = [];
  let q = document.getElementById("filterBtn").value;
  if (q === "default") {
    createTable(data);
  } else {
    const filterArray = data.filter((item) => {
       return  q === item.year;
    });
    createTable(filterArray);
  }
}

const setEventListeners = (data) => {
  const selectBox = document
    .getElementById("filterBtn")
    .addEventListener("change", (event) => {
      filter(data);
    });
  
  const checkbox = document.getElementById("showBefore2012");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      tableDataFilter(data);
    } else {
      createTable(data);
    }
  });
};

function tableDataFilter(data) {
  let result = [];
  data.forEach((item) => {
    if (item.year < 2011) {
      result.push(item);
    }
    // console.log(result);
  });
  createTable(result);
}




/* function showData(data) {
  if (checkbox.checked) {
    tableDataFilter(data);
  } else {
    fetchData(data);
  }
} */



//controller
const controller = async () => {
  const data = await fetchData();
  // console.log(data);
  createTable(data);
  const uniqueDates = unique(data);
  dropdown(uniqueDates)
  tableDataFilter(data);
  filter(data);
  setEventListeners(data);

}
controller();


