let students = [];

// Load students from Vercel API
async function loadStudents() {
    try {
        const res = await fetch('/students');
        students = await res.json();
        displaystudents();
    } catch (err) {
        console.error('Failed to load students', err);
    }
}

// Save students to Vercel API
async function saveStudents() {
    try {
        await fetch('/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(students)
        });
    } catch (err) {
        console.error('Failed to save students', err);
    }
}

function showsection(section){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
    });

    if(section === "home"){
        document.getElementById("home").classList.add("active");
    } else {
        document.getElementById("system").classList.add("active");
        document.getElementById("manage").style.display = "none";
        document.getElementById("records").style.display = "none";
        document.getElementById(section).style.display = "block";
    }
}

function login(){
    alert("Login Successful");
    showsection("manage");
}

async function addstudent(){
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
    await saveStudents();       // save online
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
                <button onclick="editstudent('${student.id}')">Edit</button>
                <button onclick="deletestudent('${student.id}')">Delete</button>
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

async function editstudent(id){
    let student = students.find(s=>s.id===id);

    document.getElementById("studentid").value = student.id;
    document.getElementById("fullname").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("yearlevel").value = student.year;
    document.getElementById("age").value = student.age;

    await deletestudent(id);
}

async function deletestudent(id){
    students = students.filter(student=>student.id!==id);
    await saveStudents(); // update backend
    displaystudents();
}

function clearfields(){
    document.getElementById("studentid").value="";
    document.getElementById("fullname").value="";
    document.getElementById("course").value="";
    document.getElementById("yearlevel").value="";
    document.getElementById("age").value="";
}

// Load students when page loads
loadStudents();
