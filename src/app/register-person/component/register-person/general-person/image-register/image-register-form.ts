import { Injectable } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";
import { ItemSelect } from "@base-shared/select/select.component";
import { ImageRegisterEntity } from "@register/domain/entities/image-register-entity.model";

export const imageRegisterFormNameControlId = 'id';
export const imageRegisterFormNameControlIdDocType = 'idDocType';
export const imageRegisterFormNameControlName = 'name';
export const imageRegisterFormNameControlDueDate = 'dueDate';
export const imageRegisterFormNameControlObs = 'obs';

@Injectable()
export class ImageRegisterForm {

    private _imagesData: ImageRegisterEntity[] = [];

    public handlerActionAdd: { (): void }

    private imageRegisterForm = new UntypedFormGroup({
        id: new UntypedFormControl(),
        idDocType: new UntypedFormControl(this.options[0].id),
        name: new UntypedFormControl('', [Validators.required]),
        nameFile: new UntypedFormControl(),
        dueDate: new UntypedFormControl(),
        obs: new UntypedFormControl(),
        url: new UntypedFormControl(),
        path: new UntypedFormControl(),
        size: new UntypedFormControl(),
        format: new UntypedFormControl()
    });

    constructor() {
        this.imageRegisterForm.disable();
    }

    set imagesData(imageData: ImageRegisterEntity[]){
        this._imagesData = imageData;
    }

    get imagesData(): ImageRegisterEntity[] {
        return this._imagesData
    }

    get form(): UntypedFormGroup {
        return this.imageRegisterForm;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get(imageRegisterFormNameControlIdDocType) as UntypedFormControl,
                type: FormItemType.SELECT,
                columnXl: 4,
                columnLg: 4,
                columnMd: 4,
                params: {
                    label: 'Tipo de Documento',
                    options: this.options
                }
            },
            {
                control: this.form.get(imageRegisterFormNameControlName) as UntypedFormControl,
                type: FormItemType.INPUT_NAME_FILE,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Nome do Arquivo'
                }
            },
            {
                control: this.form.get(imageRegisterFormNameControlDueDate) as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Data de Vencimento',
                    type: 'date'
                }
            },
            {
                control: this.form.get(imageRegisterFormNameControlObs) as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Observação'
                }
            },
            {
                type: FormItemType.BTN_RAISED,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Adicionar'
                },
                clickEvent: () => this.handlerActionAdd()
            }
        ]
    }

    get options(): ItemSelect[] {
        return [
            { id: 1, name: 'Cartão CNPJ' },
            { id: 2, name: 'Inscrição Estadual' },
            { id: 3, name: 'Inscrição Municipal' },
            { id: 4, name: 'Inscrição PIS/PASEP' },
            { id: 5, name: 'CPF' },
            { id: 6, name: 'RG' },
            { id: 7, name: 'Passaporte' },
            { id: 8, name: 'Carteira de Trabalho' },
            { id: 9, name: 'CNH' },
            { id: 10, name: 'Comprovante de Endereço' },
            { id: 11, name: 'Registro Simplificado' },
            { id: 12, name: 'Alvará Anvisa' },
            { id: 13, name: 'Alvará Municipal' },
            { id: 14, name: 'Alvará de Funcionamento' },
            { id: 15, name: 'Alvará Corpo de Bombeiros' },
            { id: 16, name: 'SIGMA' },
            { id: 17, name: 'SINARM' },
            { id: 18, name: 'Contrato de Trabalho' },
            { id: 19, name: 'Termo de Recisão de Trabalho' },
            { id: 20, name: 'Contrato de experiência' },
            { id: 21, name: 'ATA de Assembléia de Condomínio' },
            { id: 22, name: 'Regimento Interno' },
            { id: 23, name: 'Convenção Coletiva' },
            { id: 24, name: 'Guia do Simples Nacional' },
            { id: 25, name: 'Contrato Social' },
            { id: 26, name: 'Comprovante Médico e de Segurança do Trabalho' },
            { id: 27, name: 'Comprovante de Recursos Humanos' },
            { id: 28, name: 'Contrato com Contabilidade' },
            { id: 29, name: 'Comprovante de Pagamento' },
            { id: 30, name: 'Registro Junta Comercial' },
        ]
    };

}