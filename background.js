const BLOCKED_URLS = ["*://*.facebook.com/*",
                      "*://*.reddit.com/*",
                      "*://*.promiedos.com.ar/*",
                      "*://*.twitter.com/*"];
                      
blockRequestListener=
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.tabId > -1) {
        chrome.tabs.executeScript(details.tabId, {
          file: "redirect.js"
        });
        return { cancel: true };
      }
    },
    { urls:BLOCKED_URLS },
    ["blocking"]
  );
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('block-btn').addEventListener('click', function() {
        const inputUrl = document.getElementById('url').value;
        BLOCKED_URLS.push(inputUrl);
        chrome.webRequest.onBeforeRequest.removeListener(blockRequestListener);
        chrome.webRequest.onBeforeRequest.addListener(
            blockRequestListener,
            { urls: BLOCKED_URLS },
            ["blocking"]
        );
    });
    document.getElementById("showblocked-btn").addEventListener("click",
      function showBlocked(){
    chrome.storage.sync.get({blockedUrls: []}, function(data){
      let blockedUrls = data.blockedUrls;
      let list = document.createElement("ul");

      for (let i = 0; i < blockedUrls.length; i++) {
        let item = document.createElement("li");
        item.textContent = blockedUrls[i];
        list.appendChild(item);
      }

      if (blockedUrls.length === 0) {
        let item = document.createElement("li");
        item.textContent = "No hay paginas bloqueadas";
        list.appendChild(item);
      }

      let container = document.createElement("div");
      container.appendChild(list);
      let popup = window.open("", "Popup", "width=400,height=400");
      popup.document.body.appendChild(container);
    });
  }
)
});
  