import { TipoCombustivel } from "./enums/tipo-combustivel";

export interface VeiculoFilter {
    marca?: string;
    modelo?: string;
    ano?: number;
    combustivel?: TipoCombustivel;
}