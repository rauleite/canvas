/* eslint-disable no-console */
import { isDev } from '.';

export const TURN_OFF = false;
// export const CLEAR_LOCALSTORAGE = true;
const prefix = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  TIME: 'TIME',
};

const off = (!isDev || TURN_OFF);
// const postLog

const withGroup = ({
  baseTime, toRunCb, additional, groupLabel,
}) => {
  console.group(groupLabel);
  if (additional) {
    additional();
  }
  const timeLabel = groupLabel !== prefix.TIME ? prefix.TIME : ':';
  const result = baseTime({ toRunCb, timeLabel });
  console.groupEnd(groupLabel);
  return result;
};

const log = {};

log.info = (...args) => {
  if (off) return;
  console.info(prefix.INFO, ...args);
};
log.error = (...args) => {
  if (off) return;
  console.error(prefix.ERROR, ...args);
};

/**
 * Run code and mensure it
 * @param {object} {toRun, label, info}
 * @returns Running toRun() function
 */
log.time = ({ toRun, label = prefix.TIME, info }) => {
  if (off) {
    return toRun();
  }

  const baseTime = ({ toRunCb, timeLabel = prefix.TIME }) => {
    console.time(timeLabel);
    const result = toRunCb();
    console.timeEnd(timeLabel);
    return result;
  };

  // Com grupo
  if (info) {
    const logInfo = () => log.info(...info);
    return withGroup({
      baseTime,
      toRunCb: toRun,
      additional: logInfo,
      groupLabel: label,
    });
  }
  return baseTime({ toRunCb: toRun, label });
};

export default log;
