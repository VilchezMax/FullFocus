document.getElementById("block-btn").addEventListener("click",
  function blockUrl() {
    let url = document.getElementById("url").value;

    if(url===""){
      console.log("Ingrese una pagina");
      alert("Ingrese una pagina");
    }

    chrome.storage.sync.get({blockedUrls: []}, function(data) {
      let blockedUrls = data.blockedUrls;
      let fullUrl = `*://*.${url}/*`;
      if (!blockedUrls.includes(fullUrl)) {
        blockedUrls.push(fullUrl);
        chrome.storage.sync.set({blockedUrls: blockedUrls});
        alert(`${url} fue bloqueado exitosamente!`);
      } else {
        alert(`${url} ya se encontraba bloqueado!`);
      }
    });
  }
)
document.getElementById("unblock-btn").addEventListener("click",
  function unblockUrl() {
    let url = document.getElementById("url").value;

    chrome.storage.sync.get({blockedUrls: []}, function(data) {
      let blockedUrls = data.blockedUrls;
      let fullUrl = `*://*.${url}/*`;
      let index = blockedUrls.indexOf(fullUrl);

      if (index !== -1) {
        blockedUrls.splice(index, 1);
        chrome.storage.sync.set({blockedUrls: blockedUrls});
        alert(`${url} fue desbloqueado exitosamente!`);
      } else {
        alert(`${url} no se encontraba bloqueado!`);
      }
    });
  }
)
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