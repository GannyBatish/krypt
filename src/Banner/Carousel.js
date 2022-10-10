import { makeStyles } from '@material-ui/core'
import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';

const useStyles=makeStyles((theme)=>({
    carousel:{
        height:'50%',
        display:'flex',
        alignItems:'center',

    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        padding:'5px',
        transition:'backgroundColor 1s',
        borderRadius:'10px',
        '&:hover':{
            // transform:'scale(1.1)'
            backgroundColor:'rgb(22, 107, 211,0.5)'
        }
      },
}));
export function numberWithComas(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const Carousel = () => {
    const classes=useStyles();
    const [trending,setTrending]=useState([]);
    const {currency,symbol}=CryptoState();
    const fetchTrendingCoin= async ()=>{
        const {data}=await axios.get(TrendingCoins(currency))
        setTrending(data);
    }
    useEffect(()=>{
        fetchTrendingCoin();
    },[currency]);
    const responsive={
        0:{items:2},
        512:{items:4}
    }
    const items=trending.map((coin)=>{
        let profit =coin.price_change_percentage_24h>=0;
        return(
            <Link 
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}>
                <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
                />
                <span>{coin?.symbol}
                &nbsp;
                <span 
                style={{
                    color:profit>0 ? "rgb(14,203,129)" : "red",
                    fontWeight:500,
                }}
                >
                    {" "}{profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span>
                <span
                style={{fontSize:22,fontWeight:500}}
                >
                    {symbol} {numberWithComas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
  return (
    <div className={classes.carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        >

        </AliceCarousel>
    </div>
  )
}

export default Carousel