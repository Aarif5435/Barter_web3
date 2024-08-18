import React, { useEffect, useState } from "react";
import solana from "../assets/solana.png";
import eth from "../assets/eth.png";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import bs58 from "bs58";
import { generateWallet } from "../utils/genrateWallet";
import { useMnemonic } from "./contextMnemonic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
interface ChildComponentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  network: string;
}
interface State extends SnackbarOrigin {
  open: boolean;
}

export const MainPage: React.FC<ChildComponentProps> = ({
  setPage,
  network
}) => {
  const { mnemonic } = useMnemonic();
  const [solWallet, setSolWallet] = useState<any[]>([]);
  const [ethWallet, setEthWallet] = useState<any[]>([]);
  const localWallet = localStorage.getItem("solWallet");
  const localEthWallet = localStorage.getItem("ethWallet");
  const [logout, setLogout] = useState(false);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleCopyClick = (base58PublicKey: string) => {
    navigator.clipboard
      .writeText(base58PublicKey)
      .then(() => {
        setState({ vertical: "top", horizontal: "center", open: true });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (localWallet) {
      setSolWallet(JSON.parse(localWallet));
    }
    if (localEthWallet) {
      setEthWallet(JSON.parse(localEthWallet));
    }
  }, [localWallet, localEthWallet]);


  const handleAddWallet = async () => {
    if (network === "sol") {
      const updatedWallets = await generateWallet(mnemonic, 501);
      setSolWallet(updatedWallets ? updatedWallets : []); // Update the state to trigger a re-render
    } else {
      const updatedWallets = await generateWallet(mnemonic, 60);
      setSolWallet(updatedWallets ? updatedWallets : []); // Update the state to trigger a re-render
    }
  };

  const getFormattedAddress = (item: any) => {
    if (network === "sol") {
      console.log("aaaaaaaaaaaaaaaa", item);
      const publicKeyArray: number[] = Object.values(item?._keypair?.publicKey);
      const publicKeyUint8Array = new Uint8Array(publicKeyArray);
      const base58PublicKey = bs58.encode(publicKeyUint8Array);
      const shortenedAddress = `${base58PublicKey.slice(
        0,
        6
      )}...${base58PublicKey.slice(-4)}`;
      return { fullAddress: base58PublicKey, shortenedAddress };
    } else {
      const address = item.pubkey;
      const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return { fullAddress: address, shortenedAddress };
    }
  };

  return (
    <>
      <div className="w-96 h-[450px] p-2 bg-[#222222] border-2 r rounded-[12px] relative">
        <div className="flex w-36 relative left-28 h-10 rounded-xl p-2 border-[1px] border-white justify-between items-center cursor-pointer">
          <div className="flex items-center">
            <img
              className={`w-8 h-8 mr-2 ${
                network === "eth" ? "rounded-full" : ""
              }`}
              src={network === "eth" ? eth : solana}
              alt=""
            />
            <span className="text-lg font-semibold text-white">
              {network === "eth" ? "Ethereum" : "Solana"}
            </span>
          </div>
          <div>
            <Tooltip describeChild placement="top-end" title="Log out">
              <Button
                onClick={() => {
                  setLogout(true);
                  localStorage.removeItem("ethInd");
                  localStorage.removeItem("solInd");
                  localStorage.removeItem("solWallet");
                  localStorage.removeItem("password");
                  localStorage.removeItem("ethWallet");
                  setTimeout(() => {
                    setPage(1);
                    setLogout(false);
                  }, 1500);
                }}
              >
                {logout ? (
                  <CircularProgress size={28} style={{ color: "white",
                    marginLeft: "120px", }} />
                ) : (
                  <LogoutIcon
                    sx={{
                      color: "white",
                      marginLeft: "120px",
                      rotate: "180deg",
                    }}
                  />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="absolute w-full p-2 max-h-full top-[87px] rounded-b-xl right-0 bg-[#1f1f1f] shadow-md overflow-hidden">
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#888] scrollbar-track-[#444] scrollbar-thumb-rounded-full max-h-[300px]">
            {(network === "sol" ? solWallet : ethWallet).map(
              (item: any, ind: number) => {
                const { fullAddress, shortenedAddress } =
                  getFormattedAddress(item);

                return (
                  <div
                    onClick={() => {
                      if (network === "sol") {
                        localStorage.setItem(
                          "walletInfo",
                          JSON.stringify({ keyPair: item._keypair, index: ind })
                        );
                      } else {
                        localStorage.setItem(
                          "walletInfo",
                          JSON.stringify({
                            keyPair: {
                              publicKey: item.pubkey,
                              secretKey: item.secretkey,
                            },
                            index: ind,
                          })
                        );
                      }
                    }}
                    key={ind}
                    className="flex items-center justify-between p-3 mb-2 bg-[#2a2a2a] rounded-lg transition-all duration-200 cursor-pointer hover:border-[#9261f3] border-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className=" rounded-full h-8 w-8 flex items-center justify-center">
                        {/* Assuming you have a wallet icon */}
                        <img
                          className={`w-8 h-8 mr-2 ${
                            network === "eth" ? "rounded-full" : ""
                          }`}
                          src={network === "eth" ? eth : solana}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3
                          onClick={() => setPage(8)}
                          className="text-sm text-white font-semibold"
                        >
                          Wallet {ind + 1}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {shortenedAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ContentCopyIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyClick(fullAddress);
                        }}
                        sx={{
                          color: "white",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="p-2 bg-[#1a1a1a] border-t border-gray-700">
            <Button
              onClick={handleAddWallet}
              variant="text"
              startIcon={<AddIcon />}
              className="w-full  text-sm text-[#8863d1] hover:text-[#6948aa] transition-all duration-200"
            >
              Add new wallet
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied the Public Key"
        key={vertical + horizontal}
      />
    </>
  );
};
