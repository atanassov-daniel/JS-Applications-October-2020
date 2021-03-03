function button(text, type){
    let temp = document.getElementById('app-button').content.cloneNode(true);

    temp.querySelector('button.btn').classList.add(type);
    temp.querySelector('button.btn').textContent = text;

    console.log(temp);
    document.body.appendChild(temp);
}

