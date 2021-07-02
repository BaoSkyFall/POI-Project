import * as moment from 'moment';

export const formatDate = (date,stringDateFormat) => {

   return moment(date).format(stringDateFormat);
}