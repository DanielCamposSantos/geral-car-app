import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal
} from '@angular/core';

export interface SelectorOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-selector-input',
  imports: [],
  templateUrl: './selector-input.html',
  styleUrl: './selector-input.scss',
})
export class SelectorInput {

  private elementRef = inject(ElementRef);

  options = input<SelectorOption[]>([]);

  placeholder = input('Selecionar');

  icon = input('expand_more');

  valueChange = output<any>();

  isOpen = signal(false);

  selectedValue = signal<any>(null);

  selectedLabel = computed(() => {

    const currentValue = this.selectedValue();

    const foundOption = this.options()
      .find(option => option.value === currentValue);

    return foundOption?.label
      ?? this.placeholder();

  });

  toggleDropdown() {
    this.isOpen.update(value => !value);
  }

  selectOption(option: SelectorOption) {

    this.selectedValue.set(option.value);

    this.valueChange.emit(option.value);

    this.isOpen.set(false);

  }

  @HostListener('document:click', ['$event'])
  closeOutside(event: MouseEvent) {

    const clickedInside =
      this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isOpen.set(false);
    }

  }

}