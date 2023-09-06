# YelpCamp

- A full-stack web application that allows users to create and review campgrounds.
- Used Node.js, Express, MongoDB, and Bootstrap.
- RESTful routing is used to redirect users to the appropriate page.
- Cloudinary Hosted Images, and Mapbox API for location.
- MongoDB is hosted online in Mongo Atlas if desired.
- Authentication is handled using Passport.js.
- Users can create, edit, and remove campgrounds.
- Users can review campgrounds once, and edit or remove their review.
- Originally Published to Heroku.

**Requirements**
For local dev: 
- npm 9.8.0, 
- Local mongoDB 6.0.8 or Mongo Atlas Cloud DB

- Cloudinary.com account, key and secret.
- Mapbox token.


From the YelpCamp Directory, run `npm install` to retrieve the following:

```jsx
- "@mapbox/mapbox-sdk": "^0.15.3",
- "cloudinary": "^1.40.0",
- "connect-flash": "^0.1.1",
- "connect-mongo": "^5.0.0",
- "dotenv": "^16.3.1",
- "ejs": "^3.1.9",
- "ejs-mate": "^4.0.0",
- "express": "^4.18.2",
- "express-mongo-sanitize": "^2.2.0",
- "express-session": "^1.17.3",
- "helmet": "^7.0.0",
- "joi": "^17.9.2",
- "method-override": "^3.0.0",
- "mongoose": "^7.4.3",
- "morgan": "^1.10.0",
- "multer": "^1.4.5-lts.1",
- "multer-storage-cloudinary": "^4.0.0",
- "passport": "^0.6.0",
- "passport-local-mongoose": "^8.0.0",
- "sanitize-html": "^2.11.0"
```

Create .env file in the local directory with the following:

```bash
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_KEY=<key>
CLOUDINARY_SECRET=<secret>
MAPBOX_TOKEN=<token>
DB_URL=<dburl>
```

Stand up YelpCamp locally with `node app.js` 
(optional) run nodemon locally, and use `nodemon app.js`.

