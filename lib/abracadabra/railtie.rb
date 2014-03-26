require "rails/railtie"
require 'abracadabra/view_helpers'

module Abracadabra
  class Railtie < Rails::Railtie
    config.eager_load_namespaces << Abracadabra
  end
end