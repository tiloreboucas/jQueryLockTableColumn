(function ($) {
    var attr = {
        target: '',
        container: '',
		mask: '',
		index: '',
		handle: '',
		maskId: '',
		targetId: ''
    }
    var methods = {
        init: function () {
            attr.target = this;
			attr.targetId = $(attr.target).attr("id");
			methods.setup();
			methods.creatIndex();
			methods.fixHeightRows();
			methods.startScroll();
        },
		setup: function(){
			$(attr.target).wrap('<div class="handle" />');
			attr.handle = $(attr.target).parent();
			$(attr.handle).wrap('<div class="DynamicTable_mask dragdealer" />');
			attr.mask = $(attr.handle).parent();
			attr.maskId =  attr.targetId + "_dragdealer"
			$(attr.mask).attr("id", attr.maskId)
			$(attr.mask).wrap('<div class="DynamicTable_container" />');
			attr.container = $(attr.mask).parent();
			$(attr.container).prepend('<table class="DynamicTable_index" />');
			attr.index = $(".DynamicTable_index", attr.container);
		},
		creatIndex: function(){
			var item = $("tr > *:first-child", attr.container);
			$("tr > *:first-child", attr.container).remove();
			var str = "";
			for(var i = 0; i < item.length; i++){
				if(i == 0) {
					$(attr.index).append("<tr><th>"+$(item[i]).html()+"</th></tr>");
				} else {
					$(attr.index).append("<tr><td>"+$(item[i]).html()+"</td></tr>");
				}
			}
		},
		fixHeightRows: function(){
			var item = $("tr", attr.target);
			var itemIndex = $("tr", attr.index);
			for(var i = 0; i < item.length; i++){
				$(itemIndex[i]).css("height", item[i].clientHeight);
			}
		},
		startScroll: function(){
			var ti = $(attr.index).outerHeight(true);
			$(attr.mask).height(ti);
			var itemId = $(attr.mask).attr("id");
			new Dragdealer(itemId);
		}
    }

    $.fn.locktable = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist on jQuery.locktable');
        }
    };
})(jQuery)