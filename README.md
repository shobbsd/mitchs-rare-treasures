# Mitch's Rare Treasures

Mitch has gone into business! 

After taking offence to a remark about his business acumen, he has charged headlong into establishing a network of antiques shops around the country. His jealous former colleagues have tried to follow him into the already crowded field, and now it's time for him to do a little market research. You have to help.

Your first task of the day is to use Mitch's premade `fetch-dev-data` script to populate your dev-data directory. 

Mitch was going to enter this data by hand, but it was getting a little tiresome. Help him out by creating a **seed** function for the batch insertion of data using `knex`. The insertion should maintain the current relationships in the data, and ensure things happen in the right order. These are big files, and there may be a more optimal way to insert the data than the simple `insert` method...

As more than a mere hobbyist, Mitch needs to know lots of information about everything in this newly formed DB. As such, he'll need an API, with a lot of queries, so he can really know the state of play.


## API

It's essential that each endpoint is tested, including with the queries! It might be worth using a very small dataset (you can use the data in your `test-setup.sql` file!). You certainly don't want to rely on the randomness of that fetch-dev-data function...

**GET**

## Day-1

`/api/shops` 
  *responds with all shops*

  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: shop_name

  * All the queries should be modifiable (for example, I should be able to sort descending, increase the number of votes or change the start result)

`/api/owners/:id/shops`
  *responds with all shops for an owner*
  
  * With the same queries as above!
  * each page response should include a shopCount property to represent the total number of shops owned by that owner


`/api/treasures`
  *responds with all treasures, including the shop name and details*
  * default limit: 25 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: cost_at_auction
  * All the above queries should be modifiable.
  * You should be able to sort on age
  * You should also be able to add the following queries: 
    - colour
    - max_age
    - mix_age
    - max_price
    - min_price
  

`/api/shops/:id/treasures`
  *responds with all treasures for a particular shop*
  * With the same queries as above!


`/api/owners/:id/treasures`
  *responds with all treasures for a particular owner, including the shop name and details*
  * With the same queries as above!


`/api/owners/`
  *responds with all owners*
  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: surnames

  * All the above queries should be modifiable.
  * You should be able to sort on forename, age.
  * You should also be able to add the following queries: 
    - max_age, 
    - min_age, 
    - exact_age, 
    - forename,
    - surname


## Day-1 -> Advanced

- Add another query to the `/api/treasures` endpoint, which, when set to true, adds a key to your response, specifying the total value of all the treasures .e.g `/api/treasures?show_total_cost=true`

- Add another query to the `/api/shops/:id/treasures` endpoint, which, when set to true, adds a key to your response, specifying the total value of all the treasures in that shop.

- Add another query to the `/api/owners/:id/treasures`, which, when set to true, adds a key to your response, specifying the total value of all the treasures that owner has.

### Very Advanced

- Add another query to the `/api/shops` endpoint, `stock_value` which when set to true, adds a key to each shop specifying the total value of its stock.
- Add two more queries to the `/api/users` endpoint,
  * `shop_count` which when set to true, adds a key specifying the count of all a users' shops.
  * `stock_value` which when set to true, adds a key to each user specifying the total value of all of their stock

