import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 15px;
  border-radius: 18px;
  border: none;
  background-color: white;
  padding: 15px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: black;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 70%;
  @media (min-width: 767px) {
    width: 500px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const LogoButtonImg = styled.img`

  margin: 30px;
  width: 48px;
  height: 48px;

`;

export const StyledImg = styled.img`
  
  width: 250px;
  @media (min-width: 900px) {
    width: 100%;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  @media (min-width: 1440px) {
    width: 500px;
  }
`;

export const StyledTeamImg = styled.img`

  border-radius: 8px;
  border: 6px #ffffff solid;
  width: 200px;
  @media (min-width: 900px) {
    width: 350px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
`;

export const StyledHeader = styled.img`
  width: 45vw;
`;

export const StyledLink = styled.a`
  color: var(--primary-text);
  text-decoration: none;
`;

export const FooterLink = styled.a`
  text-decoration: none;
`;

export const FooterLogo = styled.img`
  width: 160px;
`;



function App() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);

    // Merkle
    const addresses = ["0xD34d390Dde6fC8F3cF8A3D5d7DCC077F403a9f0D", "0x57C41c5e4e24d1890e6E6bCd07C78f6A0DC61D07", "0x35Fa3df3b7Ac0e0E0c466dEf75Ab67B028065005", "0xd69c056085aB9615006DE618A20FC5616B1cdCD7", "0xaEabe7513BB61325E22c0D7Fd7B2804b3e2C9C28", "0xbEe1f7e369B3271088Ed58bF225DF13Cd96D32d5", "0xACd6c2F22493DF8afF4771cd2F85CccC0fd2b2dF", "0x4Fe55865a637dF7F56a197EFa580f5AE0B7c3be8", "0x46dB872790dfA5D498ecA16Ed53Bef17800610C4", "0x036b9226F337fbFA99921Ef66E1D1d8dEE480061", "0x49B4153fa83EF28fcaEA17431aB0103c9AAea339", "0xf26E6d635056fA51d4C7d040B1FB1d53557fef58", "0x340Ad2658e3e9b446e322375435F444cB4992110", "0x6E63207D0De8db053c0cCde8D392cce40B41AAfc", "0xA3FAAe46363aF3a93383D3485dFEBD5Ee6f4Fd8F", "0x14AFEeF36497Ffc8447d8AB091EA5A70f155Ac86", "0xC44400eD10f1817B5b0BC7532fa064753bc210a2", "0x221d1D972377Ff5fE639B92ed4f67b320d502A54", "0xCD878455231D9Eff5ECd9232106B87cD732b64EF", "0xE426a520d0Cbee2C76098fD9cdAf20036C20D0A7", "0x5dA75De9b850A1dBCa826AaE1f275fCd56460228", "0x302036Eb9E43247b5B666eEB44205A0B72029ee9", "0x72582708f082b53C212778706f2359BFcE436435", "0x7B108DA69dde9f26D2a2154FdD4c753b99b1f8E3", "0x37099c929A51083C83f3Eff38E811dDA24c783c6", "0xf125E2FFEA938A18A3de4aF57b3916390e02f4F4", "0x88CAc9ba77248e38BB84184dF7e04Bec412d3bA6", "0x59B69bC8A2E619C6B3026d2A37FebfDeE8697A6D", "0x8d6176F6Eb753FfD28Fd7BA0E0D2f60139E96a0F", "0x117cE38e20abD1e2A77428Ea1379075590F824dF", "0x0640A5E7cD00641e2d487d460040E0147f5C0907", "0x936fe0F8a1AD8ee885703319c593B7682C72DAc1", "0x232b15DA3718840fc41De4f892B0719700C5701d", "0x50B51cbc2819D31e90025CB86FeA59160f3F41d6", "0x3C02F24aF73d33B1749C62D9b201A629DAD93742", "0xB6aC003625d5eF3D656dE963A40077F814455fC4", "0x9c3892c04fD7a2d5CF1f32bCbC44AE33d8BF8a73", "0x55945A822edb71ffc62c18Bf6612231f418c18d5", "0x5A3F81D29B66849a7F986D39Df3D53FA6b6470Ae", "0x98de2020633A28F231eB2d31CFd039b3E1582AAa", "0xFf6260f33C98c287adDEd625A34D566Fc02037Ed", "0xB573D55bB681b091cA01ef0E78D519ED26238C38", "0xB42D0b4ED198176DEfD06c181D2A6a5b5f7632E6", "0xc3d96fb2Bb878B7700635D439b50d1eE5c2C3B48", "0xe09283B2bE9431B6c9d866Ce1e1317F435d073e9", "0x462233f988488D2C459DAF53C6a9C98a3D2a484c", "0x71b970d9110dC32964Dec2b4235267040500cfAd", "0xeF2091756079F9E89A83D76a523418F6B3527bAC", "0x384f6C248D9912B482724d2093Ad6E20A10b57E1", "0x721472c23B62C19F28Ff148BB9d087975FCfaC91", "0x1BcB777bCc5e53e2555c2f9EEA5b5791bDc6ef50", "0x1648C13a8Ed3ffb194B2c033497a5E82E543cb82", "0xdb955C787Ea67964e1d47b752657C307283aE8c2", "0x234e91d7f88fE418B7D71B3C4b7AcEc4Ca34232B", "0xF6f00a73139D1Ba40bC90E6fadBD270A980f901B", "0xd44Fb1b14F98D29d50316703227e937fB58E792D", "0xf6Ed9ff1dB0f1D78e522eC36C43FFE2Eb753957E", "0xfe89d2C80F69e76275167f01BE7492E0567de4C3", "0xFB2266D34B318eF89176096969D2637bABE54026", "0x07dE9eaE5c029f5a2CceCC577CF891784c3Cb9c5", "0x34666E7B80056be0E1418f1a8b4fe8561B65AC98", "0x254e9289a14b19F3513189Cffb3Cb1400e7dA090", "0x573cD2eD0e42Ab76C11f39Db3C749Cd9dd37745B", "0x9Fe80Fd942a5bcdB21e0a32346d79c2e36874831", "0x7dBc878e9D5BF14473257fC98E3Fbb1a87A064F2", "0x7D619E2598A2F24188497f65A2d9F12e6Bfcd985", "0x940a77aC3Ce10afA7Bc4f24Ada7E229561d52365", "0xbEe1f7e369B3271088Ed58bF225DF13Cd96D32d5", "0xB573D55bB681b091cA01ef0E78D519ED26238C38", "0x6E63207D0De8db053c0cCde8D392cce40B41AAfc", "0x713de4522b0c3B7880f4732389635ec39aa000Ca", "0x17CfF82510DBf467679a3C9229137Fe77AEe79d3", "0x3039Cd5608E7686C28AcF0C8aC5c923B7a31337b", "0xdE621F19cd7B2B2b1917d01328706CEa4157c1c1", "0x4856682E74BB6ad136bdB788C64BDF429ba01FA6"]
    
    const leaves = addresses.map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const buf2hex = x => '0x' + x.toString('hex')

    console.log(buf2hex(tree.getRoot()))

    const leaf = keccak256(blockchain.account) // address from wallet using walletconnect/metamask
    const proof = tree.getProof(leaf).map(x => buf2hex(x.data))

    // Contract Data
    const data = useSelector((state) => state.data);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "",
            SYMBOL: "",
            ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST_PUBLIC: 0,
        WEI_COST_WL: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const claimNFTs = async () => {
        let cost = CONFIG.WEI_COST_PUBLIC;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        gasLimit = (132705 + 3508 * (mintAmount - 1)) / mintAmount;

        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Enjoy your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .PUBLIC_MINT(mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,

            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong please try again later.");
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(
                    `Enter The ${CONFIG.NFT_NAME}.`
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });

    };

    const claimWhitelistNFTs = () => {
        let cost = CONFIG.WEI_COST_WL;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        gasLimit = (132705 + 3508 * (mintAmount - 1)) / mintAmount;

        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Enjoy your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .WHITELIST_MINT(proof, mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,

            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong please try again later.");
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(
                    `Enter The ${CONFIG.NFT_NAME}.`
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };

    const claimFreeNFTs = () => {
        //let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let freeMintAmount = 1;
        let totalCostWei = String(0);

        //FREE Mint Cost
        gasLimit = (132705 + 3508 * (freeMintAmount - 1)) / freeMintAmount;

        let totalGasLimit = String(gasLimit * freeMintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Enjoy your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods.FREE_CLAIM(proof).send({ from: blockchain.account })
    };

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 10) {
            newMintAmount = 10;
        }
        setMintAmount(newMintAmount);
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        getData();
    }, [blockchain.account]);

    //You have minted {data.mintedCount(blockchain.account)}            Ξ

    //
    //<img alt="logo" src="/config/images/logo.png">
    //<StyledImg alt={"example"} src={"/config/images/example.gif"} /> LINE 310


    /*
        <s.Container ai={"center"} jc={"center"} fd={"row"}>
            <StyledButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                    e.preventDefault();
                    claimFreeNFTs();
                    getData();
                }}
            >
                {claimingNft ? "PROCESSING" : "1 FREE MINT"}
            </StyledButton>
        </s.Container>

        <s.SpacerSmall />
    */
    return (
        <s.Screen>
            <s.Container
                flex={1}
                ai={"center"}

                image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}


            >


                <s.TextTitle
                    style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                        fontFamily: "customfont",
                        fontWeight: "normal",
                        //textShadow: "2px 2px blue",
                    }}
                >

                    <br />
                    <br />
                    <StyledLogo alt={"logo"} src={"/config/images/logo_tr.png"} />
                    <br />


                </s.TextTitle>

                <div class="flexbox-container">
                    <div class="flexbox-item">
                        <StyledImg alt={"example"} src={"/config/images/box.png"} />
                    </div>
                    <div class="flexbox-item flexbox-item-1">
                        <s.TextDescription

                            style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "normal",
                                fontFamily: "customfont",
                                fontSize: "28px",
                                

                            }}
                        >
                            A high flying adventure awaits!<br/>
                            <br/>
                            1111 pixel art game cartridges ready to be minted and played on Opensea!<br/>
                            <br/>
                            Mint yours now and let the fun begin!<br/>
                        </s.TextDescription>
                    </div>
                </div>



                <s.SpacerSmall />
                <ResponsiveWrapper flex={1} style={{ padding: 25 }} test>
                    <s.Container flex={1} jc={"center"} ai={"center"}>

                    </s.Container>
                    <s.SpacerLarge />
                    <s.Container

                        flex={1}
                        jc={"center"}
                        ai={"center"}
                        style={{
                            backgroundColor: "(255,255,255)",
                            padding: 10,
                            borderRadius: 90,
                            border: "0px solid var(--secondary)",
                            boxShadow: "10px 10px 100px 10px rgba	(255,255,255)",
                        }}
                    >

                        <s.TextTitle

                            style={{
                                textAlign: "center",
                                fontSize: 40,
                                fontWeight: "normal",
                                color: "var(--accent-text)",
                                fontFamily: "customfont",

                            }}
                        >

                            <br />
                            {data.totalSupply} / {CONFIG.MAX_SUPPLY}<br />
                            <br />

                        </s.TextTitle>
                        <s.TextDescription

                            style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "normal",
                                fontFamily: "customfont",
                                fontSize: "14px"

                            }}
                        >
                            {/* <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                            </StyledLink> */}
                        </s.TextDescription>
                        <s.SpacerXSmall />
                        {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                            <>
                                <s.TextTitle

                                    style={{
                                        textAlign: "center",
                                        color: "white",
                                        fontFamily: "customfont",
                                    }}
                                >
                                    The sale has ended.

                                </s.TextTitle>
                                <s.TextDescription

                                    style={{
                                        textAlign: "center",
                                        color: "var(--accent-text)",
                                        fontFamily: "customfont",
                                    }}
                                >
                                    You can still find {CONFIG.NFT_NAME} on opensea

                                </s.TextDescription>
                                <s.SpacerSmall />
                                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                                    {CONFIG.MARKETPLACE}
                                </StyledLink>
                                <s.SpacerSmall />
                            </>
                        ) : (
                            <>
                                <s.TextTitle
                                    style={{
                                        textAlign: "center",
                                        color: "var(--accent-text)",
                                        fontFamily: "customfont",
                                        fontWeight: "normal",
                                        //textShadow: "2px 2px blue", 
                                    }}
                                >

                                    OGs receive 1 free mint, and can mint more for just .015 eth below.<br/>
                                    The public can mint for .02 eth and all wallets are limited to 10 per tx.<br/>

                                </s.TextTitle>
                                <s.SpacerXSmall />
                                <s.TextDescription
                                    style={{
                                        textAlign: "center",
                                        color: "var(--accent-text)",
                                        fontFamily: "customfont",
                                    }}
                                >


                                </s.TextDescription>
                                <s.SpacerSmall />
                                {blockchain.account === "" ||
                                    blockchain.smartContract === null ? (
                                    <s.Container ai={"center"} jc={"center"}>
                                        <s.TextDescription

                                            style={{
                                                textAlign: "center",
                                                color: "var(--accent-text)",
                                                fontFamily: "customfont",
                                            }}
                                        >


                                        </s.TextDescription>
                                        <s.SpacerSmall />
                                        <StyledButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(connect());
                                                getData();
                                            }}
                                        > Connect
                                            <br />



                                        </StyledButton>
                                        {blockchain.errorMsg !== "" ? (
                                            <>
                                                <s.SpacerSmall />
                                                <s.TextDescription

                                                    style={{
                                                        textAlign: "center",
                                                        color: "var(--accent-text)",
                                                        fontFamily: "customfont",
                                                    }}
                                                >
                                                    {blockchain.errorMsg}
                                                </s.TextDescription>
                                            </>
                                        ) : null}
                                    </s.Container>
                                ) : (
                                    <>

                                        <s.TextDescription

                                            style={{
                                                textAlign: "center",
                                                color: "var(--accent-text)",
                                                fontFamily: "customfont",
                                            }}
                                        >
                                            {feedback}
                                        </s.TextDescription>
                                        <s.SpacerMedium />
                                        <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                            <StyledRoundButton

                                                style={{ lineHeight: 0.4 }}
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    decrementMintAmount();
                                                }}
                                            >
                                                -
                                            </StyledRoundButton>
                                            <s.SpacerMedium />
                                            <s.TextDescription

                                                style={{
                                                    textAlign: "center",
                                                    color: "var(--accent-text)",
                                                    fontFamily: "customfont",
                                                    fontSize: "20px",
                                                }}
                                            >

                                                {mintAmount}
                                            </s.TextDescription>
                                            <s.SpacerMedium />
                                            <StyledRoundButton
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    incrementMintAmount();
                                                }}
                                            >
                                                +
                                            </StyledRoundButton>
                                        </s.Container>

                                        <s.SpacerSmall />
                                        <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                            <StyledButton
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    claimNFTs();
                                                    getData();
                                                }}
                                            >
                                                {claimingNft ? "PROCESSING" : "PUBLIC MINT"}
                                            </StyledButton>
                                        </s.Container>

                                        <s.SpacerSmall />
                                        <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                            <StyledButton
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    claimWhitelistNFTs();
                                                    getData();
                                                }}
                                            >
                                                {claimingNft ? "PROCESSING" : "WHITELIST MINT"}
                                            </StyledButton>
                                        </s.Container>

                                        <s.SpacerSmall />
                                        <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                            <StyledButton
                                                disabled={claimingNft ? 1 : 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    claimFreeNFTs();
                                                    getData();
                                                }}
                                            >
                                                {claimingNft ? "PROCESSING" : "FREE CLAIM"}
                                            </StyledButton>
                                        </s.Container>

                                    </>
                                )}
                            </>
                        )}
                        <s.SpacerMedium />
                    </s.Container>
                    <s.SpacerLarge />
                    <s.Container flex={1} jc={"center"} ai={"center"}>

                    </s.Container>
                </ResponsiveWrapper>
                <s.Container jc={"center"} ai={"left"} style={{ width: "90%" }}>

                    <s.TextDescription

                        style={{
                            textAlign: "center",
                            color: "white",
                            fontFamily: "customfont",
                            fontSize: "30px",
                            fontWeight: "900",

                        }}

                    >



                    </s.TextDescription>


                    <s.TextDescription

                        style={{
                            textAlign: "center",
                            color: "white",
                            fontFamily: "customfont",
                            fontSize: "28px",
                            fontWeight: "normal",

                        }}

                    >


                        <br />
                        <br />
                        <a target="_blank" href={CONFIG.MARKETPLACE_LINK}>
                            <LogoButtonImg src="/config/images/OS_LOGO.png" />
                        </a>
                        <a target="_blank" href="https://twitter.com/Pobrobopobros">
                            <LogoButtonImg src="/config/images/TWIT_LOGO.png" />
                        </a>
                        <a target="_blank" href={CONFIG.SCAN_LINK}>
                            <LogoButtonImg src="/config/images/SCAN_LOGO.png" />
                        </a>
                        <br />
                        <br />
                        <a style={{
                            display: "flex",
                            justifyContent: "left",
                            textAlign: "left",

                        }} target="_blank" href="https://twitter.com/viperwarelabs">
                            <FooterLogo alt={"Viperware"} src={"/config/images/ViperwareLogo.png"} />
                        </a>


                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container>
                    </s.Container>

                </s.Container>
                <s.SpacerMedium />
            </s.Container >
        </s.Screen >
    );
}

export default App;

//[0xb7b19092bad498eae34230a9e14c8ce3d9d85b2bb91212108c9d47d1948acfeb,0x1f957db768cd7253fad82a8a30755840d536fb0ffca7c5c73fe9d815b1bc2f2f,0x924862b314bd38813a325167aca7caee16318f07303bd8e9f81bbe5808575fbf,0xe5076a139576746fd34a0fd9c21222dc274a909421fcbaa332a5af7272b6dcb1,0x148c730f8169681c1ebfb5626eb20af3d2351445463a1fdc5d0b116c62dc58c8,0x5712507eeb3d7b48e5876f21fc871656c2379464b480c8e89c50c2a1e8f58ac5]