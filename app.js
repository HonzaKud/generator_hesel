import { generatePasswords } from "./modules/generatePasswords.js"; // Importuje funkci `generatePasswords` z modulu `generatePasswords.js`.
import readline from "readline"; // Importuje modul `readline`, který umožňuje práci se vstupy a výstupy v konzoli.

const rl = readline.createInterface({ // Vytvoří rozhraní `readline` pro čtení vstupů z konzole a zápis výstupů.
  input: process.stdin,
  output: process.stdout,
});

// Funkce pro otázku
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Hlavní funkce
async function main() {
  try {
    const numberOfPasswords = parseInt(await askQuestion("Kolik hesel chcete vygenerovat? (1-9): "));
    const numberOfCharacters = parseInt(await askQuestion("Kolik znaku v hesle? (8-30): "));
    const includeUppercase = (await askQuestion("Velká písmena? (ano/ne): ")).toLowerCase() === "ano";
    const includeNumbers = (await askQuestion("Čísla? (ano/ne): ")).toLowerCase() === "ano";
    const includeSpecial = (await askQuestion("Speciální znaky? (ano/ne): ")).toLowerCase() === "ano";

    const options = {
      numberOfPasswords,
      numberOfCharacters,
      includeUppercase,
      includeNumbers,
      includeSpecial,
    };

    const passwords = generatePasswords(options);
    console.log("Vygenerovaná hesla:");
    console.log(passwords.join("\n"));

  } catch (error) {
    console.error("Nastala chyba:", error);
  } finally {
    rl.close();
  }
}

main();