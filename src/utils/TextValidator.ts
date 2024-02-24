const defaultMinLength = 5;

export const getErrorMsg = (text: string, minLength?: number) => {
  if (minLength === undefined) {
    minLength = defaultMinLength;
  }
  const diff = minLength - text.length;
  if (diff == 1) {
    return "This field cannot be empty";
  }
  if (diff > 0) {
    return `Required ${diff} more character${diff > 1 ? "s" : ""}`;
  }
  return "";
};

export const isTextValid = (text: string, minLength?: number) => {
  if (minLength === undefined) {
    minLength = defaultMinLength;
  }
  return text.length >= minLength;
};
