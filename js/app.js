/**
 *  Module
 *
 * Description
 */
angular.module('app', []);

angular.module('app')
	.controller('DrawCtrl', ['$scope', function($scope) {
		var self = this;
		self.piano_back = 'img/background.png';
		self.white_key = 'img/midi_white_up.png';
		self.black_key = 'img/midi_black_up.png';
		self.white_key_down = 'img/midi_white_down.png';
		self.black_key_down = 'img/midi_white_down.png';
		self.obj = {down: false};

		self.keys = [];
		var keyGroupOf3 = true;

		self.keys.push({black: true}); // first key is shown
		var i = 1;
		while (i < 54) {
			self.keys.push({black: false});
			// always followed by at least two
			self.keys.push({black: true});
			self.keys.push({black: true});
			if (keyGroupOf3){
				self.keys.push({black: true});
				i += 4;
			} else {
				i += 3;
			}
			keyGroupOf3 = !keyGroupOf3;
		}

		self.keys2 = [];
		self.keys2.push({next_key: false});
		var nextKey = false;
		keyGroupOf3 = false;
		i = 1;
		while (i < 40) {
			// first key in group
			self.keys2.push({next_key: true});
			if (keyGroupOf3) {
				self.keys2.push({next_key: true});
				self.keys2.push({next_key: false});
				i += 4;
			} else {
				self.keys2.push({next_key: false});
				i += 3;
			}
			keyGroupOf3 = !keyGroupOf3;
		}
		// console.log(self.keys2);

		self.range = function(num) {
			return new Array(num);
		};
	}])


	.directive('pressWhiteKey', [ function () {
		return {
			link: function (scope, elem, attrs) {
				var parent = scope.$parent.$parent;
				parent.down = false;
				elem.bind('mousedown', function() {
					elem[0].src = 'img/midi_white_down.png';
					parent.down = true;
				});
				elem.bind('mouseup', function() {
					elem[0].src = 'img/midi_white_up.png';
					parent.down = false;
				});
				elem.bind('mouseleave', function() {
					elem[0].src = 'img/midi_white_up.png';
				});
				elem.bind('mouseenter', function() {
					if (parent.down)
						elem[0].src = 'img/midi_white_down.png';
				});
			}
		};
	}])	

	.directive('pressBlackKey', [ function () {
		return {
			link: function (scope, elem, attrs) {
				var parent = scope.$parent.$parent.$parent;
				parent.down = false;
				elem.bind('mousedown', function() {
					elem[0].src = 'img/midi_black_down.png';
					parent.down = true;
				});
				elem.bind('mouseup', function() {
					elem[0].src = 'img/midi_black_up.png';
					parent.down = false;
				});
				elem.bind('mouseleave', function() {
					elem[0].src = 'img/midi_black_up.png';
				});
				elem.bind('mouseenter', function() {
					if (parent.down)
						elem[0].src = 'img/midi_black_down.png';
				});
			}
		};
	}]);

