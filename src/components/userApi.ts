import axios from "axios";
import { userProps } from "./UserList";
const url = "http://localhost:4000/api/user";

export const getAllUser = async () => {
  const response = await axios.get(url);
  return response.data;
};
export const createUser = (user: userProps) => {
  return axios.post(`${url}`, user);
};
export const updateUser = (data: userProps) => {
  return axios.patch(`${url}/${data._id}`, data);
};
export const deleteUser = (id: string) => {
  return axios.delete(`${url}/${id}`);
};
