$(function() {
  $("body").on("ajax:success", ".abracadabra-form", function(e) {
    $(e.target).find(".abracadabra-cancel").click();
  })

  $("body").on("click", ".abracadabra-cancel", function() {
    container = $(this).closest(".abracadabra-container");
    value = $(this).parents(".abracadabra-buttons").siblings().find("input").val();
    container.siblings(".abracadabra").text(value).show();
    $(this).closest(".abracadabra-container").remove();
  });

  $("body").on("keydown", ".abracadabra-input input", function(e) {
    if (e.which == 9)
    {
      e.preventDefault();
      $(this.form).submit();
    }
  });
  
  $(".abracadabra").on("click", function() {
    link = $(this);
    link.hide();
    path = link.data("path");
    attribute = link.data("attribute");
    form_method = link.data("method");
    remote = ((link.data("remote") == true) ? " data-remote='true'" : "");

    if(remote == "") {
      auth_token = "<input name=\"authenticity_token\" type=\"hidden\" value=\"" + $(\"meta[name="csrf-token"]\").attr(\"content\") + "\">";
      type = "";
    } else {
      auth_token = "";
      type = " data-type=\"" + link.data("type") + "\"";
    }

    instance_class = link.data("class");
    input_value = link.text();
    input_id = instance_class + "_" + attribute;
    input_name = instance_class + "[" + attribute + "]";

    buttons = "<button type=\"submit\" class=\"btn btn-primary abracadabra-submit\"><i class=\"fa fa-check\"></i></button><button type=\"button\" class=\"btn abracadabra-cancel\"><i class=\"fa fa-times\"></i></button>";
    open_form_tag = "<form accept-charset=\"UTF-8\" action=\"" + path + "\"" + remote + type + " class=\"form-inline abracadabra-form\" method=\"post\">";
    hidden_method_tags = "<div style=\"display:none;\"><input name=\"utf8\" type=\"hidden\" value=\"&#10003;\"><input name=\"_method\" type=\"hidden\" value=\"" + form_method + "\">" + auth_token + "</div>";
    input = "<input type=\"text\" class=\"form-control\" id=\"" + input_id + "\" name=\"" + input_name + "\" value=\"" + input_value + "\">";
    
    html = "<span class=\"abracadabra-container abracadabra-inline\">" + open_form_tag + hidden_method_tags;
    html += "<div class=\"control-group\"><div><div class=\"abracadabra-input\">" + input + "</div>";
    html += "<div class=\"abracadabra-buttons\">" + buttons + "</div></div></form></span>";

    link.after(html);
  });
});