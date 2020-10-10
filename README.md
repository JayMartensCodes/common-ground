# Common-Ground

Welcome to **_Common-Ground_**, we asked our friends and family what functionality they were missing in their lives. We got a lot of answers, some great and some not so great. We ended up going with the idea of an app that would easily show you points of interest between you and your friend. Thus **_Common-Ground_** was born.
We wanted our App to be Single page, so React was the best choice so we used that on the front end.
For the backend, we used node and express because they intergrate well with React, and then psql for the database so we could utilize the advantages of a relational database.

## User Stories

- Have you ever wanted to meet up with a friend but can’t come up with a particular or fair destination spot for both of you? Well, with our app that is now possible. As you can see here once you access the common ground site we center the map using your browsers/users geolocation.

![landing-page](https://github.com/JayMartensCodes/common-ground/blob/master/docs/images/landing-page.PNG)

- From here I can set the parameters from within the nav bar at the top that I would like to search for such as a type of place, the search radius and the mode of transport we will use to travel.

- Next all you have to put in is your friend’s address or destination so we can calculate the mid point between both geolocations and set a search based on those parameters.

![search](docs\images\search-casa.png)

- Once we enter the address and search we can see the map automatically populate with the destination pin, search radius and icons of different places of interest depending on the icon.

- Pick a place you’re interested in
  Once you pick a place you are happy with you can see the directions route get updated automatically.
  You can send the location of the selected place to your friend’s email OR if you’re logged in with friends you can send it via the app!

![infowindow](docs\images\info-window.png)

- Let’s SIGN UP AND MAKE SOME FRIENDS!

![add-friend](docs\images\add-friend.png)

- Once logged in you can see all your friends populate the map LIVE!

![signed-in](docs\images\signed-in.png)

- Now we can check our friend requests and see our new friend!

![friend-req](docs\images\friend-request.png)

- Now we can select our friends and make a **_Common-Ground_** request based on their geolocation through websockets!

![friend-info](docs\images\friend-on-map.png)

- Let's serach the **_Common-Ground_** between us!

![common-ground-friend](docs\images\common-ground-friend.png)

- From here we can share the directions to the place selected through websockets which will auto populate the map!

![common-ground-req](docs\images\share-common-ground.png)

![common-ground-notif](docs\images\common-ground-notif.png)

![accepted-CG](docs\images\accepted-common-ground-req.png)

And there you have it folks! That was **_Common-Ground_**! Now we’re going to mention the challenges and where we envision the app to go from here!

## Road Map

- With such a complex app it required a lot of thought-out steps to ensure we included all the features we wanted. As we continue to scale our app, it would be nice if we could use our space more efficiently on the website and to build a mobile version.

- Going forward we would like to see Added features for live reviews, be able to vote on a place between different users and more business/transit information added dynamically from googles api.

- We would also like to see multi-user support, so we could calculate the points of interest between 3 or more friends/users as well as live geolocation updates so we can see when our friends are on their way!

## Dependencies

### Client-side

- React
- Material-UI
- Reach/Combobox
- react-google-maps/api
- axios
- bootstrap
- react-bootstrap
- react-cookie
- socket.io-client
- use-places-autocomplete

### Server-side

- Bcrypt
- body-parser
- cookie-parser
- express
- morgan
- pg
- socket.io
- nodemon

## About Us

- Declan O'Donnell
  - [GitHub](https://github.com/Dexyod)
  - [LinkedIn](https://www.linkedin.com/in/declanodonnell/)
- Jay Martens
  - [GitHub](https://github.com/JayMartensCodes)
  - [LinkedIn](https://www.linkedin.com/in/jaymartenscodes/)
- Julianna Lim
  - [GitHub](https://github.com/juliannalim)
  - [LinkedIn](https://www.linkedin.com/in/julianna-lim-91758927/)
