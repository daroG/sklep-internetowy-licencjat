import React, {createContext, Component} from 'react';
import axios from 'axios';
import Helpers from "./Helpers";
import {Logger} from "./utils/Logger";
import User from "./models/User";
import parseJwt from "./utils/JWTParser";

export const MyContext = createContext(null);

const URL_PRODUCTS = 'products';
const URL_PRODUCT_SAVE = 'auth/products';
const URL_PRODUCT_CHANGE_THUMBNAIL = 'auth/products';
const URL_PRODUCTS_CATEGORIES = 'products-categories';
const URL_PRODUCT_PREPOSITIONS = 'products';
const URL_LOGIN = 'auth/login';
const URL_REGISTER = 'auth/signup';
const URL_USER_SIMPLE_INFO = 'auth/user';
const URL_USER_INFO = 'auth/user/info';
const URL_USER_INFO_SAVE = 'auth/user/info';
const URL_USER_LIST = 'auth/users';
const URL_USER_UPDATE = 'auth/users';
const URL_LOGOUT = 'auth/logout';
const URL_ORDERS_LIST = 'auth/user/orders';
const URL_ORDERS_ALL = 'auth/orders';
const URL_MAKE_ORDER = 'auth/user/orders';
const URL_UPDATE_ORDER = 'auth/orders';

export const STATUS_ERROR = 'Error';
export const STATUS_SUCCESS = 'Success';

