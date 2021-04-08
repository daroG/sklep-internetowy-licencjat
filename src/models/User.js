export default class User{
    constructor(name, surname, email, phone, address, city, zipCode) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
    }

    static fromObject(userObject) {
        const canCreateNewUser = ['name', 'surname', 'email', 'phone', 'address', 'city', 'zipCode'].reduce((prevValue, current) => {
            return prevValue && current in userObject
        }, true);

        return canCreateNewUser ? new User(userObject.name, userObject.surname, userObject.email, userObject.phone, userObject.address, userObject.city, userObject.zipCode,) : null;
    }
}