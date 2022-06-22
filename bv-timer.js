(function() {
	window.addEventListener("DOMContentLoaded", () => {
		link = `<link rel="stylesheet" href="https://combinatronics.com/VoldyBV/timer_element/master/bv-timer.css">`;
		document.head.insertAdjacentHTML("afterbegin", link);
	})

	class BVTimer extends HTMLElement{
  		constructor(){
  			super();
		}
		connectedCallback(){
  			var odbrojavanje = this.#count_down.bind(this);
			this.running = false;

			if(!this.hasAttribute('interval')) this.interval = 1;
			else this.IC = this.interval;

			if(isNaN(Number(this.innerHTML))) this.value = this.innerHTML;

			if(!this.hasAttribute('value')) this.value = 0;

			if(!this.hasAttribute('autostart')) this.autostart = false;
			else this.autostart = true;

			if(this.autostart == "true"){ 
				this.myCountDown = setInterval(odbrojavanje, 1000);
				this.running = true;
			};
		}

		static get observedAttributes() {
			return ['value', 'interval', 'autostart', 'onInterval', 'onTimeOutonTimeOut']
    	}

		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
				case 'value': this.innerHTML = this.value;break;
				case 'interval': this.IC = newValue;break;
				default: break;
			}
		}

		set interval(newValue){
			if(isNaN(Number(newValue))) newValue = "1";

			this.setAttribute("interval", newValue)
		}
		get interval(){
			return this.getAttribute("interval");
		}

		set value(newValue){
			if(isNaN(Number(newValue))) newValue = "0";

			this.setAttribute("value", newValue)
		}
		get value(){
			return this.getAttribute("value");
		}

		set autostart(newValue){
			if(newValue) newValue = true;
			else newValue = false;

			this.setAttribute("autostart", newValue)
		}
		get autostart(){
			return this.getAttribute("autostart");
		}

		#count_down(){
			if(this.value <= 1){
				clearInterval(this.myCountDown);
				this.value = 0;
				this.running = false;
				if(this.hasAttribute('onTimeOut')) eval(this.getAttribute('onTimeOut'));
				if(this.IC <= 1){
					if(this.hasAttribute('onInterval')) eval(this.getAttribute('onInterval'));
					this.IC = this.interval;
				}
				else this.IC -= 1;
			}
			else{
				this.value -= 1;

				if(this.IC <= 1){
					if(this.hasAttribute('onInterval')) eval(this.getAttribute('onInterval'));
					this.IC = this.interval;
				}
				else this.IC -= 1;
			}
		}

		play(){
			if(!this.running){
				var odbrojavanje = this.#count_down.bind(this);
				this.myCountDown = setInterval(odbrojavanje, 1000);
				this.running = true;
			}
		}

		pause(){
			if(this.running){
				clearInterval(this.myCountDown);
				this.running = false;
			}
		}
		timeOut(){
			this.value = 1;
		}

		disconnectedCallback() {
		}
  	}
  window.customElements.define("bv-timer", BVTimer);
})();