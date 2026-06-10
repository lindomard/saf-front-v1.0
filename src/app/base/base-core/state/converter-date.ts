import { safeCallOrNull } from '@base-core/safe-call';
import * as moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_BRAZIL = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
//export const DATE_TIME_GRAVAR_FORMAT = 'YYYY-MM-DDTHH:mm';
// 'DD/MM/YYYY, hh:mm:ss';
// "DD/MM/YYYY, hh:mm:ss" v
// export const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm:ss';
export function converterDateToString(date: Date, format: string): string {
      const day = moment(date);



  return moment(date).format(format);

  //    return date.format(format);
  //    return day.format(format);    
}



// inicio

export function converterDateBrasilToParam(data: String, format: string): string {

  let mDataAm = null;
  safeCallOrNull(data, (it) => {
    mDataAm = it.substring(6, 10) + '-' + data.substring(3, 5) + '-' + data.substring(0, 2);


    try {
       return mDataAm;

      //      console.log('noi try ', moment(Date.parse(mDataAm)).format(format));

//      return moment(Date.parse(mDataAm)).format(format);
    } catch (error) {
      return mDataAm;
    }


  },
    () => { return mDataAm; }

  );

  return mDataAm;


}


// INICIO string para date

export function converterStringToDate(data: String, format: string): Date {


  safeCallOrNull(data, (it) => {
    let mDataAm = it.substring(6, 10) + '-' + data.substring(3, 5) + '-' + data.substring(0, 2);


    try {

      return moment(Date.parse(mDataAm)).format(format);
    } catch (error) {
      return null;
    }


  },
    () => { return null; }

  );

  return null;


}

