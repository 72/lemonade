// MenuButton for Lemonade

export class MenuButton extends Layer {
	constructor(props){
		// 1. Kickoff props - Don't change
		if(props == null) { props = {}; }
		// 2. Default props - Add your own here
		if (props.backgroundColor == null) { props.backgroundColor = "rgba(0, 0, 0, 0.07)"; }
		if (props.label == null) { props.label = "Add a label"; }
		
		// super! - Don't change
		super(props);
		// 3. Map props
		this.label = props.label;
		// Init
		this.setup();
	};// End constructor

	
	setup() {
		this.name = this.label;
		this.width = this.parent.width - 32;
		this.height = 56;
		this.borderRadius = 12;
		// Add label
		Utils.labelLayer(this, this.label);
		this.style = {
			color: "#212121"
		};
	};// End setup
};