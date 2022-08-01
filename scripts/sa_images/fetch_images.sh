#!/usr/bin/bash

path_to_copy_to="../../public/sa_images/webp/"

echo "=== Fetching API ==="
DATA=$(curl "https://galaxy.staratlas.com/nfts")
IMAGES=($(echo "$DATA" | jq -r ".[] | .image"))
IMAGES_NAME=($(echo "$DATA" | jq -r ".[] | ._id"))
#echo "$DATA" | jq -r ".[] | .image"


echo "=== Downloading images ==="
output_dir="./images"
mkdir $output_dir
mkdir "$output_dir/jpg"
mkdir "$output_dir/jpg/low"
mkdir "$output_dir/webp"

for i in "${!IMAGES[@]}"; do
 echo "> Downloading: ${IMAGES[$i]}"
 curl "${IMAGES[$i]}" -o "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg
 echo "> Converting: $output_dir/jpg/${IMAGES_NAME[$i]}.jpg to .webp"
 convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg -resize 100 -quality 5 "$output_dir/jpg/low/${IMAGES_NAME[$i]}".jpg
 convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg -quality 5 "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg
 convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg "$output_dir/webp/${IMAGES_NAME[$i]}".webp
done


echo "=== Copy images ==="
cp -f ./images/webp/* $path_to_copy_to

echo "=== DONE! ==="

