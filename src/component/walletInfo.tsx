import { useEffect, useState } from "react";
import bs58 from "bs58";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SolanaBalance } from "./accountInfo";
import { EthereumBalance } from "./ethBalance";

interface ChildComponentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  network: string;
}
export const WalletInfo: React.FC<ChildComponentProps> = ({
  setPage,
  network,
}) => {
  const [walletAdd, setWalletAdd] = useState({
    index: 0,
    keyPair: {
      publicKey: [] || "",
      secretKey: [] || "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isPrivateKeyDialogOpen, setIsPrivateKeyDialogOpen] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [Copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleRemoveWallet = () => {
    // setWalletIndexToRemove(index);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    const solWallet = network === 'sol' ? localStorage.getItem("solWallet") : localStorage.getItem('ethWallet');
    const wallet = solWallet ? JSON.parse(solWallet) : [];
    const ind = walletAdd.index;
    console.log("aarif---", wallet);
    if (ind !== null) {
      const updatedWallets = [...wallet];
      updatedWallets.splice(ind, 1);
      console.log("updatedWallets", updatedWallets);
      network === 'sol' ? localStorage.setItem("solWallet", JSON.stringify(updatedWallets)) : localStorage.setItem("ethWallet", JSON.stringify(updatedWallets));
      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    // setWalletIndexToRemove(null);
  };

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
    setPage(7);
  };

  const handleShowPrivateKey = () => {
    setIsPrivateKeyDialogOpen(true);
  };

  const handleClosePrivateKeyDialog = () => {
    setIsPrivateKeyDialogOpen(false);
  };

  useEffect(() => {
    const storeWallet = localStorage.getItem("walletInfo");
    const walletInfo = storeWallet ? JSON.parse(storeWallet) : {};
    console.log(walletInfo,'address--------',storeWallet)

    setWalletAdd(walletInfo);
  }, []);
  console.log(walletAdd, '------------address')


  useEffect(() => {
    const password = localStorage.getItem("password");
    if (pass === password) {
      setError(false);
    } else {
      setError(true);
    }
  }, [pass]);
  console.log("pass", error);

  const getFormattedAddress = (item: any) => {
    if (network === "sol") {
      const publicKeyArray: number[] = Object.values(
        item?.keyPair?.publicKey
      );
      const privateKeyArray: number[] = Object.values(
        item?.keyPair?.secretKey
      );
      const publicKeyUint8Array = new Uint8Array(publicKeyArray);

      const base58PublicKey = bs58.encode(publicKeyUint8Array);
      const shortenedAddress = `${base58PublicKey.slice(
        0,
        6
      )}...${base58PublicKey.slice(-4)}`;
      const privateKeyUint8Array = new Uint8Array(privateKeyArray);
      const base58PrivateKey = bs58.encode(privateKeyUint8Array);
      return {
        fullAddress: base58PublicKey,
        shortenedAddress,
        base58PrivateKey,
        privateKeyUint8Array,
      };
    } else {
      const address = item?.keyPair?.publicKey;
      const base58PrivateKey = item?.keyPair?.secretKey;
      const privateKeyUint8Array = "";
      console.log(address,'address',item)
      const shortenedAddress = `${address?.slice(
        0,
        6
      )}...${address?.slice(-4)}`;;
      return {
        fullAddress: address,
        shortenedAddress,
        base58PrivateKey,
        privateKeyUint8Array,
      };
    }
  };
  
  const {base58PrivateKey,privateKeyUint8Array,shortenedAddress} = getFormattedAddress(walletAdd);
  return (
    <div className="w-96 h-[450px] p-4 bg-[#222222] border-2 flex justify-center rounded-[12px]">
      <div className="space-y-2">
        <div>
          <button onClick={() => setPage(7)} className="text-[#C4C4C4]">
            <ArrowBackIcon />
          </button>
          <h2 className="font-bold flex justify-center text-[22px] text-white">
            Wallet {walletAdd.index + 1}
          </h2>
        </div>

        <div className="flex justify-center">
          {/* <h1 >$ 0.00</h1> */}
          {network === "sol" ? (
            <SolanaBalance secretKeyArray={privateKeyUint8Array} />
          ) : (
            <EthereumBalance privateKey={base58PrivateKey} />
          )}
        </div>

        <button
          onClick={() => {}}
          className="flex justify-between items-center w-[340px] p-4 bg-gray-800 text-white rounded-lg"
        >
          Wallet Address
          <span className="text-gray-400 ">{shortenedAddress}</span>
        </button>
        <div className="flex gap-1">
          <button
            onClick={handleShowPrivateKey}
            className="flex justify-between gap-2 items-center w-30 p-4 bg-gray-800 text-white rounded-lg"
          >
            Show Private Key
            <span className="text-gray-400">➔</span>
          </button>
          <button
            onClick={handleRemoveWallet}
            className="flex justify-between gap-2 items-center w-30 p-4 bg-gray-800 text-red-500 rounded-lg"
          >
            Remove Wallet
            <span className="text-gray-400">➔</span>
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#333333] p-6 rounded-lg shadow-lg text-center border border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Are you sure you want to delete this wallet?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#333333] p-6 rounded-lg shadow-lg text-center border border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Wallet removed successfully!
            </h3>
            <button
              onClick={handleCloseSuccessDialog}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {isPrivateKeyDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#181717] w-96 p-6 rounded-lg shadow-lg text-center border border-gray-600">
            {!showPrivateKey ? (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Enter your Password
                </h3>
                <input
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  className={`bg-[#312f2f] text-[#C4C4C4] w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 ${
                    error ? "focus:ring-[#e62727]" : "focus:ring-[#A385E0]"
                  } `}
                  placeholder="Password"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      const password = localStorage.getItem("password");
                      if (pass === password) {
                        setShowPrivateKey(true);
                      } else {
                        setError(true);
                      }
                    }}
                    className="px-4 py-2 bg-[#A385E0] hover:bg-[#8c5fe6] text-white rounded-md"
                  >
                    Show
                  </button>
                  <button
                    onClick={handleClosePrivateKeyDialog}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xs">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Please don't share your private key with anyone.
                </h3>
                <div className="flex flex-col w-full">
                  <span className="text-[#8c5fe6] bg-[#1F2937] p-2 break-words">
                    {base58PrivateKey}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(base58PrivateKey)
                      .then(() => {
                        setCopied(true);
                        setTimeout(() => {
                          setIsPrivateKeyDialogOpen(false);
                          setShowPrivateKey(false);
                          setCopied(false);
                        }, 1000);
                      })
                      .catch((err) => {
                        console.error("Failed to copy:", err);
                      });
                  }}
                  className="px-4 py-2 mt-4 w-24 bg-[#A385E0] hover:bg-[#8c5fe6] text-white rounded-md"
                >
                  {Copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
