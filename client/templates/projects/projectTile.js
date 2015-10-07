Template.projectTile.helpers({
	getTileImage: function(){
		if(typeof(this._tileImages) !== "undefined")
		{
			return this._tileImages[Math.floor(Math.random()*this._tileImages.length)];
		}
		else if(
					typeof(Meteor.settings.public) !== "undefined"
			&&	typeof(Meteor.settings.public.blankTileImage) !== "undefined" )
		{
			return Meteor.settings.public.blankTileImage;
		}
		else
		{
			return "";
		}
	}
})