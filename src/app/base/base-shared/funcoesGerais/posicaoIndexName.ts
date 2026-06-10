import { ItemSelectIdStr } from "@base-shared/select/select.component";



export class fPosicaoIndexName {

  itemSelectIdStr: ItemSelectIdStr[];
  pValor: string;

  constructor(itemSelectIdStr: ItemSelectIdStr[], pValor: string) {
    this.itemSelectIdStr = itemSelectIdStr;
    this.pValor = pValor;
  }


  fPosicaoIndexName(): number {






    for (let i = 0; i < this.itemSelectIdStr.length; i++) {

      if (this.itemSelectIdStr[i].name === this.pValor) {
        return i;
      }
    }
    return -1;

  }

}