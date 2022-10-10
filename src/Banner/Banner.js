import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles=makeStyles(()=> ({
    banner:{
        backgroundImage:"url(./banner2.jpg)",
    },
    bannerContent:{
        height:450,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around',
    },
    tagline:
    {
        display:'flex',
        height:'40%',
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center'
    },
    img:{
        width:"50%",
        marginBottom:15,
    }
}))
const Banner = () => {
    
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                {/* <Typography
                variant='h1'
                style={{
                    fontWeight:'bold',
                    marginBottom:10,
                    fontFamily:'Montserrat',
                }}
                >
                    KRYPT
                </Typography> */}
                <img className={classes.img}
                src="./logo.png"/>
                <Typography 
                variant='subtitle2'
                style={{
                    color:'darkgrey',
                    textTransform:'capitalize',
                    fontFamily:'Montserrat',
                    // position:'relative',
                    left:(window.innerWidth>570)?'100px':'',
                    top:'0px'
                }}
                >
                    Get all the info regarding your favourite crypto currency
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner