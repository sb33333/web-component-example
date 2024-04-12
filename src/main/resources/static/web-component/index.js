import "./sample5.js";

document.querySelector("#submit").addEventListener("click", function() {
    var form =   document.getElementById("form");
    if (form.checkValidity()) {
        form.submit();
    }
});