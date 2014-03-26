require "abracadabra/version"
require 'abracadabra/view_helper'

module Abracadabra
  module Rails
    class Engine < ::Rails::Engine
      initializer 'abracadabra.view_helper' do
        ActionView::Base.send :include, ViewHelper
      end
    end
  end
end