// Examples, for Lemonade.

import { LemonUI } from '../LemonUI.js';
import { Header } from './Header.js';
import { MenuButton } from './MenuButton.js';
import { Ticker } from './Ticker.js';
import { LottieLayer } from './Lottie-Framer/Lottie-Framer.js';

// Config prototype size here: 
let prototypeWidth = 375;
let prototypeHeight = 677;

// This is the FlowComponent that will hold all the screens.
export let Examples = new FlowComponent();

/**
 * The following code is sectioned per screen:
 * - Homescreen
 * - Scroll Component
 * - Page Component
 * - Drag behavior
 * - Lottie demo
 * 
 * Then, the last section handles the navigation events.
 * - Navigation
 * 
 * There's a lot of code duplication that can be optimized, but for the purposes of this document this should suffice.
 */

// SECTION: HOMESCREEN ==================================

// Main screen, which is added to the 'Examples' flow.
let homescreen = new Layer({
	name: "Screen Home", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: 'white',
	parent: Examples
});

// All next elements are added as children of 'homescreen'.
let lemonade = new Layer({
	image: './components/Examples/Assets/lemonade.png',
	y: 100, 
	// width: 75, height: 26,
	width: 111, height: 38,
	parent: homescreen
});
lemonade.centerX();

let menuOptions = new Layer({
	width: prototypeWidth,
	backgroundColor: null,
	parent: homescreen
});

let optionA = new MenuButton({
	label: "Scroll component",
	parent: menuOptions
});
optionA.centerX();

let optionB = new MenuButton({
	y: optionA.maxY + 18,
	label: "Page component",
	parent: menuOptions
});
optionB.centerX();

let optionC = new MenuButton({
	y: optionB.maxY + 18,
	label: "Drag behavior",
	parent: menuOptions
});
optionC.centerX();

let optionD = new MenuButton({
	y: optionC.maxY + 18,
	label: "Lottie demo",
	parent: menuOptions
});
optionD.centerX();

menuOptions.height = optionD.maxY;
menuOptions.center();

// SECTION: SCROLL COMPONENT ==================================

// Main screen, which is added to the 'Examples' flow.
let sectionScrollComponent = new Layer({
	name: "Demo A", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: 'white',
	parent: Examples
});

// All next elements are added as children of 'sectionScrollComponent'.
let demoAHeader = new Header({
	label: "Scroll Component",
	hasBackButton: true,
	parent: sectionScrollComponent
});

let demoAPage = new Layer({
	name: "Demo A Page",
	width: prototypeWidth, 
	height: (prototypeHeight - demoAHeader.height),
	y: demoAHeader.height,
	backgroundColor: 'white',
	parent: sectionScrollComponent
});

let demoAScroll = new ScrollComponent({
	width: prototypeWidth,
	height: demoAPage.height,
	scrollHorizontal: false,
	parent: demoAPage
});

// 15 times: Create a row element and add it to the scroll component.
for(let i = 0; i < 15; i++){
	let row = new Layer({
		width: (prototypeWidth - 48), height: 80,
		y: (104 * i),
		borderRadius: 9,
		backgroundColor: 'skyblue',
		opacity: 1,
		parent: demoAScroll.content
	});
	row.centerX();
};

// Next, create a panel to display scroll events.
let demoAPanel = new Layer({
	name: "Panel A",
	width: 343, 
	height: 160,
	maxY: prototypeHeight - 32,
	borderRadius: 18,
	backgroundColor: '#FFF',
	shadowBlur: 16,
	parent: sectionScrollComponent
});
demoAPanel.centerX();

let textScrollValue = new Layer({
	html: "Scroll value: 0",
	x: 20, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: LemonUI.Colors.TextPrimary,
	parent: demoAPanel,
});
textScrollValue.centerX();
textScrollValue.style = {
	fontSize: "12px",
};

let indicatorScroll = new Ticker({
	x: 12, y: 50,
	description: '.onScroll',
	parent: demoAPanel,
});

let indicatorScrollStart = new Ticker({
	x: 12, y: indicatorScroll.maxY + 9,
	description: '.onScrollStart',
	parent: demoAPanel,
});

