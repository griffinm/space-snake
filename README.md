# Space Snake

## About

This is a mashup of the classic games Snake (from your old Nokia) and Asteroids (the arcade game). Play the live version [here](http://www.brianbuchholz.com/space-snake).

Space Snake was written in Javascript and uses the [jQuery](http://jquery.com/), [Underscore](http://underscorejs.org/), and [mousetrap](http://craig.is/killing/mice) libraries.

## Playing

The goal is to grow as long as possible 
by eating apples, but watch out for asteroids! Getting hit by one will kill you; 
fortunately you have a photon gun in your head.

### Controls: 
* Left: turn left
* Right: turn right
* Up: accelerate
* Down: decelerate
* Space: fire photon

### Tips

Asteroids start generating every 15 seconds, with a max of 5 asteroids on the field at any time.
Your position wraps around the screen like the ship in Asteroids.
Unlike traditional Snake, overlapping yourself wont kill you...only colliding with an asteroid ends the game.

