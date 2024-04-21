import os
import re
from PIL import Image

def generate_thumbnails(input_directory, thumbnail_directory, size=(800, 600)):
    if not os.path.exists(thumbnail_directory):
        os.makedirs(thumbnail_directory)

    for filename in os.listdir(input_directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            image_path = os.path.join(input_directory, filename)
            img = Image.open(image_path)
            img.thumbnail(size)

            # Save the thumbnail
            thumbnail_path = os.path.join(thumbnail_directory, filename)
            img.save(thumbnail_path, "JPEG", quality=35)

def generate_html(directory, thumbnail_directory, input_file='index.html', output_file='index.html'):
    # Read the existing HTML file
    with open(input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Pattern to find images and their categories
    pattern = r'<img src="thumbnails/(.+?)" alt=".+?" data-fullres=".+?" data-category="(.+?)" class="photo">'
    existing_images = dict(re.findall(pattern, html_content))

    # Start HTML for the image gallery
    gallery_html = '<div id="gallery" class="photo-container">\n'

    # Check each file in the directory and create thumbnails
    generate_thumbnails(directory, thumbnail_directory)

    # Now create HTML img tags with the thumbnails
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            category = existing_images.get(filename, 'misc')  # Use existing category if available
            # Create an img tag for each photo using thumbnails and setting data-fullres to the original
            img_tag = f'            <img src="thumbnails/{filename}" alt="{filename}" data-fullres="images/{filename}" data-category="{category}" class="photo">\n'
            gallery_html += img_tag

    # Close the gallery div
    gallery_html += '       </div>'

    # Replace old gallery with new gallery in the HTML content
    new_html_content = re.sub(r'<div id="gallery" class="photo-container">.*?</div>', gallery_html, html_content, flags=re.DOTALL)

    # Write the updated HTML to the output file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(new_html_content)

    print(f'HTML content updated and written to {output_file}')

# Usage
directory_path = './images'  # Path to the high-resolution images
thumbnail_path = './thumbnails'  # Path to save thumbnails
generate_html(directory_path, thumbnail_path)
