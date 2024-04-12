import { APIResponse } from "../data/type";
import { baseAxios } from "./baseAxios";
import { InquireType } from "../data/type";

export const postInquire = async (requestData: InquireType) => {
  const {
    data: { data: responseData },
  } = await baseAxios.post<APIResponse<InquireType>>("api/v1/enquiry", {
    title: requestData.inquireTitle,
    content: requestData.inquireContent,
    email: requestData.inquireEmail,
  });
  return responseData;
};
