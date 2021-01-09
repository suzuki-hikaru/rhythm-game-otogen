from PIL import Image

img = Image.open('welcome.png')

img_resize = img.resize((int(img.width /2), int(img.height /2)))
img_resize.save('welcome.png')