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
            // actionArray should be empty if enableDataCollection = false
            Promise.all(actionArray).then(function() {
                let pathArray = window.location.pathname.split('/');
                if (pathArray[2] === "privacy") {
                    // special case for the privacy module
                    window.location.href = '/tut_guide/' + pathArray[2];
                } else {
                    window.location.href = '/tutorial/' + pathArray[2];
                }
            });
        } else {
            // User has not clicked all the labels - show warning and animate unclicked
            $('#clickLabelsWarning').show();
            animateUnclickedLabels();
        }
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

    $('.keyTerm').on('click', function(event) {
        $(event.target).closest('.keyTerm').children('.keyTermDefinition').show();
        $(event.target).closest('.keyTerm').transition('tada');
        if ($(".keyTermDefinition:hidden").length === 0) {
            $('#clickLabelsWarning').hide();
            $('.ui.labeled.icon.button').addClass('green');
        }
        const vocabTerm = $(event.target).closest('.keyTerm').children('.keyTermLabel').text();
    });

});