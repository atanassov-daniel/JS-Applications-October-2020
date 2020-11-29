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

        return `<tr id="${key}"><td class="id">${key}</td><td class="firstName">${firstName}</td><td class="lastName">${lastName}</td><td class="facultyNumber">${facultyNumber}</td><td class="grade">${grade}</td></tr>`;
    };


    async function loadAllStudents() { // the students must be sorted in ascending order by ID
        tableBody.innerHTML = "";

        const allStudents = await getAllStudents();
        // console.log(Object.keys(allStudents).sort());
        Object.keys(allStudents).forEach(key => {
            if (key == "-1" || document.getElementById(key)) return;
            const studentObj = allStudents[key];
            tableBody.innerHTML += createRow(studentObj, key);
        });
    }
    loadAllStudents(); // load all students when the page loads


    async function validateInputValues(idValue, firstNameValue, lastNameValue, facultyNumberValue, gradeValue) {
        // validate the ID
        if (idValue.trim() === "" || (idValue.trim() !== "" && Number.isNaN(Number(idValue)) === true) || Number(idValue) < 0) { // because Number("") === 0
            alert("Please provide a valid ID -> a NUMBER larger than or equal to 0");
            return "validation unsuccessful";
        }
        // make sure there is not laready an entry in the collection with the same ID
        const allStudents = await getAllStudents();
        if (Object.keys(allStudents).includes(idValue) === true) {
            alert("Please provide a different ID! The current one belongs to an existing student.");
            return "validation unsuccessful";
        }
        // validate the firstName
        if (firstNameValue.trim() === "" || Number.isNaN(Number(firstNameValue.trim())) === false) {
            alert("Please provide a valid first name");
            // firstName.style.background = "red";
            return "validation unsuccessful";
        }
        // validate the lastName
        if (lastNameValue.trim() === "" || Number.isNaN(Number(lastNameValue.trim())) === false) {
            alert("Please provide a valid last name");
            return "validation unsuccessful";
        }
        // validate the facultyNumber
        if (facultyNumberValue.trim() === "" || (facultyNumberValue.trim() !== "" && Number.isNaN(Number(facultyNumberValue)) === true) || facultyNumberValue[0] === "-" || facultyNumberValue.trim().length <= 1) {
            alert("Please provide a valid faculty number -> a non-negative sequence of NUMBERS");
            return "validation unsuccessful";
        }
        // validate the grade
        if (gradeValue.trim() === "" || (gradeValue.trim() !== "" && Number.isNaN(Number(gradeValue)) === true) || gradeValue.trim() < 2.00 || gradeValue.trim() > 6.00 || gradeValue.match(/[2-6].[0-9][0-9]/) === null) {
            alert("Please provide a valid grade -> a decimal number from 2.00 to 6.00");
            return "validation unsuccessful";
        }
    }

    async function addStudent(e) {
        e.preventDefault();

        const [id, firstName, lastName, facultyNumber, grade] = formAddStudent.querySelectorAll("input");
        const [idValue, firstNameValue, lastNameValue, facultyNumberValue, gradeValue] = [id.value, firstName.value, lastName.value, facultyNumber.value, grade.value];

        const validateIsSuccessful = await validateInputValues(idValue, firstNameValue, lastNameValue, facultyNumberValue, gradeValue);
        if (validateIsSuccessful === "validation unsuccessful") return;

        const response = await fetch(`https://students-db01.firebaseio.com/students.json`, {
            method: "PATCH",
            body: JSON.stringify({
                [idValue.trim()]: {
                    id: Number(idValue.trim()),
                    firstName: firstNameValue.trim(),
                    lastName: lastNameValue.trim(),
                    facultyNumber: Number(facultyNumberValue.trim()),
                    grade: Number(gradeValue.trim()),
                }
            })
        });
        if (response.ok === false) {
            alert(`An error has occured while trying to add the student - ${response.status} (${response.statusText})`);
            return;
        }
        loadAllStudents();
        id.value = "", firstName.value = "", lastName.value = "", facultyNumber.value = "", grade.value = "";
    }
    document.querySelector("#add-new-student-button").addEventListener("click", addStudent);
}

attachEvents();
// now < 1609106400000