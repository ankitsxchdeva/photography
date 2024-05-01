#!/bin/bash

# Path to the main folder
base_path="images"

# Loop through all folders in the base_path
for folder in "$base_path"/*; do
    if [ -d "$folder" ]; then  # Check if it is a directory
        folder_name=$(basename "$folder")  # Get the folder name
        # Extract category name (text after the date)
        category_name=$(echo "$folder_name" | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//')
        # Loop through all JPG images in the folder
        for image in "$folder"/*.JPG; do
            if [ -f "$image" ]; then  # Check if it is a file
                image_name=$(basename "$image")  # Get the image file name
                # Print the HTML line with full image path in data-fullres
                echo '<img src="images/'"$folder_name"'/'"$image_name"'" alt="'"$image_name"'" data-fullres="images/'"$folder_name"'/'"$image_name"'" data-category="'"$category_name"'" class="photo">'
            fi
        done
    fi
done
