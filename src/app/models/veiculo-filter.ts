import { TipoCombustivel } from "./enums/tipo-combustivel";

export interface VeiculoFilter {
    ano?: number
    combustivel?: TipoCombustivel
}
