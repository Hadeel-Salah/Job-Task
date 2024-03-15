vi.mock('toastify-js', () => ({
  Toastify: vi.fn().mockImplementation(() => ({
    showToast: vi.fn(),
  })),
}));


import { describe, it, expect, vi } from 'vitest';
import app from '../app.vue';


describe('Component Method Existence', () => {
    test('showLoadingToast method is defined', async () => {
      const { default: component } = await import('../app.vue');
  
      expect(component).toBeDefined();
  
      expect(component.methods).toBeDefined();
      
        expect(typeof component.methods?.showLoadingToast).toBe('function');

    });
  });
  
  describe('Component Method Existence', () => {
    test('showToastErrorSize method is defined', async () => {
      const { default: component } = await import('../app.vue');
  
      // Check if the component is defined
      expect(component).toBeDefined();
  
      expect(component.methods).toBeDefined();
      
        expect(typeof component.methods?.showToastErrorSize).toBe('function');

    });
  });



  const mockBase64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

// Mocking FileReader
class MockFileReader {
  // Mock properties
  static EMPTY = 0;
  static LOADING = 1;
  static DONE = 2;
  readyState = MockFileReader.EMPTY;
  onload: any;
  onerror: any;

  // Constructor
  constructor() {
    // Create onload and onerror as noop functions or mock implementations
    this.onload = vi.fn();
    this.onerror = vi.fn();
  }

  // Mock methods
  readAsDataURL() {
    // Simulate async behavior of FileReader
    setTimeout(() => {
      this.result = mockBase64String;
      this.onload({ target: this });
    }, 0);
  }

  // Mock result property
  result = "";
}

// Mocking FileReader globally
global.FileReader = MockFileReader as any;

describe('readFileAsBase64 Method', () => {
  it('converts a file to a base64 string', async () => {

    // Create a mock file
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
      const { default: component } = await import('../app.vue');

    // Directly or indirectly test readFileAsBase64
    const base64Result = await component.methods?.readFileAsBase64(mockFile);

    // Verify the result matches the expected base64 string
    expect(base64Result).toBe(mockBase64String);
  });
})

// examples of tests that I thought to implement:
  // Test handleDragEnter modifies the component's state or UI to indicate an item is being dragged over.
  // Test handleDragOver maintains the UI indication that an item is draggable over the target area.
  // Test handleDragLeave removes any UI indication that an item is being dragged over when the drag leaves the target area.
  // Test handleDrop processes dropped files correctly, filtering by type and size, and updates the uploadedImages array.
  // Test openFileInput triggers the file input dialog when the upload button is clicked.
  // Test handleFileUpload filters out invalid files and updates the state with valid files' data.
  // Test showLoadingToast sets loading to true and displays a loading toast.
  // Test showToast displays appropriate messages for different actions (e.g., upload success, error).
  // Test readFileAsBase64 correctly converts files to base64 strings.
  // Test uploadImageToServer sends the correct request to the server and handles the response properly.
  // Test removeImage removes the correct image from uploadedImages when the delete button is clicked.
  // Test the initial state of loading is false, and it changes correctly during file upload operations.
  // Test the drag-and-drop area changes its appearance or behavior when files are dragged over it.
  // Test error handling for the file upload process, including displaying messages for exceeding size limits or unsupported file types.
  // Test the successful upload updates the UI with new images and clears the loading state.