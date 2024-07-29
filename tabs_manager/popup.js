window.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelector("#ext_tabs");
  let allTabs = [];

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      allTabs.push(tab);
    });

    console.log(allTabs);
  });

  chrome.runtime.sendMessage({ message: "getTabs" }, function (response) {
    console.log("response: ", response);

    allTabs = response;
    response.forEach(function (tab, index) {
      const tabDiv = document.createElement("div");
      const button = document.createElement("button");
      button.textContent = "close";
      button.addEventListener("click", function () {
        chrome.tabs.remove(tab.id);
        // window.close();
      });
      tabDiv.textContent = tab.title;
      tabDiv.appendChild(button);

      if (tab.active) {
        tabDiv.style.fontWeight = "bold";
      }

      tabDiv.addEventListener("click", function () {
        chrome.tabs.update(tab.id, { active: true });
        // window.close();
      });
      tabs.appendChild(tabDiv);
    });
  });
});
