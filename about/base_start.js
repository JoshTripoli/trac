// Source referenced: https://github.com/social-media-testdrive/truman_testdrive
let actionArray = new Array(); // this array will be handed to Promise.all
const pathArray = window.location.pathname.split('/');


function animateUnclickedLabels() {
    $('.keyTermDefinition').each(function() {
        if ($(this).is(":hidden")) {
            $(this).siblings('.keyTermLabel').transition('bounce');
        }
    })
};

function clickGotIt() {
    if ($('.learnSegment').is(':hidden')) {
        //User has not yet clicked next
        $('#clickNextWarning').show();
        $('.showLearnSectionButton').transition('bounce');
    }
    if ($('.keyIdeasSegment').is(":hidden")) {
        // User has not yet clicked next
        $('#clickNextWarning').show();
        $('.showKeyTermsButton').transition('bounce');
    } else {
        // Determine if all the labels are clicked
        if ($(".keyTermDefinition:hidden").length === 0) {
            // All labels are clicked so everything is good to proceed
            $('#clickLabelsWarning').hide();
            // window.location.href = 'index.html';  
        } else {
            // User has not clicked all the labels - show warning and animate unclicked
            $('#clickLabelsWarning').show();
            animateUnclickedLabels();
        }
    }
    if ($('.prepareSegment').is(":hidden")) {
        // User has not yet clicked next
        $('#clickNextWarning').show();
        $('.showPrepareButton').transition('bounce');
    } 
};

$(window).on("load", function() {

    $('.showLearnSectionButton').on('click', function() {
        $('#clickNextWarning').hide();
        $('.learnSegment').show();
        $('.learnSegment .ui.header').transition('jiggle');
        $('.showLearnSectionButton').parent('.ui.segment').hide();
    });

    $('.showKeyTermsButton').on('click', function() {
        $('#clickNextWarning').hide();
        $('.showKeyTermsButton').css('display', 'none');
        $('.keyIdeasSegment').show();
        $('.keyIdeasSegment').transition('jiggle');
        if ($(".keyTermDefinition:hidden").length === 0) {
            $('.ui.labeled.icon.button').addClass('green');
        }
    });

    $('.showPrepareButton').on('click', function() {
        if ($(".keyTermDefinition:hidden").length === 0) {
            $('#clickLabelsWarning').hide();
            // $('.ui.labeled.icon.button').addClass('green');
            $('#clickNextWarning').hide();
            $('.showPrepareButton').css('display', 'none');
            $('.prepareSegment').show();
            $('.prepareSegment').transition('jiggle');
            if ($(".keyTermDefinition:hidden").length === 0) {
                $('.ui.labeled.icon.button').addClass('green');
            }
        } else { // user needs to finish going through key ideas before moving on to preparing for conference section
            $('#clickLabelsWarning').show();
            animateUnclickedLabels();
        }

    });

    $('.keyTerm').on('click', function(event) {
        $(event.target).closest('.keyTerm').children('.keyTermDefinition').show();
        $(event.target).closest('.keyTerm').transition('tada');
        // if ($(".keyTermDefinition:hidden").length === 0) {
        //     $('#clickLabelsWarning').hide();
        //     $('.ui.labeled.icon.button').addClass('green');
        // }
        const vocabTerm = $(event.target).closest('.keyTerm').children('.keyTermLabel').text();
    });

});