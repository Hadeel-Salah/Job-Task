## Documentation for Gallery Component
Overview
The Gallery component is a Vue.js component designed to display a gallery of images and allow users to upload new images by dragging and dropping files or clicking an upload button. It also provides functionality to remove uploaded images.

# HTML Structure
The HTML structure defines the layout and components of the gallery interface. It consists of:

  1. Header Section: Displays the title of the gallery and an upload button.
  2. Divider: A horizontal line that separates the header from the gallery.
  3. Gallery Section: Displays uploaded images with a remove button for each image.
  4. Drop Area: Allows users to drag and drop images for upload.

# CSS Structure: The CSS structure provides styling for the gallery interface. It includes styles for:

  1. Container: Defines margins and layout for the gallery container.
  2. Image Container: Styles for individual image containers within the gallery.
  3. Image: Defines maximum width and height for images displayed in the gallery.
  4. Media Queries: Responsive styling for smaller screens.
  5. Divider Style: Styling for the horizontal divider.
  6. Drop Area Style: Styling for the area where users can drag and drop images for upload.

# TypeScript Structure
    The TypeScript structure provides functionality for the gallery component. It includes:
      1. Data: Defines data properties such as uploadedImages, imagesUploaded, and loading.
      2. Methods: Contains methods for handling file uploads, displaying loading indicators, removing images, and handling drag-and-drop events.
      Functionality

# The Gallery component allows users to:

    1. View uploaded images in a gallery layout.
    2. Upload new images by clicking the upload button or dragging and dropping files.
    3. Remove uploaded images individually.
    4. Receive feedback messages for successful or failed image uploads.
    

# The component relies on the following dependencies:

    1. Vue.js: A progressive JavaScript framework for building user interfaces.
    2. Toastify-js: A simple, lightweight JavaScript library for displaying toast notifications.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
