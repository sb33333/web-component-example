export function getCharLength(textValue) {
    var text=textValue||""; return Number(text.length);
}
export function getByteLength(textValue) {
    let character;
    let charBytes = 0;
  
    for (let i = 0; i < textValue.length; i += 1) {
      character = textValue.charAt(i);
  
      if (escape(character).length > 4) charBytes += 2;
      else charBytes += 1;
    }
  
    return Number(charBytes);
}
    
export function truncateString(textInput, contentSizeFunction, truncateSizeInput) {
    if(!contentSizeFunction || typeof contentSizeFunction !== "function")return;
    var text=textInput||"";
    var truncateSize=truncateSizeInput?truncateSizeInput:0;
    var len=text.length;
    var substring="";
    for(var i=0;i<=len;i++){
        var temp=text.substring(0,i);
        if(contentSizeFunction(temp)>truncateSize){break;}
        else{substring=temp;}
    }
    return substring;
}