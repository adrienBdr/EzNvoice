import ApiProvider from '../api/apiProvider';
import { ENDPOINT_AUTH_LOGIN, ENDPOINT_AUTH_REGISTER, ENDPOINT_USER } from '../api/endpoints';

class User {
  #provider = new ApiProvider();

  id;

  image;

  firstName;

  lastName;

  email;

  token;

  config;

  initFromJson(data) {
    this.id = data.id;
    this.image = data.image;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_AUTH_REGISTER, {
      lastName: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      firstName: data.surname.charAt(0).toUpperCase() + data.surname.slice(1),
      email: data.email,
      password: data.password,
    }).then((res) => {
      return res.data.message === 'New user created';
    }).catch((err) => {
      console.log(err.response.data.message);
      return false;
    });
  }

  async signIn(data) {
    return this.#provider.post(ENDPOINT_AUTH_LOGIN, data).then((res) => {
      if (res.data.message === 'success') {
        this.token = res.data.data[0]?.token;
        return true;
      }
      return false;
    }).catch((err) => {
      console.log(err.response.data.message);
      return false;
    });
  }

  async init() {
    if (this.token) {
      this.config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };

      return this.#provider.get(ENDPOINT_USER, this.config).then((r) => {
        if (r.data.data.length === 1) {
          this.initFromJson(r.data.data[0]);
          return true;
        }
        return false;
      }).catch((e) => {
        console.log(e.response.data.message);
        return false;
      });
    }
    return false;
  }

}

export default User;
