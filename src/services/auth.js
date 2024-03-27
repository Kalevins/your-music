import {
  axiosInstanceJson,
} from "@/services"

export const login = async ({
  user,
  pwd
}) => {
  const { data } = await axiosInstanceJson.post("/api/login", {
    user,
    pwd
  })
  return data
}
