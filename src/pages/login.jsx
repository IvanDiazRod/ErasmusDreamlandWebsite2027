import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({email: "", password: "",});
  const [error, setError] = useState("");
  const handleChange = (e) => {setForm({...form, [e.target.name]: e.target.value,});};
  const handleSubmit = async (e) => {e.preventDefault(); setError("");
  try {const response = await axios.post("http://127.0.0.1:8000/api/login", form); login(response.data.user, response.data.access_token); navigate("/");} catch (err) {if (err.response) {console.error("ERROR RESPONSE:", err.response); setError(err.response.data.message || "Invalid credentials");} else {setError("Error connecting to server");}}};

  return (
    <>
      <main>
        <article>
          <section className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-100">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 p-8 border-2 border-blue-600 rounded-3xl shadow-xl bg-white">
                
                <h1 className="text-3xl md:text-4xl font-semibold text-center">Log in!</h1>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">Email address <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Introduce your email" required />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-gray-700 font-medium">Password <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Introduce your password" required />
                </div>

                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer">Log in</button>

                <p className="text-center text-gray-500 text-sm">You don’t have an account?{" "}<Link to="/register" className="text-blue-600 hover:underline font-medium">Create one</Link></p>
              
              </form>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}