let indicatorScrollEnd = new Ticker({
	x: 12, y: indicatorScrollStart.maxY + 9,
	description: '.onScrollEnd',
	parent: demoAPanel,
});

let indicatorMove = new Ticker({
	x: 147, y: 50,
	description: '.onMove',
	parent: demoAPanel,
});

let indicatorAnimationStart = new Ticker({
	x: 147, y: indicatorScroll.maxY + 9,
	description: '.onScrollAnimationDidStart',
	parent: demoAPanel,
});

let indicatorAnimationEnd = new Ticker({
	x: 147, y: indicatorScrollStart.maxY + 9,
	description: '.onScrollAnimationDidEnd',
	parent: demoAPanel,
});

// Scroll component events
demoAScroll.onMove(()=>{
	textScrollValue.html = `Scroll value: ${Math.round(demoAScroll.scrollY)}`;
	demoAPanel.style = { color: "#212121" }
});

demoAScroll.onMove(()=>{
	indicatorMove.tick();
});

demoAScroll.onScrollStart(()=>{
	indicatorScrollStart.tick();
});

demoAScroll.onScrollEnd(()=>{
	indicatorScrollEnd.tick();
});

demoAScroll.onScroll(()=>{
	indicatorScroll.tick();
});

demoAScroll.onScrollAnimationDidStart(()=>{
	indicatorAnimationStart.tick();
});

demoAScroll.onScrollAnimationDidEnd(()=>{
	indicatorAnimationEnd.tick();
});



// SECTION: PAGE COMPONENT ==================================

// Main screen, which is added to the 'Examples' flow.
let sectionPageComponent = new Layer({
	name: "Demo B", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: 'white',
	parent: Examples
});

// All next elements are added as children of 'sectionPageComponent'.
let demoBHeader = new Header({
	label: "Page Component",
	hasBackButton: true,
	parent: sectionPageComponent
});

let demoBPage = new Layer({
	name: "Demo B Page",
	width: prototypeWidth, 
	height: (prototypeHeight - demoAHeader.height),
	y: demoAHeader.height,
	backgroundColor: 'white',
	clip: true,
	parent: sectionPageComponent
});

let demoBPageComponent = new PageComponent({
	width: 300, height: 400,
	y: 9,
	scrollVertical: false,
	clip: false,
	parent: demoBPage
});
demoBPageComponent.centerX();

// 8 times: Create a tile and add it to the page component.
for(let i = 0; i < 8; i++){
	let tile = new Layer({
		width: 300, height: 400,
		x: (312 * i),
		borderRadius: 9,
		backgroundColor: 'skyblue',
		opacity: 1,
		parent: demoBPageComponent.content
	});
	Utils.labelLayer(tile, `${i+1}`);
};

// Next, create a panel to display the page component events.
let demoBPanel = new Layer({
	name: "Panel B",
	width: 343, 
	height: 160,
	maxY: prototypeHeight - 32,
	borderRadius: 18,
	backgroundColor: '#FFF',
	shadowBlur: 16,
	parent: sectionPageComponent
});
demoBPanel.centerX();

let textPageScrollValue = new Layer({
	html: "Scroll value: 0",
	x: 40, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoBPanel,
});
textPageScrollValue.style = {
	fontSize: "12px",
};

let textCurrentPage = new Layer({
	html: "Current page: 1",
	x: 170, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoBPanel,
});
textCurrentPage.style = {
	fontSize: "12px",
};

let indicatorPageScroll = new Ticker({
	x: 12, y: 50,
	description: '.onScroll',
	parent: demoBPanel,
});

let indicatorPageScrollStart = new Ticker({
	x: 12, y: indicatorPageScroll.maxY + 9,
	description: '.onScrollStart',
	parent: demoBPanel,
});

let indicatorPageScrollEnd = new Ticker({
	x: 12, y: indicatorPageScrollStart.maxY + 9,
	description: '.onScrollEnd',
	parent: demoBPanel,
});

let indicatorPageMove = new Ticker({
	x: 147, y: 50,
	description: '.onMove',
	parent: demoBPanel,
});

