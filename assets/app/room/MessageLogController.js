app.controller('MessageLogController', function ($rootScope, $stateParams, bunkerApi, uuid, user, rooms) {
	var self = this;
	var roomId = $stateParams.roomId;

	this.user = user.current;
	this.roomsService = rooms;
	this.messages = [];

	bunkerApi.message.query({id: 'latest', roomId: roomId}, function (messages) {
		_(messages).sortBy('createdAt').each(function(message) {
			addMessage(message);
		});
	});

    // Handle incoming messages
    $rootScope.$on('$sailsResourceMessaged', function (evt, resource) {
        if (resource.model == 'room' && resource.id == roomId) {
            addMessage(resource.data);
        }
    });

    // Handle message edits
    $rootScope.$on('$sailsResourceUpdated', function (evt, resource) {
        if (resource.model == 'message') {
            editMessage(resource.data);
        }
    });

	$rootScope.$on('$sailsDisconnected', function (evt, data) {
		self.messages.push({text: 'Disconnected', id: uuid.v4(), createdAt: new Date().toISOString()});
	});

    function addMessage(message) {
        var lastMessage = _.last(self.messages);
        message.$firstInSeries = !lastMessage || !lastMessage.author || !message.author || lastMessage.author.id != message.author.id;
        self.messages.push(message);
    }

    function editMessage(message) {
        // todo: learn underscore (I think)
        for (var i = 0; i < self.messages.length; i++){
            if (self.messages[i].id == message.id) {
                self.messages[i] = message;
            }
        }
    }
});
