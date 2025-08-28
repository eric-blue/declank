import { useState } from "react";

function App() {
  const [active, setActive] = useState(false);

  const toggleActivation = async (checked: boolean) => {
    setActive(checked);

    if (checked) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id !== undefined) {
        chrome.runtime.sendMessage({
          type: "ACTIVATE",
          tabId: tab.id
        });
      }
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => toggleActivation(e.target.checked)}
        />
        Activate (doesn't work yet)
      </label>
    </div>
  );
}

export default App;