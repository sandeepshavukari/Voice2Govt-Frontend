// // src/api/apiService.js

// // Access the API base URL from environment variables
// const API_BASE_URL = "http://localhost:9728";

// // --- General Utility ---
// const handleResponse = async (response) => {
//     if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || `HTTP error! status: ${response.status}`);
//     }
//     // Attempt to parse JSON, fall back to text if not valid JSON
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//         return response.json();
//     } else {
//         return response.text();
//     }
// };

// // --- Admin Endpoints ---
// export const registerAdmin = async (adminData) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adminData),
//     });
//     return handleResponse(response);
// };

// export const loginAdmin = async (adminCredentials) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adminCredentials),
//     });
//     return handleResponse(response);
// };

// export const getAllAdmins = async () => {
//     const response = await fetch(`${API_BASE_URL}/api/admins`);
//     return handleResponse(response);
// };

// export const getAdminById = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/${id}`);
//     return handleResponse(response);
// };

// export const updateAdmin = async (id, adminData) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(adminData),
//     });
//     return handleResponse(response);
// };

// export const deleteAdmin = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/${id}`, {
//         method: 'DELETE',
//     });
//     return handleResponse(response);
// };

// // --- Citizen Endpoints ---
// export const registerCitizen = async (citizenData) => {
//     const response = await fetch(`${API_BASE_URL}/api/citizens/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(citizenData),
//     });
//     return handleResponse(response);
// };

// export const loginCitizen = async (citizenCredentials) => {
//     const response = await fetch(`${API_BASE_URL}/api/citizens/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(citizenCredentials),
//     });
//     return handleResponse(response);
// };

// export const getAllCitizens = async () => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/citizens`); // Assuming admin endpoint for all citizens
//     return handleResponse(response);
// };

// export const getCitizenById = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`); // Assuming admin endpoint
//     return handleResponse(response);
// };

// export const updateCitizen = async (id, citizenData) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(citizenData),
//     });
//     return handleResponse(response);
// };

// export const deleteCitizen = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`, {
//         method: 'DELETE',
//     });
//     return handleResponse(response);
// };

// // --- Politician Endpoints ---
// export const registerPolitician = async (politicianData) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(politicianData),
//     });
//     return handleResponse(response);
// };

// export const loginPolitician = async (politicianCredentials) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(politicianCredentials),
//     });
//     return handleResponse(response);
// };

// export const getAllPoliticians = async () => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/politicians`); // Assuming admin endpoint for all politicians
//     return handleResponse(response);
// };

// export const getPoliticianById = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`); // Assuming admin endpoint
//     return handleResponse(response);
// };

// export const updatePolitician = async (id, politicianData) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(politicianData),
//     });
//     return handleResponse(response);
// };

// export const deletePolitician = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`, {
//         method: 'DELETE',
//     });
//     return handleResponse(response);
// };

// // --- Citizen Issue Endpoints ---
// export const createCitizenIssue = async (formData) => { // formData is a FormData object for file uploads
//     const response = await fetch(`${API_BASE_URL}/api/citizenissues/create`, {
//         method: 'POST',
//         body: formData, // No 'Content-Type' header needed for FormData
//     });
//     return handleResponse(response);
// };

// export const getIssuesByCitizenUsername = async (username) => {
//     const response = await fetch(`${API_BASE_URL}/api/citizenissues/citizen/view/${username}`);
//     return handleResponse(response);
// };

// export const getAllCitizenIssues = async () => {
//     // This endpoint must be implemented in your Spring Boot's CitizenIssueController
//     const response = await fetch(`${API_BASE_URL}/api/citizenissues`);
//     return handleResponse(response);
// };

// export const deleteCitizenIssue = async (issueId) => {
//     // This endpoint must be implemented in your Spring Boot's CitizenIssueController
//     const response = await fetch(`${API_BASE_URL}/api/citizenissues/${issueId}`, {
//         method: 'DELETE',
//     });
//     return handleResponse(response);
// };

// export const getCitizenIssueById = async (issueId) => {
//     // This endpoint must be implemented in your Spring Boot's CitizenIssueController
//     const response = await fetch(`${API_BASE_URL}/api/citizenissues/${issueId}`);
//     return handleResponse(response);
// };

// // --- Politician specific issue queries ---
// export const getIssuesForPolitician = async (username) => {
//     // Based on your backend, this uses username. If you want by pol_id, adjust backend/call.
//     const response = await fetch(`${API_BASE_URL}/api/politicians/${username}/issues`);
//     return handleResponse(response);
// };

// export const updateIssueStatus = async (politicianId, issueId, status) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/${issueId}/status`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'text/plain', // Backend expects a raw string body
//         },
//         body: status,
//     });
//     return handleResponse(response);
// };

