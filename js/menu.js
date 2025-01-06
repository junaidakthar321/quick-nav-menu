// Function for show hide
$(".quick-nav .menu-btn").click(function () {
  $(this).parent().toggleClass("show");
  $(this).children(".ham").toggleClass("active");
});

function tilesEffect() {
  function calculateTiles(tileHeight, totalArea) {
    var numberOfTiles = Math.floor(totalArea / tileHeight);
    return numberOfTiles;
  }
  $(" .inner-nav .bg > *").remove();
  var tileHeight = 80;
  var totalArea = $(".quick-nav  > .inner-nav").height();
  var numItems = $(".tiles").length;
  var numberOfTiles = calculateTiles(tileHeight, totalArea) + 1;
  if (numItems < numberOfTiles) {
    for (var i = 0; i <= numberOfTiles; i++) {
      var aniDelay = i * 100 + "ms";
      $(".quick-nav  > .inner-nav .bg ").append(
        '<div class="tiles" style=" height:' +
          tileHeight +
          "px;  transition-delay: " +
          aniDelay +
          '"></div>'
      );
    }
  }
}
function rollingEffect() {
  var addEffect = $('<div class="rolling-bar"></div>');
  $(" .inner-nav .bg > *").remove();
  $(" .inner-nav .bg").append(addEffect);
}
function hexEffect() {
  var wallHeight = $(".quick-nav  > .inner-nav .bg").height() * 2;
  var wallWidth = $(".quick-nav  > .inner-nav .bg").width() * 2;
  var tileHeight = 80;
  var tileWidth = 80;
  var numItems = $(".hex-tiles").length;
  function calculateTiles(wallHeight, wallWidth, tileHeight, tileWidth) {
    var numberOfTilesVertical = Math.floor(wallHeight / tileHeight);
    var numberOfTilesHorizontal = Math.floor(wallWidth / tileWidth);
    return numberOfTilesVertical * numberOfTilesHorizontal;
  }
  var numberOfTiles =
    calculateTiles(wallHeight, wallWidth, tileHeight, tileWidth) + 2;
  if (numItems < numberOfTiles) {
    for (var i = 1; i <= numberOfTiles; i++) {
      var randomIndex = Math.floor(Math.random() * 5);
      var aniDelay = "0." + randomIndex + "s";
      $(".quick-nav  > .inner-nav .bg ").append(
        '<div class="hex-tiles" style=" width:' +
          tileWidth +
          "px;  height:" +
          tileHeight +
          "px;  transition-delay: " +
          aniDelay +
          '"></div>'
      );
    }
  }
}

$(".tab-special-animation .card-option").mousedown(function () {
  var titleOption = $(this).attr("data-id");
  $(".quick-nav ").attr("id", titleOption);
  if (titleOption === "rolling-secrets") {
    rollingEffect();
  } else if (titleOption === "sequential-slide") {
    tilesEffect();
    console.log("tilesEffect click");
  } else if (titleOption === "hexa-motion") {
    hexEffect();
  }
});

$(window).on("load", function () {
  var effectType = $(".quick-nav ").attr("id");
  if (effectType === "rolling-secrets") {
    rollingEffect();
  } else if (effectType === "sequential-slide") {
    tilesEffect();
    console.log("tilesEffect");
  } else if (effectType === "hexa-motion") {
    hexeffect();
  }
});

// here is start custom JS

// js code  for  progressBar
if ($("*").hasClass("set-height-wrapper")) {
  document.addEventListener("DOMContentLoaded", function (e) {
    var isDragging = false;
    var progressBar = document.getElementById("progress-bar");
    var progressBarContainer = document.getElementById(
      "progress-bar-container"
    );
    var innerNav = document.querySelector(".quick-nav .inner-nav");

    progressBar.addEventListener("mousedown", function (e) {
      isDragging = true;
      document.addEventListener("mousemove", updateProgressBar);
    });

    document.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        document.removeEventListener("mousemove", updateProgressBar);
      }
    });

    function updateProgressBar(e) {
      var containerWidth = progressBarContainer.offsetWidth;
      var mouseX = e.pageX - progressBarContainer.offsetLeft;
      var percent = (mouseX / containerWidth) * 100;

      percent = Math.min(100, Math.max(0, percent));

      progressBar.style.width = percent + "%";
      progressBar.setAttribute("data-value", percent);

      var newHeightValue = "calc(" + percent + "vh - 30px)";
      innerNav.style.height = newHeightValue;
    }
  });
}

