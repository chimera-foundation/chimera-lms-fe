export const loginUserService = async (props: {
  username: string;
  password: string;
}): Promise<any> => {
  const { username, password } = props;

  return `this is from service ${username} ${password}`;
};
