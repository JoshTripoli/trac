$(document).ready(function(){ /*dont run all stuff until age is loaded. $ shorthand for jquery*/
    $('.burgermenu').on('click', function(){
        $('.mob-nav').toggle(); /*makes css opposite, diplay none to display block. fadeToggle slideToggle*/
    })
});