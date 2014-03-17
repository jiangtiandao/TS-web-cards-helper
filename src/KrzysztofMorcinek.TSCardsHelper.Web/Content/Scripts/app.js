; (function ($) {
    var app = $.sammy('#cards-container', function () {

        this.get('#map', function () {
            $('#cards-container').addClass('my-hidden');
            $('#map-container').removeClass('my-hidden');
            $('#info-container').addClass('my-hidden');
        });
        
        this.get('#cards', function () {
            $('#cards-container').removeClass('my-hidden');
            $('#map-container').addClass('my-hidden');
            $('#info-container').addClass('my-hidden');
        });
        
        this.get('#info', function () {
            $('#cards-container').addClass('my-hidden');
            $('#map-container').addClass('my-hidden');
            $('#info-container').removeClass('my-hidden');
        });
    });

    $(function () {
        app.run('#cards');
    });
})(jQuery);