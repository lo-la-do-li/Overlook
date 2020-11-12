# Refactor Tractor Group Project: FitLit
## Author
[Lola Dolinsky](https://github.com/lo-la-do-li)

## Abstract
**OverLook Project:** The Overlook Hotel simulates a hotel management website. User-types include manager and customer, each of whom must login with username and password credentials. On successful login, the user is welcomed with a message on their respective dashboards. Each user-type is able to search available rooms in the calendar sidebar, and make a booking for a specific room on a specific date. The manager can view all users, and make a booking or delete a booking for a customer. 

**Overlook App Description:**
+ Manager dashboard displays today's hotel stats and revenue information, including:
  + Total Rooms Available for today’s date
  + Total revenue for today’s date
  + Percentage of rooms occupied
 
 * Customer dashboard displays their activity as a patron of Hotel Overlook, including:
   * Past and upcoming bookings
   * Total spent on bookings 

---
## Learning Goals
+ Use OOP to drive the design of the application and the code
+ Work with an API to send and receive data
+ Solidify the code review process
+ Create a test suite that thoroughly tests all functionality of a client-side application
---
## Challenges
+ 
## Wins
## Setup
+ Clone down this repo to your local computer.
+ CD into the project directory.
+ In your terminal, install all dependencies by running `npm install` 
+ Run `npm start` in your browser to configure webpack
+ Then, you will see a bunch of lines output to your terminal. One of those lines will be something like: `Project is running at http://localhost:8080/`
+ Go to http://localhost:8080/ in your browser to view the site.
---

## Hotel Overlook

### Customer Dashboard
The user will see this as their main view when they load the page.
![View Customer Dashboard]()

### Manager Dashboard
The user can click on the buttons on the card to get more information, both about their own stats and stats aggregated from all users.
![View Manager Dashboard]()

## Manager View All Customers View
![Access all customers at Hotel Overlook]()

### Search Available Rooms
The user can also click on the profile icon in the upper right hand corner to see some additional profile information and stats from their friends.
![Click the sidebar icon to select a date for your stay]()

### Book a Room at the Overlook
The user can click an "add" button located in the top left corner of the site, to input today's health info to be applied to their FitLit.
![Click the "book" button to stay at the Overlook]()

---
## Technologies:
+ JavaScript ES6
+ Webpack
+ Chai Spies
+ Sass/SCSS

## Project Management Tools and Practices:
+ Git Version Control
+ GitHub Project Board
+ Pull Request Template
+ Test-Driven Development (TDD)
+ Semantic HTML for Accessibility
