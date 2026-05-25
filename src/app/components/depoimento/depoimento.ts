import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  car: string;
  text: string;
  stars: number;
}

@Component({
  selector: 'app-depoimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depoimento.html',
  styleUrl: './depoimento.scss',
})
export class Depoimento {
  readonly testimonials: Testimonial[] = [
    {
      name: 'Mariana Silva',
      car: 'Toyota Corolla Altis 2021',
      text: 'Atendimento excelente e processo de compra rápido. Me senti seguro em todas as etapas.',
      stars: 5,
    },
    {
      name: 'Carlos Eduardo',
      car: 'Honda Civic Touring 2020',
      text: 'Veículo impecável, entrega dentro do prazo e a equipe foi muito atenciosa.',
      stars: 5,
    },
    {
      name: 'Fernanda Costa',
      car: 'Jeep Compass Longitude 2022',
      text: 'Encontrei o carro ideal sem sair de casa. Recomendo a loja para quem busca confiança.',
      stars: 4,
    },
    {
      name: 'Bruno Almeida',
      car: 'Volkswagen T-Cross Comfortline 2023',
      text: 'Preço justo e financiamento fácil. Atendimento personalizado do começo ao fim.',
      stars: 5,
    },
    {
      name: 'Aline Ferreira',
      car: 'Nissan Kicks SV 2022',
      text: 'A experiência foi transparente e profissional, com entrega exatamente como combinado.',
      stars: 5,
    },
    {
      name: 'Rafael Gomes',
      car: 'Fiat Toro Ultra 2023',
      text: 'O carro estava em ótimas condições e o suporte no pós-venda foi excelente.',
      stars: 5,
    },
  ];
}

