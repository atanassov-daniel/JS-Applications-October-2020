// the first time the collection was somehow an array and this function was made for this case, in the file I made a function for when having an assocArr
const createRow = (studentObj, index) => {
    if (studentObj === "empty" || studentObj === null) return;
    const {
        id,
        firstName,
        lastName,
        facultyNumber,
        grade
    } = studentObj;
    const idIndex = index;
    console.log(idIndex, firstName, lastName, facultyNumber, grade);
    return `<tr><td class="id">${idIndex}</td><td class="firstName">${firstName}</td><td class="lastName">${lastName}</td><td class="facultyNumber">${facultyNumber}</td><td class="grade">${grade}</td></tr>`;
};


console.log(allStudents);
allStudents.forEach((studentObj, index) => {
    // console.log(studentObj);
    createRow(studentObj, index);
});


/* */
const responseSecond1 = await fetch(`https://students-db01.firebaseio.com/students.json`, {
    method: "PATCH",
    body: JSON.stringify({
        7: {
            id: 7,
            firstName: "Isaac",
            lastName: "Netero",
            facultyNumber: "900005878123",
            grade: 4.99,
        }
    })
});
const jsonSecond1 = await responseSecond1.json();
console.log(jsonSecond1);

tableBody.innerHTML = `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;
tableBody.innerHTML += `<tr><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td><td>Ivan</td></tr>`;