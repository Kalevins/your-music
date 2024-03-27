import { axiosInstanceAccount, axiosInstanceApi } from "@/services"
import { clientId, clientSecret } from "@/utils"

export const getToken = async () => {
  const { data } = await axiosInstanceAccount.post("token", {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
  })
  return data
}

export const validateToken = async () => {
  const { data } = await axiosInstanceApi.get("me")
  return data
}