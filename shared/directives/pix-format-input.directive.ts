import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[pixKeyInputFormat]",
  standalone: true,
})
export class PixKeyInputFormatDirective {
  private el = inject(ElementRef<HTMLInputElement>);
  private control = inject(NgControl, { optional: true });

  @Input() disableFormatOnType = false;

  @HostListener("input", ["$event"])
  onInput(event: Event): void {
    if (this.disableFormatOnType) {
      return;
    }

    const input = this.el.nativeElement;
    const value = input.value;
    const cleanValue = this.getCleanValue(value);

    let formattedValue = value;
    if (cleanValue && /^\d+$/.test(cleanValue)) {
      formattedValue = this.formatAsUserTypes(cleanValue);
    } else {
      formattedValue = value;
    }
    console.log(formattedValue, "Formated", input.value);
    if (formattedValue !== input.value) {
      console.log("Updating DOM");
      const cursorPosition = input.selectionStart || 0;
      input.value = formattedValue;

      const newCursorPosition = this.calculateCursorPosition(
        value,
        formattedValue,
        cursorPosition
      );
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }

  private getCleanValue(value: string): string {
    return value.replace(/\D/g, "");
  }

  private calculateCursorPosition(
    oldValue: string,
    newValue: string,
    oldPosition: number
  ): number {
    const oldClean = oldValue.substring(0, oldPosition).replace(/\D/g, "");
    let newPosition = 0;
    let digitsFound = 0;

    for (let i = 0; i < newValue.length && digitsFound < oldClean.length; i++) {
      if (/\d/.test(newValue[i])) {
        digitsFound++;
      }
      newPosition = i + 1;
    }

    return newPosition;
  }

  private formatAsUserTypes(value: string): string {
    if (!value) return "";

    const length = value.length;
    if (length <= 13) {
      if (length === 11 && this.isValidCPF(value)) {
        return this.formatAsCPF(value);
      }
      return this.formatAsPhone(value);
    }

    if (length === 14) {
      return this.formatAsCNPJ(value);
    }

    return value;
  }

  private formatAsPhone(value: string): string {
    const length = value.length;

    if (length <= 10) {
      if (length <= 2) {
        return value;
      }
      if (length <= 6) {
        return value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
      }
      return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }

    if (length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (length === 12) {
      return value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "+$1 $2 $3-$4");
    }

    if (length === 13) {
      return value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 $2 $3-$4");
    }

    return value;
  }
  private formatAsCPF(value: string): string {
    if (value.length <= 3) return value;
    if (value.length <= 6) {
      return value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    }
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  }
  private formatAsCNPJ(value: string): string {
    if (value.length <= 2) return value;
    if (value.length <= 5) {
      return value.replace(/(\d{2})(\d{0,3})/, "$1.$2");
    }
    if (value.length <= 8) {
      return value.replace(/(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
    }
    if (value.length <= 12) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
    }
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  private isValidCPF(cpf: string): boolean {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;
    if (secondDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }
}
