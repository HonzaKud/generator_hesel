function askNumberOfPasswords(rl, state, callback) {
    rl.question('Kolik hesel chcete vygenerovat? (Zadejte číslo od 1 do 9): ', (answer) => { // readline otazka na pocet hesel omezena na 1-9
        state.numberOfPasswords = parseInt(answer); // ulozeni odpovedi do promenne numberOfPasswords a prevedeni na cislo
        
        if (isNaN(state.numberOfPasswords) || state.numberOfPasswords < 1 || state.numberOfPasswords > 9) { // kontrola jestli je odpoved uzivatele cislo a jestli je mezi 1 az 9
            console.log("Zadejte prosim platne cislo od 1 do 9."); //pokud odpoved neni platna, console vypise tohle
            askNumberOfPasswords(rl, state, callback); // znovu zavola funkci s callbackem, pokud neni platny vztup
        } else {
            console.log(`Celkovy pocet hesel bude: ${state.numberOfPasswords}`); // vypise pocet hesel
            callback(); // callback zavola dalsi funkci po platnem vztupu
        }
    });
}

// Funkce na otazku na uzivetele na pocet znaku ve vygenerovanym hesle
function askNumberOfCharacters(rl, state, callback) {
    rl.question('Kolik znaku v hesle chces vygenerovat? (Zadejte číslo od 8 do 30): ', (answer) => { // readline otazka na pocet znaku v hesle
        state.numberOfCharacters = parseInt(answer); // ulozeni odpovedi do promenne numberOfCharacters a prevedeni na cislo
        
        if (isNaN(state.numberOfCharacters) || state.numberOfCharacters < 8 || state.numberOfCharacters > 30) { // kontrola jestli je odpoved uzivatele cislo a jestli je mezi 8 az 30
            console.log("Zadejte prosim platne cislo od 8 do 30."); //pokud odpoved neni platna, console vypise tohle
            askNumberOfCharacters(rl, state, callback); // znovu zavola funkci s callbackem, pokud neni platny vztup
        } else {
            console.log(`Pocet znaku v kazdem heslo bude: ${state.numberOfCharacters}`); // vypise pocet znaku
            callback(); // callback zavola dalsi funkci po platnem vztupu
        }
    });
}

// funkce pro otazku pro uzivatele, jestli chce pouzit ve vygenerovanych heslech velka pismena
function askUseUppercase(rl, state, characterPool, callback) {
    rl.question('Chcete, aby hesla obsahovala velka pismena? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle velka pismena
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Velka pismena budou zahrnuta do hesel.');
            characterPool.push(...state.largeCharacterArray);
            callback();
        } else if (normalizedAnswer === 'ne') {
            console.log('Velka pismena nebudou zahrnuta do hesel.');
           callback();
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseUppercase(rl, state, characterPool, callback); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

// funkce pro otazku na uzivatele, jestli chce pouzit ve vygenerovanych heslech cisla
function askUseNumber(rl, state, characterPool, callback) {
    rl.question('Chcete, aby hesla obsahovala cisla? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle cisla
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Cisla budou zahrnuta do hesel.');
            characterPool.push(...state.numberArray);
            callback()
        } else if (normalizedAnswer === 'ne') {
            console.log('Cisla nebudou zahrnuta do hesel.');
            callback()
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseNumber(rl, state, characterPool, callback); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

// funkce pro otazku na uzivatele, jestli chce pouzit ve vygenerovanych heslech specialni znaky
function askUseSpecialCharacters(rl, state, characterPool, callback) {
    rl.question('Chcete, aby hesla obsahovala specialni znaky? (ano/ne): ', (answer) => { // readline otazka jestli chce uzivatel v hesle specialni znaky
        const normalizedAnswer = answer.toLowerCase(); // do promenne normalizedAnswer se ulozi input od uzivatele ale jeste se prevede na mala pismenena, pokud jsou velka
        
        if (normalizedAnswer === 'ano') {
            console.log('Specialni znaky budou zahrnuta do hesel.');
            characterPool.push(...state.specialCharactersArray);
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
            callback()
        } else if (normalizedAnswer === 'ne') {
            console.log('Specialni znaky nebudou zahrnuta do hesel.');
            rl.close(); // ukonceni vstupu, pokud je odpoved platna
            callback()
        } else {
            console.log("Zadejte prosim pouze 'ano' nebo 'ne'.");
            askUseSpecialCharacters(rl, state, characterPool, callback); // Znovu zavola funkci, pokud vstup neni platny
        }
    });
}

module.exports = { askNumberOfPasswords, askNumberOfCharacters, askUseUppercase, askUseNumber, askUseSpecialCharacters };