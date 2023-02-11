export const pxToRem = (str: string, rate: number): string => {
  let newStr = str;

  const reg = /([0-9.]+)px/g;
  let match = reg.exec(newStr);
  while (match != null) {
    const [wholePart, numberPart] = match;
    if (wholePart == null || numberPart == null) continue;
    const px = parseFloat(numberPart);

    if (Number.isNaN(px)) continue;

    const rem = px / rate;
    const replaced = `${rem}rem`;

    newStr = `${newStr.slice(0, reg.lastIndex - wholePart.length)}${replaced}${newStr.slice(reg.lastIndex)}`;
    reg.lastIndex += replaced.length - wholePart.length;

    match = reg.exec(newStr);
  }
  return newStr;
};
