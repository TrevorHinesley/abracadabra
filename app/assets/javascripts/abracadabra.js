$(function() {
  abracadabraSubmissionInProgress = false;
  abracadabraDeleteMousedown = false;

  function closeAbracadabra(element, destroy) {
    $element = $(element);
    if($element.hasClass("abracadabra-container")) {
      container = $element;
    } else {
      container = $element.parents(".abracadabra-container");
    }

    if(destroy) {
      container.siblings(".abracadabra").remove();
    } else {
      value = container.find(".abracadabra-input").val();
      container.siblings(".abracadabra").text(value).show();
    }
    console.log(container);
    container.remove();
  }

  $("body").on("submit", ".abracadabra-form", function(e) {
    if(abracadabraSubmissionInProgress == true) {
      e.preventDefault();
      return false;
    }
    abracadabraSubmissionInProgress = true;
  });

  $("body").on("ajax:before", ".abracadabra-delete", function() {
    if(abracadabraSubmissionInProgress == true) {
      e.preventDefault();
      return false;
    }
    abracadabraSubmissionInProgress = true;
  });

  $("body").on("mousedown", ".abracadabra-delete", function() {
    abracadabraDeleteMousedown = true;
  });

  $("body").on("ajax:success", ".abracadabra-form", function(e) {
    closeAbracadabra(this, false);
    abracadabraSubmissionInProgress = false;
  });

  $("body").on("ajax:success", ".abracadabra-delete", function() {
    closeAbracadabra(this, true);
    abracadabraSubmissionInProgress = false;
    abracadabraDeleteMousedown = false;
  });

  $("body").on("click", ".abracadabra-cancel", function() {
    if(abracadabraSubmissionInProgress == false) {
      closeAbracadabra(this, false);
    }
  });

  $("body").on("blur", ".abracadabra-input", function() {
    if(abracadabraSubmissionInProgress == false && abracadabraDeleteMousedown == false) {
      closeAbracadabra(this, false);
    }
  });


  $("body").on("keydown", ".abracadabra-input", function(e) {
    /* Press Tab to submit (same function as Enter key) */
    if (e.keyCode == 9)
    {
      e.preventDefault();
      if(abracadabraSubmissionInProgress == false) {
        $(this.form).submit();
      }
    }
    /* /Press Tab to submit (same function as Enter key) */

    /* Press Escape to cancel */
    if (e.keyCode == 27)
    {
      e.preventDefault();
      if(abracadabraSubmissionInProgress == false) {
        closeAbracadabra(this, false);
      }
    }
    /* /Press Escape to cancel */
  });
  
  $(".abracadabra").on("click", function() {
    link = $(this);
    link.hide();
    path = link.data("path");
    attribute = link.data("attribute");
    formMethod = link.data("method");
    remote = ((link.data("remote") == true) ? " data-remote=\"true\"" : "");

    /* Check if button classes have been manually overridden elsewhere */
    if(typeof abracadabraSubmitIcon == "undefined") {
      abracadabraSubmitIcon = "fa fa-check";
    }

    if(typeof abracadabraCancelIcon == "undefined") {
      abracadabraCancelIcon = "fa fa-times";
    }

    if(typeof abracadabraDeleteIcon == "undefined") {
      abracadabraDeleteIcon = "fa fa-times-circle-o";
    }
    /* /Check if button classes have been manually overridden elsewhere */

    /* Deletable? */
    if(link.data("deletable") == true) {
      deletablePath = link.data("deletable-path");
      deletable = "<span class=\"abracadabra-delete-container\"><a href=\"" + deletablePath + "\" class=\"abracadabra-delete\" data-method=\"delete\"" + remote + " rel=\"nofollow\"><i class=\"" + abracadabraDeleteIcon + "\"></i></a></span>";
    } else {
      deletable = "";
    }
    /* /Deletable? */

    /* AJAX? */
    if(remote == "") {
      authToken = "<input name=\"authenticity_token\" type=\"hidden\" value=\"" + $("meta[name=\"csrf-token\"]").attr("content") + "\">";
      type = "";
    } else {
      authToken = "";
      type = " data-type=\"" + link.data("type") + "\"";
    }
    /* /AJAX? */

    /* Show buttons? */
    if(link.data("buttonless") == true) {
      buttons = "";
    } else {
      buttons = "<button type=\"submit\" class=\"btn btn-primary abracadabra-submit\"><i class=\"" + abracadabraSubmitIcon + "\"></i></button><button type=\"button\" class=\"btn abracadabra-cancel\"><i class=\"" + abracadabraCancelIcon + "\"></i></button>";
    }
    /* /Show buttons? */

    instanceClass = link.data("class");
    inputValue = link.text().replace(/"|\\"/g, "&quot;");
    inputId = instanceClass + "_" + attribute;
    inputName = instanceClass + "[" + attribute + "]";

    openFormTag = "<form accept-charset=\"UTF-8\" action=\"" + path + "\"" + remote + type + " class=\"form-inline abracadabra-form\" method=\"post\">";
    hiddenMethodTags = "<div style=\"display:none;\"><input name=\"utf8\" type=\"hidden\" value=\"&#10003;\"><input name=\"_method\" type=\"hidden\" value=\"" + formMethod + "\">" + authToken + "</div>";
    input = "<input type=\"text\" class=\"form-control abracadabra-input\" id=\"" + inputId + "\" name=\"" + inputName + "\" value=\"" + inputValue + "\">";
    
    html = "<span class=\"abracadabra-container\">" + openFormTag + hiddenMethodTags;
    html += "<div class=\"control-group\"><div class=\"abracadabra-input-and-button-wrapper\"><div class=\"abracadabra-input-container\">" + input + deletable + "</div>";
    html += "<div class=\"abracadabra-buttons\">" + buttons + "</div></div></form></span>";

    link.after(html);
    link.siblings(".abracadabra-container").find(".abracadabra-input").focus().val("").val(inputValue);
  });
});