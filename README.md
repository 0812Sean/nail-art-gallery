# Nail Art Gallery
This project is a web application for uploading and managing nail art designs. It includes user authentication, design uploads, and categorization features.

![Screenshot](public/images/screenshot.png)


## To view this page, click [here](https://nail-art-gallery-app-ba812d622aee.herokuapp.com/).


## Technologies Used
This project utilizes several modern web development technologies and libraries:

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
- **Express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB:** A NoSQL database used to store user and design data.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model your application data.
- **EJS (Embedded JavaScript):** A simple templating language that lets you generate HTML markup with plain JavaScript.
- **Multer:** A Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- **Express-Session:** A middleware for managing sessions in Express applications, allowing user session handling.
- **dotenv:** A module that loads environment variables from a .env file into process.env.

## File Upload Configuration
This application uses Multer for handling file uploads. Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.

### Multer Configuration
The Multer configuration is set up in the **'app.js'** file as follows:
```const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
app.use('/designs', upload.single('image'));
```

### File Storage
- Destination: Files are stored in the **'public/uploads/'** directory.
```
destination: (req, file, cb) => {
  cb(null, 'public/uploads/');
}
```

- Filename: The filename is generated using the original field name, the current timestamp, and the original file extension.
```filename: (req, file, cb) => {
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
```

## Future Improvements

1. **User Profile Customization**:
   - Allow users to upload profile pictures.
   - Enable users to add a bio or personal description to their profiles.

2. **Enhanced Search and Filtering**:
   - Implement advanced search functionality to allow users to search designs by keywords, tags, or colors.
   - Add more filtering options such as popularity, recent uploads, and user ratings.

3. **Design Rating System**:
   - Introduce a rating system where users can rate and review designs.
   - Display average ratings and reviews on design detail pages.