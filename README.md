# Mitch's Rare Treasures

Mitch has gone into business! 

After taking offence to a remark about his business acumen, he has charged headlong into establishing a network of antiques shops around the country. His jealous former colleagues have tried to follow him into the already crowded field, and now it's time for him to do a little market research. You have to help.

Your first task of the day is to use Mitch's premade `fetch-dev-data` script to populate your dev-data directory. 

Mitch was going to enter this data by hand, but it was getting a little tiresome. Help him out by creating a **seed** function for the batch insertion of data using `knex`. The insertion should maintain the current relationships in the data, and ensure things happen in the right order. These are big files, and there may be a more optimal way to insert the data than the simple `insert` method...

As more than a mere hobbyist, Mitch needs to know lots of information about everything in this newly formed DB. As such, he'll need an API, with a lot of queries, so he can really know the state of play.


## API

It's essential that each endpoint is tested, including with the queries! It might be worth using a very small dataset (you can use the data in your `test-setup.sql` file!). You certainly don't want to rely on the randomness of that fetch-dev-data function...

**GET**

##

`/api/shops` 
  *responds with all shops*

  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: shop_name


`/api/treasures`
  *responds with all treasures, including the shop name and details*
  * default limit: 25 per page
  * default start result: 1
  * default sort order: ascending
  * default sort criteria: cost_at_auction
  * You should be able to sort on age
  * You should also be able to add the following queries: 
    - colour
    - max_age
    - mix_age
    - max_price
    - min_price


`/api/owners/`
  *responds with all owners*
  * default limit: 10 per page
  * default start result: 1
  * default sort order: ascending
  * You should be able to sort on forename, age.
  * You should also be able to add the following queries: 
    - max_age, 
    - min_age, 
    - exact_age, 
    - forename,
    - surname


### Advanced

- For each shop object in the `/api/shops` endpoint, there should be a 
  * `stock_value` property which specifies the total value of each shop's stock.

- For each user object in the `/api/users` endpoint, there should also be a
  * `shop_count`  specifying the number of shops for that user
  * `stock_value` specifying the total value of all of their stock

### Even more...

* If you have finished all of the sections above, (and checked with us :)) then you can try implementing pagination for your API.  This is where your API can accept queries like this: `/api/treasures?page=2&limit=3`.  In this case, you would think of all the treasures as being paged in groups of 3 and you give the user the second page.  For this task you need to think carefully about how to calculate the offset given that you know what the limit and the page number is.