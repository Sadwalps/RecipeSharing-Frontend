import { commonAPI } from "./commonApi"
import { serverURL } from "./serverUrl"

//sinup user
export const registerAPI = async (reqBody)=>{
    return await commonAPI('POST', `${serverURL}/register`, reqBody,"")
}

//login user
export const loginAPI = async (reqBody) => {
    return await commonAPI ('POST', `${serverURL}/login`, reqBody, "")
}

//submit recipe
export const submitRecipeAPI = async (reqBody, reqHeader)=>{
    return await commonAPI('POST', `${serverURL}/submit-recipe`, reqBody,reqHeader)
}

//get home recipe
export const getHomeRecipeAPI = async ()=>{
    return await commonAPI(`GET`,`${serverURL}/home-recipe`)
}

//get all recipes
export const getAllRecipesAPI = async (searchKey, reqHeader)=>{
    return await commonAPI(`GET`, `${serverURL}/all-recipes?search=${searchKey}`, "", reqHeader)
}

//get user recipes
export const getUserRecipesAPI = async (reqHeader)=>{
    return await commonAPI(`GET`, `${serverURL}/user-recipes`,"", reqHeader)
}


//delete user Recipe
export const removeUserRecipeAPI = async (id, reqHeader)=>{
    return await commonAPI("DELETE", `${serverURL}/remove-userrecipe/${id}`,{}, reqHeader)
}

//Update user recipe
export const updateUserRecipeAPI = async(id, reqBody, reqHeader)=>{
    return await commonAPI("PUT", `${serverURL}/update-userrecipe/${id}`, reqBody, reqHeader)
}
