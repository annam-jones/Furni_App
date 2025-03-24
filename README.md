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






