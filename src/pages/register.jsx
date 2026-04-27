import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [form, setForm] = useState({
    firstname: "",
    surname: "",
    secondsurname: "",
    email: "",
    dateofbirth: "",
    gender: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {setForm({...form, [e.target.name]: e.target.value,});};
  const handleSubmit = async (e) => {e.preventDefault(); try {const response = await axios.post("http://127.0.0.1:8000/api/register", form); console.log("REGISTER OK:", response.data); setSuccess(true); setErrors({});} catch (error) {if (error.response) {console.log("REGISTER ERROR:", error.response.data); setErrors(error.response.data.errors || {});} else {console.log("NETWORK ERROR:", error);}}};
  
  return (
    <>
      <main>
        <article>
          <section className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-100">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
              <form className="w-full flex flex-col gap-6 p-8 border-2 border-blue-600 rounded-3xl shadow-xl bg-white" onSubmit={handleSubmit}>
                
                <h1 className="text-3xl md:text-4xl font-semibold text-center">Create your account</h1>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstname" className="text-gray-700 font-medium">First name <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="text" name="firstname" value={form.firstname} onChange={handleChange} placeholder="Enter your first name" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="surname" className="text-gray-700 font-medium">Surname <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Enter your surname" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="secondsurname" className="text-gray-700 font-medium">Second surname (optional)</label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="text" name="secondsurname" value={form.secondsurname} onChange={handleChange} placeholder="Enter your second surname" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">Email address <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dateofbirth" className="text-gray-700 font-medium">Date of birth <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="date" name="dateofbirth" value={form.dateofbirth} onChange={handleChange} required />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="gender" className="text-gray-700 font-medium">Gender <span className="text-red-500">*</span></label>
                  <select className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" name="gender" value={form.gender} onChange={handleChange} required >
                    <option value="nogender" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="iprefernotsay">I prefer not to say it</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-gray-700 font-medium">Password <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
                  <p className="text-sm text-gray-500">This password must contain at least 8 characters.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password_confirmation" className="text-gray-700 font-medium">Confirm password <span className="text-red-500">*</span></label>
                  <input className="p-2 border-2 border-blue-500 outline-none rounded-2xl focus:border-blue-700" type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} placeholder="Repeat your password" required />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer">Create my account</button>

                <p className="text-center text-gray-500 text-sm">Already have an account?{" "}<Link to="/login" className="text-blue-600 hover:underline font-medium">Log in</Link></p>
                
              </form>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}