import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // State variables for password length, number inclusion, symbol inclusion, and generated password
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [chars, setChar] = useState(false);
  const [password, setPw] = useState("");

  // useRef Hook to reference the password input field for copying
  const passwordRef = useRef(null);

  // Function to generate a random password based on selected options
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Default: uppercase and lowercase letters

    if (number) str += "0123456789"; // Add numbers if checkbox is checked
    if (chars) str += "!@#$%^&*()_+[]{}|;:',.<>?/`~"; // Add special characters if checkbox is checked

    // Generate password of selected length
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1); // Random index from string
      pass += str.charAt(char);
    }
    setPw(pass);
  }, [length, number, chars, setPw]);

  // Function to copy the generated password to clipboard
  const copyPassword = useCallback(() => {
    passwordRef.current?.select(); // Select the text inside the input field
    /* passwordRef.current?.setSelectionRange(length) */ // Optional: Set selection range
    window.navigator.clipboard.writeText(password); // Copy to clipboard
  }, [password]);

  // Call password generator when length, number, or symbol options change
  useEffect(() => {
    passwordGen();
  }, [length, number, chars, setPw]);

  return (
    <>
      <div className="bg-slate-600 flex flex-col items-center justify-center h-fit w-[90%] sm:w-[400px] p-6 text-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">🔐 Password Generator</h1>

        {/* Output Section */}
        <div className="w-full flex items-center bg-gray-800 p-2 rounded-lg">
          <input
            type="text"
            id="output"
            className="w-full bg-transparent outline-none text-lg p-2"
            readOnly
            value={password}
            ref={passwordRef} // Attach the ref to the input field
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium"
            onClick={copyPassword} // Call copy function on click
          >
            Copy
          </button>
        </div>

        {/* Controls Section */}
        <div className="w-full flex flex-col items-start gap-3 mt-4">
          {/* Password Length Control */}
          <div className="w-full flex flex-wrap items-center justify-between">
            <label htmlFor="range" className="text-lg">
              Length: {length}
            </label>

            <input
              type="range"
              id="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer accent-blue-500"
              onChange={(e) => setLength(e.target.value)} // Update length state on change
            />
          </div>

          {/* Number Inclusion Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="number"
              className="w-5 h-5 accent-yellow-800"
              checked={number} // Properly bind state to checked property
              onChange={() => setNumber((prev) => !prev)} // Toggle state on change
            />
            <label htmlFor="number" className="text-lg">
              Include Numbers
            </label>
          </div>

          {/* Symbol Inclusion Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="char"
              className="w-5 h-5 accent-blue-800"
              checked={chars} // Properly bind state to checked property
              onChange={() => setChar((prev) => !prev)} // Toggle state on change
            />
            <label htmlFor="char" className="text-lg">
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
