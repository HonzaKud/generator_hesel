// Import modulu
const readline = require("readline");
const { askNumberOfPasswords, askNumberOfCharacters, askUseUppercase, askUseNumber, askUseSpecialCharacters } = require("./questions");
const { generatePasswords } = require("./generatePasswords");
const { state, characterPool } = require("./constants");

// Nastavení rozhraní pro čtení vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Toto je generator hesel, po zadani vsech vstupu uzivatele se heslo vygeneruje");

askNumberOfPasswords(rl, state, () =>
  askNumberOfCharacters(rl, state, () =>
    askUseUppercase(rl, state, characterPool, () =>
      askUseNumber(rl, state, characterPool, () =>
        askUseSpecialCharacters(rl, state, characterPool, () => {
          rl.close(); // Zavřeme vstup po poslední otázce
          generatePasswords(state, characterPool); // Spustíme generování hesel
        })
      )
    )
  )
);