const getManager = (admin: string | undefined, user: string): string => (admin || user);

export default getManager;
