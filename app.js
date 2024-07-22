const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const Customer = require("./models/customer.js");

const userAction = (input) => {
    switch(input){
        case 1:
            createCustomer();
            break;
        case 2:
            viewCustomers();
            break;
        case 3:
            updateCustomer();
            break;
        case 4:
            deleteCustomer();
            break;
        // default:

    }
}
  
const showMessage = () => {
    console.log(`
      Welcome to the CRM
  
  What would you like to do?
  
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit
  
  Number of action to run:`);
  
  
}
  


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB")
    await runQueries()
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
    process.exit()
}

  const runQueries = async () => {
    console.log("Queries running.")
    showMessage();
    await viewCustomers();
      // await find()
  }

  connect();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

const createCustomer = async () => {

    const customerData = {
        name: "Ali",
        age: 20,
    }

    const customer = await Customer.create(customerData)
    console.log("New Customer: ", customer);
}

const viewCustomers = async () => {
    const customers = await Customer.find({});
    console.log("All todos: ", customers);
}

const updateCustomer = async () => {
    const id = '669ee39bf33eec7dd63c5b93';
    const updateCustomer = await Customer.findByIdAndUpdate(
        id,
    { 
        name: 'Redah',
        age: 22
     },
    { new: true }
    );
    console.log("Update Customer: ", updateCustomer );
}

const deleteCustomer = async () => {
    const id = '669ee39bf33eec7dd63c5b93';
    const delCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed Customer: ', delCustomer);
}