import { addGlobalStylesToShadowRoot } from "./global-styles.js";
import { getCharLength, getByteLength, truncateString } from "./string-length.js";

function appendTemplate(parentElement) {
    var styleElement=document.createElement("style");
    var divElement=document.createElement("div");
    var textareaElement=document.createElement("textarea");
    var pElement=document.createElement("p");
    var spanElement=document.createElement("span");
    styleElement.innerText=`#warp{width:10rem;display:flex-direction:column;}textarea{color:red;width;inherit;border;3px solid yellow}textarea+p{margin:0;display:flex;justify-content:flex-start;width:nherit;}#length{}`;
    divElement.setAttribute("id", "wrap");
    divElement.appendChild(textareaElement);
    divElement.appendChild(pElement);
    pElement.appendChild(spanElement);
    textareaElement.appendChild(document.createElement("slot"));
    spanElement.setAttribute("id","length");
    parentElement.appendChild(styleElement);
    parentElement.appendChild(divElement);
}

/**
 * 텍스트 길이를 표시하는 custom textarea element
 */
class LengthDisplayTextarea extends HTMLElement {
    static formAssociated=true;
    constructor(){super();
        this._internals=this.attachInternals();
        this.attachShadow({mode:"open",delegatesFocus:true});
        appendTemplate(this.shadowRoot);
        this._unitText="자";
        this._separator="/";
        this._contentSizeFunction=getCharLength;
        this._textarea=this.shadowRoot.querySelector("textarea");
        this._maxlength=null;
        this.addEventListener("input",this._textareaInputEventHandler,true);
        this.addEventListener("input",this._onInputHandler);
    }
    _textareaInputEventHandler=function(){
        this.value=this._textarea.value;
    }
    _onInputHandler=function(){
        if(this.disabled)return;
        var internals = this._internals;
        var value=this.value;
        if(value===""){
            if(this.required)internals.setValidity({valueMissing:true},"required")
        } else if(value.length<5) {
            internals.setValidity({customError:true},"min length 5")
        } else {internals.setValidity({});}
        this.checkValidity();
    }
connectedCallback(){
    if(Boolean(this.getAttribute("inheritstyle"))===true){
        addGlobalStylesToShadowRoot(this.shadowRoot);
    }
    var maxlength=this.getAttribute("maxlength")||"";
    if(maxlength)this._maxlength=maxlength;
    var markupText=this._textarea.querySelector("slot").assignedNodes()[0]?.data||"";
    if(markupText)this.value=markupText;
}
disconnectedCallback(){
    this.removeEventListener("input",this._textareaInputEventHandler);
}
static observedAttributes=['maxlength'];
attributeChangedCallback(name,oldValue,newValue){
    if(oldValue===newValue)return;
    switch(name){
        case "maxlength":this.maxlength=newValue;
    }
}
checkValueLength(text){
    var maxlength=this._maxlength;
    var contentSizeFunction=this._contentSizeFunction;
    if(maxlength===null) return text;
    return truncateString(text,contentSizeFunction,maxlength);
}
textLengthView(targetElement,textValue){
    const newLengthCounter=targetElement.cloneNode(true);
    const contentLength=this._contentSizeFunction(textValue);
    const maxlength=this.maxlength||"";
    newLengthCounter.textContent=String(contentLength)+this._separator+maxlength+this._unitText;
    return newLengthCounter;
}
drawView(){
    var lengthSpan=this.shadowRoot.querySelector("#length");
    var value=this.value;
    //requestAnimationFrame(()=>{
    var n = this.textLengthView(lengthSpan, value);
    lengthSpan.replaceWith(n);
    //});
}
get disabled(){
    return Boolean(this.getAttribute("disabled")!==null);
}
set disabled(val){
    if(val)this.setAttribute("disabled","");else this.removeAttribute("disabled");
}
get required(){
    return Boolean(this.getAttribute("required")!==null);
}
set required(val){
    if(val)this.setAttribute("required","");else this.removeAttribute("required");
}
get unitText(){
    return this._unitText;
}
set unitText(unitText){
    this._unitText=unitText||"";this.drawView();
}
get contentSize(){
    return this._contentSizeFunction(this.value);
}
get maxlength(){
    return this.getAttribute("maxlength");
}
set maxlength(maxlengthValue){
    if(maxlengthValue&&!isNaN(maxlengthValue)){
        this.setAttribute("maxlength",maxlengthValue);
        this._maxlength=Number(maxlengthValue);
    } else {
        this.removeAttribute("maxlength");this._maxlength=null;
    }
    this.value=this._value;
}
get value(){
    return this._value||"";
}
set value(v) {
    var checkedValueText = this.checkValueLength(v);
    this._value=checkedValueText;
    this._textarea.value=checkedValueText;
    this._internals.setFormValue(checkedValueText);
    this.drawView();
}
get form(){
    return this._internals.form;
}
get name(){
    return this.getAttribute("name");
}
set name(nameValue){
    this.setAttribute("name",nameValue);
}
get validity(){
    return this._internals.validity;
}
get validationMessage(){
    return this._internals.validationMessage;
}
get willValidate(){
    return this._internals.willValidate;
}
checkValidity(){
    return this._internals.checkValidity();
}
reportValidity(){
    return this._internals.reportValidity();
}
}
customElements.define("length-display-textarea", LengthDisplayTextarea);

class ByteLengthDisplayTextarea extends LengthDisplayTextarea {
    constructor(){
        super();
        this._contentSizeFunction=getByteLength;
        this._unitText="바이트";
    }
}
customElements.define("byte-length-display-textarea", ByteLengthDisplayTextarea);
