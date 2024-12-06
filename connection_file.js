const readline = require("readline");
const sequelize = require("./util/database");
const Customer = require("./models/customer");
const Order = require("./models/orders");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Customer.hasMany(Order);

const performSelect = async () => {
  rl.question(
    "Choose select option: 1. Select by Customer ID  2. Select All Customers: ",
    async (choice) => {
      if (choice === "1") {
        rl.question("Enter Customer ID: ", async (id) => {
          try {
            const customer = await Customer.findByPk(id, { include: Order });
            if (!customer) {
              console.log(`Customer with ID ${id} not found.`);
            } else {
              console.log("Customer Details:", customer.toJSON());
            }
          } catch (err) {
            console.error("Error fetching customer:", err);
          }
          promptAgain(); // Return to main menu after fetching
        });
      } else if (choice === "2") {
        const customers = await Customer.findAll({ include: Order, order: [['id', 'ASC']] });
        if (customers.length === 0) {
          console.log("No customers found.");
        } else {
          console.log("All Customers:");
          customers.forEach((customer) => {
            console.log(customer.toJSON());
          });
        }
        promptAgain(); // Return to main menu after fetching
      } else {
        console.log("Invalid choice, try again.");
        promptAgain(); // Return to main menu for invalid choice
      }
    }
  );
};

const performInsert = async () => {
  rl.question("Enter customer name: ", async (name) => {
    rl.question("Enter customer email: ", async (email) => {
      try {
        const customer = await Customer.create({ name, email });
        console.log("Customer created:", customer);

        rl.question("Enter order total for this customer: ", async (total) => {
          // Insert order
          const order = await customer.createOrder({ total });
          console.log("Order created:", order);
          promptAgain(); // Return to main menu after insertion
        });
      } catch (err) {
        console.error("Error inserting data:", err);
        promptAgain(); // Return to main menu on error
      }
    });
  });
};

const performUpdate = async () => {
  rl.question("Enter customer ID to update: ", async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      console.log("Customer not found.");
      promptAgain(); // Return to main menu if customer not found
      return;
    }
    rl.question(
      "What do you want to update? 1. Name  2. Email  3. Order Total: ",
      async (choice) => {
        if (choice === "1") {
          // Update name
          rl.question("Enter new customer name: ", async (name) => {
            try {
              customer.name = name;
              await customer.save();
              console.log("Customer name updated:", customer.toJSON());
            } catch (err) {
              console.error("Error updating name:", err);
            }
            promptAgain(); // Return to main menu after update
          });
        } else if (choice === "2") {
          // Update email
          rl.question("Enter new customer email: ", async (email) => {
            try {
              customer.email = email;
              await customer.save();
              console.log("Customer email updated:", customer.toJSON());
            } catch (err) {
              console.error("Error updating email:", err);
            }
            promptAgain(); // Return to main menu after update
          });
        } else if (choice === "3") {
          // Update order total
          const order = await Order.findOne({ where: { customerId: id } });
          if (!order) {
            console.log("No order found for this customer.");
            promptAgain(); // Return to main menu if no order found
            return;
          }
          rl.question("Enter new order total: ", async (total) => {
            try {
              order.total = total;
              await order.save();
              console.log("Order total updated:", order.toJSON());
            } catch (err) {
              console.error("Error updating order total:", err);
            }
            promptAgain(); // Return to main menu after update
          });
        } else {
          console.log("Invalid choice, returning to main menu.");
          promptAgain(); // Return to main menu on invalid choice
        }
      }
    );
  });
};

const performDelete = async () => {
  rl.question("Enter customer ID: ", async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      console.log("Customer not found.");
      promptAgain(); // Return to main menu if customer not found
      return;
    }
   
    await Order.destroy({ where: { customerId: id } });
    console.log("Orders deleted for customer ID:", id);

    await customer.destroy();
    console.log("Customer deleted.");
    promptAgain(); // Return to main menu after deletion
  });
};

const promptAgain = () => {
  rl.question("Choose operation: 1. Insert  2. Update  3. Delete  4. Select  5. Exit: ", (action) => {
    if (action === "1") {
      performInsert();
    } else if (action === "2") {
      performUpdate();
    } else if (action === "3") {
      performDelete();
    } else if (action === "4") {
      performSelect();
    } else if (action === "5") {
      console.log("Exiting the program.");
      rl.close(); // Correctly exit the program
    } else {
      console.log("Invalid choice. Try again.");
      promptAgain(); // Re-prompt if invalid choice
    }
  });
};

sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Database synchronized.");
    promptAgain(); // Start the main menu after successful sync
  })
  .catch(err => {
    console.error("Error synchronizing database:", err);
    rl.close();
  });
