import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';
const Crypto=createContext();
const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState('INR');
    const [symbol,setSymbol]=useState('₹');
    const [coins,setCoins]=useState([]);
    const [loginErr,setLoginErr]=useState('');
    const [signUpErr,setSignUpErr]=useState('');
    const [user,setUser]=useState(null);
    const [watchlist,setWatchlist]=useState([]);
    useEffect(()=>{
        if(user)
        {
            const coinRef=doc(db,"watchlist",user.uid);
            const unsubscribe=onSnapshot(coinRef,coin=>{
                if(coin.exists())
                {
                    setWatchlist(coin.data().coins);
                }
                else
                {
                    setWatchlist([]);
                    console.log("No coin in watchlist");
                }
            });
            return ()=>{
                unsubscribe();
            }
        }
    },[user]);
    useEffect(()=>{
        setPersistence(auth,browserSessionPersistence).then(()=>{

            onAuthStateChanged(auth,(user)=>{
                if(user)
                {
                    setUser(user);
                }
                else
                {
                    setUser(null);
                }
            });
            
        })
    },[user]);
    useEffect(()=>{
        if(currency==='INR')
        {
            setSymbol("₹");
        }
        else if(currency==='USD')
        {
            setSymbol("$")
        }
    },[currency])

  return (
    <Crypto.Provider value={{
        currency,
        symbol,
        loginErr,
        signUpErr,
        user,
        watchlist,
        coins,
        setCurrency,
        setLoginErr,
        setSignUpErr,
        setCoins
        }}>
        {children}
    </Crypto.Provider>
  )
}
export default CryptoContext

export const CryptoState=()=>{
    return useContext(Crypto);
}