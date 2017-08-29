import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
    selector: '[infinite-scroll]',
    host: {
        '(scroll)': 'onScroll($event)'
    }
})

export class InfiniteScrollDirective {

    public element: any;
    @Output() OnScrollMethod = new EventEmitter();

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    }

    onScroll($event) {
        if (this.element.scrollTop + this.element.clientHeight >= this.element.scrollHeight) {
            this.OnScrollMethod.emit();
        }
    }
}