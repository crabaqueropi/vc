## Optical Illusion - Cristian Baquero

# Analog Lenticular or Barrier-grid animation

{{< p5-iframe sketch="/vc/workshops/AnalogLenticular.js" width="500" height="500" >}}

Taken from: https://github.com/HoangTran0410/analog-lenticular-animation

## Do you want to do your own barrier grid animation?

We need to start with a sequence of six or seven frames and to procure that the first and the last frame were the same.

{{< figure src="/vc/images/analog-lenticular/explanation_1.jpg" width="500">}}

Now, we have to reduce the object in each 'frame' of the original movie into a black silhouette.

{{< figure src="/vc/images/analog-lenticular/explanation_2.jpg" width="400">}}

In some cases, we want that the position of the object is to keep in the center of the frame. The best way to do that is to settle on some pivotal point of the figure and make sure that point is in the same position in successive frames.

{{< figure src="/vc/images/analog-lenticular/explanation_3.jpg" width="400">}}

Next, we need to reduce each dark silhouette to a striped pattern, as shown in the figure above. The number of hatch lines is not important and may change as the width of the graphics changes from frame to frame. However, the thickness and spacing of the hatch are absolutely critical and must match the spacing and thickness of the transparent stripes on the mask. This is how everything is calculated.

First, we count the number of frames in the animation. Next, determine the width of the shadow line on the outline, which should also be the width of the light on the mask. The space between the shadow lines in the outline and the light in the mask should be: the number of frames, minus one, times the line width.

{{< figure src="/vc/images/analog-lenticular/explanation_4.jpg" width="400">}}

Now we have to compose our image, which you can do by combining the individual frames into one frame by copying and pasting.

{{< figure src="/vc/images/analog-lenticular/explanation_5.jpg" width="400">}}

Now, all we have to do is make our mask to pass the composite image in animation, and that's it.

Taken from: https://www.opticalillusion.net/optical-illusions/animated-moire-or-scanimation/