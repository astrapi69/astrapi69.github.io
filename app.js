function ListItem(value) {
	var self = this;
    self.value = ko.observable(value);
}


var AppViewModel = function() {
	var self = this;
	self.initialize = initialize;
	self.skills = ko.observableArray([
        new ListItem("Independent fullstack developer"),
        new ListItem("Mathematics enthusiast"),
        new ListItem("Linux expertise in flavors of debian, Ubuntu and Lubuntu"),
        new ListItem("Adherent of open source software and distribution")
	]);
	
	function initialize() {
		console.log('initialize');
	}
};

ko.applyBindings(new AppViewModel()); 
