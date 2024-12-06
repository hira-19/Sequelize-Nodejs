const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const { encrypt, decrypt } = require("../util/encr-decr");

const Customer = sequelize.define("customer",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type :Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
}, {
  hooks: {
      beforeCreate: (customer, options) => {
          customer.email = encrypt(customer.email);  // Encrypt email before creating a recordkk
      },
      beforeUpdate: (customer, options) => {
          customer.email = encrypt(customer.email); // Encrypt email before updating the record
      },
      afterFind: (customers, options) => {
        if (Array.isArray(customers)) {
            customers.forEach(customer => {
                if (customer.email) { // Check if email exists
                    try {
                        customer.email = decrypt(customer.email);
                    } catch (err) {
                        console.error("Error decrypting email:", err);
                    }
                }
            });
        } else if (customers) {
            if (customers.email) { // Check if email exists
                try {
                    customers.email = decrypt(customers.email);
                } catch (err) {
                    console.error("Error decrypting email:", err);
                }
            }
        }
    }
  }
});

module.exports = Customer;