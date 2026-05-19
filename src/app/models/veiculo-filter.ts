import { TipoCombustivel } from "./enums/tipo-combustivel";

export interface VeiculoFilter {
  busca?: string;
  ano?: number;
  combustivel?: TipoCombustivel;
}