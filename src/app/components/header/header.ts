import { Component, signal, computed, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  exact: boolean;
  scrollTo?: string;
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
    { path: '/home', label: 'Depoimentos', exact: false, scrollTo: 'testimonials-section' }
  ];

  constructor(private router: Router) {
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

  scrollToSection(id: string, event: Event) {
    event.preventDefault();
    this.closeMenu();

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (this.router.url.startsWith('/home')) {
      if (!scrollToElement()) {
        setTimeout(scrollToElement, 100);
      }
      return;
    }

    this.router.navigate(['/home']).then(() => {
      if (!scrollToElement()) {
        setTimeout(scrollToElement, 100);
      }
    });
  }
}