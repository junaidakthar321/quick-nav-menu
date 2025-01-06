$(document).ready(function () {
  $(".main-menu > ul li").click(function () {
    var secId = $(this).attr("id");
    $(".main-menu > ul li").removeClass("active");
    $(this).addClass("active");
    $(".style-size").removeClass("active");
    $(".sec-" + secId).addClass("active");
  });

  $(".sec-animations-sel .tab-content").hide();
  $(".sec-animations-sel .tab-fade-animation").show();
  $(".sec-embed-code .tab-content").hide();
  $(".sec-embed-code .tab-code-html").show();
  $(".tabs-bar > li:first-child").addClass("active");
  $(".tabs-bar > li").click(function () {
    var aniTabId = $(this).attr("id");
    $(".tabs-bar > li").removeClass("active");
    $(this).addClass("active");
    $(".sec-animations-sel .tab-content").hide();
    $(".sec-embed-code .tab-content").hide();
    $(".tab-" + aniTabId).show();
    console.log(".tab-" + aniTabId);
  });

  $(".hamburger-icon-wraper >div svg").hover(function () {
    $(this).toggleClass("active");
  });

  function getValue(iName) {
    const getHeightItem = $(iName);
    let getHeightType = $(".np-select span").text();
    let getHeightNum = getHeightItem.val();

    if (getHeightType === "vh") {
      if (getHeightNum > 100 || getHeightNum < 0) {
        return false;
      } else {
        return getHeightNum + getHeightType;
      }
    } else {
      if (getHeightNum < 0) {
        return false;
      } else {
        return getHeightNum + getHeightType;
      }
    }
  }

  $("#np-items").hide();
  $("#np-input-set .np-select").click(function () {
    $("#np-items").toggle();
  });
  $("#np-input-set .np-select #np-items li").click(function () {
    $("#np-input-set .np-select span").empty();
    let npValue = $(this).attr("data-value");
    $("#np-input-set .np-select span").text(npValue);
  });
  $("#style-size .card-option").on("click", function (event) {
    $("#style-size .card-option").removeClass("active");
    $(this).addClass("active");
    var optionId = $(this).attr("data-id");

    // Prevent the default action for all cases initially

    switch (optionId) {
      case "defaultHeight":
        $("nav .inner-nav").css("height", "500px");
        $(".card-option[data-id=customHeight]").removeClass("put-height");
        // Additional logic for button 1
        break;
      case "fullScreenHeight":
        $("nav .inner-nav").css("height", "calc(100vh - 30px)");
        $(".card-option[data-id=customHeight]").removeClass("put-height");
        break;
      case "customHeight":
        $(".set-height-wrapper").addClass("set-height-active");
        $("nav").addClass("show");
        $("#set-height").click(function () {
          tilesEffect();
          let getHeight = getValue("#get-height");
          if (getValue("#get-height") === false) {
            $("#heightError").text(
              "If the input type is % or vh, then ensure the entered number is less than 100."
            );
          } else {
            $("#heightError").empty();
            $(".set-height-wrapper").removeClass("set-height-active");
            $("nav .inner-nav").css("height", getHeight);
          }
        });
        break;
      default:
        $("nav").removeClass("d--height");
        $("nav .inner-nav").css("height", "500px");
        $("nav .inner-nav").css("resize", "vertical");
    }
  });

  $(".sec-animations-sel .card-option").on("click", function (event) {
    $(".sec-animations-sel .card-option").removeClass("active");
    $(this).addClass("active");
    var aniOptionId = $(this).attr("data-id");
    $("nav").attr("id", aniOptionId);
    if (!$("nav").hasClass("show")) {
      $("nav").addClass("show");
    } else {
      $("nav").removeClass("show");
      setTimeout(function () {
        $("nav").addClass("show");
      }, 1000);
    }
  });
});
// menu btn icon
