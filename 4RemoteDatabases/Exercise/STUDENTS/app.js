function attachEvents() {
    const baseUrl = `https://students-db01.firebaseio.com/students`;
    const tableResults = document.querySelector("table#results");
    const tableBody = tableResults.querySelector("tbody");
    const formAddStudent = document.querySelector("form#form-add-student");

    async function getAllStudents() {
        const responseAllStudents = await fetch(`${baseUrl}.json`);
        const allStudents = await responseAllStudents.json();
        return allStudents;
    }

    const createRow = (studentObj, key) => {
        const {
            firstName,
            lastName,
            facultyNumber,
            grade
        } = studentObj;

        return `<tr><td class="id">${key}</td><td class="firstName">${firstName}</td><td class="lastName">${lastName}</td><td class="facultyNumber">${facultyNumber}</td><td class="grade">${grade}</td></tr>`;
    };


    async function loadAllStudents() { // the students must be sorted in ascending order by ID
        const allStudents = await getAllStudents();
        // console.log(Object.keys(allStudents).sort());
        Object.keys(allStudents).forEach(key => {
            const studentObj = allStudents[key];
            tableBody.innerHTML += createRow(studentObj, key);
        });
    }
    loadAllStudents(); // load all students when the page loads

    async function addStudent(e) {
        e.preventDefault();

        const [id, firstName, lastName, facultyNumber, grade] = formAddStudent.querySelectorAll("input");
        const [idValue, firstNameValue, lastNameValue, facultyNumberValue, gradeValue] = [id.value, firstName.value, lastName.value, facultyNumber.value, grade.value];
        // validate the ID
        if (idValue.trim() === "" || (idValue.trim() !== "" && Number.isNaN(Number(idValue)) === true) || Number(idValue) < 0) { // because Number("") === 0
            alert("Please provide a correct ID -> a NUMBER larger than or equal to 0");
            return;
        }
        // make sure there is not laready an entry in the collection with the same ID
        const allStudents = await getAllStudents();
        if (Object.keys(allStudents).includes(idValue) === true) {
            alert("Please provide a different ID! The current one belongs to an existing student.");
            return;
        }

        /*const responseFirst2 = await fetch(`https://students-db01.firebaseio.com/students.json`, {
            method: "PATCH",
            body: JSON.stringify({
                14: {
                    id: 14,
                    firstName: "John",
                    lastName: "Doe",
                    facultyNumber: "Nqkoj si",
                    grade: 5.82,
                }
            })
        });
        const jsonFirst2 = await responseFirst2.json();
        console.log(jsonFirst2);*/
    }
    document.querySelector("#add-new-student-button").addEventListener("click", addStudent);
}

attachEvents();
// now < 1609106400000