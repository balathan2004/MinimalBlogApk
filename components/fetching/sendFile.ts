

import { ResponseConfig } from "../interfaces";

interface Props {
  data: FormData;
  route: string;
}

 async function SendFile({ data, route }: Props) {
  const RequestConfig: RequestInit = {
    body: data,
    method: "POST",
    headers: {
      'Content-Type':"multipart/form-data",
      'Accept': 'application/json',
    },
  };

  const response = await fetch(route, RequestConfig);
  const responseJson = await response.json() as ResponseConfig;
  return responseJson;
}

export default SendFile