
# Ethivore Ecommerce Site

This is a project I started in order to further my skills in using a full JS stack. The technologies used are React, Redux, Express, Node, Mongoose and MongoDB. A live version demo, deployed on Heroku, is in progress; and there are a bunch of fixes/features on the todo list. All suggestions are welcome!  


## Installation - Frontend

Install the dependencies by cd-ing into the `/frontend` directory and running:

```bash
$ npm install
``` 

## Installation - Database and Backend

Ensure you have **[MongoDB](https://www.mongodb.com/try/download/community)** and **[MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools)** both installed. Or if you prefer to use Homebrew run: 

```bash
$ brew install mongodb-community@4.4
```

Then to install the MongoDB command line tools:

```bash
$ brew install mongodb/brew/mongodb-database-tools
```

Once this is done install **[MongoDB Compass](https://www.mongodb.com/try/download/compass)** to manage the data. Once installed, open it up, connect to your localhost and create a new database titled 'ethivore'. Create a collection titled 'products'. On your command line, cd into ethivore/backend/db_backup and run the following command from your terminal to get some example products:

```bash
$ mongoimport --db=ethivore --collection=products --file=products.json
```

To get an example login, from the same directory run:

```bash
$ mongoimport --db=ethivore --collection=users --file=users.json
```

Finally, to install the backend dependencies, cd up into the ethivore/ root and run:

```bash
$ npm install
```

## Setting up PayPal

To demonstrate full use of the platform for payment and tracking/updating of orders, you'll need to add your own PayPal sandbox client ID. To obtain this you'll need to **[follow this link](https://www.paypal.com/bizsignup/#/checkAccount)** and follow the steps to set up a PayPal business account. 

Once you've set up an account, got to the **[PayPal Developer dashboard](https://developer.paypal.com/developer/applications)** and sign in. In 'My apps & credentials' ensure 'Sandbox' is selected, click 'create app', for the App Name type 'Ethivore Demo' and click 'create app'.

Once that's done, go back to 'My apps & credentials' and click on 'Ethivore Demo'. Copy the Client ID and paste into ethivore/.env:

```text
MONGODB_URL=mongodb://localhost/ethivore
JWT_SECRET=somethingsecret
PAYPAL_CLIENT_ID=<your PayPal Client ID here>
accessKeyId=
secretAccessKey=
```

## Setting up functionality to upload images to AWS (Optional)

If you wish to use the functionality to upload images to AWS, rather than to the local server, you can set up an AWS S3 Bucket and then in the ethivore/.env file, paste your Access Key ID and Secret Access Key into the relevant lines:

```text
MONGODB_URL=mongodb://localhost/ethivore
JWT_SECRET=somethingsecret
PAYPAL_CLIENT_ID=<your PayPal Client ID here>
accessKeyId=<your AWS Access Key ID here>
secretAccessKey=<your AWS Secret Access Key here>
```

You will then need to uncomment lines 12-13 in ethivore/backend/config.js, and lines 26-47 in ethivore/backend/routes/uploadRoute.js. You will also need to place the name of your S3 Bucket in line 35 of uploadRoute.js.

## Routes

All routes on your machine will point to http://localhost:5000 once you have started the backend. One of the ToDos is to make the routes more RESTful. All the Express routes can be found in ethivore/backend/server.js and then the various extensions to those slugs are found in their respective files in ethivore/backend/routes:

### GET

To get the admin details so you can login as admin:

```
GET /api/users/createadmin
```

To get all products and their associated reviews, including filtering products by category or keyword, or sorted by price:

```
GET /api/products/
```

To get a specific product:

```
GET /api/products/{product_id}
```

To get all orders:

```
GET /api/orders/
```

To get the user's own orders (requires authentication from signin):
```
GET /api/orders/myorders
```

To get a specific order (requires authentication from signin):

```
GET /api/orders/{order_id}
```

### POST

To sign in a user. Takes an email and a password, and returns an authentication token and whether or not the user is an Admin:

```
POST /users/signin
```

To register a new user. Takes a name, an email and a password, and returns an authentication token and whether or not the user is an Admin:

```
POST /users/register
```

To sign in a user. Takes an email and a password, and returns an authentication token and whether or not the user is an Admin:

```
POST /users/signin
```

To create a new product. Takes a JSON object with a category ('meat', 'vegetables' or 'cookbooks'), a product name, an image, an author/description, a price and a count-in-stock, and returns either a 201 response with a success message or a 500 response with an error message:

```
POST /products/
```

To create a new review of an existing product. Takes a JSON object with a name, a rating out of 5, and a review comment, and pushes that review to the reviews array of the product matching the product ID of the slug. It then returns either a 201 response with a success message and a recalculated average review score, or a 500 response with an error message:

```
POST /products/{product_id}/reviews
```

To create a new order. Takes a JSON object with an array of products, the user's ID, the shipping status, the payment status, the total price of the products, the shippng cost, and the combined total cost of both products and shipping. It then returns a 201 response with a success message:

```
POST /orders/
```

### PUT

TODO

### DELETE

TODO