let indicatorPageAnimationStart = new Ticker({
	x: 147, y: indicatorPageScroll.maxY + 9,
	description: '.onAnimationStart',
	parent: demoBPanel,
});

let indicatorPageAnimationEnd = new Ticker({
	x: 147, y: indicatorPageScrollStart.maxY + 9,
	description: '.onAnimationEnd',
	parent: demoBPanel,
});


// Page component events
demoBPageComponent.onMove(()=>{
	textPageScrollValue.html = `Scroll value: ${Math.round(demoBPageComponent.scrollX)}`;
	demoBPanel.style = { color: "#212121" }
});

demoBPageComponent.on('change:currentPage', ()=>{
	textCurrentPage.html = `Current page: ${demoBPageComponent.currentPage.index}`;
	demoBPanel.style = { color: "#212121" }
});

demoBPageComponent.onMove(()=>{
	indicatorPageMove.tick();
});

demoBPageComponent.onScrollStart(()=>{
	indicatorPageScrollStart.tick();
});

demoBPageComponent.onScrollEnd(()=>{
	indicatorPageScrollEnd.tick();
});

demoBPageComponent.onScroll(()=>{
	indicatorPageScroll.tick();
});

demoBPageComponent.content.onAnimationStart(()=>{
	indicatorPageAnimationStart.tick();
});

demoBPageComponent.content.onAnimationEnd(()=>{
	indicatorPageAnimationEnd.tick();
});



// SECTION: DRAG BEHAVIOR ==================================

let sectionDrag = new Layer({
	name: "Demo C", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: 'white',
	parent: Examples
});

let demoCHeader = new Header({
	label: "Drag behavior",
	hasBackButton: true,
	parent: sectionDrag
});

let lemonStoreX = 130;
let lemonStoreY = 180;

let lemon = new Layer({
	name: "Lemon",
	width: 100, height: 97,
	scale: 0.8,
	x: lemonStoreX, y: lemonStoreY,
	image: "images/lemon.png",
	parent: sectionDrag,
});
lemon.draggable.enabled = true; 

let resetButton = new Layer({
	y: 400,
	width: 120, height: 30,
	backgroundColor: 'rgba(0,0,0,0.1)',
	borderRadius: 6,
	parent: sectionDrag
});
resetButton.centerX();
Utils.labelLayer(resetButton, 'Reset');
resetButton.style = {
	color: "#212121"
};

// Next, create a panel to display the drag behavior events.
let demoCPanel = new Layer({
	name: "Panel C",
	width: 343, 
	height: 160,
	maxY: prototypeHeight - 32,
	borderRadius: 18,
	backgroundColor: '#FFF',
	shadowBlur: 16,
	parent: sectionDrag
});
demoCPanel.centerX();

let textDragX = new Layer({
	html: `Lemon X: ${lemonStoreX}`,
	x: 40, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoCPanel,
});
textDragX.style = {
	fontSize: "12px",
};

let textDragY = new Layer({
	html: `Lemon Y: ${lemonStoreY}`,
	x: 170, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoCPanel,
});
textDragY.style = {
	fontSize: "12px",
};

let indicatorDragMove = new Ticker({
	x: 12, y: 50,
	description: '.onDrag',
	parent: demoCPanel,
});

let indicatorDragStart = new Ticker({
	x: 12, y: indicatorDragMove.maxY + 9,
	description: '.onDragStart',
	parent: demoCPanel,
});

let indicatorDragEnd = new Ticker({
	x: 12, y: indicatorDragStart.maxY + 9,
	description: '.onDragEnd',
	parent: demoCPanel,
});

let indicatorDragElementMove = new Ticker({
	x: 147, y: 50,
	description: '.onMove',
	parent: demoCPanel,
});

let indicatorDragAnimationStart = new Ticker({
	x: 147, y: indicatorDragElementMove.maxY + 9,
	description: '.onAnimationStart',
	parent: demoCPanel,
});

let indicatorDragAnimationEnd = new Ticker({
	x: 147, y: indicatorPageScrollStart.maxY + 9,
	description: '.onAnimationEnd',
	parent: demoCPanel,
});

// Events
resetButton.onClick(()=>{
	lemon.animate({
		x: lemonStoreX, y: lemonStoreY
	})
});

