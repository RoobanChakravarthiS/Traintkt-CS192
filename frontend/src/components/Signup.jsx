import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!username || !name || !password || !email) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/signup', {
                username,
                name,
                password,
                email,
            });

            setSuccessMessage('Signup successful! You can now log in.');
            setTimeout(() => {
                setError('');
                setPassword('');
                setUsername('');
                setSuccessMessage('');
                setName('');
            }, 1000);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            console.error(error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Signup failed. Please try again later.');
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email'
                        className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="text"
                        className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="fullname"
                        placeholder="Full Name" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input 
                        type="text"
                        className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="username"
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <input 
                        type="password"
                        className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password"
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>
                <div className="text-center text-sm text-gray-600 mt-4">
                    By signing up, you agree to the 
                    <a className="no-underline border-b border-gray-600 text-gray-600 hover:text-gray-800" href="#">
                        Terms of Service
                    </a> and 
                    <a className="no-underline border-b border-gray-600 text-gray-600 hover:text-gray-800" href="#">
                        Privacy Policy
                    </a>.
                </div>
            <div className="mt-6 text-blue-600 text-center">
                Already have an account? 
                <a className="hover:underline border-b border-blue text-blue" href="../login/">
                    Log in
                </a>.
            </div>
            </div>
        </div>
    );
};

export default Signup;