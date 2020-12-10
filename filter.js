function isNull() {
  if (dataCH.length == 0 || dataCHObj.length == 0) {
    alert("File excel bị rỗng");
    return true;
  }
}
function sumString(str) {
  let arr = str.split("");
  let sum = 0;
  arr.forEach(element => {
    sum += parseInt(element);
  });
  return sum;
}

exportToCsv = function (typename, content, data) {
  var CsvString = content;
  data.forEach(function (ColItem, ColIndex) {
    CsvString += ColItem + "\r\n";
  });

  CsvString = "data:text/csv," + encodeURIComponent(CsvString);
  var x = document.createElement("A");
  x.setAttribute("href", CsvString);
  x.setAttribute("download", typename + ".csv");
  document.body.appendChild(x);
  x.click();
};

function abxyFilter() {
  if (isNull()) return 0;
  var a = document.querySelector("#a").value;
  var b = document.querySelector("#b").value;
  var x = document.querySelector("#x").value;
  var y = document.querySelector("#y").value;

  const result = dataCH.filter(item => {
    return (
      sumString(item.substr(0, a)) == x &&
      sumString(item.substr(item.length - b, item.length - 1)) == y
    );
  });

  if (result.length == 0) {
    alert("Không lọc được số nào");
    return 0;
  }

  alert("Đã lọc được " + result.length + " số");

  exportToCsv(
    "Lọc tổng đầu cuối",
    "Các số đã được lọc với quy tắc " +
    a +
    " số đầu tổng bằng " +
    x +
    " và " +
    b +
    " số cuổi tổng bằng " +
    y +
    " \r\n",
    result
  );
}

function lastFilter() {
  if (isNull()) return 0;
  var lastNum = document.querySelector("#lastNum").value;
  const result = dataCH.filter(item => {
    return item.indexOf(lastNum) == item.length - lastNum.length;
  });
  if (result.length == 0) {
    alert("Không lọc được số nào");
    return 0;
  }
  alert("Đã lọc được " + result.length + " số");

  exportToCsv(
    "Lọc số đuôi",
    "Bộ lọc với số đuôi là " + lastNum + " \r\n",
    result
  );
}

//filter with price

exportToCsvObj = function (typename, content, data) {
  var CsvString = content + "SIM, GIÁ\r\n";
  data.forEach(function (ColItem, ColIndex) {
    CsvString += ColItem.sim + " ," + ColItem.price + "\r\n";
  });

  CsvString = "data:text/csv," + encodeURIComponent(CsvString);
  var x = document.createElement("A");
  x.setAttribute("href", CsvString);
  x.setAttribute("download", typename + ".csv");
  document.body.appendChild(x);
  x.click();
};

function abxyFilterObj() {
  if (isNull()) return 0;
  var a = document.querySelector("#a").value;
  var b = document.querySelector("#b").value;
  var x = document.querySelector("#x").value;
  var y = document.querySelector("#y").value;

  const result = dataCHObj.filter(item => {
    return (
      sumString(item.sim.substr(0, a)) == x &&
      sumString(item.sim.substr(item.sim.length - b, item.sim.length - 1)) == y
    );
  });

  if (result.length == 0) {
    alert("Không lọc được số nào");
    return 0;
  }

  alert("Đã lọc được " + result.length + " số");

  exportToCsvObj(
    "Lọc tổng đầu cuối",
    "Các số đã được lọc với quy tắc " +
    a +
    " số đầu tổng bằng " +
    x +
    " và " +
    b +
    " số cuổi tổng bằng " +
    y +
    " \r\n",
    result
  );
}


function abxyFilterObjArray() {
  if (isNull()) return 0;
  var a = document.querySelector("#a1").value;
  var b = document.querySelector("#b1").value;
  var x = document.querySelector("#xArray").value;
  var y = document.querySelector("#yArray").value;

  var xArray = x.split(",");
  var yArray = y.split(",");

  if (xArray.length != yArray.length) {
    return alert("Vui lòng nhập chuỗi xy cùng số lượng");
  }

  var CsvString = "";

  for (let index = 0; index < xArray.length; index++) {
    let result = dataCHObj.filter(item => {
      return (
        sumString(item.sim.substr(0, a)) == xArray[index] &&
        sumString(item.sim.substr(item.sim.length - b, item.sim.length - 1)) == yArray[index]
      );
    });

    let content = "Các số đã được lọc với quy tắc " + a + " số đầu tổng bằng " + xArray[index] + " và " + b + " số cuổi tổng bằng " + yArray[index] + " \r\n";
    CsvString += content + "SIM, GIÁ\r\n";
    console.log(result);
    result.forEach(function (ColItem, ColIndex) {
      CsvString += ColItem.sim + " ," + ColItem.price + "\r\n";
    });
  }
  CsvString = "data:text/csv," + encodeURIComponent(CsvString);
  var x = document.createElement("A");
  x.setAttribute("href", CsvString);
  x.setAttribute("download", "Lọc tổng đầu cuối" + ".csv");
  document.body.appendChild(x);
  x.click();
}
