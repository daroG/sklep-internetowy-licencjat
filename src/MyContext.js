import React, { createContext, Component } from 'react';
import axios from 'axios';

export const MyContext = createContext(null);

const Axios = axios.create({
    baseURL: 'http://sklep-internetowy.loc/api.php/',
    headers: {
        'Content-type': 'application/json',
    }
})

class MyContextProvider extends Component{
    constructor(props){
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

        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);

        this.getProduct = this.getProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.saveCart = this.saveCart.bind(this);
        this.readCart = this.readCart.bind(this);
        this.clearCart = this.clearCart.bind(this);

        this.makeTransaction = this.makeTransaction.bind(this);

    }

    initializeAxios(){
        const loginToken = localStorage.getItem('loginToken');
        const loginTokenExpiredAt = localStorage.getItem('loginTokenExpiredAt');

        if(loginToken && loginTokenExpiredAt && +loginTokenExpiredAt * 1000 > new Date().getTime()) {
            Axios.defaults.headers.common['Authorization'] = `bearer ${loginToken}`;
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.readCart();
        this.isLoggedIn().then(user => {
            if(user) {
                this.setState({
                    ...this.state,
                    showLogin: false,
                    isAuthenticated: true,
                    user: user,
                });
            }
        });
    }

    readCart(){
        const savedCart = localStorage.getItem('cart');

        if(savedCart){
            try {
                const cart = JSON.parse(savedCart);

                this.setState({
                    ...this.state,
                    cart: cart
                })
            }catch(e){
                console.warn(e.message);
            }
        }
    }

    saveCart(){
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }

    addProductToCart(product){
        this.setState({
            ...this.state,
            cart: [...this.state.cart, product]
        }, () => this.saveCart())

        console.log("Context", this.state);
    }

    removeProductFromCart(product){
        this.setState({
            ...this.state,
            cart: this.state.cart.filter(p => p !== product)
        }, () => this.saveCart())


    }

    clearCart(){
        this.setState({
            ...this.state,
            cart: []
        }, () => this.saveCart())
    }

    async isLoggedIn(){

        console.log("isLoggedIn called");

        if(this.initializeAxios()){

            const userData = await Axios.post("get_user_info");
            console.log(userData.data)
            if(userData && userData.data && userData.data.status && userData.data.status === 'OK' && userData.data.user){
                return userData.data.user;
            }
        }
        return false;
    }

    logoutUser(){
        localStorage.removeItem('loginToken');
        localStorage.removeItem('loginTokenExpiredAt');
        this.setState({
            ...this.state,
            isAuthenticated: false,
            user: null,
            showLogin: true,
        })
    }

    async registerUser(user){
        const register = await Axios.post('register', {
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

    async loginUser({email, password}){
        const login = await Axios.post('login', {
            email: email,
            password: password,
        }, ).catch(() => {

            return {
                status: "ERROR"
            }
        });

        if(login && login.data && login.data.status === 'OK' && login.data.jwt && login.data.expire){
            localStorage.setItem('loginToken', login.data.jwt);
            localStorage.setItem('loginTokenExpiredAt', login.data.expire);

            this.setState({
                ...this.state,
                showLogin: false,
                isAuthenticated: true,
                user: login.data.user,
            });
        }

        await this.isLoggedIn();

        return login.data;
    }

    async getUserInfo(){
        const userInfo = await Axios.post('get_user_info', {
            getAll: true
        }).catch(err =>
            console.log(err)
        )

        console.log("getUserInfo called", userInfo);

        if(userInfo && userInfo.data.status === 'OK' && userInfo.data.type === 'all'){
            return userInfo.data.user;
        }


        return {};
    }

    async getProduct(id){

        let response = await Axios.post('get_product', {
            id: id,
        });

        return response.data;

    }
    async getProducts(){

        let response = await Axios.get('get_products');

        if(response.data){
            this.setState({
                products: response.data
            })
        }

        return response.data;

    }

    async makeTransaction(data){
        let response = await Axios.post('make_transaction', {...data,
        cart: this.state.cart});

        if(response.data){
            console.log(response.data);
        }else{
            console.warn(response);
        }

        return response?.data;
    }

    async getTransactions(){
        let response = await Axios.post('get_transaction_list', {});

        if(response.data){
            console.log(response.data);
        }else{
            console.warn(response);
        }

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
            addProductToCart: this.addProductToCart,
            removeProductFromCart: this.removeProductFromCart,
            clearCart: this.clearCart,
            getProduct: this.getProduct,
            getProducts: this.getProducts,
            makeTransaction: this.makeTransaction,
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
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}

export {withContext};
export default MyContextProvider;