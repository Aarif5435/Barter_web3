import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { useMnemonic } from "./contextMnemonic";

interface ChildComponentProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }

export const CreatePassword: React.FC<ChildComponentProps> = ({setPage}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [terms, setTerms] = useState(false);
  const { setMnemonic } = useMnemonic();

  const genMnemonic = async () => {
    const mn = await generateMnemonic();
    const mnArray = mn.trim().split(" ");
    setMnemonic(mnArray);
  };

  useEffect(() => {
    setError({
      error: password.length >= 8 ? false : true,
      message: "Password length at least 8 char",
    });
  }, [password]);

  useEffect(() => {
    setError({
      error: confirmPassword.length >= 8 && password === confirmPassword ? false : true,
      message: "Password length at least 8 char",
    });
  }, [confirmPassword]);
  return (
    <>
      <div className="w-96 h-[450px] p-4 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
        <div className="rounded-lg shadow-xl w-80">
        <div className="w-full relative -top-12">
            <button onClick={()=>setPage(1)} className="text-[#C4C4C4] mb-4">
                <ArrowBackIcon />
            </button>

            <div className="flex justify-center -mt-8 mb-4">
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
            </div>
          <hr />
          </div>
          <h2 className="text-white text-center text-2xl font-bold mb-2">
            Create a password
          </h2>

          <p className="text-[#C4C4C4] text-center mb-6">
            You will use this to unlock your wallet.
          </p>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-[#181818] text-[#C4C4C4] w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 ${
              error.error ? "focus:ring-[#e62727]" : "focus:ring-[#A385E0]"
            } `}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`bg-[#181818] text-[#C4C4C4] w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 ${
              error.error ? "focus:ring-[#e62727]" : "focus:ring-[#A385E0]"
            } `}
          />
            {confirmPassword.length > 1 && password !== confirmPassword && <span className="text-red-600 text-[14px] mb-3">Password don't match</span>}


          <div className="flex items-center mb-4">
            <input
              id="terms"
              type="checkbox"
              onChange={()=>setTerms((pre)=>!pre)}
              className="form-checkbox h-5 w-5 text-[#A385E0] rounded-sm focus:ring-2 focus:ring-[#A385E0] cursor-pointer"
            />
            <label className="ml-2 text-[#C4C4C4]">
              I agree to the
              <a href="#" className="text-[#A385E0] underline">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            className={` ${error.error || !terms ? 'text-[#A7A7A7] bg-[#2E2D2D]' : 'text-white bg-[#A385E0]'}  font-semibold py-3 w-full rounded-md shadow-lg`}
            disabled={error.error || !terms}
            onClick={()=>{
                genMnemonic()
                localStorage.setItem('password', password);
                setPage(3);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
