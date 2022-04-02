# Lemonade

### A Javascript template built using an obsolete version of Framer.

## [🍋 Demo](https://lmnd.netlify.app/)

#### How to run:

1. Go to the Lemonade folder.
2. Run your preferred local server. For example, type in your terminal: `live-server`

![workspace-example](demo.gif)

#### Again, this is a zombie version of old Framer. You should be using something else.

Lemonade simply gives you a template to help you kickoff your own thing with old FramerJS.

Most notably, the template comes with a setup `app` layer that you can use as your canvas and add your content inside it.
This `app` layer is then scaled by the `fitToScreen` function so that it fits any browser window.

This is great (I mean, all things considered...) for **remote user research**. Research participants can run your prototype on their device, regardless of which device they're using.

You can delete the Lemonade template and start from scratch a new FramerJS project.

And in that case, here are notes to help you set up a new project.

# Notes and snippets

- **[Layer](#console-log)**
- **[Set Device](#set-device)**
- **[Set Custom Device](#set-custom-device)**
- **[Scroll Component](#scroll-component)**
- **[Page Component](#page-component)**
- **[Flow Component](#flow-component)**
- **[Lottie](#lottie)**
- **[Gotchas](#gotchas)**

## Layer

```javascript
// The basic element in Framer
let layerA = new Layer({
	width: 100,
	height: 100,
	x: 24,
	y: 24,
});
```

#### Available attributes and their default values:

Framer Layers are quite extensible, here are all the Layer attributes you can modify.

```javascript
/**
 * You would set these attributes when creating a new Layer, or also afterwards, like this:
 *
 * layerA.backgroundColor = 'skyblue';
 *
 */
backgroundColor: "rgba(123, 123, 123, 0.5)";
blur: 0;
borderColor: "rgba(123, 123, 123, 0.5)";
borderRadius: 0;
borderWidth: 0;
brightness: 100;
clip: false;
color: "white";
contrast: 100;
flat: false;
force2d: false;
grayscale: 0;
height: 200;
hueRotate: 0;
ignoreEvents: true;
index: 1;
invert: 0;
opacity: 1;
originX: 0.5;
originY: 0.5;
originZ: 0;
perspective: 0;
perspectiveOriginX: 0.5;
perspectiveOriginY: 0.5;
rotationX: 0;
rotationY: 0;
rotationZ: 0;
saturate: 100;
scale: 1;
scaleX: 1;
scaleY: 1;
scaleZ: 1;
sepia: 0;
shadowBlur: 0;
shadowColor: "rgba(123, 123, 123, 0.5)";
shadowSpread: 0;
shadowX: 0;
shadowY: 0;
skew: 0;
skewX: 0;
skewY: 0;
visible: true;
width: 200;
x: 0;
y: 0;
z: 0;
```

#### Available event listeners for Layers:

Framer Layers come with a powerful set of event listeners to detect interactions and animations.

```javascript
/**
 * You would use an event like this:
 *
 * layerA.onSwipeUpStart(()=>{
 *   console.log("Swipe up on layerA");
 * });
 *
 */
onAnimationEnd;
onAnimationStart;
onAnimationStop;

onClick;
onDirectionLockStart; // Useful when draggable is enabled
onDoubleClick;
onDoubleTap;

// Drag events require enabling draggable. Like this:
// layerA.draggable.enabled = true;
onDrag;
onDragAnimationEnd;
onDragAnimationStart;
onDragDidMove;
onDragEnd;
onDragMove;
onDragStart;
onDragWillMove;

onForceTap;
onForceTapChange;
onForceTapEnd;
onForceTapStart;

onImageLoadCancelled;
onImageLoadError;
onImageLoaded;

onLongPress;
onLongPressEnd;
onLongPressStart;

onMouseDown;
onMouseMove;
onMouseOut;
onMouseOver;
onMouseUp;
onMouseWheel;

onMove;

onPan;
onPanDown;
onPanEnd;
onPanLeft;
onPanRight;
onPanStart;
onPanUp;

onPinch;
onPinchEnd;
onPinchStart;

onRotate;
onRotateEnd;
onRotateStart;

onScale;
onScaleEnd;
onScaleStart;

// Scroll events are available on scrollable components, explained further down under the 'Scroll component' section.
onScroll;
onScrollAnimationDidEnd;
onScrollAnimationDidStart;
onScrollEnd;
onScrollStart;

onStateDidSwitch;
onStateSwitchEnd;
onStateSwitchStart;
onStateSwitchStop;
onStateWillSwitch;

onSwipe;
onSwipeDown;
onSwipeDownEnd;
onSwipeDownStart;
onSwipeEnd;
onSwipeLeft;
onSwipeLeftEnd;
onSwipeLeftStart;
onSwipeRight;
onSwipeRightEnd;
onSwipeRightStart;
onSwipeStart;
onSwipeUp;
onSwipeUpEnd;
onSwipeUpStart;

onTap;
onTapEnd;
onTapStart;
onTouchEnd;
onTouchMove;
onTouchStart;
```

[Back to top](#notes-and-snippets)

## Set Device

```javascript
let Device = new DeviceComponent();
Device.setupContext();
Device.deviceType = "apple-iphone-7-gold";
```

[Back to top](#notes-and-snippets)

## Set Custom Device

```javascript
let Device = new DeviceComponent();
Device.setupContext();
// Tablet
Device.customize({
	screenWidth: 720,
	screenHeight: 1024,
	deviceImage: "http://f.cl.ly/items/001L0v3c1f120t0p2z24/custom.png",
	deviceImageWidth: 800,
	deviceImageHeight: 1214,
});
```

[Back to top](#notes-and-snippets)

## Scroll Component

```javascript
// Scroll Component Example
let Device = new DeviceComponent();
Device.setupContext();

let myScroll = new ScrollComponent({
	width: 750,
	height: 1334,
	scrollHorizontal: false,
});

let placeholderContent = new Layer({
	width: 750,
	height: 2500,
	backgroundColor: "skyblue",
	parent: myScroll.content,
});

myScroll.on(Events.Move, function () {
	console.log("Scroll: " + myScroll.scrollY);
});
```

[Back to top](#notes-and-snippets)

## Page Component

```javascript
// Page Component Example
let Device = new DeviceComponent();
Device.setupContext();

let pageCount = 8;
let gutter = 20;

let myPageComponent = new PageComponent({
	width: 750,
	height: 1334,
	scrollVertical: false,
	clip: false,
});

for (let i = 0; i < pageCount; i++) {
	let page = new Layer({
		name: "Page " + i,
		size: myPageComponent.size,
		x: (myPageComponent.width + gutter) * i,
		backgroundColor: "#00AAFF",
		hueRotate: i * 20,
		parent: myPageComponent.content,
	});
	page.onClick(function () {
		console.log("Clicked: " + this.name);
		myPageComponent.snapToPage(this);
	});
}
```

[Back to top](#notes-and-snippets)

## Flow Component

```javascript
// Flow Component Example
Framer.Extras.Hints.disable();

let Device = new DeviceComponent();
Device.setupContext();

let screenA = new Layer({
	size: Screen.size,
	backgroundColor: "#00AAFF",
});

let screenB = new Layer({
	size: Screen.size,
	backgroundColor: "#FFCC33",
	image: Utils.randomImage(),
});

// States
screenA.states = {
	scaleBack: {
		scale: 0.95,
	},
	scaleDefault: {
		scale: 1,
	},
};
screenA.states.animationOptions = {
	curve: "ease-in-out",
	time: 0.2,
};

// Flow
let flow = new FlowComponent({
	size: Screen.size,
});

flow.showNext(screenA);

// Events
screenA.onClick(function () {
	screenA.animate("scaleBack");
	flow.showOverlayBottom(screenB);
	console.log("Show Screen B");
});

screenB.onClick(function () {
	screenA.animate("scaleDefault");
	flow.showPrevious();
	console.log("Show Screen A again");
});
```

[Back to top](#notes-and-snippets)

## Lottie

```javascript
// Here's a basic example on how to use the Lottie Layer
// Please note that the 'name' attribute is required. It must be unique, and cannot contain spaces.
let lottieExample = new LottieLayer({
	name: "LottieExample",
	path: "images/lemonade.json",
});
```

- `name` _String_ **Required** : Sets the name of the instance. Each instance must have a different name.
- `path` _String_ **Required** : Sets the path to your JSON file.
- `autoplay` _Boolean_ : Whether or not to autoplay the animation once it's loaded. Defaults to true.
- `loop` _Boolean or Number_ : Whether or not to loop the animation. If you pass a number, the animation will loop that many times. Defaults to true.
- `speed` _Number_ : Sets the speed of the animation. 1 is normal speed. 2 is double the speed and so on. Defaults to 1.
- `direction` _Number_ : Sets the direction of the animation. 1 will play the animation forward. -1 will play the animation backwards. Defaults to 1.

```javascript
// Available methods:
.play()
.pause()
.stop()
// The animation needs to be loaded in the DOM before running these 3 methods:
.goToAndStop( frame )
.goToAndPlay( frame )
.playSegments([ fromFrame, toFrame ])

// Available events:
onComplete() // This trigger after every loop
on("change:speed", ()=>{
	console.log('Speed changed');
});
on("change:direction", ()=>{
	console.log('Direction changed');
});
```

[Back to top](#notes-and-snippets)

## Gotchas

> Getting a layer's background color

```javascript
// In the old times, this line would return the value you expect
print(layerA.backgroundColor);

// This is how you'd access the color value now
console.log(layerA.backgroundColor.color);
```

[Back to top](#notes-and-snippets)

---

Notes are WIP, I'll continue to update them and add more examples.

[@72mena](https://twitter.com/72mena)

🍋
