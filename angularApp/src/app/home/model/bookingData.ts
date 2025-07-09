export class bookingData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;     
    message: string;
    bookingDetails: {
        serviceName: string;
        bookingDateTime: string;
        address: string;
        price: string;
        time: string;
        slot: string;
    }

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        country: string,
        message: string,   
        bookingDetails: {
            serviceName: string;
            bookingDateTime: string;
            address: string;
            price: string;
            time: string;
            slot: string;
        }
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.message = message;
        this.bookingDetails = bookingDetails;
    }
}