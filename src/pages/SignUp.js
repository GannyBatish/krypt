import { Button, CircularProgress, Container, createTheme, makeStyles, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { auth } from '../firebase';
// import { useParams } from 'react-router-dom'
const useStyles=makeStyles((theme)=>({
  container:{
    height:'91vh',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'url("../banner2.jpg") no-repeat',
    // border:'2px solid red',
    flexDirection:'column'
  },
  signin:{
    // width:'450px',
    width:'100%',
    height:'450px',
    // border:'2px solid white',
    borderRadius:'10%',
    borderTopLeftRadius:'0px',
    borderTopRightRadius:'0px',
    // background: 'rgba(255,255,255,0.1)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  err:{
    height:'50px',
    width:"450px",
    // // background: 'rgba(255,0,0,0.5)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
    borderRadiusTopRight:'10%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    borderTopRightRadius:'30px',
    borderTopLeftRadius:'30px',
    paddingLeft:'20px',
    [theme.breakpoints.down("xs")]:{
      width:"100%",
    }
  },
  div:{
    [theme.breakpoints.down("xs")]:{
      width:'90%',
    }
  }
}))

const SignUp = () => {

  const history=useNavigate();
  const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        type:'dark'
    },
})
const handleIcon=()=>{
  if(icon==='fa-solid fa-eye-slash')
  {
    setIcon('fa-solid fa-eye');
    setType('text');
  }
  else
  {
    setIcon('fa-solid fa-eye-slash');
    setType('password');
  }
}
const chandleIcon=()=>{
  if(cicon==='fa-solid fa-eye-slash')
  {
    setcIcon('fa-solid fa-eye');
    setcType('text');
  }
  else
  {
    setcIcon('fa-solid fa-eye-slash');
    setcType('password');
  }
}
const submit=async()=>{
  setLoading(true);
  if(password==='' || email==='' || confirmPassword==='')
  {
    setSignUpErr('Please Fill all the Fields');
    setLoading(false);
    return;
  }
  if(!email.includes("@") && !email.includes(".com"))
  {
    setSignUpErr('Invalid Email Address');
    setLoading(false);
    return;
  }
  if(password!==confirmPassword)
  {
    setSignUpErr('Password and Confirm Password doesnot match');
    setLoading(false);
    return;
  }
  try{
      const result=await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // deleteUser(auth.currentUser);
      setSignUpErr('');
      setLoading(false);
      // console.log(result);
      history('/');
    }
    catch(error)
    {
      const str=error.message;
      const arr = str.split(/[(-/)]+/);
      arr.splice(0,2);
      arr.splice(arr.length-1,1);
      const res=arr.join(" ");
      // setLoginErr(error.message);
      setSignUpErr(res);
      setLoading(false);
    }
    setLoading(false);
}
  const classes=useStyles();
  const {signUpErr,setSignUpErr}=CryptoState();
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState('fa-solid fa-eye-slash');
  const [ctype,setcType]=useState('password');
  const [cicon,setcIcon]=useState('fa-solid fa-eye-slash');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [loading,setLoading]=useState(false);
  return (
    <div className={classes.container}>
      <div
      className={classes.div}
      style={{
        // border:'2px solid red',
        background: 'rgba(255,255,255,0.1)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        borderRadius:'10%',
      }}
      >
      <div
      className={classes.err}
      style={{
        backgroundColor:signUpErr?'rgb(255, 49, 49,0.8)':'transparent',
      }}
      >
        {signUpErr?(<div
        style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
        }}
        ><i 
        style={{
          marginRight:'7px',
        }}
        className="fa-solid fa-circle-info"></i>
        <Typography
        style={{
          textTransform:'capitalize',
        }}
        >{signUpErr}</Typography></div>)
        :<></>}
        {signUpErr?<i className="fa-solid fa-xmark" style={{
          marginRight:'20px',
          cursor:'pointer'
        }}
        onClick={()=>{setSignUpErr('')}}></i>:<></>}
      </div>
      <Container className={classes.signin}
      style={{
        filter:(loading?'blur(40px)':'blur(0px)'),
      }}
      >
        <ThemeProvider theme={darkTheme}>
        <form
        style={{
          height:"100%",
          width:'100%',
          // border:'2px solid red',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column',
        }}
        className={classes.form}
        >
          <Typography
          variant='h4'
          style={{
            fontFamily:'Montserrat',
            fontWeight:"500",
          }}
          >
            SIGN UP
          </Typography>
        <TextField
        label="Email"
        variant="outlined"
        style={{
          width:"75%",
          marginTop:20,

        }}
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <TextField
      style={{
        width:"75%",
        marginTop:20,
        marginBottom:20,
      }}
        label="Password"
        variant="outlined"
        type={type}
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <i className={icon}
      style={{
        position:'absolute',
        bottom:'235px',
        right:'90px',
        cursor:'pointer',
      }}
      onClick={handleIcon}
      ></i>

<TextField
      style={{
        width:"75%",
        marginBottom:20,
      }}
        label="Confirm Password"
        variant="outlined"
        type={ctype}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      />
      <i className={cicon}
      style={{
        position:'absolute',
        bottom:'160px',
        right:'90px',
        cursor:'pointer',
      }}
      onClick={chandleIcon}
      ></i>


      <Button
      variant='contained'
      style={{
        backgroundColor:'gold',
        width:'25%',
      }}
      onClick={submit}
      >
        Sign Up
      </Button>
      <Typography
      style={{
        marginTop:'20px',
      }}
      >Already have an Account? <Link to='/login'>Login</Link></Typography>
        </form>
        
        </ThemeProvider>
      </Container>
      </div>
      {loading?
        <div
        style={{
          width:"100%",
          height:"90%",
          position:'absolute',
          // background: 'rgba(255,255,255,0.1)',
          // WebkitBackdropFilter: 'blur(200px)',
          // backdropFilter: 'blur(200px)',
          zIndex:1,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={100}
            thickness={1}
          />
        </div>:<></>}
    </div>
  )
}

export default SignUp