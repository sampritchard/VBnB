# VeBnB - Makers Academy Week 6 Project

Mission Statement - A home away from home for every vegan

```
'If you reach for the heavens, you will end up in the clouds;
  If you reach for the clouds all you see is the pavement'

Pritchard et al.(2017), Retro - Address to Sakitalotte, Couch, Makers

```

### Packages used:
- Database Stucture
    - MongoDB
    - Mongoose
- Testing
    - Chai
    - Istanbul
    - Mocha
    - Zombie
- Server
  - Express
  - Body-Parser
  - EJS (for HTML files)
  - Cookie-Parser

### User Journey

|Route|Functionality|
|-----|-------------|
|/| A user can sign up or sign in as an owner or guest|
|/spaces/all| User can see a list of available spaces, with a name, address, price, description and image. They can also choose to request a specific space, add a new space or go to a page which shows all requested spaces|
|/spaces/new|Owner can enter a new space by filling out all the details (default image if none provided)|
|/spaces/requested|Owner can see all of the spaces that have been requested and can confirm a booking. If a space has been booked, it is removed from both the available and the requested list.|
|/confirm| After clicking on confirm the owner is redirected to a confirmation page.|


Note: Currently there is no distinction between Guest and Owner users

### User Stories   

1.
```
As an Owner,
So I can make some money,
I want to list a new space
```

2.
```
As an Owner,
So I can entice potential guests to book my space,
I want to include a name, a short description, and a price per night.
```

3.
```
As a Guest,
So I can rent a space,
I want to request a space for 1 night from the listing
```

4.
```
As an Owner,
So I can manage my spaces,
I want to approve any requests a guest has made
```

5.
```
As a User
So I can list a new space,
I want to sign up.
```

6.
```
As a Guest,
So I don't double-book any space,
I want reserved spaces not to be available
```

### Future Features

7.
```
As a Guest,
So I only reserve spaces I really want,
I only want to reserve a space after confirming
```
8.
```
As an Owner,
So I can make more money,
I want to list multiple spaces.
```
9.
```
As an Owner,
So I can manage my spaces,
I want to offer a range of available dates for each space.
```
