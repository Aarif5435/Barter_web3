import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
interface ChildComponentProps {
  pubKey: string;
}
interface State extends SnackbarOrigin {
  open: boolean;
}
export const CopyIcon: React.FC<ChildComponentProps> = ({ pubKey }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
console.log('undefined',pubKey)
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

  return (
    <>
      <ContentCopyIcon
        onClick={() => handleCopyClick(pubKey)}
        sx={{
          color: "white",
          fontSize: 15,
          marginTop: "3px",
          position: "absolute",
          right: "30px",
        }}
      />

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
