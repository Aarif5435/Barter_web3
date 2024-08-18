import React, { useState, useEffect } from "react";
import * as solanaWeb3 from "@solana/web3.js";
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
interface SolanaBalanceProps {
  secretKeyArray: any;
}

export const SolanaBalance: React.FC<SolanaBalanceProps> = ({
  secretKeyArray,
}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [accountInfo, setAccountInfo] =
    useState<solanaWeb3.AccountInfo<Buffer> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
console.log(accountInfo)
  useEffect(() => {
    setLoading(true);
    const fetchSolanaData = async () => {
        try {
          const secretKey = Uint8Array.from(secretKeyArray);
          const keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
          const connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl("devnet"),
            "confirmed"
          );
      
          const balance = await connection.getBalance(keypair.publicKey);
          setBalance(balance / solanaWeb3.LAMPORTS_PER_SOL);
      
          const accountInfo = await connection.getAccountInfo(keypair.publicKey);
          setAccountInfo(accountInfo);
          setLoading(false);
        } catch (error) {
          setFetchError("" + error);
          setLoading(false);
        }
      };

    fetchSolanaData();
  }, [secretKeyArray]);



  const handleTransfer = async () => {
    try {
      const secretKey = Uint8Array.from(secretKeyArray);
      const keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
      const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl("devnet"),
        "confirmed"
      );

      const recipientKey = new solanaWeb3.PublicKey(recipientPublicKey);
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: recipientKey,
          lamports: solanaWeb3.LAMPORTS_PER_SOL * parseFloat(amount),
        })
      );

      const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
      );
      setTransactionSignature(signature);
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
            <SentimentVeryDissatisfiedIcon sx={{fontSize: '40px'}} />
            <p className="text-[10px] h-10" style={{ color: "red" }}>{fetchError}</p>
          </div>
        )}
      </h1>
      <p className="text-[20px]">
        {balance !== null ? (
          `${balance.toFixed(2)} SOL`
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
          Transfer SOL
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
            label="Amount in SOL"
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
          <Button
            onClick={() => setDialogOpen(false)}
            style={{ color: "#fff" }}
          >
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

      {transactionSignature && (
        <p className="mt-4 text-green-500">
          Transaction successful! Signature: {transactionSignature}
        </p>
      )}
    </div>
  );
};
