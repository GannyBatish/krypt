import { AppBar, Avatar, Button, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {CryptoState} from '../CryptoContext'
import { useNavigate, useParams } from 'react-router-dom'  
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import SideBar from './SideBar'
const useStyles=makeStyles(() => ({
    title:{
        // flex:1,
        // color:'white',
        // fontFamily:'Monserrat',
        // fontWeight:'bold',
        cursor:"pointer",
    },
    arrow:{
        // display:"none",
    },
    loginbtn:{
        width:85,
        height:40,
        backgroundColor:'#EEBC1D',
        '&:hover':{
            backgroundColor:'lightgrey',
        }
    }
}))
const Header = () => {
    
    const classes=useStyles();
    // const [display,setdisplay]=useState('none');
    const history= useNavigate();
    // const {atSignIn,setAtSignIn}=CryptoState();
    const {currency,user,setCurrency}=CryptoState();
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    });
    const signin=()=>{
        history("/login");
    }
    const id=window.location.href.split("/");
    // const id=atSignIn();
    const page=id[id.length-1];
    // console.log(page);
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar style={{
            // width:'100%',
            display:'flex',
            justifyContent:(page==='login' || page==='signup')?'center':'space-between',
        }}>
                {/* <Typography className={classes.title} onClick={()=> history('/')}>KRYPT</Typography> */}
                <img
                style={{
                    cursor:'pointer',
                    width:'100px',
                }}
                src='../logo.png'
                onClick={()=>{history('/')}}
                />
                <div style={{
                    display:'flex',
                    alignItems:'center'
                }}>
                <Select variant="outlined"
                style={{
                    display:(page==='login' || page==='signup')?"none":"",
                    width:100,
                    height:40,
                    marginRight:25,
                }}
                value={currency}
                onChange={(e)=>{setCurrency(e.target.value)}}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                <div className={classes.div}
                style={{
                    display:(page==='login' || page=='signup')?"none":"block",
                }}
                >
                    {user?
                    <SideBar/>
                    :
                    <Button variant="contained"
                    className={classes.loginbtn}
                    onClick={signin}
                    >Login</Button>
                    }
                 </div>
                </div>
            </Toolbar>
        </Container>
    </AppBar>
</ThemeProvider>
  )
}

export default Header