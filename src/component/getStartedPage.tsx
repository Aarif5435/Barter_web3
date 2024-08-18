import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DiamondIcon from '@mui/icons-material/Diamond';
import HowToRegIcon from '@mui/icons-material/HowToReg';

interface ChildComponentProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }

export const StartedPage: React.FC<ChildComponentProps> = ({setPage})=>{

    return(
        <div className="w-96 h-[450px] p-2 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
        <div className="rounded-lg shadow-xl w-80">
        <div className="w-full relative -top-10">
            <button onClick={()=>setPage(4)} className="text-[#C4C4C4] mb-4">
                <ArrowBackIcon />
            </button>

            <div className="flex justify-center -mt-8 mb-4">
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
              <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
            </div>
          <hr />
          </div>
          <div className="flex justify-center">
           <DiamondIcon sx={{ color: 'white', marginTop: '10px', marginRight: '10px', fontSize: 30 }}/>
            <span className=" text-[30px] font-extrabold text-white">
              Barter
            </span>
          </div>
          <p className="text-[#897B77] text-[17px] h-[150px] mt-4 decoration-wavy text-center">
            You can now fully enjoy your wallet
          </p>
          <div className="flex justify-center items-center mb-10 -mt-14">
            <HowToRegIcon sx={{ color: 'white', marginTop: '10px', marginRight: '10px', fontSize: 80 }}/>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button onClick={()=>{setPage(6)}} className="bg-[#A385E0] text-white font-semibold py-2 rounded-md shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    )
}