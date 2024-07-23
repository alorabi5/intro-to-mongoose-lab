const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const Customer = require("./models/customer.js");

const userAction = async (input) => {
    
    switch(input){
        case '1':
            await createCustomer();
            break;
        case '2':
            await viewCustomers();
            break;
        case '3':
            await updateCustomer();
            break;
        case '4':
            await deleteCustomer();
            break;
        default:
            await disconnect();

    }
}
  
const showMessage = async () => {
    console.log(`
      Welcome to the CRM
  
  What would you like to do?
  
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit`);
    
    await userAction(prompt('Number of action to run: '));
    
}



const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB")
    await runQueries()
}

const disconnect = async () => {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
    process.exit()
}

  const runQueries = async () => {
    console.log("Queries running.")
    await showMessage();
    await createCustomer();
  }

  connect();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

const createCustomer = async () => {

    const customerData = {
        name: prompt('Enter Customer Name: '),
        age: prompt("Enter Customer Age: "),
    }

    const customer = await Customer.create(customerData)
    console.log("New Customer: ", customer);
}

const viewCustomers = async () => {
    const customers = await Customer.find({});
    console.log("All Customers: ", customers);
}

const updateCustomer = async () => {
    const id = prompt("Enter Customer ID");
    const updateCustomer = await Customer.findByIdAndUpdate(
        id,
    { 
        name: prompt("Enter New Name"),
        age: prompt("Enter New Age")
     },
    { new: true }
    );
    console.log("Update Customer: ", updateCustomer );
}

const deleteCustomer = async () => {
    const id = prompt("Enter Customer ID");
    const delCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed Customer: ', delCustomer);
}