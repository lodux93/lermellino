import React, { useEffect, useState } from "react";
import "./Searchlist.css"; 
import Product from "./Product";
import { useParams } from "react-router-dom";
import barcode from "./barcode.png"
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, getFirestore,query, orderBy, where} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import background from "./image-background/image4.jpg";


export default function Searchlist() {

    let { slug } = useParams();
    const db = getFirestore();
    const [products, setProduct] = useState([]);
    const [filteredProducts, setFilteredProduct] = useState([]);
    const { t } = useTranslation();
    const [showloader, setShowloader] = useState(true);

    useEffect(() => {
        fetchMyAPI()
        async function fetchMyAPI() {
            const q = query(collection(db, "products"),where("State","==","DISPONIBILE"),orderBy("CreatedOn","asc"));
            const querySnapshot =  await getDocs(q);
            const saveFirebaseTodos = []; 
            querySnapshot.forEach((doc) => {
            saveFirebaseTodos.push(({id: doc.id, ...doc.data()}));
            /*console.log(doc.id, " => ", doc.data());*/ 
        });
        setProduct(saveFirebaseTodos) 
        setShowloader(false)
        }       
    }, [])

    useEffect(() => {
        let filteredProd = products.filter((value) => {
            if (slug === "") {return value}
            else if ((value.Preview.toString().toLowerCase().includes(slug.toLowerCase())) || (value.Type.toString().toLowerCase().includes(slug.toLowerCase())) || (value.City.toString().toLowerCase().includes(slug.toLowerCase()))) {
                return value
            }
        }); 
        setFilteredProduct(filteredProd)
    console.log(filteredProd)}, [slug])



    return (
        <div>
            { showloader && <Loader /> }
            <div className="headlist">
            <div className="headtext" style={{textAlign: "start"}}>
            <span className="intro intro--num"> <img src={barcode} width={50}/> </span>
            <span className="intro">{t("Risultati ricerca")}: {slug}</span>  
            </div>
            </div>
            <img className="home__photo" src={background} alt="" />
            <div className="footerdistance" style={{minHeight:"1300px"}}>   
            <div className="home__row" style={{marginTop:"-55%"}} >
            <div className="home__container">
            <div className="search__row">
                {filteredProducts.map((value, key) =>
                <Product 
                    key={key}
                    id={value.id}
                    idowner={value.IDowner}
                    tipo={value.Type}
                    title={value.Name} 
                    titleEN={value.NameEN}
                    preview={value.Preview}
                    previewEN={value.PreviewEN}
                    price={value.Price} 
                    priceday={value.Priceday}
                    city={value.City} 
                    image={value.Img} 
                />
                )}
                {filteredProducts < 1 && <h1 style={{position:"absolute"}}> Nessun elemento trovato </h1> }
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}
