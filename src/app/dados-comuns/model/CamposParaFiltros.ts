

export interface CamposParaFiltros {
   relacionarCondicao?: String,
   nomeDoCampo?: String,
   condicao?: String,
   valor?: String,
   grupoFiltro?: number
}


export interface OrderFields {
   fieldApelido?: String,
   descending?: number
}


export interface FilterFields {
   fieldApelido?: String,
   fieldDescricao?: String,
   tamanho?: number,
   aliqn?: String,


}

export interface ParametrosDados {
   filtrosGenericosList?: CamposParaFiltros[],
   orderFields?: OrderFields[],
   filterFields?: FilterFields[],
   separadoPor?: String,
   nomeRelatorio?: String,
   criteritosObservacoes?: String,
   tituloRelatorio?: String,
   tipoRelatorio?: String,
   origemRelatorio?: String,
   page?: number,
   size?: number   
}
