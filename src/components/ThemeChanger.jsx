import { useState } from "react";

function ThemeChanger({ setBgColor }) {
  const [themeColor, setThemeColor] = useState("");
  const [error, setError] = useState(false);

  function colorCodechange(e) {
    e.preventDefault();
    const value = e.target.value;
    setThemeColor(value);
  }

  function applyColor() {
    let newbgColor = `#${themeColor}`;
    const pattern = /^#[0-9a-fA-F]{6}$/;
    if (pattern.test(newbgColor)) {
      setBgColor(newbgColor);
      setThemeColor("");
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <p>Change Theme-color:</p>
      <label htmlFor="themeColor">Color-Code (eg:00ffcc(0-9,A-F))</label>
      <input
        value={themeColor}
        onChange={colorCodechange}
        type="text"
        minLength="6"
        maxLength={6}
        name=""
        id="themeColor"
        placeholder="11aaaa"
      />
      {error && <p>Invalid Color Code</p>}
      <button onClick={applyColor}>OK</button>
    </div>
  );
}

export default ThemeChanger;
