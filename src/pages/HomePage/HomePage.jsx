import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import  slider1   from '../../assets/image/slider1.webp';
import  slider2  from '../../assets/image/slider2.webp';
import  slider3  from '../../assets/image/slider3.webp';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { WrapperButtonMore } from './style';
import { WrapperProducts } from '../../components/TypeProduct/Style';

const HomePage = () => {
            const arr = ['TV ','Tu lanh ', 'Lap top']
    return (
        <> 
        <div style={{padding: '0 120px' }}>     
            <WrapperTypeProduct>
            {arr.map((item)  => {
                return (
                    <TypeProduct name ={item} key={ item} />
                )
            } )}
            </WrapperTypeProduct>
            <div id ="container"  style ={{backgroundColor : '#efefef',padding : '0 120px',height : '1000px' }}>
            <SliderComponent arrImages={[slider1 , slider2, slider3]} />
            <WrapperProducts style={{marginTop: '20px' ,display :'flex' ,  alignItems : 'center' ,justifyContent : 'space-around', gap : '20px' ,flexWrap : 'wrap'}} >
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </WrapperProducts>            
                 <div style={{ width: '100%' ,display: 'flex' , justifyContent: 'center' ,marginTop : '10px'}}>
                    <WrapperButtonMore textButton="Xem Thêm" type="outline" styleButton={{
                        border: '1px solid rgb(11 , 116, 229)', color: 'rgb(11 ,116,229)',
                        width: '240px', height: '38px', borderRadius: '4px'
                    }}
                        styleTextButton={{ fontWeight: 500 }}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default HomePage;