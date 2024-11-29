# Memory Lane

A dynamic and user-friendly Album Gallery Manager built with **Next.js** and **Supabase**, providing seamless CRUD operations for managing albums and images. The app allows users to browse images, edit metadata (e.g., titles), and upload new images for their albums.

## Features

- **Dynamic Album-Based Image Management**  
  - Fetch and display images for a specific album.
  - Edit image titles dynamically through a modal interface.

- **Authentication and Authorization**  
  - Restrict access to authenticated users.
  - Ensure only album owners can upload new images.

- **Responsive Design**  
  - Images displayed in a grid layout optimized for various screen sizes.
  - Interactive modal for viewing and editing image details.

- **CRUD Operations**  
  - Fetch album and image data from Supabase.
  - Update image metadata (e.g., titles) via modal.
  - Upload new images (if authorized).

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org), [React](https://reactjs.org)
- **Backend**: [Supabase](https://supabase.io)
- **UI Components**: Tailwind CSS, Custom Dialog Component
- **Icons**: [Lucide Icons](https://lucide.dev)

## Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- npm or yarn
- A Supabase project (with tables for albums and images)

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/image-gallery-manager.git
   cd image-gallery-manager
   ```

2. **Install Dependencies**:
```bash
  npm install
```

3. **Set Up Environment Variables**:
Create a .env.local file and add your Supabase project details:
```bash
  NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

4. **Run the Development Server**:
```bash
  npm run dev
```

5. **Access the App**:
Open http://localhost:3000 in your browser.


## Supabase Database Schema

### `albums` Table

This table stores information about image albums created by users.

| Column        | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| `id`          | `UUID`    | Unique identifier for the album.     |
| `title`       | `String`  | Title of the album.                  |
| `description` | `String`  | Description of the album.            |
| `user_id`     | `UUID`    | ID of the album's owner.             |
| `created_at`  | `Timestamp` | The date and time the album was created. |

### `photos` Table

This table stores information about individual photos associated with albums.

| Column        | Type      | Description                         |
|---------------|-----------|-------------------------------------|
| `id`          | `UUID`    | Unique identifier for the photo.    |
| `album_id`    | `UUID`    | ID of the associated album.         |
| `image_url`   | `String`  | URL of the uploaded image.          |
| `title`       | `String`  | Title or description of the image.  |
| `name`        | `String`  | File name of the image.             |
| `created_at`  | `Timestamp` | The date and time the photo was uploaded. |

### Relationships

- **`albums.user_id` → `users.id`**: Links an album to the user who created it.
- **`photos.album_id` → `albums.id`**: Associates a photo with its album.

## Key Components

### Landing Page
Gives the user some idea of the application

### Authentication pages
This includes the sign up, sign in, forgot password and password reset pages.

### Dashboard/Protected
The main page once you are logged in. Handles:

Displays the user logged in's details such as email and username.
Displays the users in the sytem and their album count.
Displays the user logged in's albums.

### AlbumList
Displays a list of all the albums

### UserList
Displays a list of all the users

### ImagesList
Displays a grid of images for a given album. Each image can be clicked to open the ImageModal for editing.

### ImageModal
A modal interface that allows users to:

View a larger version of the image.
Edit the title of the image and save changes.

### ImagesPage
The main page for fetching and displaying images for an album. Handles:

Loading album and image data from Supabase.

