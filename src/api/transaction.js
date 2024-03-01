import $api from "api/index";

export default class TransactionService {
  static async getAll() {
    return $api.get(`transactions`);
  }
  static async create(transaction) {
    return $api.post(`transactions`, transaction);
  }
  static async update(transaction) {
    return $api.put(`transactions`, transaction);
  }
  static async delete(id) {
    return $api.delete(`transactions${id}`);
  }
}