export const Axios = axios.create({
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
            isAdmin: false,
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
        this.updateUser = this.updateUser.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.getCart = this.getCart.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);

        this.getProduct = this.getProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProductsCategories = this.getProductsCategories.bind(this);
        this.getProductPrepositions = this.getProductPrepositions.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.changeProductThumbnail = this.changeProductThumbnail.bind(this);

        this.saveCart = this.saveCart.bind(this);
        this.readCart = this.readCart.bind(this);
        this.clearCart = this.clearCart.bind(this);

        this.getAllOrders = this.getAllOrders.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);

    }

    initializeAxios() {
        const loginToken = localStorage.getItem('loginToken');
        const loginTokenExpiredAt = Date.parse(localStorage.getItem('loginTokenExpiredAt'));

        if (loginToken && loginTokenExpiredAt && +loginTokenExpiredAt * 1000 > new Date().getTime()) {
            Axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`;
            Axios.defaults.headers.common['X-Requested-With'] = `XMLHttpRequest`;

            Logger.info(parseJwt(loginToken))

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
                    isAdmin: user.role && user.role.role === 1,
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
            if (userData && userData.data) {
                Logger.info('user info', userData.data)
                return userData.data;
            }
        }
        return false;
    }

    logoutUser() {

        Axios.get(URL_LOGOUT).then().catch(error => {
            if (error.response) {
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

        try {
            const register = await Axios.post(URL_REGISTER, {
                email: user.email,
                name: user.name,
                surname: user.surname,
                phone: user.tel,
                address: user.address,
                city: user.city,
                zipCode: user.zipCode,
                password: user.password,
                password_confirmation: user.passwordConfirm,
            });
            return register.data;
        } catch (err) {
            Logger.error(err.response.data);
            return Promise.reject(err);
        }
    }

    async loginUser({email, password}) {
        const login = await Axios.post(URL_LOGIN, {
            email: email,
            password: password,
            remember_me: true
        },).catch(() => {
            return {
                status: STATUS_ERROR
            }
        });

        if (!login || !login.data) {
            return {
                status: STATUS_ERROR
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

        return {status: STATUS_SUCCESS};
    }

    async getUserInfo() {
        const userInfo = await Axios.get(URL_USER_INFO).catch(err =>
            Logger.info(err)
        )

        if (!userInfo || !userInfo.data) {
            return null;
        }

        return User.fromObject(userInfo.data);
    }

    async updateUserInfo(data) {

        const user = User.fromObject(data);

        let toRet = true;
        await Axios.post(URL_USER_INFO_SAVE, user).catch(error => {
            if (error.response) {
                Logger.error(error.response.data);
                toRet = false;
            }
        });

        return toRet;
    }

    async getUsers(){
        let response = await Axios.get(URL_USER_LIST).catch(error => {
            if (error.response) {
                Logger.error(error.response.data);
            }
        });

        if(!response || !response.data) {
            return {status: STATUS_ERROR, users: []};
        }

        return {status: STATUS_SUCCESS, users: response.data};
    }

    async updateUser(userObject){

        if(!userObject.id){
            return {status: STATUS_ERROR};
        }

        let userData = {};

        ['is_admin', 'name', 'password', 'email'].forEach(attr => {
            if (attr in userObject){
                userData[attr] = userObject[attr];
            }
        })

        let toRet = true;
        let response = await Axios.post(`${URL_USER_UPDATE}/${userObject.id}`, userData).catch(error => {
            if (error.response) {
                Logger.error(error.response.data);
                toRet = false;
            }
        });

        return {status: toRet ? STATUS_SUCCESS: STATUS_ERROR, message: response?.data?.message};

    }

    getCart() {
        return this.state.cart;
    }

    async getProduct(id) {

        let response = await Axios.get(`${URL_PRODUCTS}/${id}`);
        if (!response || !response.data) {
            return {};
        }
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

    async getProductsCategories() {
        let response = await Axios.get(URL_PRODUCTS_CATEGORIES);

        if (response.data) {
            await this.setState({
                categories: response.data.map(c => Helpers.prepareCategory(c))
            })
        }

        return this.state.categories;
    }

    async getProductPrepositions(product) {
        try{
            let response = await Axios.get(`${URL_PRODUCT_PREPOSITIONS}/${product.id}/prepositions`);
            if(response.data){
                return {status: STATUS_SUCCESS, prepositions: response.data.map(p => Helpers.prepareProduct(p))};
            }
        }catch(error){
            Logger.error(error.data);
        }
        return {status: STATUS_ERROR, prepositions: []};
    }

    async saveProduct(product) {
        let status = STATUS_SUCCESS;
        let response = await Axios.post(URL_PRODUCT_SAVE, product).catch(error => {
            if (error.response) {
                Logger.error(error.response.data);
                status = STATUS_ERROR;
            }
        });

        if (!response || !response?.data) {
            status = STATUS_ERROR;
        }

        Logger.info('files:', product.files);

        const products = await this.getProducts()

        return {status: status, products: products}
    }

    async changeProductThumbnail(productId, thumbnailMediaId){
        let status = STATUS_SUCCESS;
        let response = await Axios.post(`${URL_PRODUCT_CHANGE_THUMBNAIL}/${productId}/thumbnail`, {id: thumbnailMediaId}).catch(error => {
            if (error.response) {
                Logger.error(error.response.data);
                status = STATUS_ERROR;
            }
        });

        if (!response || !response?.data) {
            status = STATUS_ERROR;
        }

        return {status: status, product: response?.data}
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

        if (response.error) {
            Logger.info(response);
            return null;
        }

        Logger.info(response.data);

        return response.data;
    }

    async getAllOrders() {

        const returnOnError = {status: STATUS_ERROR, orders: []};

        try{
            let response = await Axios.get(URL_ORDERS_ALL);
            if (response.data){
                return {status: STATUS_SUCCESS, orders: response.data}
            }
            return returnOnError;
        }catch(error) {
            return returnOnError;
        }
    }

    async updateOrder({id, status}){

        const returnOnError = {status: STATUS_ERROR};

        try{
            let response = await Axios.post(`${URL_UPDATE_ORDER}/${id}`, {status: status});

            if (response.data){
                return {status: STATUS_SUCCESS};
            }
            return returnOnError;

        }catch(error){
            return returnOnError;
        }

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
            updateUser: this.updateUser,
            getUsers: this.getUsers,
            addProductToCart: this.addProductToCart,
            removeProductFromCart: this.removeProductFromCart,
            clearCart: this.clearCart,
            getProduct: this.getProduct,
            getProducts: this.getProducts,
            saveProduct: this.saveProduct,
            changeProductThumbnail: this.changeProductThumbnail,
            getProductsCategories: this.getProductsCategories,
            getProductPrepositions: this.getProductPrepositions,
            getCart: this.getCart,
            makeOrder: this.makeOrder,
            getAllOrders: this.getAllOrders,
            updateOrder: this.updateOrder,
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