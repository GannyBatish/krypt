import '../App.css'
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Classnames } from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';
import { numberWithComas } from '../Banner/Carousel';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles((theme)=>({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat"
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold"
      }
    },
    table:{
        [theme.breakpoints.down("xs")]:{
            width:"100%",
        }
    }
  }));

const CoinsTable = () => {
    const [page,setPage]=useState(1);
    const tableHead=["Coin","Price","24h Change","Market Cap"];
    // const [coins,setCoins]=useState([]);
    const {coins,setCoins}=CryptoState();
    const [loading,setLoading]=useState(true);
    const [search,setSearch]=useState('');
    const {currency,symbol}=CryptoState();
    const fetchCoins=async ()=>{
        const {data}=await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    // console.log(coins);
    useEffect(()=>{
        fetchCoins();
    },[currency]);
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:'dark'
        },
    })
    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
      };
    const history=useNavigate();
    const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:'center',
    }}>
            <Typography
            variant='h4'
            style={{margin:18,
                fontWeight:'bold',
            fontFamily:'Montserrat'
            }}
            >
                Crypto Currency Prices By Market Cap
            </Typography>
            <TextField
            label="Search for Crypto Currency..."
            variant='outlined'
            style={{
                marginBottom:20,
                width:"100%",
                borderRadius:'20px'
            }}
            onChange={(e)=>{setSearch(e.target.value)}}
            />
            <TableContainer
            className={classes.table}
            >
                {loading ? (<LinearProgress style={{backgroundColor:"gold"}} />):(
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>
                                {tableHead.map((head)=>(
                                    <TableCell
                                    style={{
                                        color:"black",
                                        fontWeight:"800",
                                        fontFamily:"Montserrat",
                                    }}
                                    key={head}
                                    align={head==="Coin"? "":"right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((coin) => {
                    const profit = coin.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history(`/coins/${coin.id}`)}
                        className={classes.row}
                        key={coin.name}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                            <img 
                            src={coin.image}
                            alt={coin.name}
                            height='50'
                            style={{
                                marginBottom:10
                            }}
                            />
                            <div
                            style={{
                                display:'flex',
                                flexDirection:'column',
                            }}>
                                <span
                                style={{
                                    textTransform:'uppercase',
                                    fontSize:22,
                                }}>
                                    {coin.symbol}
                                </span>
                                <span
                                style={{
                                    color:'darkgray',
                                }}>
                                    {coin.name}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell
                        align="right">
                            {symbol}{" "}
                            {numberWithComas(coin.current_price.toFixed(2))}

                        </TableCell>
                        <TableCell
                        align="right"
                        style={{
                            color:profit >0 ? "rgb(14,203,129":"red",
                            fontWeight:500,
                        }}
                        >
                            {" "}{profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%
                        </TableCell>
                        <TableCell
                        align="right"
                        >
                            {symbol}{" "}{numberWithComas(coin.market_cap.toString().slice(0,-6))} M
                        </TableCell>
                        </TableRow>
                    )
                })}
                    </TableBody>
                    </Table>
                )}

            </TableContainer>
            <Typography
            style={{
                fontSize:20,
                fontWeight:'700',
                fontFamily:'Montserrat',
                color:'gold',
                marginTop:'50px',
            }}
            >{(handleSearch().length===0 && search!=='')?'Coin Not Found Please try something Else...':''}</Typography>
            <Pagination
            style={{
                padding:20,
                display:'flex',
                justifyContent:'center',
                width:'100%',
            }}
            classes={{ul:classes.pagination}}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_,value)=>{
                setPage(value);
                window.scroll(0,450);
            }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable