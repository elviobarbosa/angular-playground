import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pixKeyFormat",
  standalone: true,
})
export class PixKeyFormatPipe implements PipeTransform {
  transform(value: string, type?: string): string {
    if (!value) return "";

    const cleaned = value.replace(/\D/g, "");
    const detectedType = type || this.detectKeyType(value);

    switch (detectedType) {
      case "CPF":
        return this.formatCPF(cleaned);

      case "CNPJ":
        return this.formatCNPJ(cleaned);

      case "PHONE":
        return this.formatPhone(value);

      default:
        return value;
    }
  }

  private detectKeyType(value: string): string {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 11 && /^\d+$/.test(cleaned)) {
      return "CPF";
    }

    if (cleaned.length === 14 && /^\d+$/.test(cleaned)) {
      return "CNPJ";
    }

    if (value.includes("+") || (cleaned.length >= 10 && cleaned.length <= 13)) {
      return "PHONE";
    }

    if (value.includes("@")) {
      return "EMAIL";
    }

    return "RANDOM";
  }

  private formatCPF(cpf: string): string {
    if (cpf.length !== 11) return cpf;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  private formatCNPJ(cnpj: string): string {
    if (cnpj.length !== 14) return cnpj;

    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  private formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 13) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 $2 $3-$4");
    }

    if (cleaned.length === 12) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "+$1 $2 $3-$4");
    }

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return phone;
  }
}
