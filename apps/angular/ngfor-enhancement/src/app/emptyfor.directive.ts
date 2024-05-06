/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngForIfEmpty]',
  standalone: true,
})
class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  @Input() ngForOf?: T[] = undefined;

  @Input() ngForIfEmpty!: TemplateRef<unknown>;

  @Input() ngForAnother!: TemplateRef<unknown>;

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForAnother);
    } else {
      this.ref = this.vcr.createEmbeddedView(this.ngForIfEmpty);
      this.ref?.destroy();
    }
  }
}

export { NgForEmptyDirective as NgForEmpty };
