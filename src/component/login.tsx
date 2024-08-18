import DiamondIcon from '@mui/icons-material/Diamond';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
interface ChildComponentProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }
export const LogIn: React.FC<ChildComponentProps> = ({setPage}) =>{
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("")
    const pass = localStorage.getItem('password');

    useEffect(()=>{
        if(pass !== password){
            setError(true)
        }else{
            setError(false)
        }
    },[password])

    return (
        <div className="w-96 h-[450px] p-4 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
        <div className="rounded-lg shadow-xl w-80">
          <div className='flex justify-center'>
           <DiamondIcon sx={{ color: 'white', marginTop: '10px', marginRight: '10px', fontSize: 70 }}/>
          </div>
          <h2 className="text-white text-center text-2xl font-bold mt-4 mb-2">
            Enter your password
          </h2>


          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)}}
            className={`bg-[#181818] text-[#C4C4C4] w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 ${
              error ? "focus:ring-[#e62727]" : "focus:ring-[#A385E0]"
            } `}
          />
          
          <div className='flex justify-center'>
          <Button onClick={()=>setPage(2)} variant="text" sx={{color: 'gray'}}>Forgot Password</Button>
          </div>
     
          <button
            className={` ${error ? 'text-[#A7A7A7] bg-[#2E2D2D]' : 'text-white bg-[#A385E0]'} mt-10  font-semibold py-3 w-full rounded-md shadow-lg`}
            disabled={error}
            onClick={()=>{
              setPage(7)
            }}
          >
            Unlock
          </button>
        </div>
      </div>
    )
}