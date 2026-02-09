import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensorValuePipe',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: { amount: number; unit: string }): string {
    if (!value || value.amount === undefined) {
      return ' - ';
    }
    if (!value.unit || value.unit === undefined) {
      return value.amount.toString();
    }

    return `${value.amount} ${value.unit}`;
  }
}
