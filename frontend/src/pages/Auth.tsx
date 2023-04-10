import { useState } from "react"

import Register from "../components/Register"
import Login from "../components/Login"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex justify-center p-10">
      <div className="card w-96 bg-base-100 shadow-xl justify-end p-5">
        {!isLogin && !isRegister && (
          <div className="flex flex-col w-full border-opacity-50">
            <div className="grid h-20 place-items-center">
              <button onClick={() => setIsLogin(true)} className="btn btn-info w-full">Log In</button>
            </div>
            <div className="divider">OR</div>
            <div className="grid h-20 place-items-center">
              <button onClick={() => setIsRegister(true)} className="btn btn-outline w-full">Register</button>
            </div>
          </div>
        )}
        {
          isLogin && (
            <>
              <Login />
              <button onClick={() => setIsLogin(false)} className="btn btn-link">Back</button>
            </>
          )
        }
        {
          isRegister && (
            <>
              <Register />
              <button onClick={() => setIsRegister(false)} className="btn btn-link">Back</button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Auth
