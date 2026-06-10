import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { formatDateEuaToLong, formatLongToDateString } from "@base-core/format-date";
import { ImageRegisterModel } from "@register/data/model/image-register.model";
import { ImageRegisterEntity } from "../entities/image-register-entity.model";

@Injectable()
export class ImageRegisterMapper {

    mapFrom(imagesRegisterEntity: ImageRegisterEntity[]): ImageRegisterModel[] {
        return this.converter(imagesRegisterEntity);
    }

    private converter(imagesRegisterEntity: ImageRegisterEntity[]): ImageRegisterModel[] {
        const files = imagesRegisterEntity.filter(o => o.id == null);
        return files.map(image => {
            return {
                id: image.id,
                docType: image.idDocType,
                dueDate: formatDateEuaToLong(image.dueDate),
                name: image.name,
                nameFile: image.nameFile,
                obs: image.obs,
                format: image.format
            }
        });
    }

    converterImageToImageEntity(images: ImageRegisterModel[]): ImageRegisterEntity[] {
        return images.map(img => {
            return {
                id: img.id,
                dueDate: formatLongToDateString(img.dueDate),
                format: img.format,
                idDocType: img.docType,
                name: img.name,
                nameFile: img.nameFile,
                obs: img.obs,
                path: img.name,
                url: `http://localhost:8082/${img.url}`
            }
        });
    }
}