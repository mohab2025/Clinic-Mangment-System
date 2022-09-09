import { emailRegex, passwordRegex, phoneRegex, fullNameRegex } from './regex';

/** checks duplicate values in an array */
export const checkDuplicated = (value: any) => {
  const duplicated = value.filter(
    (item: any, index: any) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

/** checks if date > current date && date < 60 days from now */
export const validateDate = (value: Date) => {
  value = new Date(value);
  return (
    value && // check that there is a date object
    value.getTime() > Date.now() &&
    value.getTime() < Date.now() + 60 * 24 * 60 * 60 * 1000
  );
};

/** email regex validation*/
export const validateEmail = function (email: string) {
  return emailRegex.test(email);
};

/** password regex validation*/
export const validatePassword = function (password: string) {
  return passwordRegex.test(password);
};

/** phone regex validation*/
export const validatePhoneNumber = function (phoneNumber: string) {
  return phoneRegex.test(phoneNumber);
};

/** fullname regex validation*/
export const validateFullName = function (phoneNumber: string) {
  return fullNameRegex.test(phoneNumber);
};