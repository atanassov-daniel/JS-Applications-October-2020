export default {
    validateInputFieldsCreateFurniture(e) {
        // да опитам да го направя да показва дали е валидно или не наисаното в input-a не чак като натиснем submit бутона, ами и преди това докато пиша -< на промяна на съдържанието на инпута да прави проверка - май имаше такъв евент даже за инпут полетата
        e.preventDefault();
        let allValid = true;

        const validityHandler = (inputEl, isValid) => {
            const validHTML = `<div class="form-control-feedback" style="background-color: palegreen;">This input value is valid</div>`;
            const invalidHTML = `<div class="form-control-feedback" style="background-color: red;">This input value is invalid</div>`;

            // const isValid = currentItemValidity;
            // const inputElement = inputEl;
            const parentDivFormGroup = inputEl.parentElement;
            if (parentDivFormGroup.querySelector(".form-control-feedback")) parentDivFormGroup.querySelector(".form-control-feedback").remove();

            const val = document.getElementById("new-make").value;

            if (isValid) {
                inputEl.className = "form-control is-valid";
                parentDivFormGroup.innerHTML += validHTML;
            } else {
                allValid = false;
                inputEl.className = "form-control is-invalid";
                parentDivFormGroup.innerHTML += invalidHTML;
            }

            // after unwantedly refreshing the form div
            document.getElementById("new-make").value = val;
        };


        const makeInputValue = document.getElementById("new-make").value;
        if (makeInputValue.length >= 4) validityHandler(document.getElementById("new-make"), true)
        else validityHandler(document.getElementById("new-make"), false);


        /*      if (makeInputValue.length >= 4) {
                    document.getElementById("new-make").className = "form-control is-valid";

                    const parent = document.getElementById("new-make").parentElement;
                    if (parent.querySelector(".form-control-feedback")) parent.querySelector(".form-control-feedback").remove();
                    const val = document.getElementById("new-make").value;
                    parent.innerHTML += `<div class="form-control-feedback" style="background-color: palegreen;">This input value is valid</div>`;
                    document.getElementById("new-make").value = val;
                } else {
                    allValid = false;
                    document.getElementById("new-make").className = "form-control is-invalid";

                    const parent = document.getElementById("new-make").parentElement;
                    if (parent.querySelector(".form-control-feedback")) parent.querySelector(".form-control-feedback").remove();
                    const val = document.getElementById("new-make").value;
                    document.getElementById("new-make").parentElement.innerHTML += `<div class="form-control-feedback" style="background-color: red;">This input value is invalid</div>`;
                    document.getElementById("new-make").value = val;
                    // return; -> хоарта все пак трябва да знаят кои са им всички грешки,а не само първата
                } */
        // validityHandler(); -> ако е валидно, не правя нищо, а ко не е - правя allValid = false; и след това викам функцията отдолу със подаден аllValid

        const modelInputValue = document.getElementById("new-model").value;
        if (modelInputValue.length < 4) allValid = false;

        const yearInputValue = document.getElementById("new-year").value;
        if (yearInputValue < 1950 || yearInputValue > 2050) allValid = false;
        const descriptionInputValue = document.getElementById("new-description").value;
        if (descriptionInputValue.length <= 10) allValid = false;
        const priceInputValue = document.getElementById("new-price").value;
        if (priceInputValue < 0) allValid = false; // but should 0 be included or not
        const imageUrlInputValue = document.getElementById("new-image").value;
        if (imageUrlInputValue.trim() === "") allValid = false;
        const materialInputValue = document.getElementById("new-material").value;
        // if everything is ok, what message should I show before redirecting to all
        if (allValid === true) {
            location.hash = "#/all/";
        }
    },
    validateSth() {
        console.log("fock");
    },
};