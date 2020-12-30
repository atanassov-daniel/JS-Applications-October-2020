/* document.querySelector("#ledon-button").addEventListener("click", () => {
            fetch('http://localhost:5501/LEDon', {
                type: 'POST',
                contentType: "text/plain",
                data: "drunci.pdf",
                // success: function (response) {
                //     console.log(response);
                // }
            });
        }); */

$('#generate-barcode-button').click(function () {
    const inputBarcode = document.getElementById("input-barcode").value;

    JsBarcode("#barcode-container")
        .CODE128(inputBarcode, {
            fontSize: 18,
            textMargin: 0
        })
        .render();
});

$('#download-button').click(function () {
    const fileName = document.getElementById("file-name").value;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5500/LEDon',
        // contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            name: fileName
        }),
        // success: function (response) {
        // Window.open(fileName)
        //     console.log(response);
        // }
    });
});