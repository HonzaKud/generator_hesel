// import funkce `generatePasswords` z modulu pro generovani hesel
import { generatePasswords } from './modules/generatePasswords.js';

// import funkce `copyToClipboard` z modulu pro kopirovani do schranky
import { copyToClipboard } from './modules/copyToClipboard.js';

// pridani udalosti pro odeslani formulare
document.getElementById('password-form').addEventListener('submit', function (e) {
    e.preventDefault(); // zamezi vychozimu chovani formulare (znovunacteni stranky)

    // sestaveni objektu `options` z hodnot formulare
    const options = {
        numberOfPasswords: parseInt(document.getElementById('password-count').value), // pocet hesel
        numberOfCharacters: parseInt(document.getElementById('password-length').value), // delka hesel
        includeUppercase: document.getElementById('include-uppercase').checked, // zahrnout velka pismena
        includeNumbers: document.getElementById('include-numbers').checked, // zahrnout cisla
        includeSpecial: document.getElementById('include-special').checked, // zahrnout specialni znaky
    };

    // vygenerovani hesel na zaklade uzivatelskych voleb
    const passwords = generatePasswords(options);

    // vycisteni vystupniho kontejneru pred pridanim novych hesel
    const output = document.getElementById('output');
    output.innerHTML = '';

    // pro kazde vygenerovane heslo vytvori novy HTML prvek
    passwords.forEach(password => {
        // vytvoreni kontejneru pro heslo a tlacitko "Kopirovat"
        const container = document.createElement('div');
        container.classList.add('password-container'); // pridani tridy pro stylovani

        // vytvoreni HTML prvku pro zobrazeni hesla
        const passwordText = document.createElement('span');
        passwordText.textContent = password; // nastaveni textu hesla

        // vytvoreni tlacitka "kopirovat"
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Kopírovat'; // nastaveni textu tlacitka
        copyButton.addEventListener('click', () => copyToClipboard(password)); // pridani udalosti pro kopirovani hesla do schranky

        // pridani prvku hesla a tlacitka do kontejneru
        container.appendChild(passwordText);
        container.appendChild(copyButton);

        // pridani kontejneru do vystupniho HTML elementu
        output.appendChild(container);
    });
});