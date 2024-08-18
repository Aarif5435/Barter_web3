import { useState } from "react";
import { OnBoarding } from "./component/onBoarding";
import { CreatePassword } from "./component/createPassword";
import { RecoveryPhraseScreen } from "./component/secretPhrase";
import { StartedPage } from "./component/getStartedPage";
import { LogIn } from "./component/login";
import { SelectNetwork } from "./component/selectNetwork";
import { MainPage } from "./component/mainPage";
import { WalletInfo } from "./component/walletInfo";

function App() {
  const [page, setPage] = useState<number>(1);
  const [network, setNetwork] = useState('sol')

  return (
    <>
      <div className="w-full h-[900px] bg-[#E2DFFE] flex  justify-center items-center">
       {page === 1 ? <OnBoarding setPage={setPage} /> :
       page === 2 ? <CreatePassword setPage={setPage}/>  :
       page === 3 ? <SelectNetwork setPage={setPage } setNetwork={setNetwork}/> :
       page === 4 ? <RecoveryPhraseScreen setPage={setPage}/> : 
       page === 5 ? <StartedPage setPage={setPage}/> :
       page === 6 ? <LogIn setPage={setPage}/> :
       page === 7 ? <MainPage setPage={setPage}  network={network}/> :
        <WalletInfo setPage={setPage} network={network}/>  }
       
      </div>
    </>
  );
}

export default App;
