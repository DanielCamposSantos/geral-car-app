import { ImagemGetResponse } from "./ImagemGetResponse";

export interface VeiculoGetResponse {
    id: number,
    marca: string,
    modelo: string,
    cor: string,
    ano: number,
    quilometragem: number,
    descricao: string,
    avaliacao: number,
    imagens: ImagemGetResponse[]
}