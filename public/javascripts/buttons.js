$(document).ready(function(){
    let fontSize = parseInt($("body").css("font-size"));
    let fontSizeLarger = fontSize + +3 + "px";
    let fontSizeSmaller = fontSize + -3 + "px";

    $("#whiteButton").click(function(){
        $( "body" ).css( "background", "white" ).css( "color", "black" );
        $("#greyButton").css( "border-color", "black" );
        $("#darkGreyButton").css( "border-color", "black" );
        $("#beigeButton").css( "border-color", "black" );
    });
    $("#beigeButton").click(function(){
        $( "body" ).css( "background", "#f3ddab" ).css( "color", "black" );
        $(this).css( "border-color", "white" ).css( "box-shadow", "0 0 1px 1px white" );
        $("#greyButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
        $("#darkGreyButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
    });
    $("#greyButton").click(function(){
        $( "body" ).css( "background", "grey" ).css( "color", "black" );
        $(this).css( "border-color", "white" ).css( "box-shadow", "0 0 1px 1px white" );
        $("#darkGreyButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
        $("#beigeButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
    });
    $("#darkGreyButton").click(function(){
        $( "body" ).css( "background", "#2b2b2b" ).css( "color", "white" );
        $(this).css( "border-color", "white" ).css( "box-shadow", "0 0 1px 1px white" );
        $("#greyButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
        $("#beigeButton").css( "border-color", "black" ).css( "box-shadow", "0 0 0px 0px white" );
    });
    $("#fontSizeLarger").click(function(){
        $( "#storyBody" ).css( "font-size", fontSizeLarger );
    });

    $("#fontSizeReg").click(function(){
        $( "#storyBody" ).css( "font-size", "16px" );
    });

    $("#fontSizeSmaller").click(function(){
        $( "#storyBody" ).css( "font-size", fontSizeSmaller );
    });
});