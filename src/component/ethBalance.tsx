import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SendIcon from "@mui/icons-material/Send";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface EthereumBalanceProps {
  privateKey: string;
}

export const EthereumBalance: React.FC<EthereumBalanceProps> = ({
  privateKey,
}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
console.log(accountAddress)
  useEffect(() => {
    setLoading(true);
    const fetchEthereumData = async () => {
      try {
        // Connect to the Ethereum network
        const provider = ethers.getDefaultProvider("mainnet");
  
        // Create a wallet instance from the private key
        const wallet = new ethers.Wallet(privateKey, provider);
  
        // Get the balance of the wallet address
        const balanceInWei = await provider.getBalance(wallet.address);
        setBalance(parseFloat(ethers.formatEther(balanceInWei)));
  
        // Set the wallet address
        setAccountAddress(wallet.address);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Ethereum data:", error);
        setFetchError("" + error);
        setLoading(false);
      }
    };
  
    fetchEthereumData();
  }, [privateKey]);

  const handleTransfer = async () => {
    try {
      // Connect to the Ethereum network
      const provider = ethers.getDefaultProvider("mainnet");

      // Create a wallet instance from the private key
      const wallet = new ethers.Wallet(privateKey, provider);

      // Convert the amount to Wei
      const amountInWei = ethers.parseEther(amount);

      // Create the transaction
      const transaction = {
        to: recipientPublicKey,
        value: amountInWei,
      };

      // Send the transaction
      const transactionResponse = await wallet.sendTransaction(transaction);
      setTransactionHash(transactionResponse.hash);
      setError(null);
      setDialogOpen(false);
    } catch (err) {
      console.error("Transaction failed:", err);
      setError("Transaction failed: " + err);
    }
  };

  return (
    <div className="p-5 -mt-7 rounded-lg text-center text-white">
      <h1 className="text-[40px] font-bold mb-3">
        {loading !== true && balance !== null ? (
          `$${(balance * 0).toFixed(2)}`
        ) : loading ? (
          <CircularProgress size={48} style={{ color: "#1976d2" }} />
        ) : (
          <div>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: "40px" }} />
            <p className="text-[10px] h-10" style={{ color: "red" }}>
              {fetchError}
            </p>
          </div>
        )}
      </h1>
      <p className="text-[20px]">
        {balance !== null ? (
          `${balance.toFixed(4)} ETH`
        ) : loading ? (
          <CircularProgress size={28} style={{ color: "#1976d2" }} />
        ) : (
          ""
        )}
      </p>
      <div className="my-5 flex justify-center space-x-4">
        <button className="bg-[#A385E0] hover:bg-[#9067e4] text-white py-2 px-4 rounded-full focus:outline-none">
          <CallReceivedIcon />
        </button>
        <button
          className="bg-[#A385E0] hover:bg-[#9067e4] text-white py-2 px-4 rounded-full focus:outline-none"
          onClick={() => setDialogOpen(true)}
        >
          <SendIcon />
        </button>
        <button className="bg-[#A385E0] hover:bg-[#9067e4] text-white py-2 px-4 rounded-full focus:outline-none">
          <SwapHorizIcon />
        </button>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "#333", // Dark background
            color: "#fff", // White text color
          },
        }}
      >
        <DialogTitle style={{ backgroundColor: "#444", color: "#fff" }}>
          Transfer ETH
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#333", color: "#fff" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Recipient Public Key"
            type="text"
            fullWidth
            variant="standard"
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
            InputProps={{
              style: { color: "#fff" }, // White text color in input
            }}
            InputLabelProps={{
              style: { color: "#bbb" }, // Light gray label color
            }}
          />
          <TextField
            margin="dense"
            label="Amount in ETH"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              style: { color: "#fff" }, // White text color in input
            }}
            InputLabelProps={{
              style: { color: "#bbb" }, // Light gray label color
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#444" }}>
          <Button onClick={() => setDialogOpen(false)} style={{ color: "#fff" }}>
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            variant="contained"
            style={{ backgroundColor: "#A385E0", color: "#fff" }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {transactionHash && (
        <p className="mt-4 text-green-500">
          Transaction successful! Hash: {transactionHash}
        </p>
      )}
    </div>
  );
};
