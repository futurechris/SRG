Template.heatmap.created = function(){
	var _this = this;
	if(typeof(_this.calData) === "undefined" || _this.calData === null)
	{
		_this.calData = new ReactiveVar();
	}
}

// this is a bit of a mess right now... Sigh.
Template.heatmap.rendered = function(){
	var _this = this;

	_this.autorun(function(){
		var subscriptionsReady = _this.subscriptionsReady(); 

		if(subscriptionsReady)
		{
			
			var log = ActivityLog.find({ _project:_this.data._id }, {sort: [["_date", "asc"]]});
			var logArray = log.fetch();

			var data = Template.instance().calData.get();

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

			cal.update(data);
		}
	});
}