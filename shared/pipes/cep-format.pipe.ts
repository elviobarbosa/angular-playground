import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cepFormat",
  standalone: true,
})
export class CepFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    console.log(`pipe`, value);
    if (!value) return "";

    const cleaned = value.toString().replace(/\D/g, "");

    if (cleaned.length <= 5) {
      return cleaned;
    }

    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  }
}
