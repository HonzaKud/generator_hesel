// konstanta state ulozi potrebne hodnoty
const state = {
    numberOfPasswords: 0,
    numberOfCharacters: 0,
    largeCharacterArray: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",], // Pole pro velka pismena
    numberArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], // Pole pro cislice
    specialCharactersArray: ["!", "@", "#", "$", "%"], // Pole pro cislice
  };
  
  const characterPool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",]; // Pole pro ulozeni vsech znaku, ktere uzivatel chce mit potencialne v hesle
  
  module.exports = { state, characterPool }; // exportovani funkci pro dalsi vyuziti