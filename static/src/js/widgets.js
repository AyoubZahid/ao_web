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
    
    /***** button widget ****/
    module.ButtonWidget = module.BaseWidget.extend({
        template: 'AOButton',
        init: function(parent, options){
            options = options || {};
            this._super(parent, options);
            this.action = options.action;
            this.label  = options.label;
            this.icon   = options.icon;
            this.rightalign = options.rightalign || false;
        },
        renderElement: function(){
            var self = this;
            this._super();
            if(this.action){
                this.$el.click(function(){
                    self.action();
                });
            }
        },
    });
    
    module.ListWidget = module.BaseWidget.extend({
        show: function(){
        	var self = this;
        	this._super();
        },
    });    

	/***** action bar widget *****/
    module.ActionBarWidget = instance.web.Widget.extend({
        template:'AOActionBarWidget',
        init: function(parent, options){
            this._super(parent,options);
            this.button_list = [];
            this.buttons = {};
            this.visibility = {};
        },
        set_element_visible: function(element, visible, action){
            if(visible != this.visibility[element]){
                this.visibility[element] = !!visible;
                if(visible){
                    this.$('.'+element).removeClass('oe_hidden');
                }else{
                    this.$('.'+element).addClass('oe_hidden');
                }
            }
            if(visible && action){
                this.action[element] = action;
                this.$('.'+element).off('click').click(action);
            }
        },
        set_button_disabled: function(name, disabled){
            var b = this.buttons[name];
            if(b){
                b.set_disabled(disabled);
            }
        },
        destroy_buttons:function(){
            for(var i = 0; i < this.button_list.length; i++){
                this.button_list[i].destroy();
            }
            this.button_list = [];
            this.buttons = {};
            return this;
        },
        get_button_count: function(){
            return this.button_list.length;
        },
        add_new_button: function(button_options){
            var button = new module.ActionButtonWidget(this,button_options);
            this.button_list.push(button);
            if(button_options.name){
                this.buttons[button_options.name] = button;
            }
            button.appendTo(this.$('.ao-actionbar-button-list'));
            return button;
        },
        show:function(){
        	//showMetroCharm(this.$el,'bottom-charm');
            this.$el.removeClass('oe_hidden');
        },
        hide:function(){
        	//hideMetroCharm(this.$el);
            this.$el.addClass('oe_hidden');
        },
    });
    module.ActionButtonWidget = instance.web.Widget.extend({
        template:'AOActionButtonWidget',
        icon_template:'AOActionButtonWidgetWithIcon',
        init: function(parent, options){
            this._super(parent, options);
            this.label = options.label || 'button';
            this.rightalign = options.rightalign || false;
            this.click_action = options.click;
            this.disabled = options.disabled || false;
            if(options.icon){
                this.icon = options.icon;
                this.template = this.icon_template;
            }
        },
        set_disabled: function(disabled){
            if(this.disabled != disabled){
                this.disabled = !!disabled;
                this.renderElement();
            }
        },
        renderElement: function(){
            this._super();
            if(this.click_action && !this.disabled){
                this.$el.click(_.bind(this.click_action, this));
            }
        },
    });
}; 