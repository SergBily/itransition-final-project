const getNameImage = (u: string): string => u.split('%2F')[2].split('?')[0];

export default getNameImage;
