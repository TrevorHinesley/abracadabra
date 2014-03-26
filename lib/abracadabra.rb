require "abracadabra/version"
require 'abracadabra/view_helpers'

module Abracadabra
  module Rails
    class Engine < ::Rails::Engine
      initializer 'abracadabra.view_helpers' do
        ActionView::Base.send :include, ViewHelpers
      end
    end
  end
end