//  function login(){
//     console.log("1. Logging In User");

//     setTimeout(()=>{
//         console.log('2: Logged In SUccessfull')
//     },5000)
// }
// function getUser(){
//     console.log("3. Getting  User INFO....");

//     setTimeout(()=>{
//         console.log('4: User Info Fetched In SUccessfull')
//     },2000)
// }
// function getOrders(){
//     console.log("5. Fetching user's Orders");

//     setTimeout(()=>{
//         console.log('6: SUccessfull')
//     },1000)
// }
// function getOrderDetails(){
//     console.log("7: Getting details of orders");

//     setTimeout(()=>{
//         console.log('8: Order Info Fetched')
//     },3000)
// }






function login(callback) {
    console.log("1. Logging In User");

    setTimeout(() => {
        console.log("2. Logged In Successfully");
        callback();
    }, 5000);
}

function getUser(callback) {
    console.log("3. Getting User INFO....");

    setTimeout(() => {
        console.log("4. User Info Fetched Successfully");
        callback();
    }, 2000);
}

function getOrders(callback) {
    console.log("5. Fetching User's Orders");

    setTimeout(() => {
        console.log("6. Successful");
        callback();
    }, 1000);
}

function getOrderDetails() {
    console.log("7. Getting Details of Orders");

    setTimeout(() => {
        console.log("8. Order Info Fetched");
    }, 3000);
}

login(() => {
    getUser(() => {
        getOrders(() => {
            getOrderDetails();
        });
    });
});

// login()
// getUser()
// getOrders()
// getOrderDetails()



// console.log("Hello")