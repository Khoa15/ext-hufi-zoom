const permitHost = "https://sinhvien.hufi.edu.vn"
chrome.runtime.onInstalled.addListener(()=>{
    chrome.action.setBadgeText({text: "NO"})
})
chrome.tabs.onActivated.addListener( ()=>{
    checkTab()
})

async function checkTab(){
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
    if(tab.url.startsWith(permitHost)){
        await chrome.action.setBadgeText({
            text: "YES",
        });
    }else{
        await chrome.action.setBadgeText({
            text: "NO",
        });
    }
}