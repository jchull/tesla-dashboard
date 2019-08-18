import {IDriveSession} from './DriveSession';
import numbro from 'numbro';

export function isDriveSession(arg: any): arg is IDriveSession {
  return arg.charge_to_max_range === undefined;
}

export function isoDurationToHuman(durationString: string): string {
  const hours = durationString.match(/(\d+)H/);
  const minutes = durationString.match(/(\d+)M/);
  const seconds = durationString.match(/(\d+)(\.\d+)?S/);

  let displayDuration = numbro((seconds && seconds[1]) || 0)
      .format('00');
  if (minutes || hours) {
    displayDuration = numbro((minutes && minutes[1]) || 0)
        .format('00') + ':' + displayDuration;
    if (hours) {
      displayDuration = hours[1] + ':' + displayDuration;
    }
  }
  return displayDuration;
}
