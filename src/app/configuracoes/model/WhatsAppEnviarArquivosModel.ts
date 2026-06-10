
export interface WhatsAppEnviarArquivoModel {
    chatId?: string,
    contentType?: string,
    content?: WhatsAppEnviarArquivoContent
}


export interface WhatsAppEnviarArquivoContent {
    mimeType?: string,
    data?: string,
    filename?: string
}




