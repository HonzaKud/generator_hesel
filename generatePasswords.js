//funkce na generovani heses, prebira si konstantu state a pole characterPool
function generatePasswords(state, characterPool) {
    console.log(`Generuji ${state.numberOfPasswords} hesel s ${state.numberOfCharacters} znaky v každém hesle`); // vypsani kolik hesel budeme generovat s kolika znaky
  
    for (let i = 0; i < state.numberOfPasswords; i++) { //cyklus na kazde heslo
      let password = []; //vytvoreni promenne password a jeji vyprazdneni
  
      if (characterPool.includes(...state.largeCharacterArray)) { //podminka jestli pole characterPool obsahuje pole largeCharacterArray, tak se prvni znak v hesle vytvori z tohohle pole
        password.push(state.largeCharacterArray[Math.floor(Math.random() * state.largeCharacterArray.length)]); //pushnuti nahodneho znaku z tohoto pole
      }
      if (characterPool.includes(...state.numberArray)) {  //podminka jestli pole characterPool obsahuje pole numberArray, tak se dalsi znak v hesle vytvori z tohohle pole
        password.push(state.numberArray[Math.floor(Math.random() * state.numberArray.length)]); //pushnuti nahodneho znaku z tohoto pole
      }
      if (characterPool.includes(...state.specialCharactersArray)) { //podminka jestli pole characterPool obsahuje pole specialCharactersArray, tak se dalsi znak v hesle vytvori z tohohle pole
        password.push(state.specialCharactersArray[Math.floor(Math.random() * state.specialCharactersArray.length)]); //pushnuti nahodneho znaku z tohoto pole
      }
  
      //doplneni zbytku hesla, pokud nema heslo splneny pocet znaku
      while (password.length < state.numberOfCharacters) { //vybere nahodny znak z pole characterPool
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password.push(characterPool[randomIndex]);//pushnuti nahodneho znaku do hesla
      }
  
      password = password.sort(() => Math.random() - 0.5); //promichani hesla
      console.log(`Heslo číslo ${i + 1} je: ${password.join("")}`); //vypsani hesla
    }
  }
  
  module.exports = { generatePasswords }; // exportovani funkci pro dalsi vyuziti