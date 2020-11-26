// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i

function start(tagName, attrs){
    console.log('开始标签:',tagName)
    console.log('属性:',attrs)
}
function end(tagName) {
    console.log('结束标签:', tagName);
} 
function parseHTML(html) {
    while(html){
        let textEnd = html.indexOf('<');
        if(textEnd === 0 ) {
            let startTagMatch = parseStartTag();
            if(startTagMatch){
                start(startTagMatch.tagName,startTagMatch.attrs);
                continue;
            }
            let endTagMatch = html.match(endTag);
            if(endTagMatch){
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }

        }
        let text;
        if(textEnd >= 0){
            text = html.substring(0,textEnd);
        }
        if(text){
            advance(text.length);
        }
    }
    function advance(n) {
        html = html.substring(n);
    }
    function parseStartTag(){
        let start = html.match(startTagOpen);
        let match;
        if(start){
            match = {
                tagName: start[1],
                attrs: []
            };
            advance(start[0].length);
        }
        let end,attr;
        while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length);
            match.attrs.push({
                name: attr[1],
                value: attr[3] || attr[4] || attr[5]
            })
        }
        // console.log(html)
        // console.log(match)
        if(end){
            advance(end[0].length);
            return match;
        }
       
    }
}

export function compileToFn(template) {
    let root = parseHTML(template);
    return function render() {

    }
}