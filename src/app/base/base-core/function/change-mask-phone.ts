
import { EnumMask } from '@base-core/model/mask-enum.model';
import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';

export function changeMaskPhone(phone: string, instanceForm: FormBuildComponent, fields: FormBuildConfig[], nameField: string) {

  //  console.log('passando change fone ', phone, ' nome ', nameField);
  //    safeCall(phone, (it) => {
  if (!phone) return;
  const phoneResult: string = phone.replace(/_/g, '').replace('-', '').replace(')', '').replace('(', '');
  if (phoneResult.length > 2) {
    const digitAfterDD = phoneResult.substring(2, 3);

    try {

      if (digitAfterDD === '9') {
        instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.CELL });
      } else {
        instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.PHONE });
      }
    } catch (error) {

      console.log('chave 20', error)
    }

  }
  //  });
}




/*





import { EnumMask } from '@base-core/model/mask-enum.model';


import { FormBuildComponent, FormBuildConfig } from '@base-shared/form-build/form-build.component';

export function changeMaskPhone(phone: string, instanceForm: FormBuildComponent, fields: FormBuildConfig[], nameField: string) {

  //  console.log('passando change fone ', phone, ' nome ', nameField);
  //    safeCall(phone, (it) => {
  if (!phone) return;
  const phoneResult: string = phone.replace(/_/g, '').replace('-', '').replace(')', '').replace('(', '');
  let mTam = phoneResult.length;

  try {

    if (mTam < 9) {
      instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.PHONESEMDDD });
    } else if (mTam < 10) {
      instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.CELLSEMDDD });
    } else if (mTam == 10) {
      instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.PHONE });
    } else {
      instanceForm.setInjectParamWithName(nameField, fields, { mask: EnumMask.CELL });
    }

  } catch (error) {

    console.log('chave 20', error)
  }

}

}
*/