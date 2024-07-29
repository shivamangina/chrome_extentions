const btn = document.getElementById("changeColorBtn");
const colorDiv = document.getElementById("selected-color");

async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    const selectedColor = await eyeDropper.open();
    console.log("selectedColor: ", selectedColor);
    return selectedColor;
  } catch (error) {}
}

btn.addEventListener("click", async function () {
  const color = chrome.storage.sync.get("color", function ({ color }) {
    console.log("color: ", color);
  });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  data = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pickColor,
  });

  if (data[0].result) {
    const color = data[0].result;
    console.log("color: ", color);
    colorDiv.style.backgroundColor = color.sRGBHex;
    colorDiv.textContent = color.sRGBHex;
    await navigator.clipboard.writeText(color.sRGBHex);
  }
});
