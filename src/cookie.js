import Cookies from 'js-cookie';
import faker from 'faker';

const getUserName = () => {
  if (!Cookies.get('userName')) {
    Cookies.set(
      'userName', faker.internet.userName(), { expires: 1 },
    );
  }
  const userName = Cookies.get('userName');
  return userName;
};

export default getUserName;
