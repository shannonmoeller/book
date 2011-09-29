/*global console, location, window*/
var Book = (function () {

	var // Whether to log result to console
		log,

		// Object containing aliases
		aliases = {
			log: function () { log = true; }
		},

		// Match space
		space = /[ +]+/,

		// Match substring
		substring = /\{\}/,

		// Match protocol
		protocol = /^(http|javascript)/;

	// Object handler
	function handle(obj, uri, query) {
		var val;

		// Type-based alias handling
		switch ((obj instanceof Array && 'array') || typeof obj) {
			// Add string alias to uri
			case 'string':
				uri.push(obj);
				break;

			// Add array alias to query
			case 'array':
				query.unshift.apply(query, obj);
				break;

			// Handle the result of executing a function alias
			case 'function':
				// Execute the function
				val = obj.call(this, uri, query);

				// Terminate current handing
				if (val === false) {
					// Empty uri and query
					uri.length = 0;
					query.length = 0;

					// End handling
					break;
				}

				// Handle result
				handle.call(this, val || this, uri, query);

				break;

			// Match query items to object alias
			case 'object':
				// Mungable array loop
				while (query.length) {
					// Left-to-right
					val = query.shift();

					// Has alias?
					if (!obj[val]) {
						// Put value back
						query.unshift(val);

						// End handling
						break;
					}

					// Handle alias
					handle.call(obj, obj[val], uri, query);
				}

				break;
		}
	}

	return {
		// Register new aliases
		add: function (obj) {
			var p;

			for (p in obj) {
				if (obj.hasOwnProperty(p)) {
					aliases[p] = obj[p];
				}
			}
		},

		// Parse a bookmark shortcut
		parse: function (str) {
			var uri = [],
				query = str.split(space);

			// Handle modifies uri and query
			handle(aliases, uri, query);

			// Reduce uri
			uri = uri.join('');

			// Substring injection
			while (substring.test(uri)) {
				uri = uri.replace(substring, query.shift() || '');
			}

			// Return final result
			return uri + query.join('+');
		},

		// Parse a bookmark shortcut and redirect to result
		load: function (str, open) {
			// Parse string
			var uri = Book.parse(str);

			// Only redirect if we're not logging and have a plausible uri
			if (!log && protocol.test(uri)) {
				if (open) {
					window.open(uri);
				}
				else {
					location.href = uri;
				}
			}
			else if (window.console) {
				console.log(uri);
			}
		}
	};

}());
