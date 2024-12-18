//import { ResponseConfig } from "./interfaces";

import { ResponseConfig } from "../interfaces";

interface Props {
  data: FormData;
  route: string;
}

export default async function SendFile({ data, route }: Props) {
  const RequestConfig: RequestInit = {
    body: data,
    method: "POST",
  };

  const response = await fetch(route, RequestConfig);
  const responseJson = await response.json() as ResponseConfig;
  return responseJson;
}