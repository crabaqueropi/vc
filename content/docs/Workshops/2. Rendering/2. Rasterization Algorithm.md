# Rendering

# Z-Buffer

## Introducción

Con el desarrollo de la tecnología informática, ha aumentado el potencial para crear entornos visuales cada vez más realistas. Sin embargo, llevar este tipo de realismo a los usuarios también conlleva algunos desafíos. En términos generales, esto está relacionado con el modelado físico del mundo real., En Máquinas con capacidad limitada. Con base en estas limitaciones, lo que se busca es mejorar el nivel de realidad visual, pero al mismo tiempo reducir el tiempo requerido para procesarla. Obviamente, estas dos cosas están estrechamente relacionadas, por lo que debe lograr un equilibrio entre las dos.

El algoritmo utilizado juega un papel clave en la reducción del tiempo de procesamiento, por lo que el algoritmo debe ser una solución "elegante", pero a la vez fácil de mecanizar.

## El problema de la visibilidad

En el mundo real, los humanos no pueden ver a través de la mayoría de los objetos, por lo que siempre hay obstáculos que nos impiden mirar a lo lejos. Lo que hacemos cuando miramos por estos objetos es cambiar nuestro punto de vista para que no haya ningún obstáculo entre ustedes. Quiere visualizar y personas. Para poder reproducir un entorno visual realista, modelar este comportamiento resulta vital. De ahí nace el problema de la visibilidad en computación gráfica, que consiste en la determinación de las superficies o partes de una superficie que se deben ocultar, dado un punto de vista o ángulo de vista particular.

## Problema de la visibilidad llevado a la computación visual

Cuando queremos mostrar una escena 3D que contiene múltiples objetos, lo hacemos a través de una pantalla 2D, por lo que es importante identificar la parte de la escena que será visible en la pantalla. Para resolver el problema de la visibilidad en el contexto de la computación visual, existen dos métodos:

1. En el espacio de objetos: el método se implementa en un sistema de coordenadas físico y la superficie visible se determina comparando objetos o partes de objetos. Este método suele ser mejor para escenas que contienen relativamente pocos objetos (polígonos).

2. En el espacio de la imagen: el método se implementa en el sistema de coordenadas de la pantalla y la visibilidad se determina punto por punto.

## Método Z-Buffer

El método Z-Buffer utiliza el segundo método (image-space). La complejidad temporal de este método corresponde al número de píxeles multiplicado por el número de objetos, en lugar de su complejidad espacial correspondiente al doble del número de píxeles, porque funciona el tamaño de cada uno de los dos búferes. La idea principal es probar la profundidad (profundidad de "z") de cada superficie para determinar si es visible a partir del concepto de visibilidad geométrica, es decir, dos puntos son visibles entre sí, siempre que los segmentos de línea conectados no estén dentro de un conjunto de obstáculos en el espacio Cualquier obstáculo que se cruce. Para realizar este método, se procesa un píxel a la vez individualmente a lo largo de toda la superficie. El valor de profundidad de cada píxel se compara en el plano de proyección y la superficie más cercana determina el color que se mostrará.

## Sin Z-Buffer

{{< p5-iframe sketch="/vc/workshops/Rasterization/sin_zBuffer.js" width="525" height="525" >}}

## Con Z-Buffer

{{< p5-iframe sketch="/vc/workshops/Rasterization/zBuffer.js" lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="525" height="525" >}}

## Referencias

- https://en.wikipedia.org/wiki/Visibility_(geometry)
- https://en.wikipedia.org/wiki/Hidden-surface_determination
- https://www.youtube.com/watch?v=GxpPpG5pFpE
- https://en.wikipedia.org/wiki/Z-buffering#W-buffer
- https://editor.p5js.org/ffd8/sketches/k00WttDRc
- https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
- https://www.pearson.com/us/higher-education/program/ANGEL-Pearson-e-Text-Interactive-Computer-Graphics-Access-Card-8th-Edition/PGM2160099.html