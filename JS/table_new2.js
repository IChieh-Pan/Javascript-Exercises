const fetchData = async () => {
  const response = await fetch(
    "https://usc.data.socrata.com/resource/4a97-v5tx.json"
  );
  const data = await response.json();
  return data;
};



function createTable(data) {
    let table = document.getElementById("property-table");
    table.innerHTML = "";
    let tBody = document.createElement("tBody");
    let th;
    let td;
    let thead = document.createElement("thead");
    thead.classList.add("thead-dark")
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
    if (yearValue(item) && amountValue(item)) {
      tr = document.createElement("tr");
      td = document.createElement("td");
      td.innerHTML = item.neighborhood;
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = item.year;
      tr.appendChild(td);

      td = document.createElement("td");
      td.innerHTML = item.amount;
      tr.appendChild(td);

      tBody.appendChild(tr);

      }
    });
    table.appendChild(tBody); 
}


// createTable();

//Get unique values from attributes in an array
function unique(data) {
  const yearMap = new Set(data.map((data) => data.year));
  console.log(yearMap);
  const yearCount = [...yearMap];
  console.log(yearCount);
  return yearCount;
}

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
  let q = document.getElementById("filterBtn").value;
  if (q === "default") {
    createTable(data);
  } else {
    const filterArray = data.filter((item) => {
      return q === item.year;
    });
    createTable(filterArray);
  }
}

const setEventListeners = (data) => {
  const selectBox = document
    .getElementById("filterBtn")
    .addEventListener("change", (event) => {
      // filter(data);
       createTable(data);

    });

  const checkbox = document.getElementById("showBefore2012");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      tableDataFilter(data);
    } else {
      createTable(data);
    }
  });


  const checkbox2 = document.getElementById("sortAscending");
  // console.log("sortcheckbox :>> ", checkbox2);
  checkbox2.addEventListener("change", (event) => {
    if (event.target.checked) {
      createSort(data);
      // createTable(data);
    } else {
      console.log(event.target);
      createTable(data);
    }
  });

  const checkbox3 = document.getElementById("filterAmount");
  checkbox3.addEventListener("change", (event) => {
     createTable(data);
    
    // if (event.target.checked) {
    //   // console.log('x',filterAmount(data));
    //   const newList = filterAmount(data, 1000);
    //   createTable(newList);
    // } else {
    //   createTable(data);
    // }
  });
};

  function createSort(data) {
    const sorted = data;
    sorted.sort(function (a, b) {
      let nameA = a.neighborhood.toLowerCase();
      let nameB = b.neighborhood.toLowerCase();
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    });
    createTable(sorted);
    // console.log("object :>> ", emptySort.push(sort));
  }



const yearValue = (item) => {
  const input = document.getElementById("filterBtn").value;
  return item.year === input || input === "default" ? true : false;
};

function amountValue(item) {
  if (document.getElementById("filterAmount").checked) {
    if (item.amount > 1000) {
      return true;
    }
    else return false
  } else {
    return true 
  }
}
/* 
  const combine = (array) => {
    const input = document.getElementById("filterBtn").value;
    const checkValue = document.getElementById("filterAmount").checked
    const filteredList = array.filter(item => {
  let 
})
 */
    
  

const filterAmount = (data, newAmount) => {
  const amountFilter = data.filter((item) => item.amount > newAmount);
  console.log("amount :>> ", amountFilter);
  return amountFilter;
};

function tableDataFilter(data) {
  let result = [];
  data.forEach((item) => {
    if (item.year < 2012) {
      result.push(item);
    }
    // console.log(result);
  });
  createTable(result);
}

const show2016 = (item) => {
  const show2016Value = document.getElementById("showBefore2012").value;
  return show2016Value;
};
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
  console.log("list :>> ", data);
  createTable(data);
  const uniqueDates = unique(data);
  dropdown(uniqueDates);
  yearValue(data);
  tableDataFilter(data);
  filter(data);
  setEventListeners(data);
};
controller();

// Bootstrap responsive table
$(document).ready(function () {
  // inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
  $(".table-responsive-stack").each(function (i) {
    var id = $(this).attr("id");
    //alert(id);
    $(this)
      .find("th")
      .each(function (i) {
        $("#" + id + " td:nth-child(" + (i + 1) + ")").prepend(
          '<span class="table-responsive-stack-thead">' +
            $(this).text() +
            ":</span> "
        );
        $(".table-responsive-stack-thead").hide();
      });
  });

  $(".table-responsive-stack").each(function () {
    var thCount = $(this).find("th").length;
    var rowGrow = 100 / thCount + "%";
    console.log("f",rowGrow);
    $(this).find("th, td").css("flex-basis", auto);
  });

  function flexTable() {
    if ($(window).width() < 768) {
      $(".table-responsive-stack").each(function (i) {
        $(this).find(".table-responsive-stack-thead").show();
        $(this).find("thead").hide();
      });

      // window is less than 768px
    } else {
      $(".table-responsive-stack").each(function (i) {
        $(this).find(".table-responsive-stack-thead").hide();
        $(this).find("thead").show();
      });
    }
    // flextable
  }

  flexTable();

  window.onresize = function (event) {
    flexTable();
  };

  // document ready
});
