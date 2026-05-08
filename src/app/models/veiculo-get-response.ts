import { TipoCombustivel } from "./enums/tipo-combustivel";
import { ImagemGetResponse } from "./imagem-get-response";

export interface VeiculoGetResponse {
    id: number,
    marca: string,
    modelo: string,
    cor: string,
    ano: number,
    quilometragem: number,
    descricao: string,
    combustivel: TipoCombustivel,
    avaliacao: number,
    imagens: ImagemGetResponse[]
}