import { Formulario } from "src/models/Formulario";

export function hasSintoma(formulario: Formulario) {
    return [
        'tosse', 
        'febre', 
        'cansaco',
        'dores', 
        'conjuntivite', 
        'dorDeGarganta', 
        'dorDeCabeca', 
        'dificuldadeRespiratoria', 
        'outro'
    ].some(key => formulario[key])
}