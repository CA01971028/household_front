export const API_BASE_URL = "https://household-back-cxfbg9a8bgg3bugz.japaneast-01.azurewebsites.net";

export const ENDPOINTS = {
    auth:`${API_BASE_URL}/auth/check`,
    login:`${API_BASE_URL}/login`,
    signup:`${API_BASE_URL}/signup`,
    home: `${API_BASE_URL}/home/result`,
    flow: `${API_BASE_URL}/flow/result`,
    flowPost:`${API_BASE_URL}/flow/registration`,
    budget: `${API_BASE_URL}/budget`,
    budgetPost: `${API_BASE_URL}/budget/registration`,
}