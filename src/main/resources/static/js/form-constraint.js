const ERROR_CONTAINER_SUFFIX ="-error";

function invalidEventHandler(event) {
    var target = event.target;
    setFieldValidity(target);
}

function inputEventHandler(event){
    var target = event.target; 
    setFieldValidity(target);
}

function setFieldValidity(inputElement){
    var isValid = inputElement.validity.valid;
    inputElement.setAttribute("aria-invalid", isValid?null:"true");
    var container = null;
    if(container=findErrorContainer(inputElement)){
        container.innerText=isValid?"":inputElement.validationMessage;
    }
}

function findErrorContainer(inputElement){
    var errorContainerId = inputElement.getAttribute("aria-describedby").split(" ").find(id=>id.includes(ERROR_CONTAINER_SUFFIX));
    return document.querySelector("#"+errorContainerId);
}

export function appendCustomFormValidation (formElement) {
    formElement.addEventListener("invalid", invalidEventHandler, true);
    formElement.addEventListener("input", inputEventHandler);
}