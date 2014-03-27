require "abracadabra/view_helpers"

module Abracadabra
  class Engine < Rails::Engine
  end
end

ActionController::Base.send(:include, ViewHelpers)