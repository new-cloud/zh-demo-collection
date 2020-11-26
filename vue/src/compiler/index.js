// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i

function parseHTML(html) {
    while(html){
        let textEnd = html.indexOf('<');
        if(textEnd ===0 ) {
            let startTagMatch = parseStartTag();
        }
        break;
    }
    function advance(n) {
        html = html.substring(n);
        console.log(html);
    }
    function parseStartTag(){
        let start = html.match(startTagOpen);
        if(start){
            const match = {
                tagName: start[1],
                attrs: []
            };
            advance(start[0].length);
        }
    }
}

export function compileToFn(template) {
    let root = parseHTML(template);
    return function render() {

    }
}