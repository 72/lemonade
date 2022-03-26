// Lemonade, a base template of good old Framer

import { LemonUI } from './components/LemonUI.js';
// Uncomment this line to view the examples
// import { Examples } from './components/Examples/Examples.js';

// SETUP ===================================
Framer.Extras.Hints.disable();
Framer.Defaults.Animation.curve = Spring;

// Config prototype size here: 
let prototypeWidth = 375;
let prototypeHeight = 667;

// Use this layer as the main parent:
let app = new Layer({
	name: "Lemonade Prototype",
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: null,
	clip: true
});

// WORKSPACE ==========================================

// Main screen, which is added to the App layer.
let mainscreen = new Layer({
	name: "Screen Home", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: LemonUI.Colors.Surface,
	parent: app
});

// All next elements are added as children of 'mainscreen'.
let lemon = new Layer({
	name: "Lemon layer",
	width: 100, height: 97,
	midX: (prototypeWidth/2), midY: (prototypeHeight/2),
	image: "images/lemon.png",
	parent: mainscreen,
});

lemon.states = {
	topPosition: {
		scale: 0.6,
		rotation: 45,
		y: 100,
	},
	bottomPosition: {
		scale: 0.5,
		rotation: -45,
		y: 400,
	}
};

lemon.onClick(()=>{
	lemon.stateCycle();
});


// To view the examples, uncomment this line, and the 'import' at the top.
// Examples.parent = app;




// END OF WORKSPACE ==================================

// ADAPT TO SCREEN ===================================
// This function centers the prototype, and scales it to fit the screen.
let fitToScreen = () => {
	app.originX = 0;
	app.originY = 0;
	let ratioW = Math.round((innerWidth/prototypeWidth)*100)/100;
	let ratioH = Math.round((innerHeight/prototypeHeight)*100)/100;
	if(ratioW > ratioH){
		app.scale = ratioH;
		app.x = ((innerWidth/2)-((app.width*ratioH)/2));
	} else if (ratioH > ratioW){
		app.scale = ratioW;
		app.x = ((innerWidth/2)-((app.width*ratioW)/2));
	}
};
fitToScreen();