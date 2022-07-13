import { useState } from 'react';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="bg-red-1 h-screen flex justify-center items-center">
      {isRegister ? (
        <Register setIsRegister={setIsRegister} />
      ) : (
        <Login setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
