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
# Unit Testing:

Examples of  unit tests that I thought to implement:

    - openFileInput: Test that invoking openFileInput programmatically triggers a click event on the file input element. This can be checked by spying on the click method of the file input element.

    - handleFileUpload - File Filtering: Verify that handleFileUpload correctly identifies and separates valid and invalid files based on the predefined conditions (type and size) when provided with a mock event object containing a FileList.

    - readFileAsBase64 - Success: Mock a File input to readFileAsBase64 and ensure it resolves with a correct base64 string representation of the file content.

    - readFileAsBase64 - Error Handling: Simulate a read error in readFileAsBase64 to ensure it rejects with the expected error message.

    - showLoadingToast: Test that calling showLoadingToast updates the loading state to true.

    - showToast: Verify that showToast creates a toast with the correct message and style settings. Since this involves external library Toastify, you might mock Toastify to ensure showToast calls it with the expected parameters.

    - uploadImageToServer - Validation: Test that uploadImageToServer handles empty input correctly by not proceeding with any fetch calls and optionally setting an appropriate state or displaying a message.

    - removeImage: Ensure that invoking removeImage with a valid index updates the uploadedImages array by removing the specified image.



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

## Testing

Run the application testing:

```bash
npm run test
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
