from PIL import Image

img = Image.open('player.png')

img_resize = img.resize((int(img.width /1.2), int(img.height /1.2)))
img_resize.save('player.png')