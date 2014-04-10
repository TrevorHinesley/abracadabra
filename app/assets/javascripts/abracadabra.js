$(function() {
  abracadabraSubmissionInProgress = false;
  abracadabraDeleteMousedown = false;

  function closeAbracadabra(element, destroy, valueChanged) {
    $element = $(element);
    if($element.hasClass("abracadabra-container")) {
      container = $element;
    } else {
      container = $element.parents(".abracadabra-container");
    }

    if(destroy) {
      container.siblings(".abracadabra").remove();
    } else {
      if(valueChanged == true) {
        value = container.find(".abracadabra-input").val();        
      } else {
        value = container.find(".abracadabra-input").data("original-value");
      }
      container.siblings(".abracadabra").text(value).show();
    }

    try {
      container.remove();
    } catch (error) {
      if(error.name != "NotFoundError") {
        throw error;
      }
    }
  }

  function tabToNextAbracadabra(element, selector) {
    if(selector != undefined) {
      nextAbracadabra = $(selector);

      /* If selector isn't an ID, find the element with the class AFTER the current element */
      if (selector.indexOf("#") == -1) {
        abracadabra = $(element).parents(".abracadabra-container").siblings(".abracadabra");
        indexOfAbracadabra = $(selector).index(abracadabra);
        nextAbracadabra = $($(selector)[indexOfAbracadabra + 1]);
      }
      /* /If selector isn't an ID, find the element with the class AFTER the current element */

      closeAbracadabra(element, false, true);
      nextAbracadabra.click();
    } else {
      closeAbracadabra(element, false, true);
    }
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
    target = $(e.target);

    /* If form is a DELETE, remove abracadabra instance, if not, call tabToNextSelector */
    if(target.hasClass("abracadabra-delete")) {
      closeAbracadabra(target, true, true);
      abracadabraDeleteMousedown = false;
    } else {
      input = $(target).find(".abracadabra-input");
      tabToNextSelector = input.data("tab-to-next-selector");
      tabToNextAbracadabra(target, tabToNextSelector);
    }
    /* /If form is a DELETE, remove abracadabra instance, if not, call tabToNextSelector */

    abracadabraSubmissionInProgress = false;
  });

  $("body").on("click", ".abracadabra-cancel", function() {
    if(abracadabraSubmissionInProgress == false) {
      closeAbracadabra(this, false, false);
    }
  });

  $("body").on("blur", ".abracadabra-input", function() {
    if(abracadabraSubmissionInProgress == false && abracadabraDeleteMousedown == false) {
      if($(this).data("submit-on-blur") == true) {
        $(this.form).submit();
      } else {
        closeAbracadabra(this, false, false);
      }
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
        closeAbracadabra(this, false, false);
      }
    }
    /* /Press Escape to cancel */
  });


  $("body").on("confirm:complete", ".abracadabra-delete", function(e, response) {
    /* If cancel is clicked in the deletable_confirm dialog, focus on the input */
    if(response == false) {
      input = $(this).parents(".abracadabra-delete-container").siblings();
      inputValue = input.val();
      input.focus().val("").val(inputValue);
    }
    /* /If cancel is clicked in the deletable_confirm dialog, focus on the input */
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

    /* AJAX? */
    if(remote == "") {
      authToken = "<input name=\"authenticity_token\" type=\"hidden\" value=\"" + $("meta[name=\"csrf-token\"]").attr("content") + "\">";
      type = "";
      deletableType = "";
    } else {
      authToken = "";
      type = " data-type=\"" + link.data("type") + "\"";
      deletableType = " data-type=\"" + link.data("deletable-type") + "\"";
    }
    /* /AJAX? */

    /* Deletable? */
    if(link.data("deletable") !== false) {
      deletablePath = link.data("deletable-path");
      deletableConfirm = link.data("deletable");
      if(deletableConfirm === true) {
        deletableConfirm = "";
      } else {
        deletableConfirm = " data-confirm=\"" + deletableConfirm + "\"";
      }
      deletable = "<span class=\"abracadabra-delete-container\"><a href=\"" + deletablePath + "\" class=\"abracadabra-delete\" data-method=\"delete\"" + deletableConfirm + remote + deletableType + " rel=\"nofollow\"><i class=\"" + abracadabraDeleteIcon + "\"></i></a></span>";
    } else {
      deletable = "";
    }
    /* /Deletable? */

    /* Tab to next? */
    tabToNextSelector = link.data("tab-to-next");
    if(tabToNextSelector !== false) {
      tabToNextSelector = link.data("tab-to-next");
      tabToNextSelector = " data-tab-to-next-selector=\"" + tabToNextSelector + "\"";
    } else {
      tabToNextSelector = "";
    }
    /* /Tab to next? */

    /* Submit on blur? */
    submitOnBlur = link.data("submit-on-blur");
    if(submitOnBlur == true) {
      submitOnBlur = " data-submit-on-blur=\"true\"";
    } else {
      submitOnBlur = "";
    }
    /* /Submit on blur? */

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
    input = "<input type=\"text\" class=\"form-control abracadabra-input\" id=\"" + inputId + "\" name=\"" + inputName + "\" value=\"" + inputValue + "\" data-original-value=\"" + inputValue + "\"" + tabToNextSelector + submitOnBlur + ">";
    
    html = "<span class=\"abracadabra-container\">" + openFormTag + hiddenMethodTags;
    html += "<div class=\"control-group\"><div class=\"abracadabra-input-and-button-wrapper\"><div class=\"abracadabra-input-container\">" + input + deletable + "</div>";
    html += "<div class=\"abracadabra-buttons\">" + buttons + "</div></div></form></span>";

    link.after(html);
    link.siblings(".abracadabra-container").find(".abracadabra-input").focus().val("").val(inputValue);
  });
});