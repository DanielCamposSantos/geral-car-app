import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private readonly NUMBER = '5571982615500';
  private readonly ZAP_URL = `https://wa.me/${this.NUMBER}?text=`;

  generateLink(marca: string, modelo: string): string {
    const mensagem = `Ol%C3%A1%2C%20quero%20falar%20sobre%20o%20${marca}%20${modelo}`;
    return `${this.ZAP_URL}${mensagem}`;
  }
}