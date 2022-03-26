# Lemonade

### A Javascript template built using an obsolete version of Framer.

[Demo](https://lmnd.netlify.app/)

#### How to run:

1. Go to the Lemonade folder.
2. Run your preferred local server, example type in your terminal:

`live-server`

![workspace-example](demo.gif)

#### Again, this is a zombie version of old Framer. You should be using something else.

Lemonade simply gives you a template to help you kickoff your own thing.

Most notably, the template comes with a setup `app` layer that you can use as your canvas, and add your content inside it.
This `app` layer is then scaled by the `fitToScreen` function so that it fits any browser window.

This is great (I mean, all things considered...) for **remote user research**. Research participants can run your prototype on their device, regardless of which device they're using.

You can delete the Lemonade template and start from scratch.

And in that case, here are notes to help you set up a new project.

# Framer notes and snippets

- **[Console Log](#console-log)**
- **[Set Device](#set-device)**
- **[Set Custom Device](#set-custom-device)**
- **[Scroll Component](#scroll-component)**
- **[Page Component](#page-component)**
- **[Flow Component](#flow-component)**
- **[Gotchas](#gotchas)**

## Console Log

> Framer (CoffeeScript)

```javascript
print "Check, please"
```

> Framer Library (JS)

```javascript
console.log("Check, please");
```

## Set Device

```javascript
let Device = new DeviceComponent();
Device.setupContext();
Device.deviceType = "apple-iphone-7-gold";
```

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
