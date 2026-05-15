import { TipoCombustivel } from "./enums/tipo-combustivel";

export interface VeiculoPutRequest {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    quilometragem: number;
    cor: string;
    destaque: boolean;
    combustivel: TipoCombustivel;
    descricao: string
}
