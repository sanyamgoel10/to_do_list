# To-Do List Application

A simple to-do list app where users can create, update, delete, and view their notes.

## How to Run

1. **Clone the repository**  
   ```sh
   git clone https://github.com/sanyamgoel10/to_do_list.git
   cd to_do_list
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Update the config**
   By default, the config values have been added in the git only becuse it only contains the port on which the app needs to run. this can be updated in the config.js file.
5. **Start the Server**
   ```sh
   nodemon server
   ```
   
## API Endpoints

- **GET** `/notes` - Get all notes  
- **POST** `/notes` - Create a new note  
- **PUT** `/notes/:id` - Update a note  
- **DELETE** `/notes/:id` - Delete a note

## Sample Requests
After starting the server.js file, app can be accessed through http://localhost:3000.
- **GET**
   - URL: http://localhost:3000/notes
- **POST**
   - URL: http://localhost:3000/notes
   - Request Body: 
   ```sh
   {
    "Title": "Test Note 1",
    "Description": "Test Note 1 Description"
   }
   ```
- **PUT**
   - URL: http://localhost:3000/notes/:id
   - Path Variable
   ```sh
   id: 7
   ```
   - Request Body: 
   ```sh
   {
    "Title": "Test Note 1 Updated",
    "Description": "Test Note 1 Description Updated"
   }
   ```
- **DELETE**
   - URL: http://localhost:3000/notes/:id
   - Path Variable
   ```sh
   id: 7
   ```
