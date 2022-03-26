/** 
 * Ticker, for Lemonade.
 * 
 * Description:
 * A component to visualize the moment an event triggers.
 * 
 * Usage:
 * - Use the 'description' attribute to add a label next to the indicator.
 * - Call the '.tick()' method to trigger the tick animation.
**/

import { LemonUI } from "../LemonUI.js";

export class Ticker extends Layer {
	constructor(props){
		// 1. Kickoff props - Don't change
		if(props == null) { props = {}; }
		// 2. Default props - Add your own here
		if (props.backgroundColor == null) { props.backgroundColor = "rgba(0, 0, 0, 0.07)"; }
		if (props.description == null) { props.description = "Add a label"; }
		
		// super! - Don't change
		super(props);
		// 3. Map props
		this.description = props.description;
		// Init
		this.setup();
	};// End constructor

	
	setup() {
		this.width = 100;
		this.height = 24;
		this.backgroundColor = null;

		this.outer = new Layer({
			size: 24,
			borderRadius: 24,
			backgroundColor: null,
			parent: this
		});
		this.outer.style = {
			border: "1px solid #999"
		};
		this.outer.centerY();

		this.innerDot = new Layer({
			size: 24,
			scale: 0.6,
			borderRadius: 24,
			backgroundColor: LemonUI.Colors.Action,
			opacity: 0,
			parent: this
		});

		this.tickerLabel = new Layer({
			width: 100, height: 16,
			x: 28, y: Align.center(),
			label: this.description,
			backgroundColor: null,
			parent: this
		});
		this.tickerLabel.style = {
			color: LemonUI.Colors.TextPrimary,
			textAlign: 'left',
			fontSize: '12px'
		};

	};// End setup

	tick(){
		this.innerDot.opacity = 1;
		this.innerDot.animate({
			opacity: 0,
			options: {
				curve: 'linear',
				time: '0.33'
			}
		})
	}
};