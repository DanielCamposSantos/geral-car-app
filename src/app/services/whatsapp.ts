import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private readonly NUMBER = '5571982615500';
  private readonly BASE_URL = 'https://wa.me';

  generateLink(marca: string, modelo: string): string {
    const mensagem = `Olá, quero falar sobre o ${marca} ${modelo}`;
    return this.criarLink(mensagem);
  }

  generateLinkWithYear(marca: string, modelo: string, ano: number): string {
    const mensagem = `Olá, quero falar sobre o ${marca} ${modelo} ${ano}`;
    return this.criarLink(mensagem);
  }

  generateLinkWithDetails(marca: string, modelo: string, ano: number, cor: string): string {
    const mensagem = `Olá, quero falar sobre o ${marca} ${modelo}\nAno: ${ano}\nCor: ${cor}`;
    return this.criarLink(mensagem);
  }

  generateContactLink(): string {
    const mensagem = 'Olá, vim pelo site da Geral Car e gostaria de mais informações.';
    return this.criarLink(mensagem);
  }

  generateCustomLink(mensagem: string): string {
    return this.criarLink(mensagem);
  }

  private criarLink(mensagem: string): string {
    const textoCodificado = encodeURIComponent(mensagem);
    return `${this.BASE_URL}/${this.NUMBER}?text=${textoCodificado}`;
  }
}