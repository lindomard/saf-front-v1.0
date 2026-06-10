import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAcessor<T> implements ControlValueAccessor {

    public disabled = false;
    private _value: T;

    public get value(): T {
        return this._value;
    }
    public set value(value: T) {
        this._value = value;
    }

    public onChange(newValue: T) { }
    public onTouched(_?: any) { }

    public writeValue(object: T): void { this.value = object; }
    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }
    public setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
