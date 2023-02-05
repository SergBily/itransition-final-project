interface PattersPassword {
  numeric: string,
  passwordLength: number,
  latinUpper: string,
  latinLower: string,
}

const patterns: PattersPassword = {
  numeric: '0-9',
  passwordLength: 8,
  latinUpper: 'A-Z',
  latinLower: 'a-z',
};

const passwordValidator = {
  hasUpperCase: (v: string) => !!v.match(new RegExp(`[${patterns.latinLower}]`, 'g'))
  || "Your password isn't strong enough need lowercase letters",
  hasLowerCase: (v: string) => !!v.match(new RegExp(`[${patterns.latinUpper}]`, 'g'))
  || "Your password isn't strong enough need uppercase letters",
  hasNumber: (v: string) => !!v.match(new RegExp(`[${patterns.numeric}]`, 'g'))
  || "Your password isn't strong enough need numbers",
  hasSymbol: (v: string) => v.length === patterns.passwordLength
  || "Your password isn't strong enough need minimum 8 characters",
};

export default passwordValidator;
