# 🎬 MovieHub: Movie Catalog (Frontend)

## 🌟 Project Overview

**MovieHub** is a modern Single Page Application (SPA) designed for browsing and searching for movie information. The application is built with **Angular** for the frontend and manages its state using **NgRx**, ensuring a fast and reactive user experience. Movie data is sourced from a dedicated backend service.

## 🚀 Live Demo

Check out the live demo of the application here: [**MovieHub - Frontend**](https://movie-hub-frontend-alpha.vercel.app/)

## ✨ Key Features

- **Popular Movies:** View an up-to-date list of trending and popular films.
- **Search:** Instant movie search by title, utilizing _debounce_ for optimized request handling.
- **Movie Details:** Access comprehensive information about any selected film.
- **Favorites:** Add and remove movies from a personalized favorites list, with persistence handled by **LocalStorage** (via NgRx).
- **Pagination:** User-friendly navigation across large result sets.
- **Responsive Design:** Clean, modern interface optimized for both mobile and desktop.

---

## 🛠️ Technology Stack

| Category               | Technology                | Purpose                                                                                            |
| :--------------------- | :------------------------ | :------------------------------------------------------------------------------------------------- |
| **Frontend Framework** | **Angular** (v17+)        | Core framework for building the application interface.                                             |
| **State Management**   | **NgRx** (Store, Effects) | Centralized state management using a Redux-like pattern.                                           |
| **Styling**            | **SCSS**                  | CSS preprocessor for clean and modular styling.                                                    |
| **Routing**            | **Angular Router**        | Navigation within the SPA, including Lazy Loading for modules (`MoviesModule`, `FavoritesModule`). |
| **HTTP Client**        | `HttpClient`              | Handling API requests to the backend service.                                                      |
| **Deployment**         | **Vercel**                | Production hosting for the frontend application.                                                   |

---

## 📦 Installation and Setup

### 1\. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/movie-hub-frontend.git
cd movie-hub-frontend
```

### 2\. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3\. API URL Configuration

The project uses separate configuration files for development and production environments. This is crucial for correctly linking the frontend to your local and live backends.

1.  **For Local Development (`environment.ts`):**

    Ensure your local backend is running (typically on `localhost:3000`) and set the `baseUrl` accordingly:

    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      baseUrl: 'http://localhost:3000/api', // 👈 Your local backend address
    };
    ```

2.  **For Production Build (`environment.prod.ts`):**

    Set the address of your live backend (deployed on Vercel or other hosting):

    ```typescript
    // src/environments/environment.prod.ts
    export const environment = {
      production: true,
      baseUrl: 'https://movie-hub-backend-ruddy.vercel.app/api', // 👈 Your live backend deployment address
    };
    ```

### 4\. Local Run

Start the application in development mode:

```bash
ng serve
```

The application will be accessible at: `http://localhost:4200/`

### 5\. Production Build

To create an optimized production build (used by Vercel for deployment):

```bash
ng build --configuration production
```

The generated files will be located in the `dist/` directory.

---

## 🗺️ Module Structure

The application is structured around key feature modules:

- `core/`: Services (e.g., `MovieApiService`), models, and CoreModule.
- `features/movies/`: Handles displaying lists, search, and movie details.
  - **NgRx:** Actions, Reducers, Effects for movie state management.
- `features/favorites/`: Logic for the user's favorite movies list.
  - **NgRx:** Reducers for managing the favorite movie IDs.
- `shared/`: Reusable UI components (`MovieCardComponent`, `PaginationComponent`, `SearchBarComponent`).
- `environments/`: Environment-specific configuration.
