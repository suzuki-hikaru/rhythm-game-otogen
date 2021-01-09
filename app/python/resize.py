from PIL import Image

img = Image.open('player.png')

img_resize = img.resize((int(img.width /1.1), int(img.height /1.1)))
img_resize.save('player.png')