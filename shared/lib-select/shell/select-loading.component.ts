import { Component, ContentChild, input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { BaseSelectDirective } from "../core/base-select.directive";
@Component({
  selector: "select-loading",
  standalone: true,
  imports: [NgTemplateOutlet, MatProgressBarModule],
  templateUrl: "./select-loading.component.html",
})
export class SelectLoadingComponent<T> {
  api = input.required<BaseSelectDirective<T>>();

  @ContentChild("loading", { read: TemplateRef })
  loadingTpl?: TemplateRef<any>;
}
