/*global Book*/
(function (d) {

	// Load an external resource
	function load(src) {
		// Create script element
		d.body.appendChild(d.createElement('script')).src = src;

		// Terminate
		return false;
	}

	Book.add({
		// HTML5 Support
		5: {
			// Browser support charts
			c: 'http://caniuse.com/',

			// Test current browser
			t: 'http://html5test.com/'
		},

		// Bookmarklets
		b: {
			// Asteroids
			a: function () {
				return load('http://erkie.github.com/asteroids.min.js');
			},

			// DOM Monster
			d: function () {
				return load('http://mir.aculo.us/dom-monster/dommonster.js');
			},

			// Firebug Lite
			f: function () {
				return load('http://getfirebug.com/firebug-lite.js');
			},

			// jQuery
			j: function () {
				return load('http://code.jquery.com/jquery.js');
			}
		},

		// Google
		g: function (u) {
			u.push('http://google.com/');
			return { s: 'search?q=' };
		},

		// GitHub
		h: 'http://github.com/',

		// jQuery
		j: function (u) {
			u.push('http://{}jquery{}.com/');
			return {
				u: ['', 'ui'],
				a: ['api.', '']
			};
		},

		// Mozilla Developer Network
		m: function (u) {
			u.push('http://developer.mozilla.org/');
			return { s: 'en-US/search?q=' };
		},

		// Social
		s: {
			f: 'http://facebook.com/shannonmoeller/',
			i: 'http://linkedin.com/in/shannonmoeller/',
			p: 'http://shannonmoeller.com/',
			t: 'http://twitter.com/shannonmoeller/'
		},

		// Wikipedia
		w: function (u) {
			u.push('http://en.wikipedia.org/');
			return { s: 'wiki/Special:Search?search=' };
		}
	});

}(document));
