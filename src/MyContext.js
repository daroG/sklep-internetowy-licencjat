import React, {createContext, Component} from 'react';
import axios from 'axios';
import Helpers from "./Helpers";
import {Logger} from "./utils/Logger";

export const MyContext = createContext(null);


const URL_PRODUCTS = 'products';
const URL_LOGIN = 'auth/login';
const URL_REGISTER = 'auth/register';
const URL_USER_SIMPLE_INFO = 'auth/user';
const URL_USER_INFO = 'auth/user/info';
const URL_USER_INFO_SAVE = 'auth/user/info';
const URL_LOGOUT = 'auth/logout';
const URL_ORDERS_LIST = 'auth/user/orders';
const URL_MAKE_ORDER = 'auth/user/orders';

const Axios = axios.create({
    baseURL: 'http://sklep-web-service.loc/api/',
    headers: {
        'Content-type': 'application/json',
    }
})


class MyContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
            isAuthenticated: false,
            user: null,
            cart: [],
            products: [],
        };

        this.initializeAxios();

        this.loginUser = this.loginUser.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);

        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);

        this.getProduct = this.getProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.saveCart = this.saveCart.bind(this);
        this.readCart = this.readCart.bind(this);
        this.clearCart = this.clearCart.bind(this);

        this.makeOrder = this.makeOrder.bind(this);

    }

    initializeAxios() {
        const loginToken = localStorage.getItem('loginToken');
        const loginTokenExpiredAt = Date.parse(localStorage.getItem('loginTokenExpiredAt'));

        if (loginToken && loginTokenExpiredAt && +loginTokenExpiredAt * 1000 > new Date().getTime()) {
            Axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`;
            Axios.defaults.headers.common['X-Requested-With'] = `XMLHttpRequest`;

            return true;
        }
        return false;
    }

    componentDidMount() {
        this.readCart();
        this.isLoggedIn().then(user => {
            if (user) {
                this.setState({
                    ...this.state,
                    showLogin: false,
                    isAuthenticated: true,
                    user: user,
                });
            }
        });
    }

    readCart() {
        const savedCart = localStorage.getItem('cart');

        if (savedCart) {
            try {
                const cart = JSON.parse(savedCart);

                this.setState({
                    ...this.state,
                    cart: cart
                })
            } catch (e) {
                Logger.warn(e.message);
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }

    addProductToCart(product) {
        this.setState({
            ...this.state,
            cart: [...this.state.cart, product]
        }, () => this.saveCart())

        Logger.info("Context", this.state);
    }

    removeProductFromCart(product) {
        this.setState({
            ...this.state,
            cart: this.state.cart.filter(p => p !== product)
        }, () => this.saveCart())


    }

    clearCart() {
        this.setState({
            ...this.state,
            cart: []
        }, () => this.saveCart())
    }

    async isLoggedIn() {

        Logger.info("isLoggedIn called");

        if (this.initializeAxios()) {

            const userData = await Axios.get(URL_USER_SIMPLE_INFO).catch((error) => Logger.warn(error));
            Logger.info('user info', userData.data)
            if (userData && userData.data) {
                return userData.data;
            }
        }
        return false;
    }

    logoutUser() {

        Axios.get(URL_LOGOUT).then().catch(error => {
            if(error.response) {
                Logger.info(error.response.data)
            }
        });

        localStorage.removeItem('loginToken');
        localStorage.removeItem('loginTokenExpiredAt');
        this.setState({
            ...this.state,
            isAuthenticated: false,
            user: null,
            showLogin: true,
        })
    }

    async registerUser(user) {
        const register = await Axios.post(URL_REGISTER, {
            email: user.email,
            name: user.name,
            surname: user.surname,
            tel: user.tel,
            address: user.address,
            city: user.city,
            zipCode: user.zipCode,
            password: user.password,
            passwordConfirm: user.passwordConfirm,
        });

        return register.data;
    }

    async loginUser({email, password}) {
        const login = await Axios.post(URL_LOGIN, {
            email: email,
            password: password,
            remember_me: true
        },).catch(() => {
            return {
                status: "ERROR"
            }
        });

        if (!login || !login.data) {
            return {
                status: "ERROR"
            }
        }

        localStorage.setItem('loginToken', login.data.access_token);
        localStorage.setItem('loginTokenExpiredAt', login.data.expires_at);

        this.setState({
            ...this.state,
            showLogin: false,
            isAuthenticated: true,
        });

        await this.isLoggedIn();

        return login.data;
    }

    async getUserInfo() {
        const userInfo = await Axios.get(URL_USER_INFO).catch(err =>
            Logger.info(err)
        )

        Logger.info("Full user info: ", userInfo.data);

        if (!userInfo.data) {
            return {};
        }


        return userInfo.data;
    }

    async updateUserInfo(data){

        const userData = {
            email: data.email,
            name: data.name,
            surname: data.surname,
            phone: data.tel,
            address: data.address,
            city: data.city,
            zipCode: data.zipCode
        }

        let toRet = true;
        await Axios.post(URL_USER_INFO_SAVE, userData).catch(error => {
            if(error.response){
                Logger.error(error.response.data);
                toRet = false;
            }
        });

        return toRet;

    }

    async getProduct(id) {

        let response = await Axios.get(`${URL_PRODUCTS}/${id}`);
        Logger.info(response.data);

        return Helpers.prepareProduct(response.data);

    }

    async getProducts() {

        let response = await Axios.get(URL_PRODUCTS);

        Logger.info(response.data);

        if (response.data) {
            this.setState({
                products: response.data.map(p => Helpers.prepareProduct(p))
            })
        }

        return response.data;

    }

    async makeOrder(data) {

        const requiredData = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.tel,
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
        }

        const toSend = {
            ...requiredData,
            cart: JSON.stringify(this.state.cart)
        }

        Logger.info("To send", toSend);

        let response = await Axios.post(URL_MAKE_ORDER, toSend).catch(error => Logger.info(error.response.data));



        if(response.error) {
            Logger.info(response);
            return null;
        }

        Logger.info(response.data);

        return response.data;
    }

    async getTransactions() {
        let response = await Axios.get(URL_ORDERS_LIST);

        if (!response.data) {
            return {};
        }

        Logger.info(response.data);

        return response?.data;
    }


    render() {
        const expose = {
            rootState: this.state,
            logoutUser: this.logoutUser,
            loginUser: this.loginUser,
            registerUser: this.registerUser,
            isLoggedIn: this.isLoggedIn,
            getUserInfo: this.getUserInfo,
            updateUserInfo: this.updateUserInfo,
            addProductToCart: this.addProductToCart,
            removeProductFromCart: this.removeProductFromCart,
            clearCart: this.clearCart,
            getProduct: this.getProduct,
            getProducts: this.getProducts,
            makeOrder: this.makeOrder,
            getTransactions: this.getTransactions,
        }

        return (
            <MyContext.Provider value={expose}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}


function withContext(Context, Component) {
    return props => {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context}/>}
            </Context.Consumer>
        );
    }
}

export {withContext};
export default MyContextProvider;