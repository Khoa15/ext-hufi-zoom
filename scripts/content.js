const hostPermit = "https://sinhvien.hufi.edu.vn"
if(document.URL.includes(hostPermit)){
    var Tool = {
        b64EncodeUnicode: function (str) {
            return btoa(
                encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
                    match,
                    p1
                ) {
                    return String.fromCharCode("0x" + p1);
                })
            );
        },
        b64DecodeUnicode: function (str) {
            return decodeURIComponent(
                atob(str)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
        },
        parseQuery: function () {
            return (function () {
                var href = window.location.href;
                var queryString = href.substr(href.indexOf("?"));
                var query = {};
                var pairs = (queryString[0] === "?"
                    ? queryString.substr(1)
                    : queryString
                ).split("&");
                for (var i = 0; i < pairs.length; i += 1) {
                    var pair = pairs[i].split("=");
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
                }
                return query;
            })();
        },
    }
    
    const urlToken = (id, pwd) => "https://us04web.zoom.us/j/"+id+"?pwd="+pwd
    const {mn, pwd} = Tool.parseQuery()
    console.log(urlToken(mn, Tool.b64DecodeUnicode(pwd)))
    
    const controls = document.querySelector(".controls")
    const linkNode = document.createElement("a")
    
    const valLinkAttr = document.createAttribute("href")
    valLinkAttr.value = urlToken(mn, Tool.b64DecodeUnicode(pwd))
    linkNode.setAttributeNode(valLinkAttr)
    
    const titleLink = document.createTextNode("Link Open Zoom")
    linkNode.appendChild(titleLink)
    
    controls.append(linkNode)
}