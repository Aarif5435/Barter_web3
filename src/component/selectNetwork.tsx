import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import solana from "../assets/solana.png";
import eth from "../assets/eth.png";
import { useMnemonic } from "./contextMnemonic";
import { generateWallet } from "../utils/genrateWallet";
interface ChildComponentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectNetwork: React.FC<ChildComponentProps> = ({ setPage, setNetwork }) => {
  const { mnemonic } = useMnemonic();

  return (
    <div className="w-96 h-[450px] p-4 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
      <div className="rounded-lg shadow-xl w-80">
        <div className="w-full relative -top-20">
          <button onClick={() => setPage(2)} className="text-[#C4C4C4] mb-4">
            <ArrowBackIcon />
          </button>

          <div className="flex justify-center -mt-8 mb-4">
            <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
            <span className="h-2 w-2 bg-[#A385E0] rounded-full mx-1"></span>
            <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
            <span className="h-2 w-2 bg-[#5D5D5D] rounded-full mx-1"></span>
          </div>
          <hr />
        </div>
        <h2 className="text-white text-center text-2xl font-bold mt-5 mb-2">
          Select Network
        </h2>

        <p className="text-[#C4C4C4] text-center mb-6">
          Barter supports two blockchains right now.
        </p>

        <div className="h-32 mt-5">
          <button
            onClick={() => {
              generateWallet(mnemonic, 501);
              setPage(4);
              setNetwork('sol')
            }}
            className="flex bg-[#3f4046] hover:bg-[#26262b] rounded-lg text-white gap-3 w-full h-14 pt-2 pl-5"
          >
            <img className="w-10 h-10" src={solana} alt="" />
            <span className="mt-1 font-bold text-[20px]">Solana</span>
          </button>
          <button
            onClick={() => {
              generateWallet(mnemonic, 60);
              setPage(4);
              setNetwork('eth')
            }}
            className="flex mt-5 bg-[#3f4046] hover:bg-[#26262b] rounded-lg text-white gap-3 w-full h-14 pt-2 pl-5"
          >
            <img className="w-10 h-10 rounded-full" src={eth} alt="" />
            <span className="mt-1 font-bold text-[20px]">Ethereum</span>
          </button>
        </div>
      </div>
    </div>
  );
};
