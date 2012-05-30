/*jslint regexp: true */
(function (global) {
	'use strict';

	var doc = global.document,
		els = doc.querySelectorAll('script[src*=book\\.js]'),
		attr = els[els.length - 1].src.replace(/^[^\?]*\?/, ''),
		args = global.decodeURIComponent(attr).split(/[\s+]+/),
		log = false,

		exec = function (obj) {
			if (args.length) {
				obj[args.shift()]();
			}
		},

		go = function (url) {
			url += args.join('/');

			if (log) {
				global.console.log(url);
				return;
			}

			global.location.href = url;
		},

		load = function (url) {
			return function () {
				var el = doc.createElement('script');

				doc.body.appendChild(el).src = url;
			};
		},

		toGo = function (url) {
			return function () {
				go(url);
			};
		};

	exec({
		// Do or do not.
		log: function () {
			log = true;

			exec(this);
		},

		// HTML5 Support
		5: function () {
			exec({
				c: toGo('http://caniuse.com/'),
				d: toGo('http://html5doctor.com/'),
				p: toGo('http://html5please.com/'),
				t: toGo('http://html5test.com/')
			});
		},

		// Bookmarklets
		b: function () {
			exec({
				a: load('http://erkie.github.com/asteroids.min.js'),
				d: load('http://mir.aculo.us/dom-monster/dommonster.js'),
				f: load('http://getfirebug.com/firebug-lite.js'),
				j: load('http://code.jquery.com/jquery.js')
			});
		},

		// Google
		g: function () {
			var url = 'http://google.com/';

			if (args.length) {
				url += 'search?q=';
				url += args.join('+');
			}

			go(url);
		},


		// Mozilla Developer Network
		m: function () {
			var url = 'http://developer.mozilla.org/';

			if (args.length) {
				url += 'en-US/search?q=';
				url += args.join('+');
			}

			go(url);
		},

		// Social
		s: function () {
			exec({
				f: toGo('http://facebook.com/shannonmoeller/'),
				l: toGo('http://linkedin.com/in/shannonmoeller/'),
				t: toGo('http://twitter.com/shannonmoeller/')
			});
		},

		// Wikipedia
		w: function () {
			var url = 'http://en.wikipedia.org/';

			if (args.length) {
				url += 'wiki/Special:Search?search=';
				url += args.join('+');
			}

			go(url);
		}
	});

}(this));