module Abracadabra
  class Engine < Rails::Engine
    initialize 'abracadabra.initialize' do
      ActiveSupport.on_load(:action_view) do
        include Abracadabra::ViewHelpers
      end
    end
  end
end