import axios from "axios";

export default class AccountService {
  static async getAll() {
    const response = await axios.get('http://localhost:5000/api/accounts');
    return response;
  }
  static async create(account) {
    const response = await axios.post('http://localhost:5000/api/accounts', account);
    return response;
  }
  static async update(account) {
    const response = await axios.put('http://localhost:5000/api/accounts', account);
    return response;
  }
  static async delete(id) {
    const response = await axios.delete(`http://localhost:5000/api/accounts${id}`);
    return response;
  }
}