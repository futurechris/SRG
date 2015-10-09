Template.headerProjectTile.helpers({
	getHeaderTileImage: function(){
		if(typeof(this._headerImages) !== "undefined")
		{
			return this._headerImages[Math.floor(Math.random()*this._headerImages.length)];
		}
		else if(
					typeof(Meteor.settings.public) !== "undefined"
			&&	typeof(Meteor.settings.public.blankHeaderTileImage) !== "undefined" )
		{
			return Meteor.settings.public.blankHeaderTileImage;
		}
		else
		{
			return "";
		}
	}
})