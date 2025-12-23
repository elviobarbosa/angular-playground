import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrDateInputDirective } from "../../../core/iso-date-picker.directive";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "date-picker",
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrDateInputDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./date-picker.component.html",
})
export class DatePickerComponent {
  control = input<FormControl>(new FormControl());
  min = input<string | Date | null>(null);
  max = input<string | Date | null>(null);

  protected normalizedMin = computed(() => this.parseDate(this.min()));
  protected normalizedMax = computed(() => this.parseDate(this.max()));

  private parseDate(value: string | Date | null): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;

    // Se for string "YYYY-MM-DD", quebra manualmente para evitar erro de fuso
    if (typeof value === "string" && value.includes("-")) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day); // month-1 porque Janeiro é 0
    }

    return null;
  }
}
