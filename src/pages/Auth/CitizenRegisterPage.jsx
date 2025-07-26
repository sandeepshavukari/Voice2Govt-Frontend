// // src/pages/Auth/CitizenRegisterPage.jsx
// import React, { useState } from 'react';
// import { registerCitizen } from '../../api/apiService';
// import { Link, useNavigate } from 'react-router-dom';

// function CitizenRegisterPage() {
//     const [formData, setFormData] = useState({
//         ctiUsername: '',
//         ctiPassword: '',
//         cti_firstName: '',
//         cti_lastName: '',
//         cti_email: '',
//         cti_phoneNumber: '',
//         cti_dob: '',
//         ctiConstituency: '', // Specific to CitizenDto
//     });
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         try {
//             const response = await registerCitizen(formData);
//             setMessage(`Registration successful for ${response.ctiUsername}!`);
//             navigate('/citizen/login'); // Redirect to login page after successful registration
//         } catch (error) {
//             setMessage(`Registration failed: ${error.message}`);
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
//             <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Citizen Registration</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ctiUsername">Username:</label>
//                     <input type="text" id="ctiUsername" name="ctiUsername" value={formData.ctiUsername} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ctiPassword">Password:</label>
//                     <input type="password" id="ctiPassword" name="ctiPassword" value={formData.ctiPassword} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cti_firstName">First Name:</label>
//                     <input type="text" id="cti_firstName" name="cti_firstName" value={formData.cti_firstName} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cti_lastName">Last Name:</label>
//                     <input type="text" id="cti_lastName" name="cti_lastName" value={formData.cti_lastName} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cti_email">Email:</label>
//                     <input type="email" id="cti_email" name="cti_email" value={formData.cti_email} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cti_phoneNumber">Phone Number:</label>
//                     <input type="tel" id="cti_phoneNumber" name="cti_phoneNumber" value={formData.cti_phoneNumber} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cti_dob">Date of Birth:</label>
//                     <input type="date" id="cti_dob" name="cti_dob" value={formData.cti_dob} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ctiConstituency">Constituency:</label>
//                     <input type="text" id="ctiConstituency" name="ctiConstituency" value={formData.ctiConstituency} onChange={handleChange}
//                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
//                 >
//                     Register
//                 </button>
//             </form>
//             {message && <p className={`mt-4 text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
//             <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/citizen/login" className="text-blue-600 hover:underline">Login here</Link></p>
//         </div>
//     );
// }

// export default CitizenRegisterPage;
// src/pages/Auth/CitizenRegisterPage.jsx
import React, { useState } from 'react';
import { registerCitizen } from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

function CitizenRegisterPage() {
    const [formData, setFormData] = useState({
        ctiUsername: '',
        ctiPassword: '',
        cti_firstName: '',
        cti_lastName: '',
        cti_email: '',
        cti_phoneNumber: '',
        cti_dob: '',
        ctiConstituency: '', // Specific to CitizenDto
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await registerCitizen(formData);
            setMessage(`Registration successful for ${response.ctiUsername}!`);
            navigate('/citizen/login');
        } catch (error) {
            setMessage(`Registration failed: ${error.message}`);
        }
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Citizen Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            name="ctiUsername"
                            value={formData.ctiUsername}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            name="ctiPassword"
                            type="password"
                            value={formData.ctiPassword}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="cti_firstName"
                            value={formData.cti_firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="cti_lastName"
                            value={formData.cti_lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="cti_email"
                            type="email"
                            value={formData.cti_email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="cti_phoneNumber"
                            type="tel"
                            value={formData.cti_phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            name="cti_dob"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.cti_dob}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Constituency"
                            variant="outlined"
                            fullWidth
                            name="ctiConstituency"
                            value={formData.ctiConstituency}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                >
                    Register
                </Button>
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mt: 2, color: message.includes('failed') ? 'error.main' : 'success.main', fontWeight: 'medium' }}
                >
                    {message}
                </Typography>
            )}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account? <Link to="/citizen/login" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 'medium' }}>Login here</Link>
            </Typography>
        </Paper>
    );
}

export default CitizenRegisterPage;