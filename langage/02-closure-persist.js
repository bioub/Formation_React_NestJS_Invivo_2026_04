function maFonctionExterne(maVarClosure) {
    function maFonctionInterne() {
        console.log(maVarClosure);
    }

    return maFonctionInterne;
}


const maFonctionInterne = maFonctionExterne('Hello');
maFonctionInterne();


const maFonctionInterne2 = maFonctionExterne('World');
maFonctionInterne2();