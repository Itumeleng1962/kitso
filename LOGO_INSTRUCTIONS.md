# Adding Your Company Logo

## Steps to Add Your Logo:

1. **Create an Assets Folder:**
   - Create a folder called `assets` in the same directory as your `index.html` file
   - This will store all your images

2. **Save Your Logo:**
   - Save your company logo image as `logo.png` (or `logo.jpg`) in the `assets` folder
   - Make sure the image is good quality and preferably square (e.g., 200x200 pixels)

3. **Update the HTML:**
   Replace the current logo code in `index.html` (around line 16):

   **Current code:**
   ```html
   <img src="data:image/svg+xml;base64,..." alt="KBDS Logo" class="logo-img">
   ```

   **Replace with:**
   ```html
   <img src="assets/logo.png" alt="KBDS Logo" class="logo-img">
   ```

4. **Add Product Images (Optional):**
   - Take photos of your actual products (UniQue cleaner, etc.)
   - Save them in the `assets` folder with descriptive names like:
     - `unique-cleaner.jpg`
     - `detergents.jpg`
     - `furniture.jpg`
     - etc.

5. **Update Product Images:**
   Replace the SVG placeholders with actual product images:
   ```html
   <!-- Replace this: -->
   <img src="data:image/svg+xml;base64,..." alt="UniQue Multipurpose Cleaner">
   
   <!-- With this: -->
   <img src="assets/unique-cleaner.jpg" alt="UniQue Multipurpose Cleaner">
   ```

## File Structure Should Look Like:
```
your-website/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── logo.png
│   ├── unique-cleaner.jpg
│   ├── detergents.jpg
│   └── (other product images)
└── README.md
```

## Current Status:
✅ Website structure is complete  
✅ Placeholder images are working  
⏳ Need to add your actual logo  
⏳ Need to add your actual product photos  

The website is fully functional with placeholder images. Adding your real images will make it look even more professional!
