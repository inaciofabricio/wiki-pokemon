import { 
    limpaStringVazia, 
    convertePrimeiraLetraMaiuscula 
} from "../util/util";

export default class PokemonModel {
    
    constructor(obj) {
        this.id = obj;
        this.name = obj.name;
        this.type = obj && obj.types && obj.types[0].type && obj.types[0].type.name ? obj.types[0].type.name : "...";
        this.img = obj && obj.sprites && obj.sprites.front_default ? obj.sprites.front_default : null;
    }

    get id() {
        return this._id;
    }
    set id(obj){

        if(obj && obj.url) {
            let array = obj.url.split("/");
            array = array ? array.filter(limpaStringVazia) : [];
            
            this._id = array.length > 0 ? parseInt(array[array.length - 1]) : 0;
        } else {
            this._id = obj.id;
        }
    }

    get name() {
        return this._name;
    }
    set name(name){
        this._name = convertePrimeiraLetraMaiuscula(name);
    }

    get type() {
        return this._type;
    }
    set type(type){
        this._type = convertePrimeiraLetraMaiuscula(type);
    }
  
    get img() {
        return this._img;
    }
    set img(img){
        this._img = img;
    }
    
}