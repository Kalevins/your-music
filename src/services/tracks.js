import { axiosInstanceApi } from "@/services"

export const searchTrack = async ({ name, offset, limit}) => {
  const { data } = await axiosInstanceApi.get("search", {
    params: {
      q: name,
      type: "track",
      offset: offset || 0,
      limit: limit || 20
    }
  })
  return data
}

export const getTrack = async (id) => {
  const { data } = await axiosInstanceApi.get(`tracks/${id}`)
  return data
}
