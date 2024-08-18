import DiamondIcon from "@mui/icons-material/Diamond";

interface ChildComponentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const OnBoarding: React.FC<ChildComponentProps> = ({ setPage }) => {
  return (
    <>
      <div className="w-96 h-[450px] p-4 bg-[#222222] border-2 rounded-[12px] flex justify-center items-center">
        <div className="pt-24">
          <div className="flex justify-center">
            <DiamondIcon
              sx={{
                color: "white",
                marginTop: "10px",
                marginRight: "10px",
                fontSize: 30,
              }}
            />
            <span className="text-[30px] font-extrabold text-white">
              Barter
            </span>
          </div>
          <p className="text-[#897B77] text-[17px] mt-4 decoration-wavy text-center mb-28">
            To get started, create a new wallet or import an existing one.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                setPage(2)
              }}
              className="bg-[#A385E0] text-white font-semibold py-2 rounded-md shadow-lg"
            >
              Create a new wallet
            </button>
            <button
              disabled
              className="bg-[#2E2D2D] text-white font-semibold py-2 rounded-md shadow-lg relative opacity-50 cursor-not-allowed"
            >
              Import an existing
              <span className="absolute mt-[2px] right-3 top-1/2 transform -translate-y-1/2 text-xs text-white bg-transparent border border-white rounded-full px-2 py-0.5">
                Coming Soon
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
