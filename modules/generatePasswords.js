export function generatePasswords({ numberOfPasswords, numberOfCharacters, includeUppercase, includeNumbers, includeSpecial }) { //exportuje funkci generate password jako modul, funkce prijima objekt s parametry
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'; // retezec obsahujici mala pismena pro generovani hesel
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // retezec obsahujici velka pismena pro generovani hesel
  const numbers = '0123456789'; //retezec obsahujici cisla pro generovani hesel
  const special = '!@#$%^&*()_+[]{}|;:,.<>?';// retezec obsahujici specialni znaky pro generovani hesel

  // Sestaveni mnoziny znaku
  let characterPool = lowercase;
  if (includeUppercase) characterPool += uppercase;
  if (includeNumbers) characterPool += numbers;
  if (includeSpecial) characterPool += special;

  const passwords = [];
  for (let i = 0; i < numberOfPasswords; i++) { //cyklus na kazde heslo
    let password = []; //vytvoreni promenne password a jeji vyprazdneni

    // Zahrnuti alespon jednoho znaku z každe zvolene kategorie
    if (includeUppercase) {
      password.push(uppercase[Math.floor(Math.random() * uppercase.length)]); //pushnuti nahodneho znaku z tohoto pole
    }
    if (includeNumbers) {
      password.push(numbers[Math.floor(Math.random() * numbers.length)]); //pushnuti nahodneho znaku z tohoto pole
    }
    if (includeSpecial) {
      password.push(special[Math.floor(Math.random() * special.length)]); //pushnuti nahodneho znaku z tohoto pole
    }

    // Doplneni zbytku hesla nahodnymi znaky z characterPool
    while (password.length < numberOfCharacters) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password.push(characterPool[randomIndex]);
    }

    // Promichani hesla
    password = password.sort(() => Math.random() - 0.5);

    // Pridani hesla do vysledneho pole
    passwords.push(password.join(''));
  }

  return passwords;
}
