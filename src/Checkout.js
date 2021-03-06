import React, {useLayoutEffect} from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import barcode from "./barcode.png";
import { useTranslation } from "react-i18next";
import background from './image-background/image8.jpg';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


function Checkout() {
    const [{basket}, dispatch] = useStateValue();
    const { t } = useTranslation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  


    return (
        <div>

            <div className="headlist">
         
            <div className="checkout__left">
            <div className="headtext" style={{textAlign:"start"}}> <span className="intro intro--num"> <img src={barcode} width={50}/> </span>
            <span className="intro"> {t("Il tuo carrello")} </span> </div>
            </div>
            <div className="checkout__right" > 
            <Subtotal />
            </div>
            </div>
            <div className="home__container">
            <div className="footerdistance" style={{minHeight:"1170px"}}>
            <img className="home__photo" src={background} alt="" />
            <div className="home__row" style={{marginTop:"-55%"}} >


            <TransitionGroup className="toda-lista">
                {basket.map((item,index, key) => (     
                  
                <CSSTransition
                  key={index}
                  timeout={200}
                  classNames="item"
                >

                <div key={key} style={{margin: "1.5%"}}>
                <CheckoutProduct 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    titleEN={item.titleEN}
                    price={item.price}
                    city={item.city}
                    tipo={item.tipo}
                    totalday={item.totalday}
                    pricerent={item.pricerent}
                    caparra={item.caparra}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    preview={item.preview}
                    idbuyer={item.idbuyer}
                    createdon={item.CreatedOn}>
                </CheckoutProduct>
                </div>

                </CSSTransition> ))
                }
            </TransitionGroup>

            {/*<div className="list">
            {basket.map((item,index) => ( <CheckoutProduct 
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            city={item.city}
            tipo={item.tipo}
            totalday={item.totalday}
            pricerent={item.pricerent}
            caparra={item.caparra}
            startDate={item.startDate}
            endDate={item.endDate}
            preview={item.preview}
            idbuyer={item.idbuyer}
            createdon={item.CreatedOn}>
            </CheckoutProduct> ))}
            </div>*/}
            </div>
            </div>
            </div>
        </div>
    );
}

export default Checkout;
