import { UntypedFormGroup } from '@angular/forms';

export function fillForm(nameControl: string, formGroup: UntypedFormGroup, value: any) {
  //if (value) {
    safeCallNoNullThree(nameControl, formGroup, (name, form) => {
        form.get(name).setValue(value);
    });
//  }
}

export function safeCallNoNullThree(obj: any, obj2: any, action: (obj, obj2) => any) {
    if (!obj) throw new Error('First param requerid');
    if (!obj2) throw new Error('Second param requerid');
    else return action(obj, obj2);
}