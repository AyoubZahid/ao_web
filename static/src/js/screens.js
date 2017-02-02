function openerp_aoweb_screens(instance, module){


	/**** The Screen Selector ****/
	
    module.ScreenSelector = instance.web.Class.extend({
        init: function(options){

            this.screen_set = options.screen_set || {};

            this.popup_set = options.popup_set || {};

            this.default_screen = options.default_screen;

            this.current_popup = null;

            this.current_mode = options.default_mode || 'cashier';

            this.current_screen = null; 
			this.params = null;
            for(screen_name in this.screen_set){
                this.screen_set[screen_name].hide();
            }
            
            for(popup_name in this.popup_set){
                this.popup_set[popup_name].hide();
            }

        },
        
        add_screen: function(screen_name, screen){
            screen.hide();
            this.screen_set[screen_name] = screen;
            return this;
        },
        show_popup: function(name,options){
            if(this.current_popup){
                this.close_popup();
            }
            this.current_popup = this.popup_set[name];
            this.current_popup.show(options);
        },
        close_popup: function(){
            if(this.current_popup){
                this.current_popup.close();
                this.current_popup.hide();
                this.current_popup = null;
            }
        },
        load_saved_screen:  function(){
            this.close_popup();
            //var selectedOrder = this.pos.get('selectedOrder');
            // FIXME : this changing screen behaviour is sometimes confusing ... 
            //this.set_current_screen(selectedOrder.get_screen_data('screen') || this.default_screen,null,'refresh');
            //this.set_current_screen(this.default_screen,null,'refresh');
            
        },
        set_user_mode: function(user_mode){
            if(user_mode !== this.current_mode){
                this.close_popup();
                this.current_mode = user_mode;
                this.load_saved_screen();
            }
        },
        get_user_mode: function(){
            return this.current_mode;
        },
        set_current_screen: function(screen_name,params,refresh){
            var screen = this.screen_set[screen_name];
            if(!screen){
                console.error("ERROR: set_current_screen("+screen_name+") : screen not found");
            }
			this.params=params;
            this.close_popup();

            if ( refresh || screen !== this.current_screen){
                if(this.current_screen){
                    this.current_screen.close();
                    this.current_screen.hide();
                }
                this.current_screen = screen;
                this.current_screen.show();
            }
        },
        get_current_screen: function(){
            return this.current_screen;
        },
        back: function(){
            if(previous){
                this.set_current_screen(previous);
            }
        },
        get_current_screen_param: function(param){
        	if(param){
        		return this.params ? this.params[param] : undefined;
        	}else{
        		return this.params ? this.params : undefined;
        	}
            
        },
        set_default_screen: function(){
            this.set_current_screen(this.default_screen);
        },
    });
	
	
	
    //**** popups ****
    module.PopUpWidget = module.BaseWidget.extend({
        showDialog: function(id){
	        var dialog = $(id).data('dialog');
	        dialog.open();
	    },
        show: function(options){
        	console.log(options);
            if(this.$el){
                this.$el.removeClass('oe_hidden');
            }
        },
        /* called before hide, when a popup is closed */
        close: function(){
        },
        hide: function(){
            if(this.$el){
                this.$el.addClass('oe_hidden');
            }
        },
    });

    module.ErrorPopupWidget = module.PopUpWidget.extend({
        template:'AOErrorPopup',
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
        template:'AOErrorTracebackPopup',
    });

    module.ConfirmPopupWidget = module.PopUpWidget.extend({
        template: 'AOConfirmPopup',
        show: function(options){
            var self = this;
            this._super();

            this.message = options.message || '';
            this.comment = options.comment || '';
            this.renderElement();
            
            this.$('.button.cancel').click(function(){
                self.close();
                if( options.cancel ){
                    options.cancel.call(self);
                }
            });

            this.$('.button.confirm').click(function(){
                //self.pos_widget.screen_selector.close_popup();
                if( options.confirm ){
                    options.confirm.call(self);
                }
            });
        },
    });
	
	
};
