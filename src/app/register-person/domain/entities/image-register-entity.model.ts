export interface ImageRegisterEntity {
    id?: number;
    name?: string;
    nameFile?: string;
    idDocType?: number;
    dueDate?: string;
    path?: string;
    url?: string | ArrayBuffer | null;
    obs?: string;
    format?: string;
}
