import User from '../models/admin/userAdmin.model';

const checkActionAdmin = (
  usersId: string[],
  usersData: User[],
  action: string,
  value: string,
): string[] => usersId.filter((u) => {
  const user = usersData.find((d) => d.id === u) as User;
  return user[action] !== value;
});

export default checkActionAdmin;
