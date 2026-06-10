export interface ConfigColumnProcessosExecutados {
    header: string;
    value: string;
  }
  
  export type ConfigProcessosExecutados = ConfigColumnProcessosExecutados[];


  export const configColumnsProcessosExecutados = [{
    header: "Chave id",
    value: "cpId"
  }, {
    header: "Iniciado em ",
    value: "cpDatHorIni"
  }, {
    header: "Terminado em ",
    value: "cpDatHorTermino"
  }, {
    header: "Evento ",
    value: "cpNome"
  }

];
  