const defaultMinLength = 0;

export const getHelperText = (
  text: string,
  minLength?: number,
  maxLength?: number
) => {
  if (minLength === undefined) {
    minLength = defaultMinLength;
  }
  const diff = minLength - text.length;
  if (diff === 1) {
    return "This field cannot be empty";
  }
  if (diff > 0) {
    return `Required ${diff} more character${diff > 1 ? "s" : ""}`;
  }
  if (maxLength !== undefined) {
    return `${text.length}/${maxLength}`;
  }
  return "";
};

export const isTextValid = (
  text: string,
  minLength?: number,
  maxLength?: number
) => {
  if (minLength === undefined) {
    minLength = defaultMinLength;
  }
  return (
    text.length >= minLength &&
    (maxLength === undefined || text.length <= maxLength)
  );
};

export const toAvatarText = (text: string) => {
  const words = text.split(" ");
  return (
    words.length > 1 ? words[0][0] + words[1][0] : words[0][0]
  ).toUpperCase();
};
