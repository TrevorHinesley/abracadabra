require "abracadabra/version"

module Abracadabra
  class Engine < Rails::Engine
    ActionView::Base.send :include, AbracadabraHelper
  end
end