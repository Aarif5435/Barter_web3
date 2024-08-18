import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";

export const generateWallet = async (
    mnemonic: any,
    wallet: number
  ) => {
    try {
      const mn = mnemonic.join(",").replace(/,/g, " ");
      const seed = await mnemonicToSeed(mn);
      const solInd = localStorage.getItem('solInd');
      const ind = solInd ? JSON.parse(solInd) : 0;
      const ethInd = localStorage.getItem('ethInd');
      const index = ethInd ? JSON.parse(ethInd) : 0;
      
      if (wallet === 501) {
        const path = `m/44'/${wallet}'/${ind}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const storedSolWalletString = localStorage.getItem("solWallet");

        const storedSolWallet = storedSolWalletString
          ? JSON.parse(storedSolWalletString)
          : [];

        const updatedSolWallet = [...storedSolWallet, keypair];

        localStorage.setItem("solWallet", JSON.stringify(updatedSolWallet));
        localStorage.setItem('solInd', ind+1);
        return updatedSolWallet;
      }
      if (wallet === 60) {
        const path = `m/44'/${wallet}'/${ind}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const privateKey = child.privateKey;
        const newwallet = new Wallet(privateKey);
        const keypair = {pubkey:newwallet.address, secretkey: privateKey}
        console.log("mnemonic", {pubkey:newwallet.address, secretkey: privateKey});
        const storedSolWalletString = localStorage.getItem("ethWallet");

        const storedSolWallet = storedSolWalletString
          ? JSON.parse(storedSolWalletString)
          : [];

        const updatedEthWallet = [...storedSolWallet, keypair];

        localStorage.setItem("ethWallet", JSON.stringify(updatedEthWallet));
        localStorage.setItem('ethInd', index+1);
        return updatedEthWallet;
      }
    } catch (err) {
      console.error(err);
    }
  };