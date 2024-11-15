// Import modulu
const readline = require('readline'); // Import modulu readline

// Nastavení rozhraní pro čtení vstupu
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numberOfPasswords;
let numberOfCharacters;
//let finalPasswordArray = []; // Pole pro vygenerovane heslo
let characterPool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // Pole pro ulozeni vsech znaku, ktere uzivatel chce mit potencialne v hesle
let largeCharacterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // Pole pro velka pismena
let numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; // Pole pro cislice
let specialCharactersArray = ["!", "@", "#", "$", "%"]; // Pole pro cislice

console.log(`Toto je generator hesel, po zadani vsech vstupu uzivatele se heslo vygeneruje`);
// Funkce na otazku na uzivetele na pocet hesel, ktere chce vygenerovat
function askNumberOfPasswords(callback) {
    rl.question('Kolik hesel chcete vygenerovat? (Zadejte číslo od 1 do 9): ', (answer) => { // readline otazka na pocet hesel omezena na 1-9
        numberOfPasswords = parseInt(answer); // ulozeni odpovedi do promenne numberOfPasswords a prevedeni na cislo
        
        if (isNaN(numberOfPasswords) || numberOfPasswords < 1 || numberOfPasswords > 9) { // kontrola jestli je odpoved uzivatele cislo a jestli je mezi 1 az 9
            console.log("Zadejte prosim platne cislo od 1 do 9."); //pokud odpoved neni platna, console vypise tohle
            askNumberOfPasswords(callback); // znovu zavola funkci s callbackem, pokud neni platny vztup
        } else {
            console.log(`Celkovy pocet hesel bude: ${numberOfPasswords}`); // vypise pocet hesel
            callback(); // callback zavola dalsi funkci po platnem vztupu
        }
    });
}

// Funkce na otazku na uzivetele na pocet znaku ve vygenerovanym hesle
function askNumberOfCharacters(callback) {
    rl.question('Kolik znaku v hesle chces vygenerovat? (Zadejte číslo od 8 do 30): ', (answer) => { // readline otazka na pocet znaku v hesle
        numberOfCharacters = parseInt(answer); // ulozeni odpovedi do promenne numberOfCharacters a prevedeni na cislo
        
        if (isNaN(numberOfCharacters) || numberOfCharacters < 8 || numberOfCharacters > 30) { // kontrola jestli je odpoved uzivatele cislo a jestli je mezi 8 az 30
            console.log("Zadejte prosim platne cislo od 8 do 30."); //pokud odpoved neni platna, console vypise tohle
            askNumberOfCharacters(callback); // znovu zavola funkci s callbackem, pokud neni platny vztup
        } else {
            console.log(`Pocet znaku v kazdem heslo bude: ${numberOfCharacters}`); // vypise pocet znaku
            callback(); // callback zavola dalsi funkci po platnem vztupu
        }
    });
}

// funkce pro otazku pro uzivatele, jestli chce pouzit ve vygenerovanych heslech velka pismena
function askUseUppercase(callback) {
    rl.question('Chcete, aby hesla obsahovala velka pismena? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle velka pismena
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Velka pismena budou zahrnuta do hesel.');
            characterPool.push(...largeCharacterArray);
            callback();
        } else if (normalizedAnswer === 'ne') {
            console.log('Velka pismena nebudou zahrnuta do hesel.');
           callback();
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseUppercase(callback); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

// funkce pro otazku na uzivatele, jestli chce pouzit ve vygenerovanych heslech cisla
function askUseNumber(callback) {
    rl.question('Chcete, aby hesla obsahovala cisla? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle cisla
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Cisla budou zahrnuta do hesel.');
            characterPool.push(...numberArray);
            callback()
        } else if (normalizedAnswer === 'ne') {
            console.log('Cisla nebudou zahrnuta do hesel.');
            callback()
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseNumber(callback); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

// funkce pro otazku na uzivatele, jestli chce pouzit ve vygenerovanych heslech specialni znaky
function askUseSpecialCharacters(callback) {
    rl.question('Chcete, aby hesla obsahovala specialni znaky? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle specialni znaky
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Specialni znaky budou zahrnuta do hesel.');
            characterPool.push(...specialCharactersArray);
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
            callback()
        } else if (normalizedAnswer === 'ne') {
            console.log('Specialni znaky nebudou zahrnuta do hesel.');
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
            callback()
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseSpecialCharacters(); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

//funkce na generovani heses
function generatePasswords() {
    console.log (`Generuji ${numberOfPasswords} hesel s ${numberOfCharacters} znaky v kazdem hesle`); // vypsani kolik hesel budeme generovat s kolika znaky
    
    for(let i = 0; i < numberOfPasswords; i++) { //cyklus na kazde heslo
        let password = ['']; //vytvoreni promenne password a jeji vyprazdneni

        if (characterPool.includes(...largeCharacterArray)) { //podminka jestli pole characterPool obsahuje pole largeCharacterArray, tak se prvni znak v hesle vytvori z tohohle pole 
            password.push(largeCharacterArray[Math.floor(Math.random() * largeCharacterArray.length)]); //pushnuti nahodneho znaku z tohoto pole
        }
        if (characterPool.includes(...numberArray)) { //podminka jestli pole characterPool obsahuje pole numberArray, tak se dalsi znak v hesle vytvori z tohohle pole 
            password.push(numberArray[Math.floor(Math.random() * numberArray.length)]); //pushnuti nahodneho znaku z tohoto pole
        }
        if (characterPool.includes(...specialCharactersArray)) { //podminka jestli pole characterPool obsahuje pole specialCharactersArray, tak se dalsi znak v hesle vytvori z tohohle pole 
            password.push(specialCharactersArray[Math.floor(Math.random() * specialCharactersArray.length)]); //pushnuti nahodneho znaku z tohoto pole
        }

        while (password.length <= numberOfCharacters) { //doplneni zbytku hesla, pokud nema heslo splneny pocet znaku
            const randomIndex = Math.floor(Math.random() * characterPool.length); //vybere nahodny znak z pole characterPool
            password.push(characterPool[randomIndex]); //pushnuti nahodneho znaku do hesla
        }

        password = password.sort(() => Math.random() - 0.5); //promichani hesla 


        console.log(`Heslo cislo ${i + 1} je: ${password.join('')}`); //vypsani hesla
    }
}

// Zavolani funkci ve spravnem poradi
askNumberOfPasswords(() => 
    askNumberOfCharacters(() => 
        askUseUppercase(() => 
            askUseNumber(() =>
                askUseSpecialCharacters(generatePasswords)   
            )
        )
    )
);