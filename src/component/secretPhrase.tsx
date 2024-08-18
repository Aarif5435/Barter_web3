import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMnemonic } from "./contextMnemonic";


interface ChildComponentProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }

export const RecoveryPhraseScreen: React.FC<ChildComponentProps>  = ({setPage}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { mnemonic } = useMnemonic();

  return (
    <>
      <div className="w-96 h-[450px] p-6 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
        <div className="rounded-lg shadow-xl w-80">
        <div className="w-full relative -top-2">
            <button onClick={()=>setPage(3)} className="text-[#C4C4C4] mb-4">
                <ArrowBackIcon />
            </button>

            <div className="flex justify-center -mt-8 mb-4">
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
            </div>
          <hr />
          </div>
          <h2 className="text-white text-center text-2xl font-bold mt-4 mb-2">
            Secret Recovery Phrase
          </h2>

          <p className="text-[#E2D45C] text-center mb-6">
            This phrase is the ONLY way to recover your wallet. Do NOT share it
            with anyone!
          </p>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!isHovered ? (
              <div className="flex justify-center items-center h-[140px]">
                <VisibilityOffIcon
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginRight: "10px",
                    fontSize: 30,
                  }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 w-[300px] h-[150px] max-w-sm mx-auto opacity-0 hover:opacity-100 transition-opacity duration-300">
                {mnemonic.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 text-[12px] text-white p-2 rounded-lg text-center"
                  >
                    <span className="">
                      {index + 1}. {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center mt-10 mb-2">
            <input
              id="terms"
              type="checkbox"
              onChange={() => {
                setIsSaved((pre) => !pre);
              }}
              className="form-checkbox h-5 w-5 text-[#A385E0] rounded-sm focus:ring-2 focus:ring-[#A385E0] cursor-pointer"
            />
            <label className="ml-2 text-[#C4C4C4]">
              I saved my Secret Recovery Phrase
            </label>
          </div>

          <button
            className={` ${
              !isSaved
                ? "text-[#A7A7A7] bg-[#2E2D2D]"
                : "text-white bg-[#A385E0]"
            }  font-semibold py-3 w-full rounded-md shadow-lg`}
            disabled={!isSaved}
            onClick={()=>setPage(5)}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
