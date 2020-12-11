const getData = () => {
  fetch("https://apodapi.herokuapp.com/api/?count=200")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
      /* createTable(data);
      setEventListeners(data); */
    });
};

const fetchData = async () => {
  const response = await fetch("https://apodapi.herokuapp.com/api/?count=200");
  const data = await response.json();
  return data;
};

function createTable(data) {
  let body = document.getElementById("property-table");
  body.innerHTML = "";
  let table = document.createElement("table");
  let tBody = document.createElement("tbody");
  let th;
  let td;
  let thead = document.createElement("thead");
  thead.classList.add("thead-dark");
  let tr = document.createElement("tr");
  th = document.createElement("th");
  th.classList.add("sticky-top");
  th.innerHTML = "Title";
  tr.appendChild(th);

  th = document.createElement("th");
  th.classList.add("sticky-top");
  th.innerHTML = "Copyright";
  tr.appendChild(th);

  th = document.createElement("th");
  th.classList.add("sticky-top");
  th.innerHTML = "Date";
  tr.appendChild(th);

  thead.appendChild(tr);
  table.appendChild(thead);

  data.forEach((item) => {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td1.innerHTML = item.title;
    tr.appendChild(td1);

    td2 = document.createElement("td");
    td2.innerHTML = item.copyright;
    tr.appendChild(td2);

    td3 = document.createElement("td");
    td3.innerHTML = item.date;
    tr.appendChild(td3);

    tBody.appendChild(tr);
  });
  table.appendChild(tBody);
  body.appendChild(table);
}

/* function createSort(data) {
  data.sort(function (a, b) {
    let nameA = a.title.toLowerCase();
    let nameB = b.title.toLowerCase();
    if (nameA < nameB) return 1;
    if (nameA > nameB) return -1;
    return 0;
  })
  } */

/* const sort = document.getElementById("sortCopyright");
console.log("sort",sort);
sort.addEventListener('change', function(event){
  console.log(event.target.checked);
  if (event.target.checked) {
    createSort(data);
    createTable(data);
  } else {
    // createTable(data);
  }
}) */

const eventListener = (list) => {
  document.querySelector("#datePicker").addEventListener("change", (event) => {
    const datePickerValue = document.querySelector("#datePicker").value;
    console.log("datePickerValue", datePickerValue);
    const filterDate = filterByDate(list, datePickerValue);
    console.log("filterDate :>> ", filterDate);
    createTable(filterDate);
  });
};

const filterByDate = (array, date) => {
  const filteredList = array.filter((item) => {
    // console.log(date);
    // console.log("new Date :>>", new Date(date));
    console.log("item.date", new Date(item.date).toDateString());
    return (
      new Date(item.date).setHours(0, 0, 0, 0) ===
      new Date(date).setHours(0, 0, 0, 0)
    );
  });
  return filteredList;
};

/*  const filteredListByDate = filterByDate(item);
 console.log("filteredListByDate:", filteredListByDate);
 createTable(filteredListByDate);
 */

const controller = async () => {
  const list = await fetchData();
  console.log("list :>> ", list);
  createTable(list);
  eventListener(list);
  filterByDate(list);

  // createSort(data)
};
controller();
