import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import ProductdetailsPage from '../pages/ProductPageDetail/ProductDetailsPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import AdminPage from '../pages/AdminPage/AdminPage'
import ProductDetailsPage from '../pages/ProductPageDetail/ProductDetailsPage'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import OrderSuccessPage from '../pages/OrderSuccess/OrderSuccessPage'
import MyOrder from '../pages/MyOrder/MyOrder'

export const routes = [
    {
      path : '/',
      page : HomePage,
      isShowHeader : true
    },
    {
      path :'/product',
      page : ProductPage,
      isShowHeader : true

    },
    {
      path : '/order',
      page : OrderPage,
      isShowHeader : true
    },
    {
      path : '/payment',
      page : PaymentPage,
      isShowHeader : true
    },
    {
      path : '/myorder',
      page : MyOrder,
      isShowHeader : true
    },
    {
      path : '/OrderPageSuccess',
      page : OrderSuccessPage,
      isShowHeader : true
    },
    {
      path : '/product/:type',
      page : TypeProductPage,
      isShowHeader : true

    },
            {
      path : '/Product-detail',
      page : ProductdetailsPage,
      isShowHeader : true

    },
            {
      path : '/SignIn',
      page : SignInPage,
      isShowHeader : true

    },
    {
      path : '/SignUp',
      page : SignUpPage,
      isShowHeader : true
    },
    {
      path : '/Profile-User',
      page : ProfilePage,
      isShowHeader : true
    },
    {
      path : '/system/admin',
      page : AdminPage,
      isShowHeader : true,
      isPrivate: true
    },
    {
      path : '/Product-details/:id',
      page : ProductDetailsPage,
      isShowHeader : true,
      isPrivate: true
    },
    {
      path : '/Product/:type',
      page : TypeProductPage,
      isShowHeader : true,
      isPrivate: true
    },
    {
      path : '*',
      page : NotFoundPage,
    }
]