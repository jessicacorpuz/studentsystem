let students = json.parse(localstorage.getitem("students")) || [];

function savetolocalstorage(){
localstorage.setitem("students", json.stringify(students));
}

function showsection(section){
document.queryselectorall(".section").forEach(sec=>{
sec.classList.remove("active");
});

if(section === "home"){
document.getElementById("home").classList.add("active");
}else{
document.getElementById("system").classList.add("active");
}
}

function login(){
alert("Login Successful");
showsection("manage");
}

function addstudent(){
let id = document.getElementById("studentid").value.trim();
let name = document.getElementById("fullname").value.trim();
let course = document.getElementById("course").value.trim();
let year = document.getElementById("yearlevel").value.trim();
let age = document.getElementById("age").value.trim();

if(!id || !name || !course || !year || !age){
alert("Please fill all required fields");
return;
}

if(students.find(student=>student.id===id)){
alert("Student ID already exists");
return;
}

students.push({id,name,course,year,age});
savetolocalstorage();
displaystudents();
clearfields();
}

function displaystudents(filteredstudents = students){
let table = document.getElementById("studentrecords");
table.innerHTML="";

filteredstudents.forEach(student=>{
table.innerHTML += `
<tr>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.course}</td>
<td>${student.year}</td>
<td>${student.age}</td>
<td>
<button onclick="editstudent('${student.id}')">edit</button>
<button onclick="deletestudent('${student.id}')">delete</button>
</td>
</tr>
`;
});
}

function searchstudent(){
let value = document.getElementById("searchinput").value.toLowerCase();

let filtered = students.filter(student =>
student.id.toLowerCase().includes(value) ||
student.name.toLowerCase().includes(value)
);

displaystudents(filtered);
}

function editstudent(id){
let student = students.find(s=>s.id===id);

document.getElementById("studentid").value = student.id;
document.getElementById("fullname").value = student.name;
document.getElementById("course").value = student.course;
document.getElementById("yearlevel").value = student.year;
document.getElementById("age").value = student.age;

deletestudent(id);
}

function deletestudent(id){
students = students.filter(student=>student.id!==id);
savetolocalstorage();
displaystudents();
}

function clearfields(){
document.getElementById("studentid").value="";
document.getElementById("fullname").value="";
document.getElementById("course").value="";
document.getElementById("yearlevel").value="";
document.getElementById("age").value="";
}

displaystudents();
