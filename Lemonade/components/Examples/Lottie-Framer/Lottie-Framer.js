/*
LottieLayer
-
Implementation of Hernan Torrisi's & AirBnb "Lottie-Web" for Framer.
by @72mena
*/

// INCLUDE LIBRARY ———————————————————————————
const insertScript = function(localScript, webScript, name) {
	let lib;
	if (name == null) { name = 'JavaScript Library'; }
	try {
		lib = Utils.domLoadDataSync(localScript);
		console.log(`%c${name} Successfully Included Locally`, "background: #DDFFE3; color: #007814");
	} catch (e) {
		try {
			lib = Utils.domLoadDataSync(webScript);
			console.log(`%c${name} Successfully Included from Web`, "background: #DDFFE3; color: #007814");
		} catch (error) {
			e = error;
			throw Error(`Sorry, I couldn't load ${name}`);
		}
	}

	const script = document.createElement("script");
	script.type = "text/javascript";
	script.innerHTML = lib;

	const head = document.getElementsByTagName("head")[0];
	head.appendChild(script);

	return script;
};

insertScript("components/Lottie-Framer/lottie.min.js", "https://raw.githubusercontent.com/airbnb/lottie-web/master/build/player/lottie.min.js", "lottie-web");


// LOTTIE LAYER ———————————————————————————
export class LottieLayer extends Layer {

	constructor(props) {
		// 1. Kickoff props (Don't change this one)
		if(props == null) { props = {}; }

		// 2. Default props (Add yours)
		if (props.testFlag == null) { props.testFlag = true; }
		if (props.backgroundColor == null) { props.backgroundColor = null; }
		if (props.path == null) { props.path = null; }
		if (props.autoplay == null) { props.autoplay = true; }
		if (props.loop == null) { props.loop = true; }
		if (props.speed == null) { props.speed = 1; }
		if (props.direction == null) { props.direction = 1; }
		if (props.renderer == null) { props.renderer = "svg"; }

		super(props);

		if (props.path === null) {
			console.log("From LottieLayer: Setting a path to your json file is required.");
		}
		if (this.name === "") {
			console.log("From LottieLayer: The 'name' attribute is required.");
		}

		//Shortcuts
		this.path = props.path;
		this.autoplay = props.autoplay;
		this.loop = props.loop;
		this.speed = props.speed;
		this.direction = props.direction;
		this.renderer = props.renderer;
		

		//Vars
		this.built = false;
		this._animationLayer = null;

		this.build = this.build.bind(this);
		this.setSettings = this.setSettings.bind(this);
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.pause = this.pause.bind(this);
		this.goToAndPlay = this.goToAndPlay.bind(this);
		this.goToAndStop = this.goToAndStop.bind(this);
		this.playSegments = this.playSegments.bind(this);


		//Run
		this.build();
	}

	build() {
		this.html = '<div id='+`${this.name}`+'></div>';
		this.setSettings();
		return this.built = true;
	}

	setSettings() {
		const _container = document.getElementById(this.name);
		_container.innerHTML = "";

		const lottieSettings = {
			container: _container,
			path: this.path,
			renderer: this.renderer,
			autoplay: this.autoplay,
			loop: this.loop
		};

		this._animationLayer = lottie.loadAnimation(lottieSettings);
		this.setSpeed();
		return this.setDirection();
	}

	play() {
		return this._animationLayer.play();
	}
	stop() {
		return this._animationLayer.stop();
	}
	pause() {
		return this._animationLayer.pause();
	}
	goToAndPlay(value, isFrame) {
		if (isFrame == null) { isFrame = true; }
		return this._animationLayer.goToAndPlay(value, isFrame);
	}
	goToAndStop(value, isFrame) {
		if (isFrame == null) { isFrame = true; }
		return this._animationLayer.goToAndStop(value, isFrame);
	}
	playSegments(segments, forceFlag) {
		if (forceFlag == null) { forceFlag = true; }
		return this._animationLayer.playSegments(segments, forceFlag);
	}
	setSpeed(speed) {
		if (speed == null) { ({
            speed
        } = this); }
		return this._animationLayer.setSpeed(speed);
	}
	setDirection(direction) {
		if (direction == null) { ({
            direction
        } = this); }
		return this._animationLayer.setDirection(direction);
	}
	onComplete(callback) {
		if (this.loop) {
			return this._animationLayer.addEventListener("loopComplete", callback);
		} else {
			return this._animationLayer.addEventListener("complete", callback);
		}
	}
}