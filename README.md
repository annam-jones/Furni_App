# Furni App 

- Furni app is a platform where a user can sign up and post images of furniture they are trying to source.
Other users can comment on these posts letting the user know if they have this item or something similar
to sell.
- We were instructed to only use express and mongoose to create this project with the aim of
understanding how databases work.
- Full CRUD 

## Deployment Link 
https://furni-source.netlify.app/

## Technologies Used 

- Express
- CSS
- Mongoose
- EJS

## Planning 

I created wireframes to help me visualize my app before building it. 

![Screenshot_2025-01-16_at_15 55 15 (1)](https://github.com/user-attachments/assets/2b2b0df7-c562-4570-81c6-ee3f26d54356)

My Schemas

![Screenshot_2025-01-16_at_15 55 35 (1)](https://github.com/user-attachments/assets/b301e63b-e620-40e4-baae-d4d15a0d3464)

## Code 

<img width="610" alt="Screenshot 2025-03-24 at 12 05 27" src="https://github.com/user-attachments/assets/c4f8dc63-fdff-4a75-8f7c-d57e40e5d83f" />

This code defines a MongoDB user schema with validation for unique usernames and emails. It implements secure password handling through bcrypt, automatically hashing passwords before saving and providing a method to verify login credentials. The schema includes a validator to ensure valid email formats and uses the mongoose-unique-validator plugin to handle duplicate entry attempts gracefully. This forms the authentication foundation for your Express application, enabling user registration and secure login functionality.

<img width="698" alt="Screenshot 2025-03-24 at 12 06 21" src="https://github.com/user-attachments/assets/3adafc8e-93cc-4230-ab6a-3291f012ca79" />

This code implements an Express route handler for adding comments to furniture listings. It first verifies user authentication, returning a 401 error if the user isn't logged in. Then it locates the specified furniture item by ID, returning a 404 error if not found. If validations pass, it creates a new comment object with the user's content and ID, adds it to the furniture's comments array, and saves the updated document. Finally, it redirects the user back to the furniture details page or handles any errors through a custom error handler.

<img width="800" alt="Screenshot 2025-03-24 at 12 08 31" src="https://github.com/user-attachments/assets/83b5c12c-ace1-496b-8f81-26e88c636797" />

This EJS template serves as the base HTML structure for a furniture marketplace. It includes standard HTML5 doctype and responsive viewport settings, links to external CSS, and uses EJS includes (<%- include()%>) to incorporate reusable components like headers and navigation. The main content features a styled heading introducing "Furni" as a furniture sourcing platform. As an EJS file, it allows for dynamic content rendering on the server while maintaining a consistent layout structure.


<img width="552" alt="Screenshot 2025-03-24 at 12 10 43" src="https://github.com/user-attachments/assets/1703e3f9-3ebb-4674-baa8-ae5472c24a65" />

This code defines a database seeding function for a furniture marketplace application. It connects to MongoDB using an environment variable, drops any existing database to ensure a clean slate, and populates it with initial test data. The function creates a test user with credentials and then defines sample furniture posts (a wooden chair and dining table) with descriptions and image placeholders. It associates each furniture item with the created user by setting their user property to the generated user ID. This script provides developers with consistent test data for development and testing purposes.

## The App 

<img width="1412" alt="Furni_Home" src="https://github.com/user-attachments/assets/04ad0e82-80d0-4f67-9562-e6bd0fa0c19c" />

<img width="1421" alt="Furni_Index" src="https://github.com/user-attachments/assets/0fc5bcca-465e-4097-b57c-a1306880527a" />

<img width="1417" alt="Furni_Signup" src="https://github.com/user-attachments/assets/6511ab5c-1f8c-4665-ae40-0a618e93440e" />

<img width="1405" alt="Furni_Item" src="https://github.com/user-attachments/assets/3bc5a127-a164-489a-a146-881905e0103a" />

## Challenges 

- Route Organization, organizing API endpoints logically while keeping middleware, controllers, and routes maintainable as the application grows in complexity.
- Error Handling - Implementing consistent error handling patterns across different Express routes to provide meaningful feedback for both client applications and developers.

## Future Improvements 

- Advanced Search Functionality, add filters for furniture type, price range, condition, and location with autocomplete suggestions.
- Integrated Payment System, add secure payment processing for direct purchases through the platform.






