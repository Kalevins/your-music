import { axiosInstanceApi } from "@/services"

export const getTracksByName = async ({ name, offset, limit}) => {
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

export const getTrackById = async (id) => {
  const { data } = await axiosInstanceApi.get(`tracks/${id}`)
  return data
}

export const getTracksById = async (ids) => {
  const { data } = await axiosInstanceApi.get("tracks", {
    params: {
      ids: ids.join(",")
    }
  })
  return data
}
