# Mitch's Rare Treasures

Mitch has gone into business! 


After taking offence at a remark about his business acumen, he has charged headlong into establishing a network of antiques shops around the country. His jealous former colleagues have tried to follow him into the already crowded field, and now it's time for him to do a little market research. You have to help.

### Fetching your dev-data

Your first task of the day is to use Mitch's premade `fetch-dev-data` script to populate your dev-data directory. 

## Day-1  Seeding

Mitch was going to enter this data by hand, but it was getting a little tiresome. Help him out by creating a **seed** function for the insertion of data using `knex`. 

You will need to think about how to maintain relations between the data before they are inserted into the db.
In the database, shops should reference their owner by the **owner_id** and treasures should reference the shop they belong to by the **shop_id** (see the setup sql file). 


## Day-2 Building endpoints with TDD

It's essential that each endpoint is tested, including a test for each query! Avoid testing for too many things in one assertion.
It might be worth using a very small dataset (you can use the data in your `test-setup.sql` file!). You certainly don't want to rely on the randomness of that fetch-dev-data function...

**GET**

Create an endpoint to allow Mitch to view all the treasures currently available.

##

`/api/treasures`

  *responds with all treasures, including the shop name and details*
  * each treasure shoud have the following keys:
    - treasure_id
    - treasure_name
    - colour
    - age
    - **shop_name**
  * default limit: 25 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: cost_at_auction
  * you should be able to sort on age
  * you should also be able to add the following queries: 
    - colour
    - max_age
    - mix_age
    - max_price
    - min_price

**POST**

You recently sorted through your attic and discovered some treasures of your own! As a good friend of Mitch, you entrust him with the sale of your precious items. Create an endpoint to add a new treasure.

##

`/api/treasures`

  *posts a new treasure to a shop*
  * should post a new treasure to a given shop
  * your new treasure should have the following keys 
    - treasure_name
    - colour
    - age
    - cost_at_auction
    - shop_id (references an existing shop_id)

**PATCH**

The shop where Mitch has sent your treasures is having a sale. Create an endpoint to allow him to reduce the price of an item.

##

`/api/treasures/:treasure_id`

  *updates a treasure in the database given a treasure id*
  * should be able to update the price of a given treasure
  * your patch request should contain the following information:
    - cost_at_auction

**DELETE**

Congratulations! Your item has been sold! Create an endpoint to delete your treasure from the database.

##

`/api/treasures/:treasure_id`

  *deletes a treasure from the database given a treasure id*
  * should be able to remove an existing treasure from the database, using the treasure_id

**GET**

Create an endpoint which allows Mitch to see all the shops in his network. He also needs to know how much capital is in each shop.

##

`/api/shops` 

  *responds with all shops*

  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: shop_name
  * for each shop object in the `/api/shops` endpoint, there should be a `stock_value` property which specifies the total value of each shop's stock.
  * each shop object should have the following properties:
    - shop_id
    - shop_name
    - shop_owner (the name of the shop's owner)
    - slogan
    - **stock_value** (the total cost of treasures belonging to the shop)

**GET**

Create an endpoint that lets Mitch see information about all the shop owners. 

##

`/api/owners/`

  *responds with all owners*
  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * you should be able to sort on forename, age.
  * you should also be able to add the following queries: 
    - max_age, 
    - min_age, 
    - exact_age, 
    - forename,
    - surname


### Advanced

- For each user object in the `/api/owners` endpoint, there should also be a
  * `shop_count`  specifying the number of shops for that user
  * `stock_value` specifying the total value of all of their stock

### Even more...

* If you have finished all of the sections above, (and checked with us :)) then you can try implementing pagination for your API.  This is where your API can accept queries like this: `/api/treasures?page=2&limit=3`.  In this case, you would think of all the treasures as being paged in groups of 3 and you give the user the second page.  For this task you need to think carefully about how to calculate the offset given that you know what the limit and the page number is.
