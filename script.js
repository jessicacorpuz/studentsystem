let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
    let id = document.getElementById("studentid").value.trim();
    let name = document.getElementById("fullname").value.trim();
    let course = document.getElementById("course").value.trim();
    let year = document.getElementById("yearlevel").value.trim();
    let age = document.getElementById("age").value.trim();

    if (!id || !name || !course || !year || !age) {
        alert("Please fill all required fields*");
        return;
    }

    if (students.find(student => student.id === id)) {
        alert("Student ID already exists");
        return;
    }

    students.push({ id, name, course, year, age });
    saveToLocalStorage();
    displayStudents();
    clearFields();
}

function displayStudents(filteredStudents = students) {
    let table = document.getElementById("studentrecords");
    table.innerHTML = "";

    filteredStudents.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
                <td>${student.age}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Edit</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

function searchStudent() {
    let value = document.getElementById("searchinput").value.toLowerCase();

    let filtered = students.filter(student =>
        student.id.toLowerCase().includes(value) ||
        student.name.toLowerCase().includes(value)
    );

    displayStudents(filtered);
}

function editStudent(id) {
    let student = students.find(s => s.id === id);

    document.getElementById("studentid").value = student.id;
    document.getElementById("fullname").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("yearlevel").value = student.year;
    document.getElementById("age").value = student.age;

    deleteStudent(id);
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    saveToLocalStorage();
    displayStudents();
}

function clearFields() {
    document.getElementById("studentid").value = "";
    document.getElementById("fullname").value = "";
    document.getElementById("course").value = "";
    document.getElementById("yearlevel").value = "";
    document.getElementById("age").value = "";
}

function closeTab() {
    window.close()
}
