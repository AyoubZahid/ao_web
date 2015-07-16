function openerp_aoweb_widgets(instance, module) {
	var QWeb = instance.web.qweb;
	var _t = instance.web._t;

    module.BaseWidget = instance.web.Widget.extend({
        init:function(parent,options){
            this._super(parent);
            options = options || {};
        },
        show: function(){
            this.$el.removeClass('oe_hidden');
        },
        hide: function(){
            this.$el.addClass('oe_hidden');
        },
    });

}; 