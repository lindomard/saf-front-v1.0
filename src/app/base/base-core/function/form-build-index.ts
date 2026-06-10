import { FormBuildConfig } from '@base-shared/form-build/form-build.component';

export function getFormBuildIndex(name: string, fields: FormBuildConfig[]): number {
    const list = fields;
    const item = list.find(o => o.name !== undefined && o.name === name);
    return list.indexOf(item);
}


  


