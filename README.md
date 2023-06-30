# Food Delivery React App
Production version of the project is available [here](https://aesthetic-alfajores-be9fc5.netlify.app/).

### Description of the project
Responsive web app, which allows to order food via adding to the shopping card, send order data to back-end and fetch the history of orders by email.

## Needed Scripts
Using the app in the development mode:
1) Download repo, extract files.
2) Install all dependencies:
    - cd front -> npm i;
    - cd back -> npm i;
3) To have an access to DB: cd back -> $ touch .env -> MONGOLAB_URI = 'YOUR PASS TO DB'
4) Display a google map: cd front -> $ touch .env -> REACT_APP_API_KEY = YOUR API KEY

## MongoDB Schemas
Thre are 2 JSON storing objects:
1) restaurants : {
     _id:ObjectID(),
    restaurantName: string,
    menu:[{
        foodName:string,
        price:int,
        img:srting,
        description:string
        }
    ]
 }
 2) clientOrders:{
    _id:ObjectID(),
    order:[{
        foodName:string,
        price:int,
        img:srting,
        description:string,
        restaurantName:string,
        quantity:int,
        totalPrice:int
        }
    ],
    client:{
    name:string,
    email:string,
    phone:string,
    adress:string
    }
 }







