// Regular Expressions for parsing tags and attributes
// const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
// const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// const startTagOpen = new RegExp(`^<${qnameCapture}`)
// const startTagClose = /^\s*(\/?)>/
// const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
// const doctype = /^<!DOCTYPE [^>]+>/i

export function compileToFn(template) {
    console.log(template);
}