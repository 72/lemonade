// Header for Lemonade

export class Header extends Layer {
	constructor(props){
		// 1. Kickoff props - Don't change
		if(props == null) { props = {}; }
		// 2. Default props - Add your own here
		if (props.backgroundColor == null) { props.backgroundColor = "white"; }
		if (props.label == null) { props.label = "Add a label"; }
		if (props.hasBackButton == null) { props.hasBackButton = false; }
		
		// super! - Don't change
		super(props);
		// 3. Map props
		this.label = props.label;
		this.hasBackButton = props.hasBackButton;
		// Init
		this.setup();
	};// End constructor

	
	setup() {
		this.name = this.label;
		this.width = this.parent.width;
		this.height = 64;
		// Add label
		Utils.labelLayer(this, this.label);
		this.style = {
			color: "#212121",
			fontSize: "20px"
		};
		//
		if(this.hasBackButton){
			this.backButton = new Layer({
				x: 0, size: 42,
				backgroundColor: null,
				parent: this
			});
			this.backButton.centerY();
			Utils.labelLayer(this.backButton, "←");
			this.backButton.style = {
				color: "#212121",
				fontSize: "24px"
			};
			this.backButton.onClick(()=>{
				this.emit("didClickBackButton");
			});
		};
	};// End setup

};