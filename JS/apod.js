const getData = () => {
  fetch("https://apodapi.herokuapp.com/api/?count=100")
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
  const response = await fetch("https://apodapi.herokuapp.com/api/?count=100");
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
  let rowAll = document.createElement("div");
  rowAll.classList.add("row");
  let thead = document.createElement("thead");
  thead.classList.add("thead-dark");
  let tr = document.createElement("tr");
  let row = document.createElement("div");
  row.appendChild(tr);
  row.classList.add("row");
  th = document.createElement("th");
  th.classList.add("col-4");
  th.classList.add("sticky-top");
  th.innerHTML = "Title";
  tr.appendChild(th);

  th = document.createElement("th");
  th.classList.add("col-4");
  th.classList.add("sticky-top");
  th.innerHTML = "Copyright";
  tr.appendChild(th);

  th = document.createElement("th");
  th.classList.add("col-4");
  th.classList.add("sticky-top");
  th.innerHTML = "Date";
  tr.appendChild(th);

  thead.appendChild(tr);
  rowAll.appendChild(thead);
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
  document.querySelector("#fromDate").addEventListener("change", (event) => {
    let dateFormat = "yyyyMM";
    const datePickerValue = document.querySelector("#fromDate").value;
    console.log("datePickerValue", datePickerValue);
    /* const x = datePickerValue.toLocaleDateString("en", {
      month: "numeric", year: "numeric"
    })  */
    const filterTableDate = tableDate(list, datePickerValue);
    console.log("filterTableDate :>> ", filterTableDate);
    createTable(filterTableDate);
  });
};

const tableDate = (array, dateX) => {
  const datepicker = new Date(dateX)
  const monthDatePicker = datepicker.getMonth();
  const yearDatePicker = datepicker.getFullYear();
  const filteredList = array.filter((item) => {
    let today = new Date(item.date).toLocaleDateString("en", {
      month: "numeric",
      year: "numeric",
    });
    console.log("today :>> ", today);

    const monthItem = new Date(item.date).getMonth();
    const yearItem= new Date(item.date).getFullYear();
    console.log(yearDatePicker);
    /*     let year = today.getFullYear();
    let mon = today.getMonth();
    year && mon ? true : false  */

    /*     console.log("year",year);
    console.log('mon :>> ', mon);
    let monthYear = `${year}-${mon}`; 
    console.log("x",monthYear); */
    // let fetch = mon"-"+year
    /*  console.log(date);
    console.log("new Date :>>", new Date(date)); */
    // console.log("item.date", new Date(item.date).toDateString());
    return monthDatePicker === monthItem && yearDatePicker === yearItem 

      /* new Date(item.date).setHours(0, 0, 0, 0) ===
      new Date(dateX).toLocaleDateString("de", {
        month: "long",
        year: "numeric", */
  });
  return filteredList;
};

/* $("#booDatePicker").datepicker({
  format: "mm-yyyy",
  startView: "months",
  minViewMode: "months",
});
 */

/*  const filteredListByDate = filterByDate(item);
 console.log("filteredListByDate:", filteredListByDate);
 createTable(filteredListByDate);
 */

const controller = async () => {
  const list = await fetchData();
  console.log("list :>> ", list);
  createTable(list);
  eventListener(list);
  tableDate(list);

  // createSort(data)
};
controller();