lemon.on('change:x', ()=>{
	textDragX.html = `Lemon X: ${Math.round(lemon.x)}`;
});

lemon.on('change:y', ()=>{
	textDragY.html = `Lemon Y: ${Math.round(lemon.y)}`;
});

lemon.onDragStart(()=>{
	indicatorDragStart.tick();
});

lemon.onDrag(()=>{
	indicatorDragMove.tick();
});

lemon.onDragEnd(()=>{
	indicatorDragEnd.tick();
});

lemon.onMove(()=>{
	indicatorDragElementMove.tick();
});

lemon.onAnimationStart(()=>{
	indicatorDragAnimationStart.tick();
});

lemon.onAnimationEnd(()=>{
	indicatorDragAnimationEnd.tick();
});


// SECTION: LOTTIE DEMO ==================================

let sectionLottie = new Layer({
	name: "Demo D", y: 0,
	width: prototypeWidth, height: prototypeHeight,
	backgroundColor: 'white',
	parent: Examples
});

let demoDHeader = new Header({
	label: "Lottie demo",
	hasBackButton: true,
	parent: sectionLottie
});

let lottieExample = new LottieLayer({
	name: 'LottieExample',
	path: 'images/lemonade.json',
	parent: sectionLottie,
	size: 270,
	autoplay: false
});
lottieExample.center();

let author = new Layer({
	width: 300, height: 12,
	y: lottieExample.maxY,
	backgroundColor: null,
	parent: sectionLottie
})
Utils.labelLayer(author, 'Animation by: Panizk Kazemi, @paniz_kzm_');
author.style = {
	fontSize: "10px",
	color: "#212121"
};
author.centerX();

let playback = 1;
let numOfLoops = 0;

// Next, create a panel to display lottie information.
let demoDPanel = new Layer({
	name: "Panel D",
	width: 343, 
	height: 100,
	maxY: prototypeHeight - 32,
	borderRadius: 18,
	backgroundColor: '#FFF',
	shadowBlur: 16,
	parent: sectionLottie
});
demoDPanel.centerX();

let textDirection = new Layer({
	html: `Direction: ${playback}`,
	x: 40, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoDPanel,
});
textDirection.style = {
	fontSize: "12px",
};

let textLoops = new Layer({
	html: `Loops: ${numOfLoops}`,
	x: 170, y: 10, height: 24,
	width: 100,
	backgroundColor: null,
	color: "#212121",
	parent: demoDPanel,
});
textLoops.style = {
	fontSize: "12px",
};

let indicatorPlayback = new Ticker({
	x: 12, y: 50,
	description: '.setDirection',
	parent: demoDPanel,
});

let indicatorLoop = new Ticker({
	x: 147, y: 50,
	description: '.onComplete',
	parent: demoDPanel,
});

// Events

lottieExample.onClick(()=>{
	// Inverse playback
	playback = playback * -1;
	lottieExample.setDirection(playback);
	// Reflect in panel
	textDirection.html = `Direction: ${playback}`;
	indicatorPlayback.tick();
});

lottieExample.onComplete(()=>{
	numOfLoops++;
	// Reflect in panel
	textLoops.html = `Loops: ${numOfLoops}`;
	indicatorLoop.tick();
});



// SECTION: NAVIGATION ==================================

// Show the first screen
Examples.showNext(homescreen);

demoAHeader.on('didClickBackButton', ()=>{
	Examples.showPrevious();
});

demoBHeader.on('didClickBackButton', ()=>{
	Examples.showPrevious();
});

demoCHeader.on('didClickBackButton', ()=>{
	Examples.showPrevious();
});

demoDHeader.on('didClickBackButton', ()=>{
	Examples.showPrevious();
	// Pause lottie animation
	lottieExample.pause();
});

optionA.onClick(()=>{
	Examples.showNext(sectionScrollComponent);
});

optionB.onClick(()=>{
	Examples.showNext(sectionPageComponent);
});

optionC.onClick(()=>{
	Examples.showNext(sectionDrag);
});

optionD.onClick(()=>{
	Examples.showNext(sectionLottie);
	// Play lottie animation
	lottieExample.play();
});