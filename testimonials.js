//(if collecting data with php/server instead of MTurk)
//var experimentName = "likelihood-exp1";
//var submitAddress = "https://web.stanford.edu/~sunwooj/cgi-bin/process.php";

var stimuliList = shuffle([ 

[ "JOS-1st-HES", "JOS-1st-NOH", "JOS-2nd-HES", "JOS-2nd-NOH"],

["TOM-1st-NOH", "TOM-2nd-HES", "TOM-2nd-NOH", "TOM-1st-HES"],

["ANN-2nd-HES", "ANN-2nd-NOH", "ANN-1st-HES", "ANN-1st-NOH"],

["SER-2nd-NOH", "SER-1st-HES", "SER-1st-NOH", "SER-2nd-HES"],

["IRM-catch-100NO", "IRM-catch-100NO", "IRM-catch-100NO", "IRM-catch-100NO"],

["IRM-catch-0YES", "IRM-catch-0YES", "IRM-catch-0YES", "IRM-catch-0YES"]

]);


var data = {}; 
var trialnum = 0;

$(document).ready(function() {
    showSlide("intro");
    $('#gotoInstructions').click(function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide('instructions');
    });

    
    $('#startbutton').click(function() {
        stepExperiment();
    });
});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}



var conditionRandom = Math.floor(Math.random() * 6);

var stimuliVector = {};
var audioStim = {};



function stepExperiment () {
    if (trialnum == 6) { // end the experiment. 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide("language");
        $('#lgsubmit').click(function() {
            var eval = $('.ev:checked').val();
            var nat = $('.nat:checked').val();
            var age = $('.age:checked').val();
            var gender = $('.gen:checked').val();
            var race = $('.eth:checked').val();
            var region = $('.reg:checked').val();

            var gend_com = $('#ogen_com').val();
            gend_com = gend_com.replace (/,/g, "");
            var race_com = $('#oeth_com').val();
            race_com = race_com.replace (/,/g, "");
            var reg_com = $('#reg_com').val();
            reg_com = reg_com.replace (/,/g, "");
            var gen_com = $('#lang_com').val();
            gen_com = gen_com.replace (/,/g, "");

            if ($('.nat:checked').length > 0 && $('.age:checked').length > 0 && $('.gen:checked').length > 0 && $('.eth:checked').length > 0) {

            data.nat = nat;
            data.age = age;
            data.gender = gender;
            data.gendComments = gend_com;
            data.race = race;
            data.raceComments = race_com;
            data.region = region;
            data.genComments = reg_com;

			showSlide('finish');
			setTimeout(function() { turk.submit(data)}, 1000); 
            } 

            else {
                demoWarning = "Please complete the questionnaire in order to finish the experiment and submit the HIT.";
            $("#demoWarning").html(demoWarning);
            document.body.scrollTop = document.body.scrollHeight;
            }

            } ) }
 
    else {

        // randomize and draw audio
        trialnum += 1;
        stimuliVector = stimuliList[trialnum-1];
        audioStim = stimuliVector[conditionRandom];

        // Tell HTML which sound file will be played
        // document.getElementById('currentAudio').src = "stimuli/" + audioStim + ".wav";
        document.getElementById('currentAudio').src = "https://stanford.edu/~junhongc/sw_stimuli/" + audioStim + ".wav";

               
        $(".item_number").html(trialnum); 


        var YesNo = $("#YesNo");
        YesNo.html(
            YesNo.find("label").sort(function(){
                return Math.round(Math.random())-0.5;}));


        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide('stage'); 


        $('#continue').click(function() {

            var sliderResponse1 = $('#sliderval1').val();
            var sliderResponse2 = $('#sliderval2').val();
            var sliderResponse3 = $('#sliderval3').val();
            var choiceResponse = $('#responseForm4').serialize();

            var commentResponse1 = $('#commentBox1').val();
            commentResponse1 = commentResponse1.replace (/,/g, "");


            // Check for valid answers; all questions must be answered
            if  (slider1.style.backgroundColor != "" && slider2.style.backgroundColor != "" && slider3.style.backgroundColor != "" && choiceResponse.length > 0) {

                // make continue button available for re-use
                $("#continue").unbind('click');
                // ensure that response options are unticked for the next problems  
                $(".response").prop('checked', false);
                // ensure that the comment box is emptied as well
                $(".commentBox").val("");
                // erase warnings 
                $("#warning").html("");

            
                trial = {};
                trial.audio = audioStim;
                trial.yesno = choiceResponse;
                trial.proficiency = sliderResponse1;
                trial.relatability = sliderResponse2;
                trial.believability = sliderResponse3;
                trial.comment = commentResponse1;
                data["trial" + trialnum] = trial;

                // Initialize the sliders again
                refreshSlider();
            

                // Move on to the next trial
                stepExperiment();

                document.body.scrollTop = document.documentElement.scrollTop = 0;
     
                    }
            else { // If any of the questions is not answered:
                warning = "Please answer all the questions to continue. Make sure that you have dragged or clicked on the slider button so that the slider is colored and the button displays numeric values.";
                $("#warning").html(warning);
            }
        });
    }
}


// Codes for sliders
// Slider1
$( function() {
    $( "#slider1" ).slider({
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      slide: function( event, ui ) {

        $("#slider1").css({"background": "#CCFFFF"});
        $("#slider1 .ui-slider-handle").css({
                      "background": "#E0F5FF",
                      "border-color": "#001F29"
                  });

        m_val = ui.value;
        if (m_val < 0) {
            $(ui.handle).text("?");
        }
        else {
            $(ui.handle).text(m_val);
        }
        $( "#sliderval1" ).val( ui.value );
      }
    });
    $( "#sliderval1" ).val( $( "#slider1" ).slider( "value" ) );
  } );


// Slider2
$( function() {
    $( "#slider2" ).slider({
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      slide: function( event, ui ) {

        $("#slider2").css({"background": "#CCFFFF"});
        $("#slider2 .ui-slider-handle").css({
                      "background": "#E0F5FF",
                      "border-color": "#001F29"
                  });

        m_val = ui.value;
        if (m_val < 0) {
            $(ui.handle).text("?");
        }
        else {
            $(ui.handle).text(m_val);
        }
        $( "#sliderval2" ).val( ui.value );
      }
    });
    $( "#sliderval2" ).val( $( "#slider2" ).slider( "value" ) );
  } );


// Slider3
$( function() {
    $( "#slider3" ).slider({
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      slide: function( event, ui ) {

        $("#slider3").css({"background": "#CCFFFF"});
        $("#slider3 .ui-slider-handle").css({
                      "background": "#E0F5FF",
                      "border-color": "#001F29"
                  });

        m_val = ui.value;
        if (m_val < 0) {
            $(ui.handle).text("?");
        }
        else {
            $(ui.handle).text(m_val);
        }
        $( "#sliderval3" ).val( ui.value );
      }
    });
    $( "#sliderval3" ).val( $( "#slider3" ).slider( "value" ) );
  } );


// Function that refreshes slider values
function refreshSlider () {
    $(".sliders").slider('value', 50);
    $(".sliders").val(50);
    $(".slidervals").val(50);
    $(".ui-slider-handle").text("");
    $(".sliders").css({"background":""});
    $(".sliders" + " .ui-slider-handle").css({
        "background":"#FAFAFA",
        "border-color": "#CCCCCC" });
}


function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}