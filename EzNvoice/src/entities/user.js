import ApiProvider from '../api/apiProvider';
import { ENDPOINT_AUTH_LOGIN } from '../api/endpoints';

class User {
  #provider = new ApiProvider();

  firstName;

  lastName;

  email;

  token;

  signIn(data) {
    this.#provider.post(ENDPOINT_AUTH_LOGIN, data).then((res) => {
      if (res.data.message === 'success') {
        this.token = res.data.data[0]?.token;
        console.log(this.token);
        return true;
      }
      console.log(JSON.stringify(res));
      return false;
    }).catch((err) => {
      console.log(JSON.stringify(err));
      return false;
    });
  }
}

export default User;
