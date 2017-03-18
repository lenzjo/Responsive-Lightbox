# TLC Really Responsive-LightBox

There are so many "responsive" lightboxes out there, but really all they do is jiggle the controls around and scale the image to fit whatever screen there is. So the mobile viewer and the desktop viewer will both be seeing and downloading the same file image...

This one is a proof of concept, that will display a REAL responsive image in the lightbox.

## Usage
Download or clone, unzip if needed then go into the **mylb01** directory and type:

    npm install

then

    gulp dev

and it will start up the browser with a test page. click on any of the images to see the light box in action. Resize the width of the browser to see it change the image to a suitably-sized one. Either clicking away from the image or pressing the Esc key will close the lightbox.

## Limitations
I wrote this just to get something working for my blog update. It is far from a universal solution as it is, it's fine with landscape images, not so much with portrait unless you view it on a portrait screen like a tablet or mobile.
