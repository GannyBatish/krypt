import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, Button, Typography } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { numberWithComas } from '../Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Scroll.css'

const useStyles = makeStyles(()=>({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logoutbtn:{
    width:'100%',
    height:40,
    backgroundColor:'#EEBC1D',
    '&:hover':{
        backgroundColor:'lightgrey',
    },
  },
  watchlist:
  {
    flex:1,
    width:'100%',
    backgroundColor:'grey',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    overflowY:'scroll',
    borderRadius:'10px',
    scrollbarColor:'red white',
    WebkitScrollbarThumb:'gold',
  },
  coin:{
    '&:hover':{
      backgroundColor:'lightgrey',
      transform:'scale(1.1)'
    },
    width:'85%',
    height:'25px',
    padding:'10px',
    borderRadius:'5px',
    display:'flex',
    flexDirection:'row',
    marginBottom:10,
    color:'black',
    justifyContent:'space-between',
    marginLeft:'20px',
    alignItems:'center',
    backgroundColor:'white',
  },
  drawer:{
    background:'transparent'
    // background: 'rgba(255,255,255,0.1)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
  },
  delete:{
    transition:'all 0.5s',
    '&:hover':{
      color:'red',
      transform:'scale(1.2)',
    }
  }
}));

export default function SideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const removeFromWatchlist=async(coin)=>{
    const coinRef=doc(db,"watchlist",user.uid);
    try{
      await setDoc(coinRef,
        {
          coins:watchlist.filter((watch)=>watch!==coin?.id)
        },
        {merge:'true'}
        );
    }catch(error)
    {
      console.log(error.message);
    }
  }
  const logout=()=>{
    signOut(auth);
    toggleDrawer();
  }
  const goto=(id,anchor,open)=>{
    history(`/coins/${id}`);
    setState({ ...state, [anchor]: open });
  }
  const {user,watchlist,coins,symbol}=CryptoState();
  const history=useNavigate();
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar
            style={{
                cursor:'pointer',
                backgroundColor:'#EEBC1D',
            }}
            src={user?.photoURL}
            onClick={toggleDrawer(anchor, true)}
            />
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer 
          anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div
            style={{
                width:'350px',
                height:'100%',
                display:'flex',
                justifyContent:'center',
                gap:'20px',
                padding:25,
                alignItems:'center',
                flexDirection:'column',
            }}
            >
                <Avatar
                style={{
                    backgroundColor:'#EEBC1D',
                    width:'200px',
                    height:'200px',
                    cursor:'pointer',
                }}
                src={user?.photoURL} alt={user.displayName || user.email} />
                <Typography
                style={{
                    // marginTop:20,
                    fontFamily:'Montserrat',
                    fontWeight:'bold',
                    fontSize:'20px'
                }}
                >{user.displayName || user.email}</Typography>
                <div
                className={classes.watchlist}
                >
                  <div
                    style={{
                        fontSize:15,
                        backgroundColor:'#EEBC1D',
                        width:'100%',
                        height:'25px',
                        textAlign:'center',
                        textShadow:'0 0 5px black',
                        marginBottom:'10px',
                    }}
                    >Watchlist</div>
                    <div
                    style={{
                      width:'100%',
                    }}
                    >
                    {coins.map(coin=>{
                      if(watchlist.includes(coin.id))
                      return(
                        <div className={classes.coin}
                        >
                          <div
                          style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            cursor:'pointer',
                          }}
                          onClick={()=>{goto(coin.id,anchor,false)}}
                          >
                          <img 
                          style={{
                            width:'15px',
                            height:'15px',
                            marginRight:'5px',
                          }}
                          src={coin.image}
                          alt={coin.name}
                          />
                          <span
                          // onClick={}
                          >{coin.name}</span>
                          </div>
                          <span>
                            {symbol}
                            &nbsp;
                            {numberWithComas(coin.current_price.toFixed(2))}
                            &nbsp;&nbsp;
                            <i className={[classes.delete,' fa-solid fa-trash'].join(' ')}
                            style={{
                              cursor:'pointer',
                            }}
                            onClick={()=>{removeFromWatchlist(coin)}}
                            ></i>
                          </span>
                        </div>
                      )
                      else{
                        return <></>
                      }
                    })}
                    </div>
                </div>
                <Button variant="contained"
                    className={classes.logoutbtn}
                    onClick={logout}
                    >Logout</Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}