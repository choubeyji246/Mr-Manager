import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getToken } from "./storage";

const getResponse = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> => {
  //console.log("data",data);
  //console.log(url);

  const config: AxiosRequestConfig = {
    method: method,
    url: `http://10.20.13.171:3000/${url}`,
    headers: { "Content-Type": "application/json", Authorization:await getToken() },
    data: data,
  };

  try {
    //console.log('real',config.url);
    
    const response = await axios(config);
    //console.log(response);
    
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getResponse;
