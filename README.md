Here’s the improved and formatted version of the `README.md` in English:

---

# BusTicket  
**Ticket Management System** created with **TypeScript** and **Express** by **Deivis Torres Mena**.  

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/babyyoda62406/busticket.git
   ```

2. Install the dependencies:  
   ```bash
   npm install
   ```

3. Copy the `.env.template` file to `.env`:  
   ```bash
   cp .env.template .env
   ```

4. Fill in the `.env` file with the required values:  
   ```env
   PORT=3000
   DB_URL=mongodb://root:example@localhost:27017/busticket?authSource=admin
   SECRETORPRIVATEKEY=lPVFV5T0RFeE15d2laWGh3SWpveE56STVOVE14Tn
   TOKENEXPIRATION=1h
   ```
   You can replace these with your own values if needed.

5. If you don’t have a MongoDB server, you can use the `docker-compose.yml` file to set one up:  
   ```bash
   docker-compose up -d    
   ```

6. Run the server:  
   ```bash
   npm run dev
   ```

7. Open your postman and import the `BusTicket.postman_collection.json` file to test the endpoints (You can find this file in the root of repository).

## Features  

- **User registration**:  
  - The first registered user will be an **Admin**. Subsequent users will be registered as **Users**.  

- **Login**  
- **Logout**  
- **Bus management**:  
  - Add a bus  
  - Update a bus  
  - Delete a bus  

- **Ticket management**:  
  - Add a ticket  
  - Update a ticket  
  - Delete a ticket  

- **Queries**:  
  - Get available buses  
  - Get available tickets  
  - Purchase a ticket  

## Business Logic  

1. **Token-based authentication**:  
   - You must provide a valid **token** from a login session to access the routes.  
   - When you log in, you’ll receive a token that must be included in the `Authorization` header of each request.  

2. **Single session per user**:  
   - Each user can only have one active session at a time.  

3. **User roles**:  
   - Routes under the `/admin` prefix are accessible only to users with the **Admin** role.  
   - Other routes are accessible to users with the **User** role.  
   - Middlewares `isAdmin` or `isUser` are used to verify the user's role.  

4. **Additional business logic**:  
   - Other business rules exist and can be discussed as needed.  
