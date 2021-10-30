export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  timeout: number
) => {
  let timer = 0;
  return (...args: T) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const exchangeSingleQuote = (t: string) => {
  if (t[0] === `'`) {
    t = `"${t.substr(1)}`;
  }
  if (t[t.length - 1] === `'`) {
    t = `${t.substr(0, t.length - 1)}"`;
  }
  return t;
};

export const textToJSON = (code: string) => {
  let removeNextColon = false;
  let nextIsValue = false;
  const token = code
    .split(/\s/)
    .map((t) => {
      if (removeNextColon && t === ":") {
        return "";
      }
      removeNextColon = false;

      //  [ ] { } ,
      if (/[[]{}]/.test(t)) {
        return t;
      }

      //  "value"
      if (/^["'](.+)["']$/.test(t)) {
        return exchangeSingleQuote(t);
      }

      if (!nextIsValue && /^[a-zA-Z]+/.test(t)) {
        if (t[t.length - 1] === ":") {
          t = t.substr(0, t.length - 1);
        }
        removeNextColon = true;
        nextIsValue = true;
        return `"${t}":`;
      } else {
        if (t[t.length - 1] === ",") {
          const val = t.substr(0, t.length - 1);
          t = exchangeSingleQuote(val) + ",";
        }
        nextIsValue = false;
      }

      return t;
    })
    .filter((t) => t !== "");
  return token.join(" ");
};
