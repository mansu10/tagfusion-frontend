import {
  axiosInstance,
} from "../config/config";

// data on chain

const BASE_URL = "/tagfusion/api"

// get api
const fetchApiByUrl = (data) => {
  return axiosInstance.get(`${BASE_URL}/execute_request`, data)
}

// generate project
const generateProject = (data) => {
  return axiosInstance.post(`${BASE_URL}/submit_project_details`, data)
}

// project list
const fetchAllProjects = (data) => {
  return axiosInstance.get(`${BASE_URL}/get_all_project`, data)
}

// project history
const fetchAllProjectHistory = (data) => {
  return axiosInstance.get(`${BASE_URL}/get_projects_by_trua_wallet`, data)
}


// user chain page
const getProjectById = (data) => {
  return axiosInstance.get(`${BASE_URL}/get_project_by_id`, data)
}

// pick chain data
const pickChainData = (data) => {
  return axiosInstance.get(`${BASE_URL}/pick_on_chain_data`, data)
}

export {
  fetchApiByUrl,
  generateProject,
  fetchAllProjects,
  fetchAllProjectHistory,
  getProjectById,
  pickChainData
}