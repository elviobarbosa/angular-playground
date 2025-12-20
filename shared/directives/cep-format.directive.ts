import { Directive, HostListener, ElementRef, inject } from "@angular/core";

@Directive({
  selector: "[cepInputFormat]",
  standalone: true,
})
export class CepInputFormatDirective {
  private el = inject(ElementRef<HTMLInputElement>);

  @HostListener("input", ["$event"])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Salva a posição do cursor
    const cursorPosition = input.selectionStart || 0;

    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, "");

    // Limita a 8 dígitos
    const limited = cleaned.substring(0, 8);

    // Formata: 12345-678
    let formatted = limited;
    if (limited.length > 5) {
      formatted = `${limited.substring(0, 5)}-${limited.substring(5)}`;
    }

    // Atualiza o valor visual do input
    input.value = formatted;

    // Ajusta a posição do cursor
    const newCursorPosition = this.getNewCursorPosition(
      cursorPosition,
      value,
      formatted
    );
    input.setSelectionRange(newCursorPosition, newCursorPosition);

    // Dispara um novo evento de input para que o FormControl receba o valor
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  private getNewCursorPosition(
    oldPosition: number,
    oldValue: string,
    newValue: string
  ): number {
    // Se adicionou o hífen, move o cursor 1 posição para frente
    if (newValue.length > oldValue.length && newValue[oldPosition] === "-") {
      return oldPosition + 1;
    }
    return oldPosition;
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData("text") || "";
    const cleaned = pastedText.replace(/\D/g, "").substring(0, 8);

    const input = this.el.nativeElement;

    let formatted = cleaned;
    if (cleaned.length > 5) {
      formatted = `${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
    }

    input.value = formatted;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
}
