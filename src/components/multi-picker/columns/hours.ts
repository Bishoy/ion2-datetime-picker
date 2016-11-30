import _ from 'lodash';
import moment from 'moment';

import { MultiPickerColumn, IMultiPickerColumn } from '../multi-picker-columns';

export class MultiPickerColumnHours extends MultiPickerColumn implements IMultiPickerColumn {
  name = 'hour';
  firstOptionValue = this.min.hour();
  lastOptionValue = _.min([this.maxHour(), this.format.hours - 1]);

  maxHour(): number {
    return this.max.isAfter(this.min.clone().endOf('day'), 'days') ? this.format.hours - 1 : this.max.hour()
  }

  protected optionText(num: number): string {
    return _.padStart(`${this.zeroOrTwelve(num)}`, 2, '0')
  }

  protected selectedValue(datetime: string, momentName: string): number {
    let selectedValue = moment(datetime).hour() % this.format.hours;
    return this.zeroOrTwelve(selectedValue)
  }

  private zeroOrTwelve(num: number): number {
    return this.format.is12 && num == 0 ? 12 : num
  }
}
