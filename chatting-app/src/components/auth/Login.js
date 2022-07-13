import { useState } from 'react'
import { useNavigate } from 'react-router'

import { API } from '../../config/api'

export default function Login(props) {
  const { setIsRegister } = props;
  const navigate = useNavigate()

  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setMessage(null)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const response = await API.post('/login', JSON.stringify(form), config);

      const { error, data } = response.data

      if(error){
        return setMessage(error.message)
      }

      localStorage.setItem('token', data.token)
      navigate('/')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-4/12 p-4 rounded text-white">
      <div className="text-3xl font-bold text-center  mb-14">Login</div>
      {message && (
        <div className="bg-yellow-600	text-center rounded mb-6 py-1">{message}</div>
      )}
      <form onSubmit={onSubmit}>
      <div className="mb-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={form.email}
            className="w-full text-black rounded p-2 focus:outline-none bg-red-3"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            value={form.password}
            className="w-full text-black rounded p-2 focus:outline-none bg-red-3"
          />
        </div>
        <div className="mt-10">
          <button className="bg-red-2 w-full rounded text-lg font-bold py-1 hover:bg-red-300">
            Submit
          </button>
          <div className="text-center mt-2 font-thin">
            Dont have account?
            <span
              className="font-bold cursor-pointer hover:text-rose-200 ml-2"
              onClick={() => setIsRegister(true)}
            >
              Register
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
