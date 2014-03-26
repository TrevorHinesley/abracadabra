require "abracadabra/view_helpers"
require "abracadabra/engine"

ActionView::Base.send(:include, ViewHelpers) if defined?(ActionView::Base)