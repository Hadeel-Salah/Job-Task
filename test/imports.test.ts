const mockBase64String =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

class MockFileReader {
  static EMPTY = 0;
  static LOADING = 1;
  static DONE = 2;
  readyState = MockFileReader.EMPTY;
  onload: any;
  onerror: any;

  constructor() {
    this.onload = vi.fn();
    this.onerror = vi.fn();
  }

  readAsDataURL() {
    setTimeout(() => {
      this.result = mockBase64String;
      this.onload({ target: this });
    }, 0);
  }

  result = "";
}

describe("readFileAsBase64 Method", () => {
  it("converts a file to a base64 string", async () => {
    global.FileReader = MockFileReader as any;
    const mockFile = new File([""], "test.png", { type: "image/png" });
    const { default: component } = await import("../app.vue");

    const base64Result = await component.methods?.readFileAsBase64(mockFile);

    expect(base64Result).toBe(mockBase64String);
  });
});

// examples of  unit tests that I thought to implement:

// openFileInput: Test that invoking openFileInput programmatically triggers a click event on the file input element. This can be checked by spying on the click method of the file input element.

// handleFileUpload - File Filtering: Verify that handleFileUpload correctly identifies and separates valid and invalid files based on the predefined conditions (type and size) when provided with a mock event object containing a FileList.

// readFileAsBase64 - Success: Mock a File input to readFileAsBase64 and ensure it resolves with a correct base64 string representation of the file content.

// readFileAsBase64 - Error Handling: Simulate a read error in readFileAsBase64 to ensure it rejects with the expected error message.

// showLoadingToast: Test that calling showLoadingToast updates the loading state to true.

// showToast: Verify that showToast creates a toast with the correct message and style settings. Since this involves external library Toastify, you might mock Toastify to ensure showToast calls it with the expected parameters.

// uploadImageToServer - Validation: Test that uploadImageToServer handles empty input correctly by not proceeding with any fetch calls and optionally setting an appropriate state or displaying a message.

// removeImage: Ensure that invoking removeImage with a valid index updates the uploadedImages array by removing the specified image.
