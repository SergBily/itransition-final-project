const checkTitleIsNan = (k: string) => (isNaN(+k) ? k : `_${k}`);

export default checkTitleIsNan;
