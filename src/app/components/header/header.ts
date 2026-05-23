import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = signal(false);
  
  menuIcon = computed(() => 
    this.isMenuOpen() ? 'close' : 'menu'
  );

  navLinks: NavLink[] = [
    { path: '/home', label: 'Início', exact: true },
    { path: '/catalog', label: 'Catálogo', exact: false },
    { path: '/testimonials', label: 'Depoimentos', exact: false }
  ];

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}