if ($("*").hasClass("set-font-size")) {
  document.addEventListener("DOMContentLoaded", function (e) {
    var isDragging = false;
    var progressFont = document.getElementById("progress-font");
    var progressFontContainer = document.getElementById(
      "progress-font-container"
    );
    var btnFont = document.querySelector(".menu-btn");

    progressFont.addEventListener("mousedown", function (e) {
      isDragging = true;
      document.addEventListener("mousemove", updateProgressFont);
    });

    document.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        document.removeEventListener("mousemove", updateProgressFont);
      }
    });

    function updateProgressFont(e) {
      var containerWidth = progressFontContainer.offsetWidth;
      var mouseX = e.pageX - progressFontContainer.offsetLeft;
      var percent = (mouseX / containerWidth) * 100;
      percent = Math.min(100, Math.max(0, percent));
      progressFont.style.width = percent + "%";
      progressFont.setAttribute("data-value", percent);
      if ($(".menu-btn").hasClass("icon-set")) {
        var scaleSize = percent + 60;
        $(".menu-btn").css("scale", scaleSize + "%");
      } else {
        var setFontSize = "calc(20px + " + percent + "%)";
        btnFont.style.fontSize = setFontSize;
      }
    }
  });
}

function validateCssUnit(value) {
  const pxRegex = /^\d+(\.\d+)?px$/;
  const remRegex = /^\d+(\.\d+)?rem$/;
  const emRegex = /^\d+(\.\d+)?em$/;

  if (pxRegex.test(value)) {
    return "px";
  } else if (remRegex.test(value)) {
    return "rem";
  } else if (emRegex.test(value)) {
    return "em";
  } else {
    return "empty";
  }
}

