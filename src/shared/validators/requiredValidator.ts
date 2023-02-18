const requiredValidator = (m: string) => ({
  required: {
    value: true,
    message: m,
  },
});

export default requiredValidator;
