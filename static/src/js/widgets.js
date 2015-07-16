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
    
    //**** popups ****
    module.PopUpWidget = module.BaseWidget.extend({
        show: function(){
            if(this.$el){
                this.$el.removeClass('oe_hidden');
            }
        },
        /* called before hide, when a popup is closed */
        close: function(){
        },
        /* hides the popup. keep in mind that this is called in the initialization pass of the 
         * pos instantiation, so you don't want to do anything fancy in here */
        hide: function(){
            if(this.$el){
                this.$el.addClass('oe_hidden');
            }
        },
    });

    module.ErrorPopupWidget = module.PopUpWidget.extend({
        template:'ErrorPopup',
        show: function(options){
            options = options || {};
            var self = this;
            this._super();

            $('body').append('<audio src="/ao_web/static/src/sounds/error.wav" autoplay="true"></audio>');

            this.message = options.message || _t('Error');
            this.comment = options.comment || '';

            this.renderElement();

            this.$('.footer .button').click(function(){
                //self.pos_widget.screen_selector.close_popup();
                if ( options.confirm ) {
                    options.confirm.call(self);
                }
            });
        },
    });

    module.ErrorTracebackPopupWidget = module.ErrorPopupWidget.extend({
        template:'ErrorTracebackPopup',
    });

    module.ConfirmPopupWidget = module.PopUpWidget.extend({
        template: 'ConfirmPopup',
        show: function(options){
            var self = this;
            this._super();

            this.message = options.message || '';
            this.comment = options.comment || '';
            this.renderElement();
            
            this.$('.button.cancel').click(function(){
                self.pos_widget.screen_selector.close_popup();
                if( options.cancel ){
                    options.cancel.call(self);
                }
            });

            this.$('.button.confirm').click(function(){
                self.pos_widget.screen_selector.close_popup();
                if( options.confirm ){
                    options.confirm.call(self);
                }
            });
        },
    });

    
    /***** button widget ****/
    module.ButtonWidget = module.BaseWidget.extend({
        template: 'Button',
        init: function(parent, options){
            options = options || {};
            this._super(parent, options);
            this.action = options.action;
            this.label  = options.label;
            this.icon   = options.icon;
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

}; 