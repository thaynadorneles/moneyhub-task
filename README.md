# My Solution:

For my solution, I have used `axios` and `jest` as additional packages. The new routes can be found at the bottom of this readme along with where the other routes are specified.

Run the tests within the `admin` folder with
```bash
npm test
```
## Questions

###### How might you make this service more secure?

There would need to be authorization, so that only those that are allowed can have access to this service.

###### How would you make this solution scale to millions of records?

Data could be dealt with in smaller batches, this is specifically true for those functions dealing with all the investment data. If this data was being read through a stream for example, we could slow it down so that we can calculate the holding values per batches.

Another solution could be having this run on the Cloud, somewhere where we could increase the size of the server as much as we need to, so that we could run this much faster. As this service would only need to be running when it is requested, AWS Lambda could be a useful tool for this.

Could also scale by keeping a cache of the latest holding values calculated, so that if it was already in cache, you wouldn't need to re-calculate it. However, if the investments can be changed frequently, then you'd also need to know the last time this was changed to know if the cache is still correct. Therefore depending on whether the investments can be changed or if they are changed frequently, this might not be the best solution.

###### What else would you have liked to improve given more time?

Given more time, I'd like to go back to the tests and mock the requests, so that I'd know that the test data would never be changed, instead of using the data that is being worked on. This would allow for tests to be more accurate, as we would have full control of what we expect the response to be. Furthermore, I would have also liked to test that when an error occurs, my code does what is expected. For example, you could get an error when using the `getHoldingAccount()` function, and this should also be tested.

I would also like to clarify my assumptions to make sure that what I have done is what was expected.

## Assumptions
- The date in the holding values should be the date in the investment record, and not the day this was created. The reason for this is that there are cases in the example, such as where Billy Bob created two different investment records for the same holding, but with different `investmentTotal`'s and in different `dates`. It felt strange having the same date for these two holding values, and since the holding value isn't affected by the date, it seemed to me that it was wise to keep the date in which the investment was made.

# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the csv report to be sent as json
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
- `/admin/value/investments` get the holding value for all investments
- `/admin/value/investments/:id` get the holding value for an investment record by id
- `/admin/generate/report` get and send report with the holding values of all investments
