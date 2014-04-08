$(function() {
  function closeAbracadabra(element) {
    $element = $(element);
    if(element.hasClass("abracadabra-container")) {
      container = element;
    } else {
      container = element.parents(".abracadabra-container");
    }
    value = container.find(".abracadabra-input-container input").val();
    container.siblings(".abracadabra").text(value).show();
    container.remove();
  }

  $("body").on("ajax:success", ".abracadabra-form", function(e) {
    console.log("ajax success");
    closeAbracadabra(this);
  })

  $("body").on("click", ".abracadabra-cancel", function() {
    console.log("cancel click");
    closeAbracadabra(this);
  });

  $("body").on("keyup", ".abracadabra-input-container input", function(e) {
    // Press Tab to submit (same function as Enter key)
    if (e.keyCode == 9)
    {
      console.log("tab pressed");
      e.preventDefault();
      $(this.form).submit();
    }

    // Press Escape to cancel
    if (e.keyCode == 27)
    {
      e.preventDefault();
      closeAbracadabra(this);
    }
  });
  
  $(".abracadabra").on("click", function() {
    link = $(this);
    link.hide();
    path = link.data("path");
    attribute = link.data("attribute");
    formMethod = link.data("method");
    remote = ((link.data("remote") == true) ? " data-remote=\"true\"" : "");

    if(remote == "") {
      authToken = "<input name=\"authenticity_token\" type=\"hidden\" value=\"" + $("meta[name=\"csrf-token\"]").attr("content") + "\">";
      type = "";
    } else {
      authToken = "";
      type = " data-type=\"" + link.data("type") + "\"";
    }

    instanceClass = link.data("class");
    inputValue = link.text().replace(/"|\\"/g, "&quot;");
    inputId = instanceClass + "_" + attribute;
    inputName = instanceClass + "[" + attribute + "]";

    buttons = "<button type=\"submit\" class=\"btn btn-primary abracadabra-submit\"><i class=\"fa fa-check\"></i></button><button type=\"button\" class=\"btn abracadabra-cancel\"><i class=\"fa fa-times\"></i></button>";
    openFormTag = "<form accept-charset=\"UTF-8\" action=\"" + path + "\"" + remote + type + " class=\"form-inline abracadabra-form\" method=\"post\">";
    hiddenMethodTags = "<div style=\"display:none;\"><input name=\"utf8\" type=\"hidden\" value=\"&#10003;\"><input name=\"_method\" type=\"hidden\" value=\"" + formMethod + "\">" + authToken + "</div>";
    input = "<input type=\"text\" class=\"form-control\" id=\"" + inputId + "\" name=\"" + inputName + "\" value=\"" + inputValue + "\">";
    
    html = "<span class=\"abracadabra-container abracadabra-inline\">" + openFormTag + hiddenMethodTags;
    html += "<div class=\"control-group\"><div class=\"abracadabra-input-and-button-wrapper\"><div class=\"abracadabra-input-container\">" + input + "</div>";
    html += "<div class=\"abracadabra-buttons\">" + buttons + "</div></div></form></span>";

    link.after(html);
  });
});