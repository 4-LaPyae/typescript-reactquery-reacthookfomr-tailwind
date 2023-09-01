import axios from "axios";
import { userProps } from "./UserList";
const url = "http://192.168.100.18:4000/api/user";

export const getAllUser = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
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
