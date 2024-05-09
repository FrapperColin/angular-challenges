/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngForIfEmpty]',
  standalone: true,
})
class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  ngForOf: InputSignal<T[]> = input.required<T[]>();

  ngForIfEmpty = input.required<TemplateRef<unknown>>();

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForOf() || this.ngForOf()?.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForIfEmpty());
    } else {
      this.ref?.destroy();
    }
  }
}

export { NgForEmptyDirective as NgForEmpty };
