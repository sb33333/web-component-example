let globalSheets = null;

export function getGlobalStyleSheets() {
    if (globalSheets !== null) return globalSheets;
    globalSheets = Array.from(document.styleSheets)
        .map(styleSheet=>{
            const sheet = new CSSStyleSheet();
            const css =Array.from(styleSheet.cssRules).map(rule=>rule.cssText).join(" ");
            sheet.replaceSync(css);
            return sheet;
        }); 
        return globalSheets;
    }
export function addGlobalStylesToShadowRoot(shadowRoot){
    shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}
