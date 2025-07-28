// src/api/apiService.js

// Access the API base URL from environment variables
const API_BASE_URL = "http://localhost:9728";

// --- General Utility ---
// const handleResponse = async (response) => {
//     if (!response.ok) {
//         let errorBody = '';
//         try {
//             // Attempt to get the error body as text
//             errorBody = await response.text();
//             // If the body is empty, it might still be a valid 401 for "Incorrect Credentials"
//             // We'll let the frontend catch block decide the final message.
//         } catch (e) {
//             console.error("Failed to read error response body (this is often expected for 401s with no body):", e);
//             // If reading body fails, fall back to status text
//             errorBody = response.statusText || `HTTP error! Status: ${response.status}`;
//         }

//         // Throw an Error object with the extracted message
//         // This message will be accessible via error.message in the catch block
//         throw new Error(errorBody);
//     }
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//         return response.json();
//     } else {
//         return response.text();
//     }
// };

// --- Admin Endpoints (Backend: @RequestMapping("/api/admins")) ---
export const registerAdmin = async (adminData) => {
    return await fetch(`${API_BASE_URL}/api/admins/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
    }).then(handleResponse);
};

export const loginAdmin = async (adminCredentials) => {
    return await fetch(`${API_BASE_URL}/api/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCredentials),
    }).then(handleResponse);
};

export const getAllAdmins = async () => {
    return await fetch(`${API_BASE_URL}/api/admins`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getAdminProfile = async (id) => {
    return await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getAdminProfileByUsername = async (username) => {
    return await fetch(`${API_BASE_URL}/api/admins/username/${username}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const updateAdmin = async (id, adminData) => {
    return await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
    }).then(handleResponse);
};

export const deleteAdmin = async (id) => {
    return await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'DELETE'
    }).then(handleResponse);
};

// --- Citizen Endpoints (Backend: @RequestMapping("/api/citizens")) ---
export const registerCitizen = async (citizenData) => {
    return await fetch(`${API_BASE_URL}/api/citizens/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenData),
    }).then(handleResponse);
};

export const loginCitizen = async (citizenCredentials) => {
    return await fetch(`${API_BASE_URL}/api/citizens/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenCredentials),
    }).then(handleResponse);
};

export const getAllCitizens = async () => {
    return await fetch(`${API_BASE_URL}/api/admins/citizens`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getCitizenProfile = async (id) => {
    return await fetch(`${API_BASE_URL}/api/citizens/${id}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getCitizenProfileByUsername = async (username) => {
    return await fetch(`${API_BASE_URL}/api/citizens/username/${username}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const updateCitizen = async (id, citizenData) => {
    return await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenData),
    }).then(handleResponse);
};

export const deleteCitizen = async (id) => {
    return await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`, {
        method: 'DELETE'
    }).then(handleResponse);
};

// --- Politician Endpoints (Backend: @RequestMapping("/api/politicians")) ---
export const registerPolitician = async (politicianData) => {
    return await fetch(`${API_BASE_URL}/api/politicians/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianData),
    }).then(handleResponse);
};

export const loginPolitician = async (politicianCredentials) => {
    return await fetch(`${API_BASE_URL}/api/politicians/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianCredentials),
    }).then(handleResponse);
};

export const getAllPoliticians = async () => {
    return await fetch(`${API_BASE_URL}/api/admins/politicians`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getPoliticianProfile = async (id) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${id}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getPoliticianProfileByUsername = async (username) => {
    return await fetch(`${API_BASE_URL}/api/politicians/username/${username}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const updatePolitician = async (id, politicianData) => {
    return await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianData),
    }).then(handleResponse);
};

export const deletePolitician = async (id) => {
    return await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`, {
        method: 'DELETE'
    }).then(handleResponse);
};

// --- Citizen Issue Endpoints (Backend: @RequestMapping("/api/citizenissues")) ---
export const createCitizenIssue = async (formData) => {
    return await fetch(`${API_BASE_URL}/api/citizenissues/create`, {
        method: 'POST',
        body: formData,
    }).then(handleResponse);
};

export const getIssuesByCitizenUsername = async (username) => {
    return await fetch(`${API_BASE_URL}/api/citizenissues/citizen/view/${username}`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getAllCitizenIssues = async () => {
    return await fetch(`${API_BASE_URL}/api/citizenissues`, {
        method: 'GET'
    }).then(handleResponse);
};

export const deleteCitizenIssue = async (issueId) => {
    return await fetch(`${API_BASE_URL}/api/citizenissues/${issueId}`, {
        method: 'DELETE'
    }).then(handleResponse);
};

export const getCitizenIssueById = async (issueId) => {
    return await fetch(`${API_BASE_URL}/api/citizenissues/${issueId}`, {
        method: 'GET'
    }).then(handleResponse);
};

// --- Politician specific issue queries (Backend: @RequestMapping("/api/politicians")) ---
export const getIssuesForPolitician = async (username) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${username}/issues`, {
        method: 'GET'
    }).then(handleResponse);
};

export const updateIssueStatus = async (politicianId, issueId, status) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/${issueId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: status,
    }).then(handleResponse);
};

export const getPoliticianInProgressIssues = async (politicianId) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/inprogress`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getPoliticianResolvedIssues = async (politicianId) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/resolved`, {
        method: 'GET'
    }).then(handleResponse);
};

export const getPoliticianPendingIssues = async (politicianId) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/pending`, {
        method: 'GET'
    }).then(handleResponse);
};

export const updateAdminProfile = async (id, adminData) => {
    return await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
    }).then(handleResponse);
};

export const updateCitizenProfile = async (id, citizenData) => {
    return await fetch(`${API_BASE_URL}/api/citizens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenData),
    }).then(handleResponse);
};

export const updatePoliticianProfile = async (id, politicianData) => {
    return await fetch(`${API_BASE_URL}/api/politicians/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianData),
    }).then(handleResponse);
};
const handleResponse = async (response) => {
    if (!response.ok) {
        // --- NEW DIAGNOSTIC LOGS ---
        console.error("API Response NOT OK. Status:", response.status, "Status Text:", response.statusText);
        // --- END NEW DIAGNOSTIC LOGS ---

        let errorBody = '';
        try {
            errorBody = await response.text();
            // --- NEW DIAGNOSTIC LOG ---
            console.log("Attempted to read Error Response Body from API (raw text):", errorBody);
            // --- END NEW DIAGNOSTIC LOG ---
        } catch (e) {
            console.error("Failed to read error response body from network response (this might be normal for certain errors):", e);
            errorBody = response.statusText || `HTTP error! Status: ${response.status}`;
        }

        // Construct the message that will become error.message
        const errorMessage = errorBody || `HTTP error! Status: ${response.status} (${response.statusText})`;
        const thrownError = new Error(errorMessage);
        // --- NEW DIAGNOSTIC LOG ---
        console.error("Error Object THROWN by handleResponse:", thrownError);
        // --- END NEW DIAGNOSTIC LOG ---
        throw thrownError;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return response.text();
    }
};