
displayAll();
function submitForm(event) {
  event.preventDefault();
  
  var formData = {
    "id": event.target.elements.id.value ? Number(event.target.elements.id.value) : 0,
    "name": event.target.elements.name.value.trim(),
    "fatherName": event.target.fathername.value.trim(),
    "class": event.target.elements.class.value.trim(),
    "rollNo": event.target.elements.rollno.value.trim(),
    "address": event.target.elements.address.value.trim(),
    "dateTime": event.target.elements.date.value.trim(),
    "rupees": 0,
    "imgPath": "string"
  }
if(formData.id > 0){
  fetch("https://localhost:7128/api/student/" + formData.id, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(formData)
  }).then(res => {
    console.log("Request complete! response:", res);
  
    document.getElementById("myForm").reset();
    alert("Updated Successfully!")
    displayAll();
  });
}
 else {
  fetch("https://localhost:7128/api/student", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(formData)
  }).then(res => {
    console.log("Request complete! response:", res);
  
    document.getElementById("myForm").reset();
    alert("Save Successfully!")
    displayAll();
  });
} 


  
}



function reset() {
  document.getElementById("myForm").reset();
}
function displayAll() {
  let url = "https://localhost:7128/api/student";

  fetch(url,{
    method: "GET",
    headers: {'Content-Type': 'application/json'}, 
  }).then(function(response){
    response.json().then(function(data) {
      console.log(data);
      return data;
    })
    .then((data) => { 
  let elements = document.getElementsByClassName("rows");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }

      data.forEach((item) => {
        showAllStudents(item);
      })
    })
  });
}

function showAllStudents(data) {
  let countries = document.getElementById("customers");

  var date = convert(data.dateTime);
  let div = document.createElement("tr");
  div.className = "rows"
  div.innerHTML = `<td>${data.name}</td>
                   <td>${data.fatherName}</td>
                   <td> ${data.class}</td>
                   <td>${data.rollNo}</td>
                   <td>${data.address}</td>
                   <td>${date}</td>
                   <td><a style="margin-right:2px;" href="#" onclick='editStudent(${(JSON.stringify(data))})' >Edit</a> | <a href="#"style="margin-right:2px;" onclick='printDiv(${(JSON.stringify(data))})' >Print</a> |  <a  href="#" onclick="deleteStudent(${data.id})" style="margin-left:2px;">Delete</a></td>`
  countries.appendChild(div);
}


function deleteStudent(id) {
  if(!confirm("Are you sure you want to delete the data")){
    return;
  }

  let url = "https://localhost:7128/api/student/" + id;

  fetch(url,{
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}, 
  }).then(function(response){
    alert("Deleted Successfully!")
    displayAll();

  });
}


function editStudent(data ){

  document.getElementById('id').value = data.id ;
  
   document.getElementById('name').value = data.name ;
   document.getElementById('fname').value = data.fatherName ;
   document.getElementById('class').value = data.class ;
   document.getElementById('rollNo').value = data?.rollNo ;
   document.getElementById('address').value = data.address ;
   document.getElementById('date').value = convert(data.dateTime);

}

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function printDiv(data) {
  document.getElementById('n').innerHTML = data.name ;
  document.getElementById('fn').innerHTML = data.fatherName ;
  document.getElementById('c').innerHTML = data.class ;
  document.getElementById('rn').innerHTML = data.rollNo ;
  document.getElementById('add').innerHTML = data.address ;
  document.getElementById('da').innerHTML = convert(data.dateTime);
  var printContents = document.getElementById("printableArea").innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

function handlechange(e) {

  var filter = e.target.value;
  if(filter){
    let url = "https://localhost:7128/api/student/filterStudents?name=" + filter;

    fetch(url,{
      method: "GET",
      headers: {'Content-Type': 'application/json'}, 
    }).then(function(response){
      response.json().then(function(data) {
        console.log(data);
        return data;
      })
      .then((data) => { 
    let elements = document.getElementsByClassName("rows");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  
        data.forEach((item) => {
          showAllStudents(item);
        })
      })
    });
  }else {
    displayAll();
  }
      
    
    
}