import { Directive } from "@angular/core";
import { BaseDateInputDirective } from "./base-date-picker.directive";

@Directive({
  selector: "input[matInput][brDateInput]",
  standalone: true,
})
export class BrDateInputDirective extends BaseDateInputDirective {
  // Transforma 01012026 em 01/01/2026
  protected formatMask(raw: string): string {
    if (raw.length <= 2) return raw;
    if (raw.length <= 4) return `${raw.substring(0, 2)}/${raw.substring(2)}`;
    return `${raw.substring(0, 2)}/${raw.substring(2, 4)}/${raw.substring(4, 8)}`;
  }

  // Transforma 01012026 em 2026-01-01 (Valor para o Form/Backend)
  protected convertToIso(raw: string): string {
    const d = raw.substring(0, 2);
    const m = raw.substring(2, 4);
    const y = raw.substring(4, 8);
    return `${y}-${m}-${d}`;
  }

  // Resolve o fuso horário: Transforma 2026-01-01 em 01/01/2026
  protected formatDisplay(value: any): string {
    if (!value) return "";

    // Se for string ISO (YYYY-MM-DD), quebramos manualmente (SEM NEW DATE)
    if (typeof value === "string" && value.includes("-")) {
      const [y, m, d] = value.split("-");
      return `${d}/${m}/${y}`;
    }

    // Se vier do Datepicker (Objeto Date)
    if (value instanceof Date) {
      const day = String(value.getDate()).padStart(2, "0");
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const year = value.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return "";
  }
}
