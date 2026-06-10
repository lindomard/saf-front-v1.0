import { Directive, HostListener, ElementRef, Input } from "@angular/core";


@Directive({
  selector: "[appAlphanumeric]"
})
export class AlphanumericDirective {

  @Input('isValidate') isValidate: boolean = false;
  inputElement: HTMLInputElement;

  constructor(readonly elementRef: ElementRef) {
    this.inputElement = elementRef.nativeElement;
  }

  @Input('regexAlpha') regex: RegExp = /[^a-z0-9]/gi;

  @Input() removindKeys = [
    '´',
    '`',
    '!',
    '@',
    '%',
    '¨',
    '¢',
    '&',
    '*',
    '+',
    '=',
    '[',
    ']',
    '{',
    '}',
    '^',
    ';',
    ':',
    ',',
    '#',
    '³',
    '$',
    '¨',
    KeyBoardValues.TREMA,
    KeyBoardValues.PERCENT,
  ];

  private code;

  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent): any {
    this.code = event.keyCode;


    const isKey = this.removindKeys.indexOf(event.key) > -1;
    const isCode = this.removindKeys.indexOf(this.code) > -1;
    const isTrema = this.code === KeyBoardValues.TREMA;
    const text = this.inputElement.value.replace(this.regex, '');
//    console.log(this.inputElement.value);

    // console.log(this.isValidate
    //   && (!this.regex.test(event.key)
    //     || isKey
    //     || isCode
    //     || isTrema
    //     || (text.match(/¨/g) != null)
    //   ),
    //   `isKey: ${isKey}`,
    //   `isCode: ${isCode}`,
    //   `isTrema: ${isTrema}`,
    //   `isMacth: ${(text.match(/¨/g) != null)}`,
    //   `DEAD ${event.key === 'Dead'}`,
    //   event.key
    // )

    if (event.key === ' ') {
      event.preventDefault();
      return;
    }

    if (
      this.isValidate
      && (!this.regex.test(event.key)
        || isKey
        || isCode
        || isTrema
      )
    ) {
      event.preventDefault();
      return;
    }
  }
}


export enum KeyBoardValues {
  TREMA = 54,
  PERCENT = 53,
}