import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import ProductdetailsPage from '../pages/ProductPageDetail/ProductDetailsPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'

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
      path : '/Type',
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
    }
]