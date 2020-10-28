import Cookies from 'js-cookie';
import faker from 'faker';

const setUserName = () => {
  if (!Cookies.get('userName')) {
    Cookies.set(
      'userName', faker.internet.userName(), { expires: 1 },
    );
  }
  const userName = Cookies.get('userName');
  return userName;
};

export default setUserName;
