import axiosInstance from '../axios'
import {IVehicle} from "./types";
import Endpoints from "./endpoints";

export const get = () => axiosInstance.get<IVehicle[]>(Endpoints.GET_VEHICLES)