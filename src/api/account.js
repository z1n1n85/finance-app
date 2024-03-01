import $api from "api/index";

export default class AccountService {
  static async getAll() {
    return $api.get(`accounts`);
  }
  static async create(account) {
    return $api.post(`accounts`, account);
  }
  static async update(account) {
    return $api.put(`accounts`, account);
  }
  static async delete(id) {
    return $api.delete(`accounts${id}`);
  }
}