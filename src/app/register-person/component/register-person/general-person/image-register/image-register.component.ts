import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { safeCall, safeCallOrNull, withCall } from '@base-core/safe-call';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { TYPE_ICON, TYPE_IMAGE, TYPE_VIDEO } from '@base-shared/funcoesGerais/tiposDeRelatorios';
import { ItemSelect } from '@base-shared/select/select.component';
import { ImageForm } from '@register/component/register-person/general-person/image-register/image-form';
import { ImageRegisterModel } from '@register/data/model/image-register.model';
import { ImageRegisterEntity } from '@register/domain/entities/image-register-entity.model';
import { ImageRegisterMapper } from '@register/domain/mapper/image-register-mapper';
import { SnotifyService } from 'ng-snotify';
import { ImageRegisterForm, imageRegisterFormNameControlIdDocType } from './image-register-form';


@Component({
  selector: 'app-image-register',
  templateUrl: './image-register.component.html',
  styleUrls: ['./image-register.component.scss']
})
export class ImageRegisterComponent implements OnInit {

  @Output() instanceHandler = new EventEmitter<ImageRegisterComponent>();

  form: UntypedFormGroup;
  formRegister: UntypedFormGroup;
  formData: FormData = new FormData();
  fields: FormBuildConfig[] = [];
  files: any[] = [];
  format: string;
  url;
  urls: string[] = [];
  path: string = undefined;
  selectedFileRegister: ImageRegisterEntity[] = [];
  selectedFile: File;
  dataSource: MatTableDataSource<ImageRegisterEntity> = new MatTableDataSource<ImageRegisterEntity>([]);
  displayedColumns = ['docType', 'name', 'dueDate', 'obs', 'file'];
  options: ItemSelect[] = [];

  constructor(
    readonly imagemForm: ImageForm,
    readonly imageRegisterForm: ImageRegisterForm,
    private cd: ChangeDetectorRef,
    readonly snotify: SnotifyService,
    readonly markedTouchedForm: MarkTouchedForm,
    readonly imageMapper: ImageRegisterMapper
  ) { }

  ngOnInit() {
    this.initialazer();
    this.instanceHandler.emit(this);
    this.initListener();

  }

  private initListener() {
    this.imageRegisterForm.handlerActionAdd = () => {
      this.addImageRegister();
    }
  }

  private initialazer() {
    this.form = this.imagemForm.form;
    this.formData = this.imagemForm.formData;
    this.formRegister = this.imageRegisterForm.form
    this.fields = this.imageRegisterForm.fields;
    this.options = this.imageRegisterForm.options;
  }
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(file) {
    this.prepareFilesList(file);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.imagemForm.formData.delete(`files`);
    this.files.splice(index, 1);
    for (const key in this.files) {
      this.imagemForm.formData.append(`files`, this.files[key]);
    }
    // this.filesChoose.splice(index, 1);
    this.imagemForm.files = this.files;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    const item = files[0];
    this.path = files[0].name;
    this.files.push(item);
    this.imagemForm.formData.append(`files`, item);
    this.selectedFile = files[0];
  }

  /**
   * Prepara a url para exibir o preview
   * @param file 
   */
  private addImageRegister() {
    this.markedTouchedForm.markedFormControlTouched(this.form);
    this.markedTouchedForm.markedFormControlTouched(this.formRegister);
    if (this.validationFormRegister()) {
      safeCallOrNull(this.selectedFile, (it) => {
        var reader = new FileReader();
        let imageData: ImageRegisterEntity = this.imageRegisterForm.form.getRawValue();

        if (it.type.indexOf(TYPE_IMAGE) > -1) {
          imageData.format = TYPE_IMAGE;
        } else if (it.type.indexOf(TYPE_VIDEO) > -1) {
          imageData.format = TYPE_VIDEO;
        } else {
          imageData.format = TYPE_ICON
        }

        reader.readAsDataURL(it);
        reader.onload = (event) => {
          imageData.nameFile = (it as File).name;
          imageData.url = (<FileReader>event.target).result;
          this.selectedFileRegister.push(imageData);
          this.selectedFile = undefined;
          this.dataSource.data = [...this.selectedFileRegister];
          this.files.push(it);
          this.imagemForm.files = this.files;
          withCall(this.imageRegisterForm, (it) => {
            it.imagesData = this.selectedFileRegister;
            it.form.reset();
            it.form.get(imageRegisterFormNameControlIdDocType).setValue(this.options[0].id);
          });
          this.path = '';
          this.cd.detectChanges();
        }
      }, () => {
        this.snotify.error("Selecione o arquivo!");
      });
    }
  }

  private validationFormRegister(): boolean {
    let message: string[] = [];
    for (const name in this.formRegister.controls) {
      if (this.formRegister.controls[name].invalid) {
        message.push(name);
      }
    }
    if (this.formRegister.invalid) {
      message.forEach(m => this.snotify.error(`Campos obrigatorios: ${m}`));
      return false;
    }
    return true;
  }

  removerFiles() {
    this.imagemForm.formData.delete('files');
    this.files = [];
    this.imagemForm.files = [];
  }

  getDocType(element: ImageRegisterEntity): any {
    return safeCallOrNull(element, (el) => {
      const options = this.imageRegisterForm.options;
      const docType = options.filter(it => {
        it.id === el.idDocType
      });
      console.log(docType);
      return docType;
    }, () => {
      return '';
    });
  }

  getStyleShowTable(): object {
    let result: Object = { 'visibility': 'hidden' };
    safeCall(this.dataSource.data, (it) => {
      const show = (it.length > 0);
      if (show) {
        result = { 'visibility': 'visible' }
      }
    });
    return result;
  }

setFileData(files: ImageRegisterModel[]) {
  const filesEntity = this.imageMapper.converterImageToImageEntity(files);
  this.selectedFileRegister = filesEntity;
  this.dataSource.data = [...filesEntity];
  this.imageRegisterForm.imagesData = filesEntity;
  this.notifyDataChange();
}

  notifyDataChange() {
    this.getStyleShowTable();
    this.cd.detectChanges();
  }

  clickando(row) {
  }



}