/**
 * Matching format per: http://www.w3.org/TR/NOTE-datetime
 */
const isoformat =
  '^\\d{4}-\\d{2}-\\d{2}' + // Match YYYY-MM-DD
  '((T\\d{2}:\\d{2}(:\\d{2})?)' + // Match THH:mm:ss
  '(\\.\\d{1,6})?' + // Match .sssss
  '(Z|(\\+|-)\\d{2}:\\d{2})?)?$'; // Time zone (Z or +hh:mm)
const dateMatcher = new RegExp(isoformat);
const isISODateString = (value: unknown) =>
  typeof value === 'string' && dateMatcher.test(value);

export default isISODateString;
