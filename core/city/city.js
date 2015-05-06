module.exports = function City(){
	var self = this;
	var neighborhoods = [];
	self.addNeighborhood = function(neighborhood){
		neighborhoods.push(neighborhood);
	}
}