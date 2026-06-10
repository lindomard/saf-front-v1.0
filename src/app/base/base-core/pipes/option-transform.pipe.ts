import { Pipe, PipeTransform } from "@angular/core";
import { ItemSelect } from "@base-shared/select/select.component";

@Pipe({ name: 'optionTransform' })
export class OptionTransform implements PipeTransform {


  transform(value: string, options: ItemSelect[]): string {
    try {
      const option = options.filter(function (search) {
        return search.id.toString().toLowerCase().indexOf(value) > -1;
      });
      return option[0].name;
    } catch {
      return "**ERRO** option transform.pipe " + value + JSON.stringify(options);
    }
  }
}