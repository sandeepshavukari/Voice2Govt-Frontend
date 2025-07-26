// // src/pages/Auth/AdminRegisterPage.jsx
// import React, { useState } from 'react';
// import { registerAdmin } from '../../api/apiService';
// import { Link, useNavigate } from 'react-router-dom';

// function AdminRegisterPage() {
//     const [formData, setFormData] = useState({
//         admUsername: '',
//         admPassword: '',
//         adm_firstName: '',
//         adm_lastName: '',
//         adm_email: '',
//         adm_phoneNumber: '',
//         adm_dob: '',
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
//             const response = await registerAdmin(formData);
//             setMessage(`Registration successful for ${response.admUsername}!`);
//             navigate('/admin/login');
//         } catch (error) {
//             setMessage(`Registration failed: ${error.message}`);
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
//             <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Admin Registration</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="admUsername">Username:</label>
//                     <input type="text" id="admUsername" name="admUsername" value={formData.admUsername} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="admPassword">Password:</label>
//                     <input type="password" id="admPassword" name="admPassword" value={formData.admPassword} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="adm_firstName">First Name:</label>
//                     <input type="text" id="adm_firstName" name="adm_firstName" value={formData.adm_firstName} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="adm_lastName">Last Name:</label>
//                     <input type="text" id="adm_lastName" name="adm_lastName" value={formData.adm_lastName} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="adm_email">Email:</label>
//                     <input type="email" id="adm_email" name="adm_email" value={formData.adm_email} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="adm_phoneNumber">Phone Number:</label>
//                     <input type="tel" id="adm_phoneNumber" name="adm_phoneNumber" value={formData.adm_phoneNumber} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
//                 </div>
//                 <div className="col-span-1 md:col-span-2"> {/* Make DOB span full width on small screens, or adjust */}
//                     <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="adm_dob">Date of Birth:</label>
//                     <input type="date" id="adm_dob" name="adm_dob" value={formData.adm_dob} onChange={handleChange}
//                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
//                 </div>
//                 <div className="col-span-1 md:col-span-2">
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//                     >
//                         Register
//                     </button>
//                 </div>
//             </form>
//             {message && <p className={`mt-6 text-center text-lg ${message.includes('failed') ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}`}>{message}</p>}
//             <p className="mt-8 text-center text-gray-600 text-md">Already have an account? <Link to="/admin/login" className="text-blue-600 hover:underline font-medium">Login here</Link></p>
//         </div>
//     );
// }

// export default AdminRegisterPage;
// src/pages/Auth/AdminRegisterPage.jsx
import React, { useState } from 'react';
import { registerAdmin } from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

function AdminRegisterPage() {
    const [formData, setFormData] = useState({
        admUsername: '',
        admPassword: '',
        adm_firstName: '',
        adm_lastName: '',
        adm_email: '',
        adm_phoneNumber: '',
        adm_dob: '',
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
            const response = await registerAdmin(formData);
            setMessage(`Registration successful for ${response.admUsername}!`);
            navigate('/admin/login');
        } catch (error) {
            setMessage(`Registration failed: ${error.message}`);
        }
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Admin Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            name="admUsername"
                            value={formData.admUsername}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            name="admPassword"
                            type="password"
                            value={formData.admPassword}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="adm_firstName"
                            value={formData.adm_firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="adm_lastName"
                            value={formData.adm_lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="adm_email"
                            type="email"
                            value={formData.adm_email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="adm_phoneNumber"
                            type="tel"
                            value={formData.adm_phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}> {/* Make DOB span full width */}
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            name="adm_dob"
                            type="date"
                            InputLabelProps={{ shrink: true }} // Ensures label is always above input for date type
                            value={formData.adm_dob}
                            onChange={handleChange}
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
                Already have an account? <Link to="/admin/login" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 'medium' }}>Login here</Link>
            </Typography>
        </Paper>
    );
}

export default AdminRegisterPage;