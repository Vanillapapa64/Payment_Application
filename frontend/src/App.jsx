import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from './page/Signuppage'
import Signin from "./page/Signin"
import { Dashboard } from "./page/Dashboard"
import { RecoilRoot } from "recoil"
import { Send } from "./page/Send"
function App() {

  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<Send />} />
      </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
