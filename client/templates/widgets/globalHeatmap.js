Template.globalHeatmap.created = function(){
	var _this = this;
	if(typeof(_this.globalCalData) === "undefined" || _this.globalCalData === null)
	{
		_this.globalCalData = new ReactiveVar();
	}
}

// this is a bit of a mess right now... Sigh.
Template.globalHeatmap.rendered = function(){
	var _this = this;

	_this.autorun(function(){
		var subscriptionsReady = _this.subscriptionsReady(); 

		if(subscriptionsReady)
		{
			var log = ActivityLog.find({}, {sort: [["_date", "asc"]]});
			var logArray = log.fetch();

			var data = Template.instance().globalCalData.get();

			if(typeof(data) === "undefined" || data === null)
			{
				data = {};
			}

			// now iterate over log and transform it into the format CalHeatMap expects
			var i = 0;
			for(i=0; i<logArray.length; i++)
			{
				var dateSeconds = ""+(new Date(logArray[i]._date).valueOf()/1000);

				if(dateSeconds.length == 0)
				{
					continue;
				}

				if(typeof(data[dateSeconds]) === "undefined" )
				{
					data[dateSeconds] = 0;
				}

				data[dateSeconds]++;
			}

			globalCal.update(data);
		}
	});
}