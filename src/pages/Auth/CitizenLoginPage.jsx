// // // src/pages/Auth/CitizenLoginPage.jsx
// // import React, { useState, useContext } from 'react';
// // import { loginCitizen } from '../../api/apiService';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { AuthContext } from '../../App';

// // function CitizenLoginPage() {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [message, setMessage] = useState('');
// //     const { setUser, setIsAuthenticated } = useContext(AuthContext);
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setMessage('');
// //         try {
// //             const response = await loginCitizen({ ctiUsername: username, ctiPassword: password });
// //             setMessage(response); // "Welcome, Citizen Name!"
// //             setUser({ type: 'citizen', username: username });
// //             setIsAuthenticated(true);
// //             localStorage.setItem('userType', 'citizen');
// //             localStorage.setItem('username', username);

// //             navigate('/citizen/dashboard');
// //         } catch (error) {
// //             setMessage(`Login failed: ${error.message}`);
// //         }
// //     };

// //     return (
// //         <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
// //             <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Citizen Login</h2>
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div>
// //                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="username">Username:</label>
// //                     <input
// //                         type="text"
// //                         id="username"
// //                         className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div>
// //                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">Password:</label>
// //                     <input
// //                         type="password"
// //                         id="password"
// //                         className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <button
// //                     type="submit"
// //                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out shadow-md hover:shadow-lg"
// //                 >
// //                     Login
// //                 </button>
// //             </form>
// //             {message && <p className={`mt-6 text-center text-lg ${message.includes('failed') ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}`}>{message}</p>}
// //             <p className="mt-8 text-center text-gray-600 text-md">Don't have an account? <Link to="/citizen/register" className="text-blue-600 hover:underline font-medium">Register here</Link></p>
// //         </div>
// //     );
// // }

// // export default CitizenLoginPage;
// // src/pages/Auth/CitizenLoginPage.jsx
// import React, { useState, useContext } from 'react';
// import { loginCitizen } from '../../api/apiService';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../../App';
// import { Box, Typography, TextField, Button, Paper } from '@mui/material';

// function CitizenLoginPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const { setUser, setIsAuthenticated } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         try {
//             const response = await loginCitizen({ ctiUsername: username, ctiPassword: password });
//             setMessage(response); // "Welcome, Citizen Name!"
//             setUser({ type: 'citizen', username: username });
//             setIsAuthenticated(true);
//             localStorage.setItem('userType', 'citizen');
//             localStorage.setItem('username', username);

//             navigate('/citizen/dashboard');
//         } catch (error) {
//             setMessage(`Login failed: ${error.message}`);
//         }
//     };

//     return (
//         <Paper elevation={6} sx={{ maxWidth: 450, mx: 'auto', p: 4, borderRadius: 2 }}>
//             <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                 Citizen Login
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <TextField
//                     label="Password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
//                 >
//                     Login
//                 </Button>
//             </Box>
//             {message && (
//                 <Typography
//                     variant="body1"
//                     align="center"
//                     sx={{ mt: 2, color: message.includes('failed') ? 'error.main' : 'success.main', fontWeight: 'medium' }}
//                 >
//                     {message}
//                 </Typography>
//             )}
//             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//                 Don't have an account? <Link to="/citizen/register" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 'medium' }}>Register here</Link>
//             </Typography>
//         </Paper>
//     );
// }

// export default CitizenLoginPage;
// src/pages/Auth/CitizenLoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginCitizen } from '../../api/apiService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

function CitizenLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { handleLoginSuccess } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        // --- NEW: Log credentials to console ---
        console.log("Attempting login with username:", username);
        console.log("Attempting login with password:", password); // Be cautious logging passwords in production
        // --- END NEW ---

        try {
            const citizenDto = await loginCitizen({ ctiUsername: username, ctiPassword: password });

            if (citizenDto && citizenDto.ctiUsername) {
                const loggedInUser = {
                    type: 'citizen',
                    username: citizenDto.ctiUsername,
                    firstName: citizenDto.cti_firstName,
                    lastName: citizenDto.cti_lastName,
                    id: citizenDto.cti_id,
                    email: citizenDto.cti_email,
                    phoneNumber: citizenDto.cti_phoneNumber,
                    dob: citizenDto.cti_dob,
                    constituency: citizenDto.ctiConstituency
                };

                handleLoginSuccess(loggedInUser);
                setMessage(`Login successful for ${loggedInUser.firstName} ${loggedInUser.lastName}!`);
                navigate('/citizen/dashboard');
            } else {
                setMessage('Login failed: Invalid credentials received from server or authentication failed.');
            }
        } catch (error) {
            console.error("Login API call failed:", error); // Log the full error for debugging
            setMessage(`Login failed: ${error.message || 'Network error or server unavailable.'}`);
        }
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 450, mx: 'auto', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Citizen Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                >
                    Login
                </Button>
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mt: 2, color: message.includes('failed') || message.includes('Error') ? 'error.main' : 'success.main', fontWeight: 'medium' }}
                >
                    {message}
                </Typography>
            )}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account? <Link to="/citizen/register" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 'medium' }}>Register here</Link>
            </Typography>
        </Paper>
    );
}

export default CitizenLoginPage;