import { useState } from "react";
import axios from 'axios'

function Register(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">   
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Register an Account</h1>
                    <form onSubmit={
                        async e => {
                        e.preventDefault();
                        try {
                            const newUser = { email, password };
                            const res = await axios.post('http://localhost:5000/api/auth/register', newUser)
                            console.log('Success!', res.data)
                            alert('Registration Successful');
                            // Clear the form
                            setFormData({ email: "", password: "" })
                        } catch (error) {
                            console.error(err.response.data)
                            alert('Error: ' + err.response.data.msg)
                            }
                        }
                    }>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={
                                (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                            <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={
                                (e) => setFormData({ ...formData, [e.target.name]: e.target.value})
                            }
                            required
                            minLength="6"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">
                        Register
                    </button>
                    </form>
                </div>
            </div>
    )
}

export default Register;
