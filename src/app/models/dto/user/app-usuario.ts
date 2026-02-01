import { Token } from "../auth/token";
import { Usuario } from "./usuario";

export interface AppUsuario extends Usuario {    
    token?: Token;  
    firstName: string;  
}