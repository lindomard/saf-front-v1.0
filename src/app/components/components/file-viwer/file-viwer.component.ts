import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { DomSanitizer } from '@angular/platform-browser';
import { TYPES } from '@base-shared/fileMimeTypes/file-mimetypes';

@Component({
  selector: 'ge-file-viwer',
  templateUrl: './file-viwer.component.html',
  styleUrls: ['./file-viwer.component.scss']
})
export class FileViwerComponent extends SimpleModalComponent<{ url: any, extension?: string, fromUrl?: boolean }, any> implements OnInit {

  @Input() url!: any;
  @Input() extension!: string;

  @Input() fromUrl?: boolean;

  type!: string;

  constructor(private sanitizer: DomSanitizer) {
    super();

  }

  

    ngOnInit(): void {
      if (!this.extension) {
        this.extension = this.getExtensionFromUrl(this.url);
      }
  
      this.type = this.getFileType(this.extension).type;
  
      console.warn('type', this.type)
      console.warn('extension', this.extension)
      console.warn('Link', this.url)
    }    
  

  download(url: string) {
    if (!url.includes('http')) return;
    window.open(url);
  }



  getFileType(extension: string) {
    var fileType = TYPES.filter(
      type => {
        return type.ext.includes(extension.toLowerCase());
      }
    );
    return fileType[0] || { type: "undefined" }
  }


  getExtensionFromUrl(url: string) {
    // Separar a URL em um array de strings
    const urlParts = url.split('/');

    // Pegar o último item do array
    const fileName = urlParts[urlParts.length - 1];

    // Pegar o ponto que separa o nome do arquivo da extensão
    const extensionIndex = fileName.lastIndexOf('.');

    // Se o ponto não for encontrado, a extensão é vazia
    if (extensionIndex === -1) {
      return '';
    }
    // Pegar a extensão do arquivo
    return fileName.substring(extensionIndex + 1);
  }
}
