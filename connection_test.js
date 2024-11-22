const readline = require("readline");
const sequelize = require("./util/database");
const Customer = require("./models/customer");
const Order = require("./models/orders");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Customer.hasMany(Order);

const performInsert = async () => {
  rl.question("Enter customer name: ", async (name) => {
    rl.question("Enter customer email: ", async (email) => {
      try {
        const customer = await Customer.create({ name, email }); // Insert customer
        console.log("Customer created:", customer);

        rl.question("Enter order total for this customer: ", async (total) => {
          // Insert order for the customer
          const order = await customer.createOrder({ total });
          console.log("Order created:", order);
          promptAgain(); // Prompt for next operation
        });
      } catch (err) {
        console.error("Error inserting data:", err);
        promptAgain(); // Prompt for next operation
      }
    });
  });
};

const performUpdate = async () => {
  rl.question("Enter customer ID to update: ", async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      console.log("Customer not found.");
      promptAgain(); // Prompt for next operation
      return;
    }

    rl.question("Enter new customer name (leave blank to keep current): ", async (name) => {
      if (name) customer.name = name;

      rl.question("Enter new customer email (leave blank to keep current): ", async (email) => {
        if (email) customer.email = email;

        await customer.save();
        console.log("Customer updated:", customer);

        rl.question("Enter new order total (leave blank to keep current): ", async (total) => {
          if (total) {
            const order = await Order.findOne({ where: { customerId: customer.id } });
            if (order) {
              order.total = total;
              await order.save();
              console.log("Order updated:", order);
            } else {
              console.log("No order found for this customer.");
            }
          }
          promptAgain(); // Prompt for next operation
        });
      });
    });
  });
};

const performDelete = async () => {
  rl.question("Enter customer ID: ", async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      console.log("Customer not found.");
      promptAgain(); 
      return;
    }

    // Delete associated orders first
    await Order.destroy({ where: { customerId: id } });
    console.log("Orders deleted for customer ID:", id);

    // Now delete the customer
    await customer.destroy();
    console.log("Customer deleted.");
    promptAgain(); // Prompt for next operation
  });
};

// Main prompt function to choose an operation
const promptAgain = () => {
  rl.question("Choose operation: 1. Insert  2. Update 3. Delete 4. Exit: ", (action) => {
    if (action === "1") {
      performInsert();
    } else if (action === "2") {
      performUpdate();
    } else if (action === "3") {
      performDelete();
    } else if (action === "4") {
      console.log("Exiting the program...");
      rl.close(); // Exit the program
    } else {
      console.log("Invalid choice, try again.");
      promptAgain(); // Prompt again if input is invalid
    }
  });
};

// Start the program
sequelize.sync({ force: false }) // Set `force: false` to avoid resetting tables every time
  .then(() => {
    console.log("Database synchronized.");
    promptAgain(); // Show the menu to choose an operation
  })
  .catch(err => {
    console.error("Error synchronizing database:", err);
    rl.close();
  });
