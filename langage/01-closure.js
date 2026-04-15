// Depuis ES2020 on peut utiliser globalThis pour accéder à une variable globale
// quelque soit la plateforme (browser, node, etc.)
globalThis.maVarGlobale = 'maVarGlobale';

// Depuis ES2015, si le fichier est un module, on doit utiliser import ou export
const maVarModule = 'maVarModule';

function maFonctionExterne() {
    const maVarClosure = 'maVarClosure';

    function maFonctionInterne() {
        const maVarLocale = 'maVarLocale';
    
        if (true) {
            const maVarBlock = 'maVarBlock';
            console.log(maVarBlock);
            console.log(maVarLocale);
            console.log(maVarClosure);
            console.log(maVarModule);
            console.log(maVarGlobale);
        }
    }
    maFonctionInterne()
}
maFonctionExterne();