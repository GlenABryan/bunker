app.directive('roomid', function () {
	return {
		scope:{
			roomId:'@roomid'
		},
		templateUrl:'/assets/app/room/room.html',
		controller:'RoomController as room'
	}
});