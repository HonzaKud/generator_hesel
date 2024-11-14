// Import modulu
const readline = require('readline'); // Import modulu readline

// Nastavení rozhraní pro čtení vstupu
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//let numberOfCharacters;
//let finalPasswordArray = []; // Pole pro vygenerovane heslo
let characterPool = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // Pole pro ulozeni vsech znaku, ktere uzivatel chce mit potencialne v hesle
let largeCharacterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // Pole pro velka pismena
let numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; // Pole pro cislice
let specialCharactersArray = ["!", "@", "#", "$", "%"]; // Pole pro cislice

console.log(`Toto je generator hesel, po zadani vsech vstupu uzivatele se heslo vygeneruje`);
console.log(`Prvni pole: ${characterPool}`);
// Funkce na otazku na uzivetele na pocet hesel, ktere chce vygenerovat
function askNumberOfPasswords(callback) {
    rl.question('Kolik hesel chcete vygenerovat? (Zadejte číslo od 1 do 9): ', (answer) => { // readline otazka na pocet hesel omezena na 1-9
        let numberOfPasswords = parseInt(answer); // ulozeni odpovedi do promenne numberOfPasswords a prevedeni na cislo
        
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
        let numberOfCharacters = parseInt(answer); // ulozeni odpovedi do promenne numberOfCharacters a prevedeni na cislo
        
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
            console.log(`Druhe pole: ${characterPool}`);
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
            console.log(`Treti pole: ${characterPool}`);
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
function askUseSpecialCharacters() {
    rl.question('Chcete, aby hesla obsahovala specialni znaky? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle specialni znaky
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Specialni znaky budou zahrnuta do hesel.');
            characterPool.push(...specialCharactersArray);
            console.log(`Ctvrte pole: ${characterPool}`);
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
        } else if (normalizedAnswer === 'ne') {
            console.log('Specialni znaky nebudou zahrnuta do hesel.');
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseSpecialCharacters(); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

// Zavolani funkci ve spravnem poradi
askNumberOfPasswords(() => 
    askNumberOfCharacters(() => 
        askUseUppercase(() => 
            askUseNumber(() =>
                askUseSpecialCharacters()   
            )
        )
    )
);