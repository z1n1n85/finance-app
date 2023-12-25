import axios from "axios";
import { SERVER_API } from "../const/access";

export default class TransactionService {
  static async getAll() {
    const response = await axios.get(`${SERVER_API}transactions`);
    return response;
    
  }
  static async create(transaction) {
    const response = await axios.post(`${SERVER_API}transactions`, transaction);
    return response;
  }
  static async update(transaction) {
    const response = await axios.put(`${SERVER_API}transactions`, transaction);
    return response;
  }
  static async delete(id) {
    const response = await axios.delete(`${SERVER_API}transactions${id}`);
    return response;
  }
}