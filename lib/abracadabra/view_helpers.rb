module Abracadabra
  module ViewHelpers
    def click_to_edit(instance, options)
      instance_class = instance.class.to_s.underscore
      link_class = "#{options[:class]} abracadabra".strip
      value = options[:value] || instance.send(options[:attribute])
      method = options[:method] || "patch"
      "<a href='javascript:void(0)' class='#{link_class}' data-path='#{options[:path]}' data-method='#{method}' data-attribute='#{options[:attribute]}' data-class='#{instance_class}'>#{value}</a>".html_safe
    end
  end
end