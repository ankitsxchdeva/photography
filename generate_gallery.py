import os
import re

def generate_html(directory, input_file='index.html', output_file='index.html'):
    # Read the existing HTML file
    with open(input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Pattern to find images and their categories
    pattern = r'<img src="images/(.+?)" alt=".+?" data-category="(.+?)" class="photo">'
    existing_images = dict(re.findall(pattern, html_content))

    # Start HTML for the image gallery
    gallery_html = '<div id="gallery" class="photo-container">\n'

    # Check each file in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):  # Check for image files
            category = existing_images.get(filename, 'misc')  # Use existing category if available
            # Create an img tag for each photo
            img_tag = f'        <img src="images/{filename}" alt="{filename}" data-category="{category}" class="photo">\n'
            gallery_html += img_tag

    # Close the gallery div
    gallery_html += '    </div>'

    # Replace old gallery with new gallery in the HTML content
    new_html_content = re.sub(r'<div id="gallery" class="photo-container">.*?</div>', gallery_html, html_content, flags=re.DOTALL)

    # Write the updated HTML to the output file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(new_html_content)

    print(f'HTML content updated and written to {output_file}')

# Usage
directory_path = './images'
generate_html(directory_path)
