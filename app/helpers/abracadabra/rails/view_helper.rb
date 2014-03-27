module Abracadabra
  module Rails
    module ViewHelper
      def click_to_edit(instance, options)
        instance_class = instance.class.to_s.underscore
        link_class = "#{options[:class]} abracadabra".strip
        value = options[:value] || instance.send(options[:attribute])
        method = options[:method] || "patch"
        remote = options[:remote].nil? || options[:remote] == true ? true : false
        data_type = options[:type] || "script"

        link_to value, "javascript:void(0)", class: link_class, method: method.to_sym, data: { path: options[:path], attribute: options[:attribute], class: instance_class, type: data_type.to_sym }, remote: remote
      end
    end
  end
end