export interface ConfigColumn {
    header: string;
    value: string;
  }
  
  export type Config = ConfigColumn[];


  export const configColumns = [{
    header: "Name",
    value: "name"
  }, {
    header: "E-mail",
    value: "email"
  }, {
    header: "Phone",
    value: "phone"
  }];
  