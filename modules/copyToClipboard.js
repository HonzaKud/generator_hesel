export function copyToClipboard(text) {// exportuje funkci `copyToClipboard` jako modul
    navigator.clipboard.writeText(text).then(() => { // pouziva API `navigator.clipboard` k zapsani textu do schranky
        alert('Heslo zkopírováno do schránky!'); // zobrazi uzivateli potvrzeni, ze heslo bylo uspesne zkopirovano
    }).catch(err => { // pokud operace selze, vykona se `catch` blok
        console.error('Kopírování selhalo:', err); // vypise chybovou zpravu do konzole spolu s detailem chyby
    });
}