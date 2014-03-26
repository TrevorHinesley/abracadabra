require "abracadabra/version"

module Abracadabra
  module Rails
    class Engine < Rails::Engine
      ActionView::Base.send :include, AbracadabraHelper
    end
  end
end