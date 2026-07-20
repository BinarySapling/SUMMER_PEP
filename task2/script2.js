function login() {
    return new Promise((resolve) => {
        console.log("1. Logging In User");

        setTimeout(() => {
            console.log("2. Logged In Successfully");
            resolve();
        }, 5000);
    });
}

function getUser() {
    return new Promise((resolve) => {
        console.log("3. Getting User INFO....");

        setTimeout(() => {
            console.log("4. User Info Fetched Successfully");
            resolve();
        }, 2000);
    });
}

function getOrders() {
    return new Promise((resolve) => {
        console.log("5. Fetching User's Orders");

        setTimeout(() => {
            console.log("6. Successful");
            resolve();
        }, 1000);
    });
}

function getOrderDetails() {
    return new Promise((resolve) => {
        console.log("7. Getting Details of Orders");

        setTimeout(() => {
            console.log("8. Order Info Fetched");
            resolve();
        }, 3000);
    });
}



login()
    .then(getUser)
    .then(getOrders)
    .then(getOrderDetails);