// export const getPoliticianInProgressIssues = async (politicianId) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/inprogress`);
//     return handleResponse(response);
// };

// export const getPoliticianResolvedIssues = async (politicianId) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/resolved`);
//     return handleResponse(response);
// };

// export const getPoliticianPendingIssues = async (politicianId) => {
//     const response = await fetch(`${API_BASE_URL}/api/politicians/${politicianId}/issues/pending`);
//     return handleResponse(response);
// };

// // Add Moderator related APIs if you fully implement them in backend
// src/api/apiService.js

// Access the API base URL from environment variables
// This variable should now ONLY contain the base URL without /api
// e.g., VITE_API_BASE_URL=http://localhost:9728
// or VITE_API_BASE_URL=https://your-springboot-app.onrender.com
const API_BASE_URL = "http://localhost:9728";

// --- General Utility ---
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return response.text();
    }
};

// --- Admin Endpoints (Backend: @RequestMapping("/api/admins")) ---
export const registerAdmin = async (adminData) => {
    return await fetch(`${API_BASE_URL}/api/admins/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
    }).then(handleResponse);
};
// src/api/apiService.js

// ... existing code ...

export const loginAdmin = async (adminCredentials) => {
    return await fetch(`${API_BASE_URL}/api/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCredentials),
    }).then(handleResponse); // handleResponse expects JSON now
};

export const loginCitizen = async (citizenCredentials) => {
    return await fetch(`${API_BASE_URL}/api/citizens/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenCredentials),
    }).then(handleResponse); // handleResponse expects JSON now
};
export const loginPolitician = async (politicianCredentials) => {
    return await fetch(`${API_BASE_URL}/api/politicians/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianCredentials),
    }).then(handleResponse); // handleResponse expects JSON now
};

// ... rest of the file

// export const loginAdmin = async (adminCredentials) => {
//     return await fetch(`${API_BASE_URL}/api/admins/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(adminCredentials),
//     }).then(handleResponse);
// };

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

// export const loginCitizen = async (citizenCredentials) => {
//     return await fetch(`${API_BASE_URL}/api/citizens/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(citizenCredentials),
//     }).then(handleResponse);
// };

export const getAllCitizens = async () => {
    // This assumes your Spring Boot AdminController has a GET /api/admins/citizens endpoint
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
    // This assumes your Spring Boot AdminController has a PUT /api/admins/citizens/{id} endpoint
    return await fetch(`${API_BASE_URL}/api/admins/citizens/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenData),
    }).then(handleResponse);
};

export const deleteCitizen = async (id) => {
    // This assumes your Spring Boot AdminController has a DELETE /api/admins/citizens/{id} endpoint
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

// export const loginPolitician = async (politicianCredentials) => {
//     return await fetch(`${API_BASE_URL}/api/politicians/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(politicianCredentials),
//     }).then(handleResponse);
// };

export const getAllPoliticians = async () => {
    // This assumes your Spring Boot AdminController has a GET /api/admins/politicians endpoint
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
    // This assumes your Spring Boot AdminController has a PUT /api/admins/politicians/{id} endpoint
    return await fetch(`${API_BASE_URL}/api/admins/politicians/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianData),
    }).then(handleResponse);
};

export const deletePolitician = async (id) => {
    // This assumes your Spring Boot AdminController has a DELETE /api/admins/politicians/{id} endpoint
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
// src/api/apiService.js

// ... existing code (handleResponse, all other exports) ...

// --- Admin Endpoints (reusing existing updateAdmin) ---
export const updateAdminProfile = async (id, adminData) => {
    return await fetch(`${API_BASE_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
    }).then(handleResponse);
};

// --- Citizen Endpoints (reusing existing updateCitizen) ---
export const updateCitizenProfile = async (id, citizenData) => {
    // Note: Your backend's updateCitizen endpoint is currently under /api/admins/citizens/{id}
    // If a citizen should update their own profile, you need a PUT /api/citizens/{id} in CitizenController
    // For now, assuming you'll adjust backend if needed, or Admin handles all updates.
    return await fetch(`${API_BASE_URL}/api/citizens/${id}`, { // Changed to /api/citizens as user updates their own
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenData),
    }).then(handleResponse);
};

// --- Politician Endpoints (reusing existing updatePolitician) ---
export const updatePoliticianProfile = async (id, politicianData) => {
    // Note: Your backend's updatePolitician endpoint is currently under /api/admins/politicians/{id}
    // If a politician should update their own profile, you need a PUT /api/politicians/{id} in PoliticianController
    // For now, assuming you'll adjust backend if needed.
    return await fetch(`${API_BASE_URL}/api/politicians/${id}`, { // Changed to /api/politicians as user updates their own
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(politicianData),
    }).then(handleResponse);
};