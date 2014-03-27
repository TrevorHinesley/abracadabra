module Abracadabra
  module Rails
    module ViewHelper
      def click_to_edit(instance, options)
        instance_class = instance.class.to_s.underscore
        link_class = "#{options[:class]} abracadabra".strip
        value = options[:value] || instance.send(options[:attribute])
        method = options[:method] || "patch"

        if (options[:remote].nil? && options[:type].nil?) || options[:remote] == true
          remote = true
        else
          remote = false
        end

        data_type = options[:type].to_s.gsub(/^j+s+$/, "script") || "script"

        link_to value, "javascript:void(0)", class: link_class, method: method.to_sym, data: { path: options[:path], attribute: options[:attribute], class: instance_class, type: data_type.to_sym }, remote: remote
      end
    end
  end
end