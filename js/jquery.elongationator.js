//Elongationator Plugin
// v.1.0.0
// by Brian Ray
// http://monodesigns.github.io/


// Structure based off of
// jQuery Plugin Boilerplate
// by Stefan Gabos
// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/

;(function($) {
    $.elongationator = function(el, options) {
        var defaults = {
            openExpanders: [],
            onClose: function(el, itemID) {
                console_info('#' + itemID + ' closed');
            },
            onOpen: function(el, itemID) {
                console_info('#' + itemID + ' opened');
            }

        }
        var plugin = this;

        plugin.settings = {}

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);

            plugin.el = el;

            // init code
            var $wrapper = plugin.el;
            var $items = $wrapper.find('.expander__item');

            $items.each(function(i, e){
                var $item = $(e);
                var itemID = 'expander_' + (i+1);

                // add unique ID to each expander
                $item.attr('id', itemID)

                // add expanders that are open on page load to the openExpanders array
                if($item.hasClass('expander__item--open')) {
                    plugin.settings.openExpanders.push(itemID);
                }

                // add click function to the header of each expander
                $item.on('click', '.expander__item__header', function() {
                    var index = plugin.settings.openExpanders.indexOf(itemID);

                    // if the expander is closed, open it and add it's itemID to the
                    // openExpanders array
                    if($item.hasClass('expander__item--closed')) {
                        $item.removeClass('expander__item--closed')
                            .addClass('expander__item--open');

                        // if not in openExpanders array, add it
                        if (index === -1) {
                            plugin.settings.openExpanders.push(itemID);
                        }
                        // run onOpen method
                        plugin.settings.onOpen(e, itemID);
                        // toggle visibility of elements with data-if-open attributes
                        toggleVisibility();
                    // else, close the expander and remove it's itemID from the
                    // openExpanders array
                    } else {
                        $item.removeClass('expander__item--open')
                            .addClass('expander__item--closed');

                        // if in the openExpanders array, remove it
                        if (index > -1) {
                            plugin.settings.openExpanders.splice(index, 1);
                        }
                        // run onClose method
                        plugin.settings.onClose(e, itemID);
                        // toggle visibility of elements with data-if-open attributes
                        toggleVisibility();
                    }
                });
            });
            console_info('elongationator v1.0.0 by Brian Ray loaded.');
        }

        // public methods
        plugin.get_open_expanders = function() {
            console_log(plugin.settings.openExpanders);
        }

        // private methods

        // show or hide elements with data-if-open attributes
        // based on the contents of the openExpanders array
        var toggleVisibility = function() {
            $('[data-if-open]').each(function(i) {
                var $this = $(this);
                var val = $this.data('if-open');
                var index = plugin.settings.openExpanders.indexOf(val);

                if(index > -1) {
                    $this.removeClass('content--hidden');
                } else {
                    $this.addClass('content--hidden');
                }
            });
        }

        var console_log = function(message) {
            if(window.console) {
                console.log(message);
            }
        };
        var console_info = function(message) {
            if(window.console) {
                console.info('%c ' + message, 'background: #7ca9d3; color: #333; padding: 5px 5px 5px 0;');
            }
        };

        // call the init method
        init();
    }
})(jQuery);