function menuText() {
  const initialText = $("#initialText");
  const activeState = $("#activeState");
  function validation(exValue) {
    let result = false;
    if (exValue === "") {
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  if (validation(initialText.val().trim())) {
    $(".menu-btn > .default-text").hide();
    $(".menu-btn > .initial-text").remove();
    $(".menu-btn").append(
      '<span class="initial-text">' + initialText.val().trim() + "</span>"
    );
    initialText.parent().children("span").remove();
    initialText.parent().removeClass("error-message");
  } else {
    if (!initialText.parent().hasClass("error-message")) {
      $(".menu-btn > .initial-text").hide();
      $(".menu-btn > .default-text").show();
      initialText.parent().addClass("error-message");
      // initialText.parent().append('<span class="em-text">This Field is Empty </span>');
    }
  }

  if (validation(activeState.val().trim())) {
    $(".menu-btn > .active-state").remove();
    $(".menu-btn").append(
      '<span class="active-state">' + activeState.val().trim() + "</span>"
    );
    activeState.parent().children("span").remove();
    $(".menu-btn").addClass("was-text");
    activeState.parent().removeClass("error-message");
  } else {
    $(".active-state").remove();
    $(".menu-btn").removeClass("was-text");
    if (!activeState.parent().hasClass("error-message")) {
      activeState.parent().addClass("error-message");
      // activeState.parent().append('<span class="em-text">This Field is Empty </span>');
    }
  }
}

function colorStyle() {
  const bgColor = $("#btnColor").val();
  const bgHoverColor = $("#hoverColor").val();
  const textColor = $("#textColor").val();
  const textHoverColor = $("#textHoverColor").val();
  const activeHoverColor = $("#activeHoverColor").val();
  const activeTextColor = $("#activeTextColor").val();
  const newTextColor = textColor == "#000000" ? "#000000" : textColor;
  const newTextHoverColor =
    textHoverColor == "#000000" ? "#000000" : textHoverColor;
  const newBgColor = textColor == "#999999" ? "#999999" : bgColor;
  const newBgHoverColor =
    textHoverColor == "#ffffff" ? "#ffffff" : bgHoverColor;
  const newActiveHoverColor =
    activeHoverColor == "#ffffff" ? "#ffffff" : activeHoverColor;
  const newActiveTextColor =
    activeTextColor == "#545454" ? "#545454" : activeTextColor;
  const menuBgColor = $("#menuColor").val();
  const menuItemColor = $("#menuItemColor").val();
  const menuItemHoverColor = $("#menuItemHoverColor").val();
  const newMenuBgColor = menuBgColor == "#2b2b2b" ? "#2b2b2b" : menuBgColor;
  const newmenuItemColor =
    menuItemColor == "#545454" ? "#545454" : menuItemColor;
  const newmenuItemHoverColor =
    menuItemHoverColor == "#ffffff" ? "#ffffff" : menuItemHoverColor;
  if ($(".menu-btn").find(".initial-text").length > 0) {
    var style = $(
      `<style class="dynamic-styles">.menu-btn { background-color: ` +
        newBgColor +
        `; } .menu-btn:hover { background-color: ` +
        newBgHoverColor +
        `; } .menu-btn  .initial-text{ color: ` +
        newTextColor +
        `; } .menu-btn:hover  .initial-text{ color: ` +
        newTextHoverColor +
        `; } .quick-nav.show .menu-btn{background-color: ` +
        newActiveHoverColor +
        `;}  .quick-nav.show .menu-btn .initial-text{color: ` +
        newActiveTextColor +
        `;} .quick-nav  .bg{background: ` +
        newMenuBgColor +
        `;} #hexa-motion .hex-tiles, #sequential-slide .bg .tiles, #rolling-secrets .inner-nav .rolling-bar{background: ` +
        newMenuBgColor +
        `;} #rolling-secrets .inner-nav .rolling-bar:after{background-color: ` +
        newMenuBgColor +
        `;}  #rolling-secrets .inner-nav .rolling-bar:before {background-color: ` +
        newMenuBgColor +
        `;} nav  .inner-nav .inner-links a{ color: ` +
        newmenuItemColor +
        `;} nav  .inner-nav .inner-links a:hover{ color: ` +
        newmenuItemHoverColor +
        `;}   #hexa-motion.show .bg {background: ` +
        newMenuBgColor +
        ` !important; .menu-btn .ham .line{stroke: ` +
        newBgColor +
        `;}  .menu-btn:hover .ham .line{stroke: ` +
        newBgHoverColor +
        `; }</style>`
    );
    if ($(".menu-btn").find(".active-state").length > 0) {
      var style = $(
        `<style class="dynamic-styles">.menu-btn { background-color: ` +
          newBgColor +
          `; } .menu-btn:hover { background-color: ` +
          newBgHoverColor +
          `; } .menu-btn  .active-state{ color: ` +
          newTextColor +
          `; } .menu-btn:hover  .active-state{ color: ` +
          newTextHoverColor +
          `; } .quick-nav.show .menu-btn{background-color: ` +
          newActiveHoverColor +
          `;}  .quick-nav.show .menu-btn .active-state{color: ` +
          newActiveTextColor +
          `;} .quick-nav  .bg{background: ` +
          newMenuBgColor +
          `;} #hexa-motion .hex-tiles, #sequential-slide .bg .tiles,  #rolling-secrets .inner-nav .rolling-bar{background: ` +
          newMenuBgColor +
          `;} #rolling-secrets .inner-nav .rolling-bar:after{background-color: ` +
          newMenuBgColor +
          `;}  #rolling-secrets .inner-nav .rolling-bar:before {background-color: ` +
          newMenuBgColor +
          `;} nav  .inner-nav .inner-links a{ color: ` +
          newmenuItemColor +
          `;} nav  .inner-nav .inner-links a:hover{ color: ` +
          newmenuItemHoverColor +
          `;}  #hexa-motion.show .bg {background: ` +
          newMenuBgColor +
          ` !important;} .menu-btn .ham .line{stroke: ` +
          newBgColor +
          `;}  .menu-btn:hover .ham .line{stroke: ` +
          newBgHoverColor +
          `; }</style>`
      );
    }
  } else {
    var style = $(
      `<style class="dynamic-styles">.menu-btn { background-color: ` +
        newBgColor +
        `; } .menu-btn:hover { background-color: ` +
        newBgHoverColor +
        `; } .menu-btn  .default-text{ color: ` +
        newTextColor +
        `; } .menu-btn:hover  .default-text{ color: ` +
        newTextHoverColor +
        `; } .quick-nav.show .menu-btn{background-color: ` +
        newActiveHoverColor +
        `;}  .quick-nav.show .menu-btn .default-text{color: ` +
        newActiveTextColor +
        `;} .quick-nav  .bg{background: ` +
        newMenuBgColor +
        `;} #hexa-motion .hex-tiles, #sequential-slide .bg .tiles, #rolling-secrets .inner-nav .rolling-bar{background: ` +
        newMenuBgColor +
        `;} #rolling-secrets .inner-nav .rolling-bar:after{background-color: ` +
        newMenuBgColor +
        `;}  #rolling-secrets .inner-nav .rolling-bar:before {background-color: ` +
        newMenuBgColor +
        `;} nav  .inner-nav .inner-links a{ color: ` +
        newmenuItemColor +
        `;} nav  .inner-nav .inner-links a:hover{ color: ` +
        newmenuItemHoverColor +
        `;}   #hexa-motion.show .bg {background: ` +
        newMenuBgColor +
        ` !important;} .menu-btn .ham .line{stroke: ` +
        newBgColor +
        `;}  .menu-btn:hover .ham .line{stroke: ` +
        newBgHoverColor +
        `; }</style>`
    );
  }

  var $head = $("head");
  var $dynamicStyles = $head.find(".dynamic-styles");

  if ($dynamicStyles.length) {
    $dynamicStyles.remove();
  } else {
  }

  var newStyle = style;
  $head.append(newStyle);
}

function escapeHtml(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function transformContent() {
  var originalContent = $("header .container .gnc").html();
  var escapedContent = escapeHtml(originalContent);
  console.log(escapedContent);
  var wrappedContent = `<pre><code>${escapedContent}</code></pre>`;
  $("#html-code ").html(wrappedContent);
}

function transformContent() {
  var originalContent = $(".js-code").html();
  var escapedContent = escapeHtml(originalContent);
  console.log(escapedContent);
  var wrappedContent = `<pre><code>${escapedContent}</code></pre>`;
  $("#js-code-wrapper ").html(wrappedContent);
}
function transformContent() {
  var originalContent = $(".css-cdn-code").html();
  var escapedContent = escapeHtml(originalContent);
  console.log(escapedContent);
  var wrappedContent = `<pre><code>${escapedContent}</code></pre>`;
  $("#jquery-cdn .css-cdn-code link ").html(wrappedContent);
}
function transformContent() {
  var originalContent = $(".jquery-cdn-code").html();
  var escapedContent = escapeHtml(originalContent);
  console.log(escapedContent);
  var wrappedContent = `<pre><code>${escapedContent}</code></pre>`;
  $("#jquery-cdn .jquery-cdn-code").html(wrappedContent);
}

$(document).ready(function () {
  colorStyle();
  function setIocnType() {
    var iconSet = $(".hamburger-icon-wraper").find(".slt-icon");
    if (iconSet.length > 0) {
      $(".quick-nav .menu-btn .ham").remove();
      $(".hb-icon.slt-icon .ham").clone().appendTo(".menu-btn");
      $(".quick-nav .menu-btn").addClass("icon-set");
      $("#textColor ").parent().hide();
      $("#textHoverColor").parent().hide();
      $("#activeTextColor").parent().hide();
      $("#activeHoverColor ").parent().hide();
    } else {
      $(".quick-nav .menu-btn").removeClass("icon-set");
      $(".quick-nav .menu-btn .ham").remove();
      $("#textColor ").parent().show();
      $("#textHoverColor").parent().show();
      $("#activeTextColor").parent().show();
      $("#activeHoverColor ").parent().show();
    }
  }
  $("#submit-value").click(function () {
    menuText();

    colorStyle();
    setIocnType();
    $("#copy-css").addClass("copy-now");
    $("#submit-value").removeClass("not-dis");
    // $('#submit-value').off('click', handleClick);
  });

  $("#copy-html").click(function () {
    $(".css-mb .massage-notcopied").removeClass("active");
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($(".gnc").html()).select();
    var successHtml = document.execCommand("copy");
    $temp.remove();
    if (successHtml) {
      showMessage(".html-mb .massage-copied", 500);
    } else {
      showMessage(".html-mb .massage-notcopied", 800);
    }

    function showMessage(selector, duration) {
      $(selector).addClass("active");
      setTimeout(function () {
        $(selector).removeClass("active");
      }, duration);
    }
  });

  $("#copy-js").click(function () {
    $(".css-mb .massage-notcopied").removeClass("active");
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($(".js-code").html()).select();
    document.execCommand("copy");
    var successJs = document.execCommand("copy");
    $temp.remove();
    if (successJs) {
      showMessage(".js-mb .massage-copied", 500);
    } else {
      showMessage(".js-mb .massage-notcopied", 800);
    }

    function showMessage(selector, duration) {
      $(selector).addClass("active");
      setTimeout(function () {
        $(selector).removeClass("active");
      }, duration);
    }
  });

  function showMessage(selector, duration) {
    $(selector).addClass("active");
    setTimeout(function () {
      $(selector).removeClass("active");
    }, duration);
  }
  $("#copy-css").click(function () {
    function copyToClipboard(text) {
      var tempElement = $("<textarea>");
      $("body").append(tempElement);
      tempElement.val(text).select();
      document.execCommand("copy");
      tempElement.remove();
    }

    var dynamicStyle = $("head").find(".dynamic-styles");
    if (dynamicStyle.length > 0) {
      var cssCopy = dynamicStyle.html(); // Get the CSS content as text
      copyToClipboard(cssCopy);
      $(".css-mb .massage-copied").addClass("active");
      showMessage(".css-mb .massage-copied", 800);
    } else {
      showMessage(".css-mb .massage-notcopied", 3000);
    }
  });

  $("#copy-css-cdn").click(function () {
    $(".css-mb .massage-notcopied").removeClass("active");
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($("#css-cdn .css-cdn-code").html()).select();
    document.execCommand("copy");
    var successHtml = document.execCommand("copy");
    $temp.remove();
    function updateButtonText(successHtml) {
      let btnText = successHtml ? "copied" : "copy";
      $("#copy-css-cdn").text(btnText);
    }
    updateButtonText(true);
  });

  $("#copy-jquery-cdn").click(function () {
    $(".css-mb .massage-notcopied").removeClass("active");
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($("#jquery-cdn .jquery-cdn-code").html()).select();
    document.execCommand("copy");
    var successHtml = document.execCommand("copy");
    $temp.remove();
    function updateButtonText(successHtml) {
      let btnText = successHtml ? "copied" : "copy";
      $("#copy-jquery-cdn").text(btnText);
    }
    updateButtonText(true);
  });

  $(".hamburger-icon-wraper > div").click(function () {
    if ($(this).hasClass("slt-icon")) {
      $(".hamburger-icon-wraper .hb-icon").removeClass("slt-icon");
      $(this).removeClass("slt-icon");
    } else {
      $(".hamburger-icon-wraper .hb-icon").removeClass("slt-icon");
      $(this).addClass("slt-icon");
    }
  });

  let initialValues = {
    initialText: $("#initialText").val(),
    activeState: $("#activeState").val(),
    btnColor: $("#btnColor").val(),
    hoverColor: $("#hoverColor").val(),
    menuColor: $("#menuColor").val(),
    textColor: $("#textColor").val(),
    textHoverColor: $("#textHoverColor").val(),
    menuItemColor: $("#menuItemColor").val(),
    activeTextColor: $("#activeTextColor").val(),
    activeHoverColor: $("#activeHoverColor").val(),
    enuItemHoverColor: $("#menuItemHoverColor").val(),
  };

  function checkForChanges() {
    let isChanged = false;

    $.each(initialValues, function (key, value) {
      if ($("#" + key).val() !== value) {
        isChanged = true;
        return false;
      }
    });

    if (isChanged) {
      $("#submit-value").addClass("not-dis");
    } else {
      $("#submit-value").removeClass("not-dis");
    }
  }

  $(".hamburger-icon-wraper .hb-icon").click(function () {
    $("#submit-value").addClass("not-dis");
  });
  $(
    "#initialText ,#activeState ,#btnColor,#hoverColor, #menuColor, #textColor, #textHoverColor, #menuItemColor, #activeTextColor, #activeHoverColor ,#menuItemHoverColor"
  ).on("input", function () {
    checkForChanges();
  });
});
