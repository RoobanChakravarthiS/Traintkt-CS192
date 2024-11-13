import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLoginStatus } from '../redux/features/login/IsLoged';
import { updateId, updateEmail, updateName, updateUserName } from '../redux/features/user/user';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            });

            setSuccessMessage('Login successful! Redirecting...');
            setUsername('');
            setPassword('');

            dispatch(updateId(response.data._id));
            dispatch(updateName(response.data.name));
            dispatch(updateUserName(response.data.username));
            dispatch(updateEmail(response.data.email));
            dispatch(changeLoginStatus(true));

            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            console.error(error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 w-full transition duration-200">
                        Login
                    </button>
                </form>
                <div className="mt-6 text-blue-600 text-center">
                    <Link to="/signup" className="hover:underline">Don't have an account? Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;