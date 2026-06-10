

export function MontarFiltros(filter: string, pNomeCampo: string, pValor: string): string {


  if (pValor!=undefined && pValor.length>0) {
    return (filter == "" ? "?" : "&") + pNomeCampo + "=" + pValor;
  } else {
    return "";

  }
  
  /*
  safeCall(pValor, (it) => {
    return (filter == "" ? "?" : "&") + pNomeCampo + "=" + it;
  });
  return "";
*/
}



export const tipoRelXls = "xlsx";
export const tipoRelPdf = "pdf";
export const tipoRelHtml = "html";
export const tipoRelCsv = "csv";
export const tipoRelXml = "xml";
